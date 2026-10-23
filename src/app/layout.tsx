import type { Metadata, Viewport } from "next";
import { Overpass } from "next/font/google";
import Link from "next/link";
import { EMAIL, GITHUB, LINKEDIN, owner } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const overpass = Overpass({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://bsumatra.dev"),
  title: { default: `${owner.name}, ${owner.role.toLowerCase()}`, template: `%s | ${owner.name}` },
  description: owner.offer,
};

export const viewport: Viewport = { viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={overpass.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{const theme=localStorage.getItem("theme");if(theme==="light"||theme==="dark")document.documentElement.dataset.theme=theme}catch{}` }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="masthead">
          <Link href="/" className="masthead__mark">
            <span className="masthead__ring" aria-hidden="true" />
            bsumatra.dev
          </Link>
          <nav className="masthead__nav" aria-label="Main">
            <Link href="/#work" className="masthead__link">Work</Link>
            <Link href="/notifly/" className="masthead__link">Notifly</Link>
            <Link href="/homelab/" className="masthead__link">Homelab</Link>
          </nav>
          <div className="masthead__actions">
            <ThemeToggle />
            <a className="button button--sm" href={`mailto:${EMAIL}`}>Email me</a>
          </div>
        </header>
        {children}
        <footer className="footer">
          <p>© 2026 {owner.name}</p>
          <p>Built with Next.js, served by Cloudflare Workers.</p>
          <p className="footer__links">
            <a href={LINKEDIN}>LinkedIn</a>
            <a href={GITHUB}>GitHub</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
