import { NextResponse } from 'next/server';
import { budgetRanges, projectTypes, timelines } from '@/data/services';

export const runtime = 'nodejs';

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  website?: string; // honeypot
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact endpoint.
 *
 * Validates the submission, then hands it to `deliver` below, which sends it
 * by email through Resend, falls back to a generic JSON webhook, and finally
 * to a server-side log — so the form works on a fresh deployment with nothing
 * configured yet.
 */
export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // A filled honeypot means a bot; accept silently so it does not retry.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const company = body.company?.trim() ?? '';
  const projectType = body.projectType?.trim() ?? '';
  const budget = body.budget?.trim() ?? '';
  const timeline = body.timeline?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (name.length < 2) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }
  if (!projectTypes.includes(projectType)) {
    return NextResponse.json(
      { error: 'Please choose a project type.' },
      { status: 400 },
    );
  }
  // Both optional — but if present they have to be one of the offered values,
  // so the payload downstream stays predictable.
  if (budget && !budgetRanges.includes(budget)) {
    return NextResponse.json(
      { error: 'Please choose a budget range from the list.' },
      { status: 400 },
    );
  }
  if (timeline && !timelines.includes(timeline)) {
    return NextResponse.json(
      { error: 'Please choose a timeline from the list.' },
      { status: 400 },
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: 'Please add a little more detail to your message.' },
      { status: 400 },
    );
  }

  const submission = {
    name,
    email,
    company,
    projectType,
    budget,
    timeline,
    message,
    receivedAt: new Date().toISOString(),
  };

  const delivered = await deliver(submission);

  if (!delivered) {
    return NextResponse.json(
      { error: 'Could not send your message right now. Please try again.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

type Submission = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  receivedAt: string;
};

/** Plain-text body — readable in any client, no template to maintain. */
function format(s: Submission): string {
  return [
    `From:     ${s.name} <${s.email}>`,
    s.company ? `Company:  ${s.company}` : null,
    `Type:     ${s.projectType}`,
    s.budget ? `Budget:   ${s.budget}` : null,
    s.timeline ? `Timeline: ${s.timeline}` : null,
    `Received: ${s.receivedAt}`,
    '',
    s.message,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Sends the submission on. Tries Resend first, then a generic webhook, and
 * finally falls back to a server-side log so the form still works on a fresh
 * deployment with nothing configured.
 *
 * Returns false only when a configured transport was actually attempted and
 * failed — an unconfigured environment is not an error for the visitor.
 */
async function deliver(submission: Submission): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Resend accepts its shared onboarding sender until a domain is verified.
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (resendKey && to) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Portfolio <${from}>`,
          to: [to],
          // Replying in the mail client goes straight back to the sender.
          reply_to: submission.email,
          subject: `${submission.projectType} — ${submission.name}`,
          text: format(submission),
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      return true;
    } catch (error) {
      console.error('[contact] resend delivery failed', error);
      return false;
    }
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return true;
    } catch (error) {
      console.error('[contact] webhook delivery failed', error);
      return false;
    }
  }

  console.info('[contact] submission received (no transport configured)', submission);
  return true;
}
