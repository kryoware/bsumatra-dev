import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Roundel, SeparatedText, StripMap } from "@/components/transit";
import { lineById } from "@/content/network";
import { EMAIL, caseStudies, caseStudyBySlug } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = caseStudyBySlug((await params).slug);
  return { title: study ? `${study.title} · ${study.employer}` : "Experience" };
}

export default async function CaseStudyPage({ params }: Params) {
  const study = caseStudyBySlug((await params).slug);
  if (!study) notFound();
  const line = lineById(study.line);
  const next = caseStudies[(caseStudies.indexOf(study) + 1) % caseStudies.length];

  return (
    <main id="main" className="page" style={{ "--line": line.color } as CSSProperties}>
      <Link className="back" href="/#work">All experience</Link>
      <header className="page__head">
        <Roundel id={line.id} color={line.color} size="lg" />
        <h1 className="page__title">{study.title}</h1>
        <p className="page__lede">{study.summary}</p>
      </header>
      <StripMap stops={study.stack.map((name) => ({ name }))} color={line.color} label={`${study.title} stack`} />

      <dl className="spec spec--facts">
        <div><dt>Company</dt><dd>{study.employer}</dd></div>
        <div><dt>Location</dt><dd><span className="work-location"><SeparatedText text={study.location} /></span></dd></div>
        <div><dt>Dates</dt><dd>{study.dates}</dd></div>
        <div><dt>Role</dt><dd>{study.role}</dd></div>
      </dl>

      {study.roles && (
        <section className="role-history" aria-labelledby="career-title">
          <h2 id="career-title" className="role-history__title">Career progression</h2>
          <StripMap stops={study.roles} color={line.color} label="Career progression" />
        </section>
      )}

      <section className="prose">
        <h2>My contributions</h2>
        <StripMap
          stops={study.approach.map((a) => ({ name: a.step, note: a.detail }))}
          color={line.color}
          direction="v"
          label="Work and responsibilities"
        />
      </section>

      <nav className="page__next" aria-label="Next experience">
        <span>Next line</span>
        <Link href={`/work/${next.slug}/`}>
          <Roundel id={next.line} color={lineById(next.line).color} /> {next.title}
        </Link>
      </nav>
      <p className="page__close">
        Hiring for work like this? <a href={`mailto:${EMAIL}`}>Email me</a>.
      </p>
    </main>
  );
}
