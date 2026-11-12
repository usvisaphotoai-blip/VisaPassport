import { getSpec, specDisplay } from "@/lib/document-specs";

/**
 * Original measurement diagram drawn from the spec values (no stock image): the photo frame,
 * the allowed head-height range and the allowed eye-height band, to scale.
 */
export default function SpecDiagram({ specId }: { specId: string }) {
  const spec = getSpec(specId);
  const d = specDisplay(spec);
  if (!spec.printInches || !spec.head) return null;

  const { width, height } = spec.printInches;
  const S = 120; // SVG units per inch
  const W = width * S;
  const H = height * S;
  const pad = 100;
  const y = (inchesFromBottom: number) => H - inchesFromBottom * S;
  const chin = spec.eyes ? y(spec.eyes.min) + S * 0.55 : H * 0.85; // illustrative chin line
  const headMinTop = chin - spec.head.min * S;
  const headMaxTop = chin - spec.head.max * S;
  const cx = W / 2;

  return (
    <figure className="not-prose my-8 rounded-xl border border-slate-200 bg-white p-4">
      <svg
        viewBox={`${-pad} -20 ${W + pad * 2} ${H + 50}`}
        role="img"
        aria-labelledby={`${specId}-diagram-title`}
        className="mx-auto block w-full max-w-md"
      >
        <title id={`${specId}-diagram-title`}>
          {`${d.sizeIn} photo: head ${d.headIn} tall${d.eyesIn ? `, eyes ${d.eyesIn} above the bottom edge` : ""}`}
        </title>
        <rect x="0" y="0" width={W} height={H} fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
        {spec.eyes && (
          <rect x="0" y={y(spec.eyes.max)} width={W} height={(spec.eyes.max - spec.eyes.min) * S} fill="#bef264" opacity="0.55" />
        )}
        {/* Head outline at the middle of the allowed range */}
        <ellipse cx={cx} cy={(chin + (headMinTop + headMaxTop) / 2) / 2} rx={W * 0.23} ry={(chin - (headMinTop + headMaxTop) / 2) / 2} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="6 5" />
        <path d={`M ${cx - W * 0.42} ${H} Q ${cx} ${chin + 25} ${cx + W * 0.42} ${H}`} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="6 5" />
        {/* Chin and allowed crown positions */}
        <line x1={W * 0.15} x2={W * 0.85} y1={chin} y2={chin} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={W * 0.15} x2={W * 0.85} y1={headMinTop} y2={headMinTop} stroke="#0f172a" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1={W * 0.15} x2={W * 0.85} y1={headMaxTop} y2={headMaxTop} stroke="#0f172a" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Labels */}
        <g fontSize="13" fill="#0f172a" fontFamily="system-ui, sans-serif">
          <text x={W + 8} y={headMaxTop + 4}>{`max ${d.headIn.split(" to ")[1]}`}</text>
          <text x={W + 8} y={headMinTop + 4}>{`min ${d.headIn.split(" to ")[0]} in`}</text>
          <text x={W + 8} y={chin + 4}>chin</text>
          {spec.eyes && <text x={-pad + 4} y={y((spec.eyes.min + spec.eyes.max) / 2) + 4}>eyes</text>}
          <text x={cx} y={H + 22} textAnchor="middle">{d.sizeIn} ({d.sizeMm})</text>
        </g>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-slate-500">
        Measure head height {spec.head.measured}. With your chin on the solid line, the top of your hair must fall between the dotted lines.
        {spec.eyes ? ` The green band shows where your eyes must sit: ${d.eyesIn} above the bottom edge.` : ""}
      </figcaption>
    </figure>
  );
}
