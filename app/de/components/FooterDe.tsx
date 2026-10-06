import Link from "next/link";
import { de } from "../translations";

export default function FooterDe() {
  const links = [
    {
      title: de.footer.sections.popularServices,
      items: [
        { label: "Biometrisches Passbild", href: "/de/biometrisches-passbild" },
        { label: "Führerscheinfoto", href: "/de/fuehrerschein-foto" },
        { label: "Visumfoto", href: "/de/visum-foto" },
        { label: "Bewerbungsfoto", href: "/de/bewerbungsfoto" },
        { label: "Foto für die Gesundheitskarte", href: "/de/gesundheitskarte-foto" },
        { label: "Passfoto Schweiz", href: "/de/passfoto-schweiz-online" },
        { label: "Dokumentenfoto Schweiz", href: "/de/dokumentenfoto-schweiz" },
      ],
    },
    {
      title: de.footer.sections.tools,
      items: [
        { label: de.nav.home, href: "/de" },
        { label: "Passbild online erstellen", href: "/de/passbild-online" },
        { label: de.nav.guides, href: "/de/guides" },
      ],
    },
    {
      title: de.footer.sections.company,
      items: [
        { label: de.footer.aboutUs, href: "/about" },
        { label: de.footer.contactUs, href: "/contact" },
        { label: de.footer.dataSecurity, href: "/data-security" },
        { label: de.footer.privacyPolicy, href: "/privacy-policy" },
        { label: de.footer.terms, href: "/terms" },
        { label: de.footer.refundPolicy, href: "/refund-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/de" aria-label="PixPassport – Startseite" className="inline-flex items-center gap-2.5 mb-4 hover:opacity-90">
              <div className="w-8 h-8 bg-lime-700 rounded-lg flex items-center justify-center">
                <svg aria-hidden="true" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">PixPassport</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              {de.footer.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {de.footer.badges.map((badge) => (
                <span key={badge} className="border border-slate-700 px-3 py-1.5 rounded-md text-xs font-bold text-slate-300">{badge}</span>
              ))}
            </div>
          </div>

          {links.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-black text-white uppercase tracking-wider mb-5">{section.title}</h2>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm font-medium text-slate-400 hover:text-lime-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} PixPassport. {de.footer.copyright}</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center text-center md:text-left">
            <p>{de.footer.disclaimer}</p>
            <span dangerouslySetInnerHTML={{ __html: '<!--email_off--><a href="mailto:support@pixpassport.com" rel="nofollow" class="hover:text-white transition-colors">support@pixpassport.com</a><!--/email_off-->' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
