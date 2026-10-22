import type { CSSProperties } from "react";

export function Roundel({ id, color, size = "md" }: { id: string; color: string; size?: "md" | "lg" }) {
  return (
    <span className={`roundel roundel--${size}`} style={{ "--line": color } as CSSProperties} aria-hidden="true">
      {id}
    </span>
  );
}

export function SampleTag() {
  return <span className="sample-tag">Sample</span>;
}

export type Stop = { name: string; note?: string; branch?: string };

export function StripMap({
  stops,
  color,
  sample,
  direction = "h",
  label,
}: {
  stops: Stop[];
  color: string;
  sample?: boolean;
  direction?: "h" | "v";
  label: string;
}) {
  return (
    <ol
      className={`strip strip--${direction}`}
      data-sample={sample || undefined}
      style={{ "--line": color } as CSSProperties}
      aria-label={label}
    >
      {stops.map((stop) => (
        <li key={stop.name} className="strip__stop">
          <span className="strip__dot" aria-hidden="true" />
          <span className="strip__text">
            <span className="strip__name">{stop.name}</span>
            {stop.note && <span className="strip__note">{stop.note}</span>}
          </span>
          {stop.branch && (
            <span className="strip__branch">
              <span className="strip__spur" aria-hidden="true" />
              {stop.branch}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
