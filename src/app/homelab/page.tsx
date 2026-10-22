import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Roundel, StripMap } from "@/components/transit";
import { lineById } from "@/content/network";
import { EMAIL } from "@/content/site";
import { requestPath, services } from "@/content/systems";

export const metadata: Metadata = {
  title: "Homelab",
  description: "One PC in a closet: Proxmox, self-hosted services, and a managed network.",
};

export default function HomelabPage() {
  const lab = lineById("H");
  const site = lineById("S");
  return (
    <main id="main" className="page" style={{ "--line": lab.color } as CSSProperties}>
      <Link className="back" href="/">All lines</Link>
      <header className="page__head">
        <Roundel id="H" color={lab.color} size="lg" />
        <h1 className="page__title">Homelab</h1>
        <p className="page__lede">One PC in a closet runs Proxmox and my self-hosted services.</p>
      </header>
      <StripMap
        stops={[{ name: "Proxmox", note: "The host" }, ...services.map((s) => ({ name: s.name }))]}
        color={lab.color}
        label="Homelab line"
      />

      <section className="prose">
        <h2>The box</h2>
        <p>
          A single PC running Proxmox. Everything below runs as a guest on it.
        </p>
        <dl className="board__rows board__rows--page">
          {services.map((s) => (
            <div key={s.name} className="board__row">
              <dt>{s.name}</dt>
              <dd>{s.does}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="prose">
        <h2>The network</h2>
        <p>
          An Omada setup manages the home network from one controller. OpenMPTCProuter bonds more than one internet
          connection into a single link, for more bandwidth and a fallback when one provider drops.
        </p>
      </section>

      <section id="this-site" className="prose" style={{ "--line": site.color } as CSSProperties}>
        <h2>
          <Roundel id="S" color={site.color} /> This site
        </h2>
        <p>
          Next.js and TypeScript, exported as plain static files and served by Cloudflare Workers. The site never runs
          on the box, so visiting it opens no path into the home network.
        </p>
        <StripMap stops={requestPath} color={site.color} label="How this page reaches you" />
      </section>

      <section className="prose">
        <h2>What stays private</h2>
        <p>
          Addresses, hostnames, and anything that maps the attack surface. Write-ups describe the shape of the lab, not
          the keys to it.
        </p>
      </section>

      <p className="page__close">
        Running something similar? <a href={`mailto:${EMAIL}`}>Email me</a>.
      </p>
    </main>
  );
}
