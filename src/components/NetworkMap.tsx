"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  VIEWBOX,
  lines,
  roundedPath,
  stationLines,
  stationById,
  stations,
  type Line,
  type LineId,
} from "@/content/network";
import { Roundel } from "./transit";

type Focus = { line: LineId } | { station: string } | null;

const SPEED = 60; // viewBox units per second
const DWELL = 1.4; // seconds stopped at each station
const PULSE = 1.1; // seconds per station pulse, within the dwell

// Out and back along the line, stopping at every station; each stop's pulse shares the train's timeline so they stay in sync.
function runLine(root: Element, line: Line, i: number): Animation[] {
  const track = root.querySelector<SVGPathElement>(`[data-track="${line.id}"]`);
  const train = root.querySelector(`[data-train="${line.id}"]`);
  if (!track || !train) return [];
  const total = track.getTotalLength();
  const stops = line.stations
    .map((id) => {
      const s = stationById(id);
      let at = 0;
      let best = Infinity;
      for (let l = 0; l <= total; l++) {
        const p = track.getPointAtLength(l);
        const d = Math.hypot(p.x - s.x, p.y - s.y);
        if (d < best) [best, at] = [d, l];
      }
      return { id, at };
    })
    .sort((a, b) => a.at - b.at);

  const route = [...stops, ...stops.slice(1, -1).reverse()];
  const frames: { t: number; at: number; easing?: string }[] = [];
  const arrivals = new Map<string, number[]>(stops.map((s) => [s.id, []]));
  let t = 0;
  route.forEach((stop, k) => {
    if (k > 0) t += Math.abs(stop.at - route[k - 1].at) / SPEED;
    arrivals.get(stop.id)!.push(t);
    frames.push({ t, at: stop.at }, { t: t + DWELL, at: stop.at, easing: "ease-in-out" });
    t += DWELL;
  });
  t += Math.abs(route[0].at - route[route.length - 1].at) / SPEED;
  frames.push({ t, at: route[0].at });

  const timing = { duration: t * 1000, iterations: Infinity, delay: (1.8 + i * 0.35) * 1000 };
  const animations = [
    train.animate(
      frames.map((f) => ({ offset: f.t / t, offsetDistance: `${(f.at / total) * 100}%`, easing: f.easing ?? "linear" })),
      timing,
    ),
  ];

  for (const stop of stops) {
    const ring = root.querySelector(`[data-pulse="${line.id}-${stop.id}"]`);
    if (!ring) continue;
    const p = track.getPointAtLength(stop.at);
    ring.setAttribute("cx", String(p.x));
    ring.setAttribute("cy", String(p.y));
    const keyframes: Keyframe[] = [{ offset: 0, opacity: 0 }];
    for (const a of arrivals.get(stop.id)!.map((x) => x / t)) {
      keyframes.push(
        { offset: a, opacity: 0, transform: "scale(1)" },
        { offset: a, opacity: 0.9, transform: "scale(1)", easing: "ease-out" },
        { offset: Math.min(a + PULSE / t, 1), opacity: 0, transform: "scale(2.6)" },
      );
    }
    keyframes.push({ offset: 1, opacity: 0 });
    animations.push(ring.animate(keyframes, timing));
  }
  return animations;
}

export function NetworkMap({ title }: { title: ReactNode }) {
  const [focus, setFocus] = useState<Focus>(null);
  const [trainsPaused, setTrainsPaused] = useState(false);
  const plate = useRef<HTMLDivElement>(null);
  const syncTrains = useRef(() => {});

  // On narrow screens the map pans; open it on the dense interchange area, not the empty title corner.
  useEffect(() => {
    const el = plate.current;
    if (!el) return;
    let wasPannable = false;
    const observer = new ResizeObserver(() => {
      const pannable = el.scrollWidth > el.clientWidth;
      if (pannable && !wasPannable) el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.62;
      wasPannable = pannable;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = plate.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animations = lines.flatMap((line, i) => runLine(el, line, i));
    // Fail open: trains run unless we positively know the map is off-screen or the tab is hidden.
    let visible = true;
    const update = () => {
      const run = visible && !document.hidden && !el.hasAttribute("data-trains-paused");
      for (const a of animations) {
        if (run) a.play();
        else a.pause();
      }
    };
    syncTrains.current = update;
    const observer = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      update();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      syncTrains.current = () => {};
      for (const a of animations) a.cancel();
    };
  }, []);

  useEffect(() => syncTrains.current(), [trainsPaused]);

  const lit = new Set<LineId>(
    focus === null
      ? []
      : "line" in focus
        ? [focus.line]
        : stationLines(focus.station),
  );
  const dimmed = (id: LineId) => lit.size > 0 && !lit.has(id);
  const clear = () => setFocus(null);

  return (
    <section className="hero" aria-label="Network map of my work">
      <div className="hero__frame">
        <p className="hero__hint">Pan the map to explore, or choose a line below.</p>
        <div
          className="hero__map"
          ref={plate}
          tabIndex={0}
          role="region"
          data-trains-paused={trainsPaused || undefined}
          aria-label="Work map, scroll horizontally to explore. Links follow in the Lines navigation."
        >
          <svg
            viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
            className="map"
            aria-hidden="true"
          >
            {lines.map((line, i) => {
              const d = roundedPath(line.path);
              return (
                <a
                  key={line.id}
                  href={line.href}
                  className="map__line"
                  data-dim={dimmed(line.id) || undefined}
                  data-active={lit.has(line.id) || undefined}
                  style={{ "--line": line.color, "--i": i } as CSSProperties}
                  onMouseEnter={() => setFocus({ line: line.id })}
                  onMouseLeave={clear}
                  tabIndex={-1}
                  aria-label={`${line.name} line`}
                >
                  <path d={d} className="map__hit" data-track={line.id} />
                  <path d={d} className="map__track" pathLength={1} />
                  {line.sample && <path d={d} className="map__works" />}
                </a>
              );
            })}

            {stations.map((s) => {
              const through = stationLines(s.id);
              const off = through.every((id) => dimmed(id));
              return (
                <g
                  key={s.id}
                  className="map__station"
                  data-dim={off || undefined}
                  onMouseEnter={() => setFocus({ station: s.id })}
                  onMouseLeave={clear}
                >
                  {s.marker === "dot" && <circle cx={s.x} cy={s.y} r={6.5} className="map__stop" />}
                  {s.marker === "ring" && <circle cx={s.x} cy={s.y} r={10} className="map__xfer" />}
                  {s.marker === "here" && (
                    <>
                      <circle cx={s.x} cy={s.y} r={11} className="map__here-ring" />
                      <circle cx={s.x} cy={s.y} r={5} className="map__here-dot" />
                    </>
                  )}
                  {typeof s.marker === "object" && (
                    <rect
                      x={s.x - s.marker.w / 2}
                      y={s.y - s.marker.h / 2}
                      width={s.marker.w}
                      height={s.marker.h}
                      rx={s.marker.h / 2}
                      className="map__xfer"
                    />
                  )}
                  <text
                    x={s.label_at[0]}
                    y={s.label_at[1]}
                    textAnchor={s.anchor}
                    className={s.marker === "here" ? "map__label map__label--here" : "map__label"}
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}

            {lines.map((line, i) => (
              <g
                key={`train-${line.id}`}
                className="map__train-route"
                data-dim={dimmed(line.id) || undefined}
                style={{ "--line": line.color, "--i": i } as CSSProperties}
              >
                {line.stations.map((id) => (
                  <circle key={id} r={10} className="map__pulse" data-pulse={`${line.id}-${id}`} />
                ))}
                <g className="map__train" data-train={line.id} style={{ offsetPath: `path('${roundedPath(line.path)}')` }}>
                  <rect x={-12} y={-6} width={24} height={12} rx={3} className="map__carriage" />
                  <path d="M-6 -2v4 M0 -2v4 M6 -2v4" className="map__windows" />
                </g>
              </g>
            ))}

            {lines.map((line) => (
              <g key={line.id} className="map__badge" data-dim={dimmed(line.id) || undefined} aria-hidden="true">
                <circle cx={line.badge[0]} cy={line.badge[1]} r={14} style={{ stroke: line.color }} />
                <text x={line.badge[0]} y={line.badge[1] + 5}>{line.id}</text>
              </g>
            ))}
          </svg>
        </div>

        <div className="hero__title">{title}</div>

        <nav className="legend" aria-label="Lines">
          <h2 className="legend__head">Lines</h2>
          <button className="button button--sm legend__motion" type="button" onClick={() => setTrainsPaused(!trainsPaused)}>
            {trainsPaused ? "Resume trains" : "Pause trains"}
          </button>
          <ul className="legend__list">
            {lines.map((line) => (
              <li key={line.id}>
                <Link
                  href={line.href}
                  className="legend__row"
                  data-dim={dimmed(line.id) || undefined}
                  onMouseEnter={() => setFocus({ line: line.id })}
                  onMouseLeave={clear}
                  onFocus={() => setFocus({ line: line.id })}
                  onBlur={clear}
                >
                  <Roundel id={line.id} color={line.color} />
                  <span className="legend__name">{line.name}</span>
                  <span className="legend__kind">{line.kind}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="legend__key">
            <span className="legend__swatch" aria-hidden="true" />
            Sample route: a placeholder until the real write-up is in.
          </p>
          <p className="legend__nda">Client work runs under NDA. Stack and scale shown, names withheld.</p>
        </nav>
      </div>
    </section>
  );
}
