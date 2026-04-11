import type { FullCountryData } from "./types";

export const denmarkData: FullCountryData = {
  code: "dk", slugPrefix: "da", name: "Denmark", nativeName: "Danmark", language: "da", locale: "da_DK", flag: "🇩🇰", currency: "DKK", embassyCity: "Copenhagen",
  strings: {
    howItWorks: "Sådan fungerer det",
    steps: [
      { title: "Upload dit foto", desc: "Tag et klart foto med din smartphone foran en hvid væg i godt dagslys — ingen specielt udstyr nødvendigt." },
      { title: "Øjeblikkelig AI-validering", desc: "Vores AI analyserer dit foto mod alle officielle US State Department-krav på under 30 sekunder." },
      { title: "Detaljeret kontrolrapport", desc: "Få en tydelig oversigt over hvilke tjek der er BESTÅET, ADVARET eller FEJLET — med præcis forklaring." },
      { title: "Betal kun 45 kr", desc: "En simpel engangsbetaling. Ingen abonnement, ingen skjulte gebyrer. Betale kun når du er tilfreds med resultatet." },
      { title: "Download og indsend", desc: "Download din digitale fil til DS-160, og print vores A4-ark med 20 fotos til ambassadeinterviewet i København." },
    ],
    specsTitle: "Officielle US-visum fotospecifikationer",
    specs: [
      { label: "Mål", value: "600 × 600 px", detail: "Kvadratisk 1:1 format" },
      { label: "Max filstørrelse", value: "240 KB", detail: "JPEG-format krævet" },
      { label: "Baggrund", value: "Ren hvid", detail: "Præcis RGB (255, 255, 255)" },
      { label: "Øjenposition", value: "56 % – 69 %", detail: "Målt fra billedets nederkant" },
      { label: "Hovedstørrelse", value: "50 % – 69 %", detail: "Fra isse til hage" },
      { label: "Udtryk", value: "Neutralt", detail: "Mund lukket, begge øjne åbne" },
    ],
    pricingTitle: "Markant billigere end alle fotostudioer i Danmark",
    pricingSubtitle: "Professionelle fotografer og fotostudioer i København opkræver typisk 100–250 kr for et US-visumfoto — og kender sjældent de præcise specifikationer. Få et garanteret kompatibelt foto for kun 45 kr, direkte fra sofaen.",
    privacyTitle: "Dit privatliv er vores prioritet",
    privacyItems: [
      { icon: "⏱️", title: "Automatisk sletning efter 24 timer", desc: "Dine fotos slettes fuldstændigt fra vores servere inden for 24 timer efter upload. Ingen data gemmes længere end nødvendigt." },
      { icon: "🔗", title: "Udløbende download-links", desc: "Din download-URL bliver automatisk ugyldig efter 1 time, så ingen andre kan tilgå dit foto." },
      { icon: "🛡️", title: "Fuldt GDPR-kompatibel tjeneste", desc: "Vi overholder EU's databeskyttelsesforordning og den danske databeskyttelseslov til punkt og prikke." },
      { icon: "🗑️", title: "Ingen permanent opbevaring", desc: "Behandlede billeder arkiveres aldrig. Når din session er afsluttet, er dine data væk — for altid." },
    ],
    trustBadges: [
      { icon: "🔒", text: "100 % sikkert" }, { icon: "⚡", text: "30 sek." }, { icon: "✅", text: "Kompatibel" }, { icon: "🆓", text: "Gratis tjek" },
    ],
    faqTitle: "Ofte stillede spørgsmål fra danske ansøgere",
    ctaTitle: "Klar til dit garanteret kompatible US-visumfoto?",
    ctaDescription: "Risiker ikke afvisning eller forsinkelse ved USAs ambassade i København. Tusindvis af danskere har allerede brugt vores service til DS-160, DV-lotteriet og arbejdsvisa.",
    ctaButton: "Tjek dit foto gratis nu",
    statsItems: [
      { stat: "12.000+", label: "Fotos behandlet" }, { stat: "99,8 %", label: "Godkendelsesrate" }, { stat: "120+", label: "Lande betjent" }, { stat: "30 sek", label: "Gennemsnitlig behandlingstid" }, { stat: "Officiel", label: "State Dept.-kompatibel" },
    ],
    pricingOneTime: "Engangsbeløb – ingen abonnement",
    pricingNoAccount: "Ingen konto eller registrering kræves",
    pricingFeatures: [
      "600×600px officielt kompatibelt US-visumfoto",
      "Automatisk baggrundskorrektion til ren hvid (RGB 255,255,255)",
      "Præcis automatisk beskæring og skalering efter State Dept.-krav",
      "Intelligent optimering af filstørrelse under 240 KB",
      "Printklart A4-udskriftsark med 20 fotos (51×51 mm)",
      "24 timers sikker og krypteret opbevaring",
    ],
    uploadButton: "Upload dit foto og tjek gratis", seeHowItWorks: "Se hvordan det fungerer",
    internalLinksTitle: "Flere ressourcer om US-visum foto for danske ansøgere",
    relatedCountriesTitle: "US-visum fotoguides for andre nordiske og europæiske lande",
  },
  pages: [
    {
      slug: "us-visum-fotokrav",
      metaTitle: "US-visum fotokrav for danske ansøgere (2025 komplet guide)",
      metaDescription: "Komplet guide til US-visum fotokrav for danskere. Præcise mål, baggrundsregler, biometriske standarder og praktiske tips fra USAs ambassade i København. Undgå de mest almindelige fejl.",
      metaKeywords: ["US visum foto Danmark", "US visum fotokrav", "DS-160 foto Danmark", "USAs ambassade København", "visum foto specifikationer Danmark"],
      h1: "US-visum fotokrav for danske ansøgere – den komplette guide (2025)",
      heroDescription: "Ansøger du om US-visum fra Danmark? Undgå de fejl, som forsinker tusindvis af ansøgninger hvert år. Vores AI validerer dit foto mod samtlige krav fra US Department of State — gratis på under 30 sekunder.",
      ctaText: "Opret mit kompatible foto nu", ctaSecondaryText: "Forstå kravene først",
      contentSections: [
        {
          heading: "Derfor skal danske ansøgere være særligt opmærksomme på fotokravene",
          paragraphs: [
            "Danmark er et af de få lande i verden, der deltager i USAs Visa Waiver Program (VWP). Det betyder, at de fleste danske statsborgere kan rejse til USA i op til 90 dage med blot en ESTA-godkendelse. Men når ESTA afvises — f.eks. på grund af tidligere visumafslag, kriminal historik eller bestemt rejsehistorik til specifikke lande — er et traditionelt B1/B2 turistvisum, F-1 studievisum eller H-1B arbejdsvisum den eneste vej frem. Og dér begynder fotokravenes betydning for alvor.",
            "USAs ambassade i København på Dag Hammarskjölds Allé 24, 2100 København Ø, er det eneste sted i Danmark, hvor visumsansøgere kan møde op til det obligatoriske interviewmøde. Ambassadens konsulatsektion behandler hundredvis af ansøgninger ugentligt, og fotobaserede fejl er konsekvent blandt de tre hyppigste årsager til afvisning eller forsinkelse i behandlingen — ikke fordi kravene er umulige at opfylde, men fordi mange danskere ubevidst bruger forkert format.",
            "Her er kernen i problemet: Det danske pasfoto, som du bruger til dit røde pas fra Borgerservice, følger ICAO-standarden og er 35 × 45 mm med en lys, men ikke nødvendigvis ren hvid, baggrund. <strong>Det amerikanske visumfoto kræver derimod 600 × 600 pixel (svarende til ca. 51 × 51 mm ved 300 DPI) med en fuldstændig ren hvid baggrund med nøjagtig RGB-værdien (255, 255, 255)</strong> — en fundamentalt anderledes teknisk standard, som de fleste danske fotosteder ikke er kalibreret til.",
          ],
          subSections: [
            {
              heading: "Dansk pasfoto vs. US-visumfoto: de vigtigste forskelle",
              paragraphs: [
                "<strong>Baggrund:</strong> Det danske pas accepterer lys ensfarvet baggrund — typisk lys grå eller off-white. Det amerikanske visum kræver rent hvid RGB (255, 255, 255). Den forskel kan se ubetydelig ud for det blotte øje, men ambassadens biometriske software opdager den.",
                "<strong>Format og mål:</strong> Dansk pasfoto: 35 × 45 mm, portrætformat. US-visumfoto: 600 × 600 px, kvadratisk 1:1. Et foto i portrætformat til det amerikanske system vil blive afvist automatisk allerede ved DS-160-upload.",
                "<strong>Briller:</strong> I Danmark er det tilladt at have briller på pasfotos, hvis der ikke er refleksioner. I USA har briller været forbudt på alle visum- og pasfotos siden 2016 — ingen undtagelser, ikke engang med receptionsbriller uden refleksioner.",
                "<strong>Ansigtets placering:</strong> Begge lande kræver frontalt blik og neutralt udtryk, men de præcise biometriske krav til øjenposition (56–69 % fra bunden) og hovedstørrelse (50–69 % af billedhøjden) er unikke for USA og kontrolleres automatisk.",
              ],
            },
            {
              heading: "Hvor finder man korrekt US-visumfoto i Danmark?",
              paragraphs: [
                "Mange danskere forsøger først de lokale løsninger: fotoautomater på borgerservicecentre, Bilka, Føtex og togstationer. Disse maskiner er udelukkende konfigureret til det danske pasformat og kan ikke producere US-kompatible fotos — uanset hvilken indstilling du vælger.",
                "Professionelle fotografer i København, Aarhus og andre større byer kan i teorien lave US-format, men de kender sjældent de præcise digitale specifikationer. Vi hører jævnligt fra ansøgere, der har betalt 200 kr hos en fotograf, kun for at få fotoet afvist online ved DS-160-formularen.",
                "<strong>USVisaPhotoAI er den mest pålidelige og billigste løsning for danskere:</strong> Tag et foto med din smartphone foran en hvid væg, upload det til vores platform, og lad vores AI klare resten — præcis beskæring, baggrundskorrektion og validering mod 15+ officielle kriterier. Alt for kun 45 kr. Du kan desuden dobbelttjekke de officielle krav direkte på <a href='https://travel.state.gov/content/travel/en/passports/how-apply/photos.html' target='_blank' rel='noopener'>US State Department Photo Tool</a>.",
              ],
            },
          ],
        },
        {
          heading: "Komplette tekniske specifikationer for US-visumfotos",
          paragraphs: [
            "Uanset hvilken ambassade du ansøger igennem, gælder de samme krav overalt i verden. USAs ambassade i København anvender præcis de samme standarder som alle andre amerikanske ambassader og konsulater globalt. Her er de fuldstændige tekniske krav, du skal opfylde: <strong>Billedformat: 600 × 600 pixel, kvadratisk. Filformat: JPEG. Maksimal filstørrelse: 240 KB. Farverum: sRGB. Baggrund: ren hvid, RGB (255, 255, 255). Øjenposition: 56–69 % målt fra billedets nederkant. Hovedstørrelse: 50–69 % af den totale billedhøjde fra hage til isse. Ansigtsudtryk: neutralt, mund lukket, begge øjne åbne og tydeligt synlige. Briller: forbudt. Foto taget inden for de seneste 6 måneder.</strong> Hvert enkelt af disse punkter kontrolleres automatisk ved digital indgivelse via DS-160-formularen.",
          ],
        },
        {
          heading: "De mest almindelige fotofejl blandt danske visumsansøgere",
          paragraphs: [
            "<strong>Brug af dansk pasfoto:</strong> Det er langt den mest udbredte fejl. Dansk format (35 × 45 mm, lys baggrund) opfylder hverken størrelseskravet eller baggrundskravet. Afvises konsekvent.",
            "<strong>Foto fra borgerservice-automat:</strong> Disse maskiner producerer udelukkende det danske standardformat. De er ikke US-kompatible og kan ikke omstilles til det.",
            "<strong>Briller medtaget:</strong> Mange danskere glemmer brilleforbuddet, fordi det er tilladt på det danske pasfoto. Tag brillerne af — det er et krav, ikke en anbefaling.",
            "<strong>Vinterfotografering med utilstrækkelig belysning:</strong> Fra november til februar har Danmark op til 17 timers mørke i døgnet. Selfies taget ved kunstigt lys med gul- eller orangetonet lamper giver en falsk hudtone, der kan udløse advarsler i det biometriske system. Brug hvidt dagslys eller en LED-pære med farvetemperatur på mindst 5000K.",
            "<strong>Komprimering af filen for meget:</strong> Nogle ansøgere forsøger at skrumpe deres JPEG til under 240 KB ved at reducere billedkvaliteten dramatisk. Det resulterer i artefakter og pixelering, der kan forringe den biometriske læsning. Vores AI-service optimerer filstørrelsen korrekt uden at gå på kompromis med kvaliteten.",
          ],
        },
        {
          heading: "Praktisk information om USAs ambassade i København",
          paragraphs: [
            "Ambassaden ligger i Østerbro-kvarteret på Dag Hammarskjölds Allé 24, tæt ved Fælledparken. Det er det eneste sted i hele Danmark, hvor du kan møde op til dit visuminterview — der er ingen konsulater i Aarhus, Odense eller andre danske byer. Ventetiderne varierer markant hen over året: sommermånederne juni–august er absolut travlest, mens januar–marts typisk er roligst.",
            "Til selve interviewet skal du medbringe et udskrevet foto i formatet 51 × 51 mm. Vores service leverer både den digitale fil optimeret til DS-160 og et printklart A4-ark med 20 fotos i korrekt størrelse — klar til at blive klippet ud og taget med til ambassaden.",
            "DV-lotteriet (Diversity Visa Lottery) er hvert år populært blandt danskere med dobbelt statsborgerskab eller udenlandsk baggrund. Husk, at et ikke-kompatibelt foto ved DV Lottery-indgivelsen medfører øjeblikkelig diskvalificering — der gives ingen mulighed for at indsende igen med korrigeret foto.",
          ],
        },
      ],
      faqs: [
        { q: "Kan jeg bruge mit eksisterende danske pasfoto til US-visum?", a: "Nej, det kan du desværre ikke. Det danske pasformat (35 × 45 mm med lys baggrund) opfylder hverken størrelseskravet på 600 × 600 px eller baggrundskravet om ren hvid RGB (255, 255, 255). DS-160-systemet vil afvise det automatisk." },
        { q: "Hvor kan jeg få lavet et korrekt US-visumfoto i Danmark?", a: "Den nemmeste og billigste løsning er USVisaPhotoAI: tag et foto med din smartphone foran en hvid væg, upload det, og lad vores AI validere og korrigere det på under 30 sekunder. Pris: 45 kr. Du undgår køen og er sikker på kompatibilitet." },
        { q: "Hvilken størrelse og format skal US-visumfotoet have?", a: "600 × 600 pixel, kvadratisk, JPEG-format, maksimalt 240 KB. Baggrunden skal være rent hvid (RGB 255, 255, 255). Øjnene skal befinde sig i zonen 56–69 % fra billedets nederkant, og ansigtet skal fylde 50–69 % af billedhøjden." },
        { q: "Skal jeg have et fysisk foto med til ambassadeinterviewet i København?", a: "Ja. Selvom du har indgivet digitalt via DS-160, skal du medbringe et udskrevet foto i størrelsen 51 × 51 mm til selve interviewdagen. Vores service inkluderer et printklart A4-ark med 20 fotos." },
        { q: "Er briller tilladt på US-visumfoto?", a: "Nej. Briller har været forbudt på alle amerikanske visum- og pasfotos siden 2016. Dette gælder uanset om der er refleksioner eller ej — brillerne skal af." },
        { q: "Hvad koster et US-visumfoto i Danmark?", a: "Hos professionelle fotografer og fotostudioer i Danmark typisk 100–250 kr, og der er ingen garanti for, at de kender de præcise US-specifikationer. USVisaPhotoAI koster 45 kr med AI-validering og garanti for kompatibilitet." },
        { q: "Kan jeg bruge en fotoautomat fra borgerservice eller Bilka?", a: "Nej. Disse automater er udelukkende konfigureret til det danske pasformat og producerer ikke US-kompatible fotos — uanset hvilken indstilling du vælger." },
        { q: "Gælder de samme fotokrav for DV Lottery (Diversity Visa)?", a: "Ja, DV Lottery kræver præcis de samme specifikationer som et regulært US-visum foto. Et ikke-kompatibelt foto ved indgivelse medfører øjeblikkelig diskvalificering uden mulighed for genudsendelse." },
        { q: "Er jeres service GDPR-kompatibel?", a: "Ja, fuldt ud. Vi sletter alle fotos efter 24 timer, download-links udløber efter 1 time, og vi overholder alle krav i EU's databeskyttelsesforordning og den danske databeskyttelseslov." },
        { q: "Hvor gammelt må mit foto være?", a: "Dit US-visumfoto må maksimalt være 6 måneder gammelt på ansøgningstidspunktet. Tag gerne et nyt foto, selv hvis dit nuværende ser godt ud — ambassaden kan spørge ind til billedets alder." },
      ],
    },
    {
      slug: "pasfoto-tjekker",
      metaTitle: "Gratis US-visum foto-tjekker for danskere | Valider dit foto online",
      metaDescription: "Tjek om dit foto lever op til alle US State Department-krav — gratis på under 30 sekunder. Vores AI kontrollerer 15+ kriterier: mål, baggrund, øjenposition, briller og mere. Til DS-160 og DV Lottery.",
      metaKeywords: ["pasfoto tjekker Danmark", "US visum foto kontrol", "DS-160 foto validering", "US visum foto tjek online"],
      h1: "Gratis US-visum foto-tjekker for danske ansøgere",
      heroDescription: "Er dit foto klar til ambassaden — eller risikerer du afvisning? Vores gratis AI-tjekker analyserer dit foto mod alle officielle US State Department-krav på under 30 sekunder. Ingen konto, ingen betaling for selve tjekket.",
      ctaText: "Tjek mit foto gratis", ctaSecondaryText: "Læs om kravene",
      contentSections: [
        {
          heading: "Hvorfor du bør tjekke dit foto, inden du indsender ansøgningen",
          paragraphs: [
            "At indsende et ikke-kompatibelt foto til din US-visumsansøgning er en af de mest frustrerende — og lettest undgåelige — fejl, du kan begå. Konsekvensen er ikke kun afvisning. Det kan betyde en forsinkelse på uger eller måneder, mens du venter på at booke en ny interviewtid hos ambassaden i København, særligt i sommersæsonen, hvor ventetiderne er længst. Og i mellemtiden er du allerede betalt din ansøgningsgebyr på $ 185, som ikke refunderes.",
            "Vores AI-drevne foto-tjekker er bygget specifikt til at fange præcis de fejl, der hyppigst rammer danske ansøgere. Systemet kontrollerer 15+ individuelle kriterier på sekunder: billedets pixel-dimensioner og 1:1 kvadratformat, filstørrelse under 240 KB, baggrundsfarve med RGB-præcision, ansigtsgenkendelse og frontal vinkel, øjenposition i zonen 56–69 % fra bunden, ansigts- og hovedstørrelse i zonen 50–69 % af billedets højde, fraværet af briller, neutralt udtryk med lukket mund og åbne øjne, samt korrekt JPEG-farverum (sRGB). Alt dette valideres gratis og øjeblikkeligt — og du kan uploade ubegrænset antal gange.",
            "Vil du se de officielle krav med egne øjne? Det amerikanske udenrigsministerium stiller <a href='https://travel.state.gov/content/travel/en/passports/how-apply/photos.html' target='_blank' rel='noopener'>State Department Photo Tool</a> til rådighed som supplerende reference.",
          ],
        },
        {
          heading: "Sammenligning af dine muligheder for US-visumfoto i Danmark",
          paragraphs: [
            "<strong>Borgerservice-automat (gratis eller billig):</strong> Kun konfigureret til det danske pasformat. Kan ikke producere 600×600px kvadratisk US-format. Brug dem ikke til US-visum.",
            "<strong>Professionelt fotostudio i Danmark (100–250 kr):</strong> Muligvis i stand til at lave US-format, men ingen garanti for at kende de præcise digitale specifikationer. Ikke inkluderet validering. Du betaler for forsøget, ikke for resultatet.",
            "<strong>USVisaPhotoAI (gratis tjek + 45 kr for kompatibelt foto):</strong> AI-validering af 15+ kriterier, automatisk baggrundskorrektion, præcis beskæring og skalering, digital fil til DS-160 og printklart A4-ark til interviewet. Pengene-tilbage-garanti ved teknisk afvisning.",
          ],
        },
      ],
      faqs: [
        { q: "Er foto-tjekket virkelig gratis?", a: "Ja, 100 % gratis. Du kan uploade og validere et ubegrænset antal fotos uden at betale noget. Du betaler kun de 45 kr, hvis du ønsker at downloade det AI-behandlede, kompatible foto." },
        { q: "Hvad præcist tjekker AI'en?", a: "Systemet kontrollerer 15+ officielle US State Department-kriterier: pixel-dimensioner, kvadratformat, filstørrelse, baggrundsfarve (RGB-præcision), ansigtsgenkendelse, øjenposition, ansigts- og hovedstørrelse, fraværet af briller, udtryk og JPEG-farverum." },
        { q: "Hvor præcis er tjekkerens vurdering?", a: "Vores service har en dokumenteret godkendelsesrate på 99,8 % baseret på 12.000+ behandlede fotos. AI-modellen er trænet på de samme biometriske standarder, som det amerikanske udenrigsministerium anvender." },
        { q: "Kan jeg uploade et foto taget med borgerservice-automaten?", a: "Du kan godt uploade det for at se fejlene, men det vil højst sandsynligt fejle på format (portrætformat vs. kvadratisk) og baggrundsfarve. Brug i stedet et nyt foto taget foran en hvid væg med din smartphone." },
        { q: "Hvor lang tid tager valideringen?", a: "Under 30 sekunder fra du uploader billedet til du har den fulde rapport med bestået/fejlet-status for alle 15+ kriterier." },
        { q: "Skal jeg oprette en konto?", a: "Nej. Hverken tjekket eller den efterfølgende betaling kræver kontooprettelse. Vi bruger et sikkert, anonymt betalingsflow." },
        { q: "Virker det til DV Lottery-fotos?", a: "Ja. DV Lottery kræver nøjagtig de samme specifikationer som et regulært US-visum foto, og vores tjekker validerer mod begge sæt krav simultant." },
        { q: "Kan jeg tjekke et foto af mit barn?", a: "Ja. Børnefotos er underlagt præcis de samme tekniske krav som voksnes, men vores AI er trænet til at håndtere de biometriske udfordringer ved babyer og småbørn, der f.eks. ikke altid holder øjnene åbne." },
        { q: "Hvad sker der, hvis mit foto fejler?", a: "Du får en specifik, forklarende rapport for hvert enkelt fejlet kriterium med konkret vejledning til, hvad du skal ændre. Du kan derefter tage et nyt foto og uploade det igen gratis — ubegrænset." },
        { q: "Hvad med GDPR og mine personlige data?", a: "Vi er fuldt GDPR-kompatible. Alle uploadede fotos slettes automatisk efter 24 timer, og download-links udløber efter 1 time. Vi deler aldrig dine data med tredjeparter." },
      ],
    },
    {
      slug: "us-visum-foto-online",
      metaTitle: "US-visum foto online fra Danmark | Opret digitalt visumfoto til DS-160",
      metaDescription: "Opret dit officielle US-visumfoto online fra Danmark på under 1 minut. AI-valideret, DS-160-klar og langt billigere end fotostudioer. Gratis tjek, 45 kr for kompatibelt foto. Til alle visumtyper og DV Lottery.",
      metaKeywords: ["US visum foto online Danmark", "digitalt visumfoto Danmark", "DS-160 foto online", "US visum foto hjemmefra", "DV lottery foto Danmark"],
      h1: "Opret dit US-visumfoto online fra Danmark – hurtigere, billigere, garanteret kompatibelt",
      heroDescription: "Spring køen til fotostudioet over. Med USVisaPhotoAI opretter du dit officielle US-visumfoto hjemmefra på under ét minut — garanteret kompatibelt med DS-160, DV Lottery og alle US-ambassader, inklusive København.",
      ctaText: "Opret mit foto online nu", ctaSecondaryText: "Se hvordan det virker",
      contentSections: [
        {
          heading: "Hvorfor danskere i stigende grad vælger online-løsningen",
          paragraphs: [
            "Danmark er konsekvent rangeret som et af verdens mest digitalt modne samfund. Vi bruger MitID til at logge ind på det offentlige, modtager post via e-Boks og bestiller lægetider via Sundhed.dk. Det er helt naturligt, at den samme digitale tankegang nu også gælder for vigtige dokumentfotos. At stå i kø til en borgerservice-automat eller aftale tid med en fotograf føles forældet, når alternativet er at bruge sin smartphone derhjemme.",
            "Men der er en vigtig forskel på at tage et dansk pasfoto med en automat og at fremstille et US-kompatibelt visumfoto. De tekniske krav er fundamentalt anderledes — og de fleste danske løsninger er simpelthen ikke designet til det. Det er præcis det problem, USVisaPhotoAI løser: vi bringer den tekniske ekspertise og AI-valideringen direkte til dig, uanset om du sidder i en lejlighed i København, et hus i Jylland eller en studiebolig i Odense.",
            "Resultatet er et foto, der er præcist optimeret til det amerikanske systems biometriske krav — og som kan bruges både digitalt i DS-160-formularen og som fysisk print til ambassadeinterviewet.",
          ],
        },
        {
          heading: "Trin for trin: sådan opretter du dit US-visumfoto online fra Danmark",
          paragraphs: [
            "<strong>Trin 1 — Tag det rigtige foto:</strong> Find en hvid væg i dit hjem — en dør, et skab eller en væg fungerer fint. Stil dig i godt, jævnt lys (helst dagslys fra et vindue eller en hvid LED-lampe på mindst 5000K). Tag brillerne af. Bed et familiemedlem om at fotografere dig frontalt med din smartphone, eller brug selfie-kameraet med armen strakt ud. Det behøver ikke at være perfekt — AI'en klarer resten.",
            "<strong>Trin 2 — Upload dit foto:</strong> Gå til <a href='/tool?type=us-visa'>USVisaPhotoAI's uploadside</a>. Ingen app-download, ingen kontooprettelse. Bare upload billedet direkte fra din telefon eller computer.",
            "<strong>Trin 3 — Øjeblikkelig AI-validering:</strong> Inden for 30 sekunder analyserer vores AI dit foto mod 15+ officielle US State Department-kriterier og viser dig en detaljeret rapport: hvert punkt enten bestået, advaret eller fejlet — med forklaring.",
            "<strong>Trin 4 — Betal 45 kr og download:</strong> Hvis dit foto er kompatibelt (eller vi korrigerer det), betaler du den faste pris på 45 kr. Du modtager herefter en digital fil optimeret til DS-160 og et printklart A4-ark med 20 fotos i korrekt størrelse (51×51 mm) til ambassadeinterviewet. Se de officielle specifikationer hos <a href='https://travel.state.gov/content/travel/en/passports/how-apply/photos.html' target='_blank' rel='noopener'>US State Dept. Photo Tool</a>.",
            "<strong>Trin 5 — Brug det i ansøgningen:</strong> Upload den digitale fil direkte i DS-160-formularen. Print A4-arket og medbring et klippet foto til dit interview hos ambassaden i København. Færdig.",
          ],
        },
      ],
      faqs: [
        { q: "Hvordan opretter jeg et US-visumfoto online fra Danmark?", a: "Tag et foto med din smartphone foran en hvid væg, upload det på USVisaPhotoAI, og lad vores AI validere og optimere det. Det tager under 60 sekunder og koster 45 kr for det færdige, kompatible foto." },
        { q: "Accepterer USAs ambassade i København online-fremstillede fotos?", a: "Ja. Ambassaden accepterer alle fotos, der opfylder de officielle US State Department-specifikationer — uanset om de er taget af en professionel fotograf, en automat eller fremstillet via en online-tjeneste som vores." },
        { q: "Er en smartphone god nok til at tage det originale foto?", a: "Ja, alle moderne smartphones — iPhone, Samsung Galaxy, Google Pixel m.fl. — tager billeder med tilstrækkelig opløsning og kvalitet. Det vigtigste er god belysning og en hvid baggrund, ikke kameraet i sig selv." },
        { q: "Leverer I en udskriftsversion til ambassadeinterviewet?", a: "Ja. Ud over den digitale fil til DS-160 inkluderer vores service et printklart A4-PDF-ark med 20 fotos i størrelsen 51×51 mm, klar til at blive klippet ud og medbragt til interviewet i København." },
        { q: "Hvad sker der, hvis mit foto ikke godkendes af ambassaden?", a: "Vi tilbyder 100 % pengene-tilbage-garanti, hvis dit foto teknisk afvises på grund af fotospecifikationer. Vi har en godkendelsesrate på 99,8 % — men i det sjældne tilfælde, det sker, dækker vi det." },
        { q: "Hvor hurtigt er processen?", a: "AI-valideringen tager under 30 sekunder. Fra upload til downloadklar fil går der typisk under 2 minutter i alt, inklusive betaling." },
        { q: "Kan jeg bruge det til DV Lottery-indgivelse?", a: "Ja. DV Lottery (Diversity Visa Lottery) kræver nøjagtig de samme specifikationer som et regulært US-visum foto, og vores service er fuldt kompatibel." },
        { q: "Kræver det en konto eller registrering?", a: "Nej. Hverken upload, validering eller betaling kræver kontooprettelse. Vi respekterer dit privatliv og holder processen så enkel som muligt." },
        { q: "Hvad med GDPR og databeskyttelse?", a: "Vi er fuldt GDPR-kompatible. Alle fotos slettes automatisk efter 24 timer, og download-links udløber efter 1 time. Vi opbevarer aldrig biometriske data eller identificerende information." },
        { q: "Mit foto er taget om vinteren i dårligt lys — er det et problem?", a: "Potentielt ja. Gul eller orangetonet kunstig belysning kan give en falsk hudtone, der udløser advarsler. Brug en hvid LED-lampe på mindst 5000K, eller tag fotoet tæt ved et vindue i dagtimerne, selv på en overskyet vinterdag i Danmark." },
      ],
    },
  ],
};