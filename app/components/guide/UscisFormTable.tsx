import { USCIS_FORM_PHOTOS } from "@/lib/document-specs";

/** Photos per USCIS form, rendered from lib/document-specs.ts (each row cites the form's current edition). */
export default function UscisFormTable({ forms }: { forms?: string[] }) {
  const rows = forms ? USCIS_FORM_PHOTOS.filter((r) => forms.includes(r.form)) : USCIS_FORM_PHOTOS;
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="px-4 pt-4 pb-2 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
          Photos to mail with each USCIS form (current instructions)
        </caption>
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3">Form</th>
            <th scope="col" className="px-4 py-3">Photos</th>
            <th scope="col" className="px-4 py-3">Who sends them</th>
            <th scope="col" className="px-4 py-3">Edition</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.form} className="border-t border-slate-100 align-top">
              <th scope="row" style={{ color: "#0f172a" }} className="px-4 py-3 font-bold">
                <a href={r.url} rel="noopener" className="underline underline-offset-2 hover:text-lime-800">{r.form}</a>
                <span className="block text-xs font-medium text-slate-500">{r.title}</span>
              </th>
              <td className="px-4 py-3 font-semibold text-slate-900">{r.photos}</td>
              <td className="px-4 py-3 text-slate-700">{r.who}</td>
              <td className="px-4 py-3 text-slate-500">{r.edition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
