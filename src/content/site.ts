// Placeholder until the owner supplies a real address.
export const EMAIL = "hello@bsumatra.dev";
export const GITHUB = "https://github.com/kryoware";
export const LINKEDIN = "https://www.linkedin.com/in/baldwin-john-sumatra-3556881a5/";

export const owner = {
  name: "Baldwin John Sumatra",
  role: "Senior full-stack engineer",
  offer:
    "Senior full-stack engineer since 2017. React, Vue, NestJS, PHP, MySQL and PostgreSQL. Remote from the Philippines, overlapping Sydney hours.",
  availability:
    "Open to full-time and contract roles, remote first. Based in the Philippines (UTC+8), with hours that currently overlap Sydney.",
};

export type CaseStudy = {
  slug: string;
  line: "P" | "D" | "M";
  title: string;
  industry: string;
  scale: string;
  scale_short: string;
  role: string;
  stack: string[];
  summary: string;
  problem: string;
  constraints: string[];
  approach: { step: string; detail: string }[];
  outcome: string;
};

// Every case study here is a sample, written to show the format until the
// real NDA-safe write-ups replace them. The UI labels them as samples.
export const caseStudies: CaseStudy[] = [
  {
    slug: "payments-ledger",
    line: "P",
    title: "Payments ledger",
    industry: "Fintech",
    scale: "About 1.2M transactions a month across three payment providers",
    scale_short: "1.2M transactions a month",
    role: "Lead engineer on a team of four",
    stack: ["React", "Next.js", "TypeScript", "NestJS", "PostgreSQL"],
    summary: "Month-end close went from five days of spreadsheet matching to one.",
    problem:
      "Finance closed the books by exporting CSVs from three payment providers and matching them by hand. Every mismatch meant a support ticket and a day lost.",
    constraints: [
      "No downtime on the live payment path.",
      "Auditors need every balance change traced to its source.",
      "Providers send duplicate and out-of-order webhooks.",
    ],
    approach: [
      { step: "Append-only ledger", detail: "PostgreSQL tables that only ever insert, so every balance can be replayed and audited." },
      { step: "Idempotent intake", detail: "A NestJS service keyed each provider event, so duplicates and retries land once." },
      { step: "Nightly matching", detail: "A job pairs provider records with ledger entries and sends the leftovers to a review queue." },
      { step: "Review console", detail: "A Next.js back office where finance resolves mismatches with the evidence side by side." },
    ],
    outcome: "Close dropped from about five working days to one, and unmatched items became a short daily queue.",
  },
  {
    slug: "dispatch-console",
    line: "D",
    title: "Dispatch console",
    industry: "Logistics",
    scale: "About 300 drivers dispatched from six hubs",
    scale_short: "300 drivers, six hubs",
    role: "Full-stack engineer",
    stack: ["Vue", "Nuxt", "TypeScript", "PHP", "MySQL"],
    summary: "Dispatchers stopped assigning deliveries from spreadsheets and group chats.",
    problem:
      "Dispatchers assigned deliveries from a spreadsheet and a group chat. Double bookings were common, and nobody could see a hub's load at a glance.",
    constraints: [
      "The PHP backend could not be rewritten; it also served the driver app.",
      "Hub connections were slow and dropped often.",
      "Peak hours left no room for a big-bang launch.",
    ],
    approach: [
      { step: "Versioned endpoints", detail: "New PHP endpoints beside the old ones, so the driver app kept working untouched." },
      { step: "Live board", detail: "A Nuxt console with optimistic updates that reconcile when the connection returns." },
      { step: "Faster reads", detail: "MySQL indexes and a read replica behind the board, keeping writes off the hot path." },
      { step: "Hub by hub", detail: "Rolled out one hub at a time, with the spreadsheet kept as a fallback for a week." },
    ],
    outcome: "Assigning a batch went from around twenty minutes to under five, and double bookings stopped.",
  },
  {
    slug: "monolith-split",
    line: "M",
    title: "Monolith split",
    industry: "Education SaaS",
    scale: "About 80,000 students across 120 schools",
    scale_short: "80,000 students",
    role: "Tech lead",
    stack: ["PHP", "NestJS", "PostgreSQL"],
    summary: "Releases went from monthly and risky to weekly and routine.",
    problem:
      "A ten-year-old PHP monolith ran grading, scheduling and billing. Every release risked all three, so releases happened once a month and everyone braced for them.",
    constraints: [
      "Schools were mid-term; downtime during class hours was not an option.",
      "No student record could be lost or duplicated.",
      "The team had to keep shipping features during the move.",
    ],
    approach: [
      { step: "Strangler routes", detail: "NestJS services took over one domain at a time behind the same URLs." },
      { step: "Dual writes", detail: "Each domain wrote to the old store and PostgreSQL until the numbers matched for two weeks." },
      { step: "Contract tests", detail: "Old and new implementations answered the same test suite before each cutover." },
      { step: "Cutover", detail: "Scheduled for school holidays, with a one-command rollback rehearsed beforehand." },
    ],
    outcome: "Releases moved from monthly to weekly, and a bad deploy now affects one domain instead of the whole platform.",
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
