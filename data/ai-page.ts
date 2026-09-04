/**
 * Content for the /ai experience. Kept separate from the components so copy
 * can be edited without touching animation code.
 */

export const heroKeywords = ['BUILD', 'THINK', 'CREATE', 'AUTOMATE', 'RESEARCH'];

export type AskPrompt = {
  id: string;
  label: string;
  question: string;
  flow: string[];
  answer: string;
  skills: string[];
};

/**
 * Pre-written responses for the "Explore how I use AI" panel. This is a
 * portfolio demonstration — nothing here is generated at runtime and no model
 * is called.
 */
export const askPrompts: AskPrompt[] = [
  {
    id: 'website',
    label: 'Build a website',
    question: 'Build a website',
    flow: [
      'Research',
      'Architecture',
      'AI-assisted development',
      'Testing',
      'Deployment',
    ],
    answer:
      'Positioning and reference research first, then structure. AI carries scaffolding, boilerplate and unfamiliar APIs; the interface decisions, the review and the deploy stay with me.',
    skills: ['Next.js', 'TypeScript', 'Responsive design', 'Brand positioning'],
  },
  {
    id: 'market',
    label: 'Research a market',
    question: 'Research a market',
    flow: ['Question', 'Sources', 'Synthesis', 'Verification', 'Position'],
    answer:
      'Breadth from the model, checking from me. The output is a defensible point of view I can take into a client conversation — not a summary of everything found.',
    skills: ['Market research', 'Competitive research', 'Data analysis'],
  },
  {
    id: 'automate',
    label: 'Automate a workflow',
    question: 'Automate a workflow',
    flow: ['Map', 'Find repetition', 'Design', 'Automate', 'Monitor'],
    answer:
      'Map the process as it actually runs, find the parts that repeat every week, and remove that middle. What is left is the judgement, which stays human.',
    skills: [
      'Workflow automation',
      'Business process optimization',
      'Content workflows',
    ],
  },
  {
    id: 'content',
    label: 'Create content',
    question: 'Create content',
    flow: ['Angle', 'Draft', 'Edit', 'Design', 'Publish'],
    answer:
      'Volume early, taste late. Many angles and drafts get generated; almost all of them get cut. What ships has been rewritten by hand.',
    skills: ['Content strategy', 'Copywriting', 'Social media', 'Video concepts'],
  },
  {
    id: 'app',
    label: 'Develop an AI app',
    question: 'Develop an AI app',
    flow: ['Use case', 'Context design', 'Model + tools', 'Guardrails', 'Ship'],
    answer:
      'The hard part is rarely the model call. It is deciding what context the model gets, what it is allowed to do, and how the output gets validated before a user sees it.',
    skills: ['LLM applications', 'RAG systems', 'AI agents', 'APIs'],
  },
];

export type ConstellationNode = {
  id: string;
  label: string;
  angle: number;
  description: string;
  chain: string[];
};

export const constellationNodes: ConstellationNode[] = [
  {
    id: 'software',
    label: 'SOFTWARE',
    angle: -90,
    description: 'AI inside the build loop, from first scaffold to deploy.',
    chain: ['Code', 'Debug', 'Test', 'Document'],
  },
  {
    id: 'marketing',
    label: 'MARKETING',
    angle: -45,
    description: 'Research feeds the message; execution moves at draft speed.',
    chain: ['Research', 'Position', 'Draft', 'Distribute'],
  },
  {
    id: 'research',
    label: 'RESEARCH',
    angle: 0,
    description: 'Breadth from the model, verification from me.',
    chain: ['Gather', 'Synthesise', 'Verify', 'Conclude'],
  },
  {
    id: 'content',
    label: 'CONTENT',
    angle: 45,
    description: 'Many angles generated, few survive the edit.',
    chain: ['Angle', 'Draft', 'Edit', 'Publish'],
  },
  {
    id: 'video',
    label: 'VIDEO',
    angle: 90,
    description: 'Concepting and scripting accelerate; the cut stays hand-made.',
    chain: ['Concept', 'Script', 'Assets', 'Edit'],
  },
  {
    id: 'automation',
    label: 'AUTOMATION',
    angle: 135,
    description: 'Whatever repeats every week gets systematised.',
    chain: ['Map', 'Design', 'Automate', 'Monitor'],
  },
  {
    id: 'business',
    label: 'BUSINESS',
    angle: 180,
    description: 'Proposals, pricing and positioning, researched before written.',
    chain: ['Scope', 'Proposal', 'Pricing', 'Pitch'],
  },
  {
    id: 'client',
    label: 'CLIENT SUCCESS',
    angle: 225,
    description: 'Communication and delivery kept consistent end to end.',
    chain: ['Brief', 'Update', 'Deliver', 'Handoff'],
  },
];

export const transformStages = [
  {
    id: 'question',
    label: 'Question',
    detail: 'A real problem, stated in plain language before any tool opens.',
  },
  {
    id: 'context',
    label: 'Context',
    detail: 'Feeding the model what it needs to know is most of the work.',
  },
  {
    id: 'ai',
    label: 'AI',
    detail: 'Breadth and speed — options generated faster than one person can.',
  },
  {
    id: 'tools',
    label: 'Tools',
    detail: 'Search, code execution, files, APIs. The model reaches outward.',
  },
  {
    id: 'judgment',
    label: 'Human Judgment',
    detail: 'The gate. Nothing passes because a model produced it.',
  },
  {
    id: 'result',
    label: 'Result',
    detail: 'Shipped, verified, and owned by a person.',
  },
];

export const devStages = [
  { id: 'idea', label: 'IDEA', line: 'Define the problem worth solving' },
  { id: 'architecture', label: 'ARCHITECTURE', line: 'Structure before syntax' },
  { id: 'code', label: 'CODE', line: 'AI-assisted, human-directed' },
  { id: 'debug', label: 'DEBUG', line: 'Read the failure, not the guess' },
  { id: 'test', label: 'TEST', line: 'Verify against the real requirement' },
  { id: 'deploy', label: 'DEPLOY', line: 'Ship it and watch it' },
];

export const devFloatingLabels = ['AI ASSISTED', 'HUMAN REVIEW', 'ITERATE'];

export const marketingObjects = [
  { id: 'content', label: 'Content card', hint: 'Angle, hook, format' },
  { id: 'proposal', label: 'Proposal', hint: 'Scope, price, timeline' },
  { id: 'campaign', label: 'Campaign idea', hint: 'One message, many cuts' },
  { id: 'social', label: 'Social post', hint: 'Written for the feed it lives in' },
  { id: 'analytics', label: 'Analytics', hint: 'What actually moved' },
  { id: 'brand', label: 'Brand message', hint: 'The line everything hangs off' },
];

export const marketingFlow = [
  'Research',
  'Positioning',
  'Content',
  'Distribution',
  'Analysis',
  'Optimization',
];

export const creativeWorlds = [
  {
    id: 'video',
    label: 'VIDEO',
    headline: 'Cuts that hold attention',
    body: 'Concept and script explored fast, then edited by hand. Timing is taste, and taste does not automate.',
    tint: 'var(--color-ai-violet)',
    items: ['Short-form', 'Brand film', 'Promotional', 'Reels'],
  },
  {
    id: 'visual',
    label: 'VISUAL',
    headline: 'Direction before decoration',
    body: 'Generation is useful for exploring a look. Choosing which look is right is still a judgement call.',
    tint: 'var(--color-ai-cyan)',
    items: ['Art direction', 'Visual systems', 'Concepting', 'Composition'],
  },
  {
    id: 'social',
    label: 'SOCIAL',
    headline: 'Content as a repeatable system',
    body: 'Planning, production and analysis treated as one loop, so output does not depend on inspiration.',
    tint: 'var(--color-ai-magenta)',
    items: ['LinkedIn', 'Instagram', 'Content strategy', 'Audience'],
  },
];

export type AutomationPreset = {
  id: string;
  label: string;
  nodes: { label: string; kind: 'input' | 'ai' | 'decision' | 'action' | 'output' }[];
};

export const automationPresets: AutomationPreset[] = [
  {
    id: 'content',
    label: 'Content',
    nodes: [
      { label: 'Idea', kind: 'input' },
      { label: 'Research', kind: 'ai' },
      { label: 'Draft', kind: 'ai' },
      { label: 'Review', kind: 'decision' },
      { label: 'Publish', kind: 'output' },
    ],
  },
  {
    id: 'client',
    label: 'Client',
    nodes: [
      { label: 'Lead', kind: 'input' },
      { label: 'Research', kind: 'ai' },
      { label: 'Proposal', kind: 'action' },
      { label: 'Follow-up', kind: 'decision' },
      { label: 'Handoff', kind: 'output' },
    ],
  },
  {
    id: 'development',
    label: 'Development',
    nodes: [
      { label: 'Requirement', kind: 'input' },
      { label: 'AI', kind: 'ai' },
      { label: 'Code', kind: 'action' },
      { label: 'Test', kind: 'decision' },
      { label: 'Deploy', kind: 'output' },
    ],
  },
];

export const architectureNodes = [
  { id: 'user', label: 'USER', note: 'A person with an actual question.' },
  {
    id: 'interface',
    label: 'INTERFACE',
    note: 'Where intent is captured — and where trust is won or lost.',
  },
  {
    id: 'application',
    label: 'APPLICATION',
    note: 'Business rules, auth, state. The model is one component, not the app.',
  },
  {
    id: 'llm',
    label: 'LLM',
    note: 'The reasoning layer. Powerful, non-deterministic, never the last word.',
  },
  {
    id: 'tools',
    label: 'TOOLS',
    note: 'Functions the model can call — search, code, APIs, actions.',
  },
  {
    id: 'data',
    label: 'DATA',
    note: 'Application and user data the request is grounded in.',
  },
  {
    id: 'knowledge',
    label: 'KNOWLEDGE',
    note: 'Retrieved documents and domain context supplied at request time.',
  },
  {
    id: 'validation',
    label: 'VALIDATION',
    note: 'Schema checks, guardrails and human review before anything ships.',
  },
  {
    id: 'response',
    label: 'RESPONSE',
    note: 'What the user finally sees — checked, not merely generated.',
  },
];

export const ragSteps = [
  {
    id: 'documents',
    label: 'DOCUMENTS',
    note: 'The source material — files, pages, records a model was never trained on.',
  },
  {
    id: 'chunk',
    label: 'CHUNK',
    note: 'Split into passages small enough to retrieve precisely.',
  },
  {
    id: 'embed',
    label: 'EMBED',
    note: 'Each passage becomes a vector that captures its meaning.',
  },
  {
    id: 'search',
    label: 'VECTOR SEARCH',
    note: 'Finds relevant information from a knowledge base.',
  },
  {
    id: 'retrieve',
    label: 'RETRIEVE',
    note: 'The best-matching passages are pulled back as context.',
  },
  {
    id: 'llm',
    label: 'LLM',
    note: 'The model answers using that retrieved context, not memory alone.',
  },
  {
    id: 'answer',
    label: 'ANSWER',
    note: 'Grounded in real sources — and traceable back to them.',
  },
];

export const agentActions = [
  'PLAN',
  'REASON',
  'SEARCH',
  'USE TOOL',
  'OBSERVE',
  'DECIDE',
  'ACT',
  'VERIFY',
];

export type OrbitCategory = {
  id: string;
  label: string;
  tools: string[];
  tint: string;
};

export const orbitCategories: OrbitCategory[] = [
  {
    id: 'assistants',
    label: 'AI ASSISTANTS',
    tools: ['Claude', 'ChatGPT', 'Gemini', 'Grok', 'Perplexity', 'NotebookLM'],
    tint: 'var(--color-ai-blue)',
  },
  {
    id: 'development',
    label: 'DEVELOPMENT',
    tools: [
      'Claude Code',
      'Cursor',
      'GitHub Copilot',
      'Anthropic API',
      'OpenAI API',
      'LangChain',
      'LlamaIndex',
    ],
    tint: 'var(--color-ai-violet)',
  },
  {
    id: 'open-source',
    label: 'OPEN SOURCE',
    tools: [
      'Llama',
      'Mistral',
      'Qwen',
      'Gemma',
      'DeepSeek',
      'Ollama',
      'llama.cpp',
      'vLLM',
      'Hugging Face',
      'Open WebUI',
    ],
    tint: 'var(--color-ai-pink)',
  },
  {
    id: 'research',
    label: 'RESEARCH',
    tools: [
      'Perplexity',
      'NotebookLM',
      'Deep research modes',
      'RAG over own documents',
      'Vector search',
    ],
    tint: 'var(--color-ai-cyan)',
  },
  {
    id: 'creative',
    label: 'CREATIVE',
    tools: [
      'Midjourney',
      'Stable Diffusion',
      'FLUX',
      'ComfyUI',
      'Runway',
      'Sora',
      'Higgsfield',
      'ElevenLabs',
      'Whisper',
      'Adobe Firefly',
    ],
    tint: 'var(--color-ai-magenta)',
  },
  {
    id: 'automation',
    label: 'AUTOMATION',
    tools: [
      'n8n',
      'Make',
      'Zapier',
      'Model Context Protocol',
      'Scheduled agent runs',
      'AI content pipelines',
    ],
    tint: 'var(--color-ai-yellow)',
  },
];

export const humanFactors = [
  'STRATEGY',
  'CREATIVITY',
  'CONTEXT',
  'VERIFICATION',
];

export const qualityCards = [
  {
    id: 'hallucination',
    label: 'HALLUCINATION',
    note: 'Models state wrong things confidently. Facts get checked against sources.',
  },
  {
    id: 'bias',
    label: 'BIAS',
    note: 'Training data carries skew. Output gets read for what it quietly assumes.',
  },
  {
    id: 'privacy',
    label: 'PRIVACY',
    note: 'Client and personal data does not go into a prompt without a reason.',
  },
  {
    id: 'security',
    label: 'SECURITY',
    note: 'Generated code is reviewed like any other before it reaches production.',
  },
  {
    id: 'injection',
    label: 'PROMPT INJECTION',
    note: 'Untrusted text can carry instructions. Retrieved content is data, not orders.',
  },
  {
    id: 'data',
    label: 'DATA QUALITY',
    note: 'Weak context produces weak answers, however good the model is.',
  },
  {
    id: 'verification',
    label: 'VERIFICATION',
    note: 'Nothing ships unverified. That step is the job, not the overhead.',
  },
];

export const ctaOptions = [
  { id: 'ai-app', label: 'AI APPLICATION', tint: 'var(--color-ai-blue)' },
  { id: 'automation', label: 'AUTOMATION', tint: 'var(--color-ai-violet)' },
  { id: 'website', label: 'WEBSITE', tint: 'var(--color-ai-cyan)' },
  { id: 'software', label: 'SOFTWARE', tint: 'var(--color-ai-magenta)' },
  { id: 'marketing', label: 'MARKETING SYSTEM', tint: 'var(--color-ai-yellow)' },
  { id: 'creative', label: 'CREATIVE PROJECT', tint: 'var(--color-ai-pink)' },
];
