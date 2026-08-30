import { NextResponse } from 'next/server';
import { projectTypes } from '@/data/services';

export const runtime = 'nodejs';

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  message?: string;
  website?: string; // honeypot
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact endpoint.
 *
 * Validates the submission, then forwards it to CONTACT_WEBHOOK_URL if that
 * environment variable is set (any webhook that accepts JSON — email service,
 * automation platform, CRM). With no webhook configured the submission is
 * accepted and logged server-side so the form works out of the box.
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
    message,
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch {
      return NextResponse.json(
        { error: 'Could not send your message right now. Please try again.' },
        { status: 502 },
      );
    }
  } else {
    console.info('[contact] submission received', submission);
  }

  return NextResponse.json({ ok: true });
}
