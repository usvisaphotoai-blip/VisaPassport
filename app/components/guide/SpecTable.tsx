import { getSpec, specDisplay } from "@/lib/document-specs";

/**
 * Spec table rendered straight from lib/document-specs.ts, so the table, the page text and the
 * tool labels always show the same numbers. Pixel values are conversions at 300 DPI, labelled as such.
 */
const TH_COLOR = { color: "#0f172a", borderBottom: "none" };

export default function SpecTable({ specId, caption, lang = "en-US" }: { specId: string; caption?: string; lang?: string }) {
  const spec = getSpec(specId);
  const d = specDisplay(spec);

  const rows: [string, React.ReactNode][] = [];
  if (d.sizeIn) rows.push(["Print size", <><strong>{d.sizeIn}</strong> ({d.sizeMm})</>]);
  if (d.head) rows.push(["Head height", <><strong>{d.headIn}</strong> ({d.headMm}), {d.headMeasured}{d.headPct ? `, about ${d.headPct} of the photo height` : ""}</>]);
  if (d.eyes) rows.push(["Eye height", <><strong>{d.eyesIn}</strong> ({d.eyesMm}), {d.eyesMeasured}</>]);
  rows.push(["Background", d.background]);
  rows.push([lang === "en-US" ? "Color" : "Colour", d.colour]);
  if (d.paper) rows.push(["Paper", d.paper]);
  rows.push(["Photo age", d.photoAge]);
  rows.push(["Head covering", d.headwear]);
  rows.push(["Editing", d.retouching]);
  if (d.backOfPhoto) rows.push(["Back of each photo", d.backOfPhoto]);
  rows.push(["Number of photos", d.copies]);
  if (d.digital) rows.push(["Digital files", d.digital]);

  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <caption className="px-4 pt-4 pb-2 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
          {caption ?? `${spec.name}: official specs`}
        </caption>
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-t border-slate-100 align-top">
              <th scope="row" style={TH_COLOR} className="w-32 sm:w-40 px-4 py-3 font-bold">{label}</th>
              <td className="px-4 py-3 text-slate-700">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {spec.printInches && (
        <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          Pixel equivalents at 300 DPI (our conversion): photo {d.sizePx300}
          {d.headPx300 ? `, head ${d.headPx300}` : ""}
          {d.eyesPx300 ? `, eyes ${d.eyesPx300} from the bottom` : ""}.
        </p>
      )}
    </div>
  );
}
