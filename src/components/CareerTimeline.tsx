import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { SeparatedText } from "@/components/transit";
import { lineById } from "@/content/network";
import { caseStudies, freelanceWork, type CaseStudy, type FreelanceWork, type YearMonth } from "@/content/site";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PEWTER = "var(--ink-3)";

// Lane centers inside the graph column, and the 45° turnout between them (arcs at 3x the branch width).
const LANE_X = [18, 46];
const ARC_R = 18;
const ARC_DX = ARC_R * (1 - Math.SQRT1_2);
const ARC_DY = ARC_R * Math.SQRT1_2;
const TURNOUT_H = LANE_X[1] - LANE_X[0] + 2 * (ARC_DY - ARC_DX);
const n = (v: number) => +v.toFixed(2);
const [X0, X1] = LANE_X;
const MERGE_PATH = `M${X0} 0A${ARC_R} ${ARC_R} 0 0 0 ${n(X0 + ARC_DX)} ${n(ARC_DY)}L${n(X1 - ARC_DX)} ${n(TURNOUT_H - ARC_DY)}A${ARC_R} ${ARC_R} 0 0 1 ${X1} ${n(TURNOUT_H)}`;
const FORK_PATH = `M${X1} 0A${ARC_R} ${ARC_R} 0 0 1 ${n(X1 - ARC_DX)} ${n(ARC_DY)}L${n(X0 + ARC_DX)} ${n(TURNOUT_H - ARC_DY)}A${ARC_R} ${ARC_R} 0 0 0 ${X0} ${n(TURNOUT_H)}`;

type Entry = CaseStudy | FreelanceWork;
type Span = { entry: Entry; lane: 0 | 1; color: string; start: number; end: number };
type Track = { color: string; width: number } | null;
type Row = {
  at: number;
  kind: "year" | "card" | "start" | "promotion";
  label: string;
  year: number;
  node: { lane: 0 | 1; type: "year" | "stop" | "interchange"; color: string };
  above: Track[];
  below: Track[];
  turnout?: "merge" | "fork";
  span?: Span;
};

const monthIndex = ([year, month]: YearMonth) => year * 12 + month - 1;
const isCompany = (entry: Entry): entry is CaseStudy => "employer" in entry;
const entryName = (entry: Entry) => (isCompany(entry) ? entry.employer : entry.name);

function buildRows(now: Date) {
  const nowIndex = now.getFullYear() * 12 + now.getMonth();
  const present = nowIndex + 0.5;
  const spans: Span[] = [
    ...caseStudies.map((c): Span => ({
      entry: c, lane: 0, color: lineById(c.line).color, start: monthIndex(c.start), end: c.end ? monthIndex(c.end) : present,
    })),
    ...freelanceWork.map((f): Span => ({
      entry: f, lane: 1, color: PEWTER, start: monthIndex(f.start), end: monthIndex(f.end),
    })),
  ];
  const first = Math.min(...spans.map((s) => s.start));

  // ponytail: one freelance lane, add lanes if two freelance engagements ever overlap.
  const trackAt = (lane: 0 | 1, x: number): Track => {
    const span = spans.find((s) => s.lane === lane && s.start < x && x < s.end);
    if (span) return { color: span.color, width: lane ? 6 : 8 };
    return lane === 0 && first < x && x < present ? { color: PEWTER, width: 2 } : null;
  };
  const row = (at: number, rest: Omit<Row, "at" | "above" | "below" | "year">): Row => ({
    at,
    year: Math.floor(at / 12),
    above: [trackAt(0, at + 0.1), trackAt(1, at + 0.1)],
    below: [trackAt(0, at - 0.1), trackAt(1, at - 0.1)],
    ...rest,
  });

  const rows: Row[] = [];
  for (const span of spans) {
    const handoff = span.lane === 0 && spans.some((o) => o.lane === 0 && o.start === span.end);
    rows.push(row(span.end, {
      kind: "card",
      label: span.end === present ? "Present" : MONTHS[span.end % 12],
      node: { lane: span.lane, type: handoff ? "interchange" : "stop", color: handoff ? "var(--ink)" : span.color },
      turnout: span.lane ? "merge" : undefined,
      span,
    }));
    if (span.lane === 0 && spans.some((o) => o.lane === 0 && o.end === span.start)) continue;
    rows.push(row(span.start, {
      kind: "start",
      label: MONTHS[span.start % 12],
      node: { lane: span.lane, type: "stop", color: span.color },
      turnout: span.lane ? "fork" : undefined,
      span,
    }));
  }
  for (const c of caseStudies) {
    if (!c.promotedAt) continue;
    const at = monthIndex(c.promotedAt);
    rows.push(row(at, { kind: "promotion", label: MONTHS[at % 12], node: { lane: 0, type: "stop", color: lineById(c.line).color }, span: spans.find((s) => s.entry === c) }));
  }
  const years: Row[] = [];
  for (let y = now.getFullYear(); y >= Math.floor(first / 12); y--) {
    years.push(row(Math.min(y * 12 + 11.5, nowIndex + 0.25), {
      kind: "year",
      label: String(y),
      node: { lane: 0, type: "year", color: "var(--ink)" },
    }));
  }
  rows.sort((a, b) => b.at - a.at);
  return {
    current: rows.filter((r) => r.at === present),
    years: years
      .map((header) => ({ header, events: rows.filter((r) => r.at !== present && r.year === header.year) }))
      .filter(({ events }) => events.length),
  };
}

function Graph({ row }: { row: Row }) {
  const x = (lane: number) => `${LANE_X[lane]}px`;
  return (
    <span className="career__graph" aria-hidden="true">
      {(["above", "below"] as const).flatMap((side) =>
        row[side].map((track, lane) =>
          track && (
            <span
              key={`${side}${lane}`}
              className={`career__track career__track--${side}`}
              style={{ "--x": x(lane), "--c": track.color, "--w": `${track.width}px` } as CSSProperties}
            />
          ),
        ),
      )}
      {row.turnout && (
        <svg
          className={`career__turnout career__turnout--${row.turnout}`}
          width={X1 + 8}
          height={n(TURNOUT_H)}
          style={{ "--h": `${n(TURNOUT_H)}px` } as CSSProperties}
        >
          <path d={row.turnout === "merge" ? MERGE_PATH : FORK_PATH} />
        </svg>
      )}
      <span
        className={`career__node career__node--${row.node.type}`}
        style={{ "--x": x(row.node.lane), "--c": row.node.color } as CSSProperties}
      />
    </span>
  );
}

function Time({ row }: { row: Row }) {
  const present = row.label === "Present";
  return (
    <span className={`career__time career__time--${present ? "present" : row.kind}`}>
      {row.label}
      {row.kind !== "year" && !present && <span className="sr-only"> {row.year}</span>}
    </span>
  );
}

function Card({ entry }: { entry: Entry }) {
  const company = isCompany(entry);
  return (
    <details className="career__entry">
      <summary className="career__summary">
        <span className="career__info">
          <span className="career__name"><SeparatedText text={entryName(entry)} /></span>
          <span className="career__role">
            {company ? entry.role : entry.alongside ? `Freelance alongside ${entry.alongside}` : "Freelance"}
            <span className="meta-separator">{" · "}</span>
            <span className="career__dates">{entry.dates}</span>
          </span>
          <span className="career__brief">{entry.summary}</span>
        </span>
        <span className="career__toggle" aria-hidden="true" />
      </summary>
      <div className="career__body">
        {company ? (
          <>
            <p className="work-location"><SeparatedText text={entry.location} /></p>
            {entry.promotion && <p>{entry.promotion}</p>}
            <Link className="text-link" href={`/work/${entry.slug}/`}>View experience</Link>
          </>
        ) : <p>{entry.detail}</p>}
      </div>
    </details>
  );
}

function RowContent({ row }: { row: Row }) {
  let content: ReactNode = null;
  if (row.kind === "card" && row.span) content = <Card entry={row.span.entry} />;
  else if (row.kind === "start" && row.span) {
    const { entry } = row.span;
    content = <p className="career__note">{isCompany(entry) ? "Joined" : "Started"} <SeparatedText text={entryName(entry)} /></p>;
  } else if (row.kind === "promotion" && row.span) {
    const { entry } = row.span;
    content = <p className="career__note">{entryName(entry)}: {isCompany(entry) && entry.promotion}</p>;
  }
  return (
    <>
      <Time row={row} />
      <Graph row={row} />
      <div className="career__content">{content}</div>
    </>
  );
}

function EventRow({ row }: { row: Row }) {
  const entry = row.kind === "card" ? row.span?.entry : undefined;
  return (
    <li
      id={entry && !isCompany(entry) ? entry.id : undefined}
      className="career__row"
      data-kind={row.kind}
      style={row.span ? ({ "--line": row.span.color } as CSSProperties) : undefined}
    >
      <RowContent row={row} />
    </li>
  );
}

export function CareerTimeline() {
  const { current, years } = buildRows(new Date());
  return (
    <ol id="freelance" className="career" aria-label="Career timeline, most recent first">
      {current.map((row) => <EventRow key={`${row.kind}-${row.at}-${row.node.lane}`} row={row} />)}
      {years.map(({ header, events }) => (
        <li key={header.label} className="career__year">
          <div className="career__row" data-kind="year">
            <RowContent row={header} />
          </div>
          {events.length > 0 && (
            <ol className="career__events">
              {events.map((row) => <EventRow key={`${row.kind}-${row.at}-${row.node.lane}`} row={row} />)}
            </ol>
          )}
        </li>
      ))}
    </ol>
  );
}
