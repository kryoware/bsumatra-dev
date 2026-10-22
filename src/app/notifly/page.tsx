import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Roundel, StripMap } from "@/components/transit";
import { lineById } from "@/content/network";
import { EMAIL } from "@/content/site";
import { notiflyPipeline, notiflyStack } from "@/content/systems";

export const metadata: Metadata = {
  title: "Notifly",
  description: "An Android finance tracker that turns bank and e-wallet notifications into a ledger, on-device.",
};

export default function NotiflyPage() {
  const line = lineById("N");
  return (
    <main id="main" className="page" style={{ "--line": line.color } as CSSProperties}>
      <Link className="back" href="/">All lines</Link>
      <header className="page__head">
        <Roundel id="N" color={line.color} size="lg" />
        <h1 className="page__title">Notifly</h1>
        <p className="page__lede">Every ping, checked.</p>
        <p className="page__status">Pre-release Android app. Not on the Play Store yet, and the repo is private for now.</p>
      </header>
      <StripMap stops={notiflyStack} color={line.color} label="Notifly stack" />

      <section className="prose">
        <h2>Why it exists</h2>
        <p>
          You already get a notification for every GCash send and every Maya top-up. Notifly reads those notifications on
          your phone, drafts each transaction, and waits for you to confirm it. It was inspired by Samsung&apos;s Notistar.
        </p>
      </section>

      <section className="prose prose--split">
        <div>
          <h2>How it works</h2>
          <p>
            Android treats notification access as special access, so Notifly sends you to system settings and shows
            whether the listener is actually connected. It only reads apps you allow-list.
          </p>
          <p>
            Apps often update one notification in place, so capture dedupes on the notification key and a content hash.
            If no amount can be found, no transaction is created.
          </p>
        </div>
        <StripMap stops={notiflyPipeline} color={line.color} direction="v" label="How Notifly handles a notification" />
      </section>

      <section className="prose">
        <h2>Under the hood</h2>
        <dl className="spec">
          <div><dt>App</dt><dd>Kotlin 2.4, Compose Multiplatform 1.13, Android 8.0 and up</dd></div>
          <div><dt>Data</dt><dd>Room on SQLCipher, so the ledger is encrypted at rest</dd></div>
          <div><dt>Wiring</dt><dd>Koin for dependency injection, Glance for home-screen widgets</dd></div>
          <div><dt>Parsing</dt><dd>Built-in parsers for GCash, Maya and BPI; a bundled classifier for everything else</dd></div>
        </dl>
        <h3>The classifier</h3>
        <p>
          Character TF-IDF and logistic regression, trained in Python with scikit-learn and quantized to int8. The
          exported model is about 124 KB and runs in plain Kotlin with no ML runtime on the phone.
        </p>
        <p>
          It is a prototype. It was trained on synthetic examples plus 23 reviewed notifications, so its test score
          says nothing yet about real-world accuracy. Its confidence is an uncalibrated score, and every parsed draft
          still waits for you in review.
        </p>
        <h3>Also in the app</h3>
        <p>
          Accounts with transfer detection, budgets and bill reminders, insights, a notification log that shows why each
          ping was parsed or ignored, CSV import and export, and an app lock. State is never shown by color alone, and
          the app follows system font scale and reduced motion.
        </p>
      </section>

      <p className="page__close">
        Want the walkthrough? <a href={`mailto:${EMAIL}`}>Email me</a>.
      </p>
    </main>
  );
}
