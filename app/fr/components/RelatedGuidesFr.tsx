import Link from "next/link";

interface GuideLink {
  label: string;
  href: string;
  emoji: string;
  desc: string;
}

const defaultLinks: GuideLink[] = [
  { label: "Photo d'identité", href: "/fr/photo-identite", emoji: "🪪", desc: "Normes ANTS 2026" },
  { label: "Photo passeport", href: "/fr/photo-passeport", emoji: "🛂", desc: "Passeport français 35×45 mm" },
  { label: "Photo carte d'identité", href: "/fr/photo-carte-identite", emoji: "🇫🇷", desc: "Photo CNI conforme" },
  { label: "Code ePhoto ANTS", href: "/fr/ephoto-ants", emoji: "🔢", desc: "Permis, titre de séjour" },
  { label: "Taille photo d'identité", href: "/fr/guides/passport-photo-size", emoji: "📐", desc: "Dimensions par pays" },
  { label: "Fond photo d'identité", href: "/fr/guides/passport-photo-background", emoji: "🖼️", desc: "Couleurs acceptées" },
];

export default function RelatedGuidesFr({ links, title = "Guides et ressources associés" }: { links?: GuideLink[]; title?: string }) {
  const items = links || defaultLinks;
  return (
    <section className="py-16 lg:py-20 bg-[#f8faf9] border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((link, i) => (
            <Link key={i} href={link.href} className="group bg-white p-5 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:border-lime-200 transition-all duration-200 hover:-translate-y-1">
              <span className="text-2xl block mb-3">{link.emoji}</span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-lime-600 block">{link.label}</span>
              <p className="text-[11px] text-slate-500 mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
