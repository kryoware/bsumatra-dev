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
        <p className="page__status">Pre-release Android app. Not on the Play Store yet, cloud sync isn&apos;t set up, and the repo is private for now.</p>
      </header>
      <StripMap stops={notiflyStack} color={line.color} label="Notifly stack" />

      <section className="prose">
        <h2>Why it exists</h2>
        <p>
          You already get a notification for every GCash send and every Maya top-up. Notifly reads those notifications on
          your phone, drafts each transaction, and waits for you to confirm it. A shared screenshot or receipt works too:
          its text is read on-device and becomes a draft. It was inspired by Samsung&apos;s Notistar.
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
            Each capture is fingerprinted by its notification key, posting time and text, so a replayed notification
            creates no duplicate draft. If no amount can be found, no transaction is created. Notification text never leaves the
            phone and is never written to logs; the <a href="https://notifly.bsumatra.dev/docs/PRIVACY/">privacy policy</a> has the
            details.
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
          <div><dt>Parsing</dt><dd>On-device rules find the amount and direction, and release builds add a bundled classifier. Tesseract4Android reads shared screenshots in memory</dd></div>
        </dl>
        <h3>The classifier</h3>
        <p>
          Character 3–5 gram TF-IDF and logistic regression with int8 weights, trained in a separate Python project. The
          exported model is about 123 KB and runs in plain Kotlin with no ML runtime on the phone. Money is pulled from
          the original text as exact centavos, never a float.
        </p>
        <p>
          It is a prototype, trained on synthetic examples and a small manually verified sample. Its 0.8 confidence
          threshold is not a guarantee of accuracy, and 82 regression cases prove regression behavior, not accuracy on
          unseen notifications. Every parsed draft still waits for you in review.
        </p>
        <h3>Also in the app</h3>
        <p>
          Accounts with transfer detection, budgets and bills, debts and savings goals, insights, opt-in reminders,
          home-screen widgets, a notification log that shows how each ping was parsed or why it wasn&apos;t recognized,
          CSV import and export, encrypted backups, a demo mode, and an app lock with PIN or biometrics. It adapts to
          phone, tablet and foldable layouts. State is never shown by color alone, and the app follows system font scale
          and reduced motion.
        </p>
      </section>

      <p className="page__close">
        Want the walkthrough? <a href={`mailto:${EMAIL}`}>Email me</a>.
      </p>
    </main>
  );
}
