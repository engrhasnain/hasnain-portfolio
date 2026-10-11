import type { CSSProperties } from "react";

/**
 * A small piece of the neural network for a card's corner: a few glowing nodes and the links between them.
 * Each seed gives a different (but stable) layout. Nodes twinkle, and light up when the card is hovered.
 * The card needs `group relative isolate overflow-hidden`.
 */
export function CardNetwork({ seed = 0 }: { seed?: number }) {
  let state = (seed * 7919 + 104729) % 233280;
  const rand = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  const nodes = Array.from({ length: 7 }, (_, i) => ({
    x: 18 + rand() * 152,
    y: 14 + rand() * 92,
    r: 1.5 + rand() * 1.5,
    azure: i % 3 === 0,
  }));
  const links: [number, number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < 70) links.push([i, j, d]);
    }
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 190 120" className="fx-net pointer-events-none absolute -right-3 -bottom-3 -z-10 h-28 w-44">
      {links.map(([i, j, d]) => (
        <line
          key={`${i}-${j}`}
          x1={nodes[i].x}
          y1={nodes[i].y}
          x2={nodes[j].x}
          y2={nodes[j].y}
          stroke="#5EEAD4"
          strokeOpacity={(1 - d / 70) * 0.55 + 0.1}
          strokeWidth="0.8"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.azure ? "#60A5FA" : "#5EEAD4"}
          className="net-node"
          style={{ "--d": `${(i * 0.45 + seed * 0.3) % 3.2}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}
