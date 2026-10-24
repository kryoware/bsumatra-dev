export const EMAIL = "bsumatra.jbsa@gmail.com";
export const GITHUB = "https://github.com/kryoware";
export const LINKEDIN = "https://www.linkedin.com/in/baldwin-john-sumatra-3556881a5/";

export const owner = {
  name: "Baldwin John Sumatra",
  role: "Senior full-stack engineer",
  offer:
    "Building web and mobile software since 2017. I work on API integrations, e-commerce and automated testing with React, Vue, NestJS and PHP. Based in the Philippines.",
  availability:
    "Open to full-time and contract roles, remote first. Based in the Philippines (UTC+8), with hours that currently overlap Sydney.",
};

export type CaseStudy = {
  slug: string;
  line: "P" | "D" | "M";
  title: string;
  employer: string;
  location: string;
  dates: string;
  role: string;
  stack: string[];
  summary: string;
  approach: { step: string; detail: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "elmo-software",
    line: "P",
    title: "Integrations & reliability",
    employer: "ELMO Software",
    location: "Sydney · Remote",
    dates: "Jun 2022 – Present",
    role: "Senior Full Stack Software Engineer",
    stack: ["React", "NestJS", "PHP", "Symfony", "TypeScript", "Cypress", "Jest", "Jenkins", "AWS", "Terraform"],
    summary: "Maintaining a microservices platform, connecting workforce systems and strengthening automated testing.",
    approach: [
      { step: "Connected systems", detail: "Worked on payroll, HR, workforce and identity-provider API integrations, alongside ETL pipelines." },
      { step: "Core platform features", detail: "Built and maintained event-driven email notifications, API credential management, authentication and authorization, and PHP and TypeScript SDKs." },
      { step: "Automated testing", detail: "Started end-to-end testing for critical services and workflows with NestJS and Cypress. Helped implement Codeception and Jest tests and improve Jenkins CI pipelines." },
      { step: "Coverage & security", detail: "Worked on improving code coverage and security to support ISO compliance requirements." },
    ],
  },
  {
    slug: "yondu",
    line: "D",
    title: "Commerce & mobile",
    employer: "Yondu",
    location: "Taguig · Remote",
    dates: "May 2021 – Jun 2022",
    role: "Front End Developer",
    stack: ["Vue", "Nuxt", "BootstrapVue", "React Native", "Azure"],
    summary: "Built four e-commerce frontends and contributed features and performance improvements to an insurance mobile app.",
    approach: [
      { step: "Four connected frontends", detail: "Used Nuxt and BootstrapVue for an e-commerce landing page, storefront, buyer dashboard and seller dashboard." },
      { step: "Rendering for the use case", detail: "Used server-side rendering for storefront SEO and single-page applications for the other frontends." },
      { step: "Insurance on mobile", detail: "Added features and worked on user experience and performance in a React Native application for Android and iOS." },
    ],
  },
  {
    slug: "futuristech",
    line: "M",
    title: "Commerce & APIs",
    employer: "Futuristech Inc.",
    location: "Davao",
    dates: "Aug 2017 – Dec 2020",
    role: "Full Stack Web Developer",
    stack: ["React", "Next.js", "Vue", "Laravel", "PHP", "MySQL", "PostgreSQL", "MongoDB", "AWS", "GCP"],
    summary: "Built commerce applications and APIs across custom platforms, Shopify and Reaction Commerce.",
    approach: [
      { step: "APIs & integrations", detail: "Built Laravel REST and GraphQL APIs and worked with payment, notification, point-of-sale and driver-tracking APIs." },
      { step: "E-commerce platforms", detail: "Worked with Reaction Commerce using React, Next.js and MongoDB; Shopify integrations; and custom Vue or React applications backed by Laravel, MySQL and PostgreSQL." },
      { step: "Web & mobile", detail: "Developed React and Vue frontends and mobile applications with Cordova and NativeScript-Vue." },
    ],
  },
];

export const freelanceWork = [
  { name: "Umá · iFarms", dates: "Jan – Mar 2021", detail: "Built and maintained a Laravel GraphQL API and AWS EC2, RDS and S3 resources for a B2B platform, plus an internal NativeScript-Vue Android app and a Vue/Vuetify PWA." },
  { name: "BAI · GRUPBAI Logistics", dates: "Jun – Jul 2020", detail: "Built customer, merchant and rider apps with NativeScript-Vue, a Laravel GraphQL API with near real-time tracking through Pusher and Apollo Subscriptions, and Vue apps for the MVP and administration." },
  { name: "Retail & queueing systems", dates: "Dec 2018 – Feb 2019", detail: "Built a retailer landing page with bundle customization, bulk ordering and inventory tracking, and a bank queueing system spanning ticket kiosks, queue displays and a teller mobile app." },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
