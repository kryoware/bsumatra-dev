import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Not on the map",
};

export default function NotFound() {
  return (
    <main id="main" className="page">
      <Link className="back" href="/">All lines</Link>
      <header className="page__head">
        <h1 className="page__title">Not on the map.</h1>
        <p className="page__lede">No line stops at this address. The page may have moved, or the link has a typo.</p>
      </header>
      <p className="page__close">
        Head back to <Link href="/">the network map</Link>, or <a href={`mailto:${EMAIL}`}>email me</a> if a link here
        sent you astray.
      </p>
    </main>
  );
}
