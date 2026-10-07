// Shared by the server page (JSON-LD) and the client (visible FAQ) so both stay in sync.
export const FAQ_ITEMS = [
  {
    q: "Is this UK passport photo checker free to use?",
    a: "Yes. The checker is completely free, with no account, sign-up, or watermark. Upload your photo, get your compliance report, and re-check as many times as you need.",
  },
  {
    q: "Does this replace the official GOV.UK passport photo checker?",
    a: "No. This is an independent checker you can use to catch issues before applying. GOV.UK runs its own automatic photo check when you upload during an online application, and HM Passport Office makes the final decision.",
  },
  {
    q: "How does the checker test my photo?",
    a: "It uses a 468-point facial landmark model to measure head position, face size and eye line, then scans the background and lighting. Each result is compared with the HM Passport Office photo rules.",
  },
  {
    q: "Can I check a child's passport photo?",
    a: "Yes. The checker applies the same UK size, background and expression rules HM Passport Office uses for children. Babies under one don't need their eyes open, and children under six don't need a neutral expression.",
  },
  {
    q: "What size does a UK passport photo need to be?",
    a: "UK passport photos must be 35mm wide by 45mm tall, with the head height between 29mm and 34mm from chin to crown, taken against a plain cream or light grey background.",
  },
  {
    q: "What happens to my photo after I upload it?",
    a: "Your photo is sent over an encrypted connection to run the check. We never sell it, and we don't share it with HM Passport Office, other government agencies or advertisers.",
  },
  {
    q: "Can I check a UK visa photo too?",
    a: "The checker tests your photo against the UK passport photo standard. Most UK visa photos follow the same 35×45mm rules, but UKVI often takes your photo at the visa application centre or in the app, so check the instructions for your visa route.",
  },
];
