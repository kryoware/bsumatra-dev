import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Roundel, SampleTag, StripMap } from "@/components/transit";
import { lineById } from "@/content/network";
import { EMAIL, caseStudies, caseStudyBySlug } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = caseStudyBySlug((await params).slug);
  return { title: study ? `${study.title} (sample)` : "Case study" };
}

export default async function CaseStudyPage({ params }: Params) {
  const study = caseStudyBySlug((await params).slug);
  if (!study) notFound();
  const line = lineById(study.line);
  const next = caseStudies[(caseStudies.indexOf(study) + 1) % caseStudies.length];

  return (
    <main id="main" className="page" style={{ "--line": line.color } as CSSProperties}>
      <Link className="back" href="/#work">All client work</Link>
      <p className="notice notice--page">
        <SampleTag /> This case study is a sample. It shows the format; the real NDA-safe write-up replaces it.
      </p>
      <header className="page__head">
        <Roundel id={line.id} color={line.color} size="lg" />
        <h1 className="page__title">{study.title}</h1>
        <p className="page__lede">{study.summary}</p>
      </header>
      <StripMap stops={study.stack.map((name) => ({ name }))} color={line.color} sample label={`${study.title} stack`} />

      <dl className="spec spec--facts">
        <div><dt>Industry</dt><dd>{study.industry}</dd></div>
        <div><dt>Scale</dt><dd>{study.scale}</dd></div>
        <div><dt>Role</dt><dd>{study.role}</dd></div>
        <div><dt>Client</dt><dd>Withheld under NDA</dd></div>
      </dl>

      <section className="prose">
        <h2>Problem</h2>
        <p>{study.problem}</p>
        <h2>Constraints</h2>
        <ul>
          {study.constraints.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>

      <section className="prose">
        <h2>Approach</h2>
        <StripMap
          stops={study.approach.map((a) => ({ name: a.step, note: a.detail }))}
          color={line.color}
          sample
          direction="v"
          label="Approach, step by step"
        />
      </section>

      <section className="prose">
        <h2>Outcome</h2>
        <p className="outcome">{study.outcome}</p>
      </section>

      <nav className="page__next" aria-label="Next case study">
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
