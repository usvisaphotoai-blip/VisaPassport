---
# Product claims for the es section: the ONLY place they are written.
# Pages and _site.md reference them as {{claim:<key>}} (sentence) or {{claim:<key>.short}} (badge/pill),
# and lib/country-sites.ts fills them in at render time. Change the wording here and every page follows.
#
# confirmed: false → the claim is live but still needs sign-off from the product owner.
# `npm run sites:check -- es` lists every unconfirmed claim used on a ready page.
siteClaims:
  freePreview:
    confirmed: false
    short: "Vista previa gratis antes de pagar"
    text: "Puedes subir tu foto y ver la vista previa ajustada sin coste ni registro."
  paidDownload:
    confirmed: false
    short: "Pagas solo la descarga"
    text: "Solo pagas cuando descargas el resultado final."
  deletion24h:
    confirmed: false
    short: "Archivo eliminado en 24 h"
    text: "Tu foto se elimina de nuestros servidores en un plazo máximo de 24 horas."
  printSheet:
    confirmed: false
    short: "Hoja con varias copias para imprimir"
    text: "Además del archivo digital, puedes descargar una hoja con varias copias para imprimir."
  requirementChecks:
    confirmed: false
    short: "Aviso de problemas de encuadre y fondo"
    text: "Antes de descargar, la herramienta avisa de problemas habituales de encuadre y fondo para que puedas corregirlos."
  backgroundAdjust:
    confirmed: false
    short: "Fondo liso ajustado automáticamente"
    text: "La herramienta recorta el encuadre y prepara un fondo liso según el documento que elijas."
  refundIfRejected:
    confirmed: false
    short: "Reembolso si es rechazada"
    text: "Reembolso si la foto es rechazada."
  # Rendered once, site-wide, by the section layout (app/sites/components/SiteDisclaimer.tsx).
  # Pages must not repeat it.
  disclaimer:
    confirmed: false
    short: "La aceptación final corresponde al organismo emisor"
    text: "PixPassport te ayuda a preparar la foto, pero no decide si se acepta: esa decisión corresponde siempre al organismo que expide tu documento. Comprueba los requisitos vigentes en su fuente oficial antes de presentarla."
---
