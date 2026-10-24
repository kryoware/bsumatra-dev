import assert from "node:assert/strict";
import test from "node:test";
import { lines, stations, stationLines, stationPoint, roundedPath } from "../src/content/network.ts";
import { caseStudies } from "../src/content/site.ts";

test("every published work skill is served by its employer's line", () => {
  for (const study of caseStudies) {
    const line = lines.find(({ id }) => id === study.line);
    const labels = line.stations.map((id) => stations.find((station) => station.id === id)?.label);
    assert.deepEqual(new Set(labels), new Set(study.stack), study.employer);
  }
});

test("station and line identities are unique and every station is connected", () => {
  assert.equal(new Set(lines.map(({ id }) => id)).size, lines.length);
  assert.equal(new Set(stations.map(({ id }) => id)).size, stations.length);
  for (const line of lines) {
    assert.equal(new Set(line.stations).size, line.stations.length, line.id);
    for (const id of line.stations) assert.ok(stations.some((station) => station.id === id), id);
  }
  for (const { id } of stations) assert.ok(stationLines(id).length, id);
});

test("45° and 90° bends use the same circular radius and the correct turn direction", () => {
  for (const points of [[[0, 0], [100, 0], [200, 100]], [[0, 0], [100, 0], [100, 100]]]) {
    assert.match(roundedPath(points), /A27\.00 27\.00 0 0 1/);
    assert.doesNotMatch(roundedPath(points), /Q/);
  }
  assert.match(roundedPath([[0, 0], [100, 0], [100, -100]]), /A27\.00 27\.00 0 0 0/);
  assert.equal(roundedPath([[0, 0], [50, 0], [100, 0]]), "M0 0 L100 0");
  assert.doesNotMatch(roundedPath([[0, 0], [8, 0], [8, 8]]), /NaN|Infinity/);
});

test("routes use nonzero octilinear runs and retain room for full-size bends", () => {
  for (const line of lines) {
    for (let i = 1; i < line.path.length; i++) {
      const dx = Math.abs(line.path[i][0] - line.path[i - 1][0]);
      const dy = Math.abs(line.path[i][1] - line.path[i - 1][1]);
      assert.ok(Math.hypot(dx, dy) >= 32, line.id);
      assert.ok(dx === 0 || dy === 0 || dx === dy, line.id);
    }
    const radii = [...roundedPath(line.path).matchAll(/A([\d.]+)/g)].map((match) => +match[1]);
    assert.ok(radii.every((radius) => radius === 27), line.id);
  }
});

test("shared React platforms keep trains in separate route lanes", () => {
  const react = stations.find(({ id }) => id === "react");
  assert.deepEqual(react.marker, { w: 48, h: 22 });
  const p = stationPoint("react", "P"), m = stationPoint("react", "M");
  assert.equal(Math.abs(p[0] - m[0]), 24);
  assert.equal(p[1], m[1]);
  assert.deepEqual(stationPoint("php", "P"), stationPoint("php", "M"));
});
