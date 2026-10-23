import type { CSSProperties } from "react";
import Link from "next/link";
import { NetworkMap } from "@/components/NetworkMap";
import { Roundel, StripMap } from "@/components/transit";
import { lineById } from "@/content/network";
import { EMAIL, GITHUB, LINKEDIN, caseStudies, freelanceWork, owner } from "@/content/site";
import { notiflyPipeline, requestPath, services } from "@/content/systems";

const photos = [
  { src: "/photos/camera.jpg", alt: "A gloved hand holding a Fujifilm mirrorless camera", caption: "Photography", shape: "tall" },
  { src: "/photos/gaming.jpg", alt: "Close-up of a handheld gaming PC's d-pad and thumbstick", caption: "Games", shape: "wide" },
  { src: "/photos/gunpla.jpg", alt: "An Entry Grade RX-78-2 Gundam model kit against a grey wall", caption: "Gunpla and model kits", shape: "square" },
  { src: "/photos/coffee.jpg", alt: "A Chemex pour-over brewer with a paper filter", caption: "Coffee, brewed slow", shape: "square" },
];

export default function Home() {
  const notifly = lineById("N");
  const site = lineById("S");
  const lab = lineById("H");

  return (
    <main id="main">
      <NetworkMap
        title={
          <>
            <h1 className="hero__name">{owner.name}</h1>
            <p className="hero__offer">{owner.offer}</p>
            <div className="hero__actions">
              <a className="button" href={`mailto:${EMAIL}`}>Email me</a>
              <a className="text-link" href="#work">View experience</a>
            </div>
          </>
        }
      />

      <section id="work" className="section">
        <h2 className="section__title">Professional experience</h2>
        <p className="section__lede">
          From commerce frontends and mobile apps to API integrations and automated testing.
          These are the teams I&apos;ve worked with and the work I contributed.
        </p>
        <ul className="routes">
          {caseStudies.map((c) => {
            const line = lineById(c.line);
            return (
              <li key={c.slug} className="route" style={{ "--line": line.color } as CSSProperties}>
                <div className="route__head">
                  <Roundel id={line.id} color={line.color} />
                  <h3 className="route__title">
                    <Link href={`/work/${c.slug}/`}>{c.title}</Link>
                  </h3>
                  <span className="route__meta">{c.employer} · {c.dates}</span>
                </div>
                <StripMap stops={c.stack.map((name) => ({ name }))} color={line.color} label={`${c.title} stack`} />
                <p className="route__summary">{c.summary}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="freelance" className="section">
        <h2 className="section__title">Freelance projects</h2>
        <div className="board">
          <dl className="board__rows">
            {freelanceWork.map((work) => (
              <div key={work.name} className="board__row">
                <dt>{work.name}<br /><span className="fineprint">{work.dates}</span></dt>
                <dd>{work.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="section__lede">
          BS Information Technology, Holy Child College of Davao · April 2019.
          I speak English and Filipino.
        </p>
      </section>

      <section id="notifly" className="section feature" style={{ "--line": notifly.color } as CSSProperties}>
        <div className="feature__copy">
          <Roundel id="N" color={notifly.color} size="lg" />
          <h2 className="section__title">Notifly: every ping, checked.</h2>
          <p className="section__lede">
            An Android finance tracker that turns your bank and e-wallet notifications into a ledger, and never counts a
            peso until you confirm it.
          </p>
          <ul className="points">
            <li><strong>Nothing to type.</strong> The ledger builds itself from notifications you already get.</li>
            <li><strong>You confirm everything.</strong> Drafts wait in Needs review and never touch your balance.</li>
            <li><strong>It never guesses.</strong> No amount found means no transaction.</li>
            <li><strong>It stays on your phone.</strong> Parsing runs on-device and offline, with no account.</li>
          </ul>
          <Link className="text-link" href="/notifly/">Read the Notifly build</Link>
        </div>
        <div className="feature__diagram">
          <StripMap stops={notiflyPipeline} color={notifly.color} direction="v" label="How Notifly handles a notification" />
        </div>
      </section>

      <section id="homelab" className="section">
        <h2 className="section__title">A homelab, and the edge</h2>
        <p className="section__lede">
          One PC in a closet runs Proxmox and my self-hosted services. This site stays off it: static files on
          Cloudflare&apos;s edge, so visitors never touch the home network. This is the route it took to reach you.
        </p>
        <StripMap stops={requestPath} color={site.color} label="How this page reaches you" />
        <div className="board" style={{ "--line": lab.color } as CSSProperties}>
          <h3 className="board__title">
            <Roundel id="H" color={lab.color} /> Running on the box
          </h3>
          <dl className="board__rows">
            {services.map((s) => (
              <div key={s.name} className="board__row">
                <dt>{s.name}</dt>
                <dd>{s.does}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Link className="text-link" href="/homelab/">Tour the homelab</Link>
      </section>

      <section id="off-the-clock" className="section">
        <h2 className="section__title">Off the clock</h2>
        <div className="photos">
          {photos.map((p) => (
            <figure key={p.src} className={`photo photo--${p.shape}`}>
              <img src={p.src} alt={p.alt} loading="lazy" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="fineprint">Stock photos stand in until my own shots replace them.</p>
      </section>

      <section id="contact" className="terminus">
        <h2 className="terminus__title">Last stop: say hello.</h2>
        <p className="terminus__body">{owner.availability}</p>
        <div className="terminus__actions">
          <a className="button button--inverse" href={`mailto:${EMAIL}`}>Email me</a>
          <span className="terminus__address">{EMAIL}</span>
        </div>
        <p className="terminus__more">
          Find me on <a href={LINKEDIN}>LinkedIn</a>. Code lives on <a href={GITHUB}>GitHub</a>; most of it is
          private for now.
        </p>
      </section>
    </main>
  );
}
