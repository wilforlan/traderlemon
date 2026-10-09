import { z } from "zod";

import { SUPPORT_EMAIL, WORLD_SERVER_URL } from "@/lib/site-links";

export const LEGAL_OPERATOR = "Viroke Technologies Inc." as const;

export const LEGAL_JURISDICTION = "the State of Delaware" as const;

export const LEGAL_EFFECTIVE_DATE = "August 20, 2026" as const;

const LegalSectionSchema = z.object({
  heading: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
});

const LegalDocumentSchema = z.object({
  title: z.string().min(1),
  path: z.string().min(1),
  operator: z.literal(LEGAL_OPERATOR),
  jurisdiction: z.string().min(1),
  effectiveDate: z.string().min(1),
  contactEmail: z.string().email(),
  intro: z.string().min(1),
  sections: z.array(LegalSectionSchema).min(8),
});

export type LegalDocument = z.infer<typeof LegalDocumentSchema>;

export const privacyPolicy = LegalDocumentSchema.parse({
  title: "Privacy Policy",
  path: "/privacy",
  operator: LEGAL_OPERATOR,
  jurisdiction: LEGAL_JURISDICTION,
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  contactEmail: SUPPORT_EMAIL,
  intro: `This Privacy Policy explains how ${LEGAL_OPERATOR}, a Delaware corporation ("Viroke," "we," "us," or "our"), collects, uses, discloses, and protects information in connection with the v0peer mobile application, the website at v0peer.org, and related online services (collectively, the "Service"). By using the Service, you agree to this Privacy Policy. If you do not agree, do not use the Service.`,
  sections: [
    {
      heading: "1. Who we are",
      paragraphs: [
        `${LEGAL_OPERATOR} is a Delaware corporation. v0peer is a product of Viroke. This Policy is issued by Viroke as the operator of the Service.`,
        `Privacy and support requests may be sent to ${SUPPORT_EMAIL}.`,
      ],
    },
    {
      heading: "2. Scope",
      paragraphs: [
        "This Policy applies to information processed through the v0peer iOS and iPadOS application (bundle identifier org.v0peer.app), the v0peer marketing and support website, and communications you send us (for example, email to support).",
        `This Policy does not govern third-party worlds, banks, or play surfaces that we do not control. When you tap Load, the app opens Origin at ${WORLD_SERVER_URL} inside an in-app WebView. That world, Econext, v0peer World, Apple, and other independent operators have their own terms and privacy practices.`,
      ],
    },
    {
      heading: "3. Information we collect",
      paragraphs: [
        "The native v0peer application is a world loader. It does not create a first-party account, does not require your name or payment card to open Origin, and does not include a third-party advertising SDK.",
        "If you email us, we process the content of that message, your email address, and any device or diagnostic details you choose to include so we can respond.",
        "Our website and hosting providers may automatically process limited technical data such as IP address, browser or device type, referring URL, timestamps, and coarse location derived from IP, which is ordinary server-log processing to operate, secure, and debug the site.",
        "We do not sell personal information. We do not track you across third-party apps and websites for targeted advertising, and we do not use the iOS Identifier for Advertisers for that purpose.",
      ],
    },
    {
      heading: "4. Device motion",
      paragraphs: [
        "v0peer uses the device accelerometer (motion sensors) so you can shake the device to open world options (Reload, Exit world, or Stay in world). Motion samples are processed on the device to detect a shake gesture.",
        "We do not sell motion data. We do not use motion data to track you across other companies' apps or websites. If you deny motion permission, shake-to-open-options will not work; you may need to force-quit the app to leave a loaded world.",
      ],
    },
    {
      heading: "5. Origin and other third-party worlds",
      paragraphs: [
        `When Origin loads, the WebView connects directly to ${WORLD_SERVER_URL}. That destination may set cookies, use local storage, run JavaScript, collect account or session data, and process content according to its own policy. Shared and third-party cookies may be enabled in the WebView so the live world can function.`,
        "Viroke does not receive a complete copy of everything the world processes. If you create a v0peer World account, save credentials.json, or use Econext banking rails, those operators—not the native v0peer shell—are the primary controllers of that information. Read their notices before you authenticate or transact.",
      ],
    },
    {
      heading: "6. How we use information",
      paragraphs: [
        "We use information to operate and secure the Service, load the worlds you select, respond to support, improve reliability, enforce our Terms of Use, and comply with law.",
        "We do not use native-app motion data or support email for cross-context behavioral advertising.",
      ],
    },
    {
      heading: "7. How we share information; we do not sell",
      paragraphs: [
        "We do not sell personal information as that term is used in the California Consumer Privacy Act, as amended by the CPRA. We do not share personal information for cross-context behavioral advertising.",
        "We may disclose information to service providers who host the website or process email on our instructions; to Origin or another world you choose to load, which then processes data under its own rules; if required by law, legal process, or to protect rights, safety, or security; or in connection with a merger, financing, or sale of Viroke or the Service, subject to this Policy or a successor notice.",
      ],
    },
    {
      heading: "8. Cookies and similar technologies",
      paragraphs: [
        "The v0peer website may use strictly necessary cookies or similar storage to operate the site. The Origin WebView may use cookies and local storage controlled by the world operator. You can limit some cookies in device or browser settings; doing so may break a loaded world.",
      ],
    },
    {
      heading: "9. Retention",
      paragraphs: [
        "Support correspondence is retained as long as needed to resolve your request, maintain security logs, and meet legal recordkeeping. Hosting logs are retained for a commercially reasonable period. We do not operate a first-party profile database for native-app sessions. Credentials.json, if you create one, is held by you; Viroke does not reconstruct a lost credentials file.",
      ],
    },
    {
      heading: "10. Security",
      paragraphs: [
        "We use commercially reasonable administrative, technical, and physical safeguards appropriate to a world-loader and marketing site, including transport encryption (TLS) for our websites. No method of transmission or storage is perfectly secure. You are responsible for the device, for credentials.json, and for any wallet or passphrase you use in a third-party world.",
      ],
    },
    {
      heading: "11. Your rights",
      paragraphs: [
        "Depending on where you live (including California and, where applicable, the EEA/UK), you may have rights to know, access, correct, delete, or export personal information we hold, to opt out of sale or sharing (we do not sell or share for cross-context advertising), and to appeal a denial. To exercise a request, email us from the address we can reasonably associate with your inquiry. We may need to verify identity. Authorized agents may submit California requests subject to verification.",
        "We will not discriminate against you for exercising privacy rights. Some rights do not apply to data we do not control (for example, Origin account data); we will direct you to the world or bank operator where appropriate.",
      ],
    },
    {
      heading: "12. Children",
      paragraphs: [
        "The Service is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe we have collected such information, contact us and we will delete it. Third-party worlds and economy features may impose a higher minimum age; those operators' rules control when you are inside Origin or Econext.",
      ],
    },
    {
      heading: "13. International users",
      paragraphs: [
        "Viroke is organized in the United States. If you use the Service from outside the United States, you understand that information may be processed in the United States, which may have different data-protection laws than your country of residence.",
      ],
    },
    {
      heading: "14. Changes",
      paragraphs: [
        `We may update this Policy. The effective date above will change when we do. For material changes, we will post the revised Policy at https://v0peer.org/privacy and, where required by law, provide additional notice. Continued use after the effective date constitutes acceptance except where law requires a different consent.`,
      ],
    },
    {
      heading: "15. Contact",
      paragraphs: [
        `Viroke Technologies Inc. Privacy questions: ${SUPPORT_EMAIL}. Website: https://v0peer.org. Support: https://v0peer.org/support.`,
      ],
    },
    {
      heading: "16. Governing law",
      paragraphs: [
        `This Privacy Policy is governed by the laws of ${LEGAL_JURISDICTION}, without regard to conflict-of-law principles, except where mandatory consumer-protection law in your place of residence provides otherwise. Disputes are handled as provided in our Terms of Use.`,
      ],
    },
  ],
});

export const termsOfUse = LegalDocumentSchema.parse({
  title: "Terms of Use",
  path: "/terms",
  operator: LEGAL_OPERATOR,
  jurisdiction: LEGAL_JURISDICTION,
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  contactEmail: SUPPORT_EMAIL,
  intro: `These Terms of Use ("Terms") are a legally binding agreement between you and ${LEGAL_OPERATOR}, a Delaware corporation ("Viroke," "we," "us," or "our"), governing access to and use of the v0peer application, the website at v0peer.org, and related services (the "Service"). By downloading, accessing, or using the Service, you agree to these Terms and our Privacy Policy. If you do not agree, do not use the Service.`,
  sections: [
    {
      heading: "1. The Service",
      paragraphs: [
        "v0peer is a client that loads live v0peer worlds. After a splash screen, you may load Origin, which occupies the full display inside an in-app WebView. Shake the device to open options to reload, exit the world without closing the app, or stay.",
        `Origin is served from ${WORLD_SERVER_URL}. The native shell and the world are related but distinct. Features, accounts, chat, economy, and content inside Origin are provided by the world operator and may change without notice.`,
        "We may modify, suspend, or discontinue any part of the Service. The iOS app may be listed as coming soon on the App Store until Apple completes review.",
      ],
    },
    {
      heading: "2. Eligibility",
      paragraphs: [
        "You must be at least 13 years of age and able to form a binding contract. If you are 13 to 17, you may use the native loader only with the consent of a parent or legal guardian who agrees to these Terms. Third-party worlds, wallets, or economy features may require you to be 18 or older; you must comply with those rules when you enter them.",
      ],
    },
    {
      heading: "3. License; Apple Licensed Application",
      paragraphs: [
        "The v0peer application is licensed, not sold, to you. Subject to these Terms, Viroke grants you a limited, non-exclusive, non-transferable, revocable, non-sublicensable license to use the app on Apple-branded products that you own or control, as permitted by the App Store Terms of Use (the \"Usage Rules\").",
        "This license does not allow you to distribute or make the app available over a network where it could be used by multiple devices at the same time, except as Apple's Usage Rules allow Family Sharing or volume purchasing. You may not reverse engineer, copy, or create derivative works of the app except to the extent that restriction is prohibited by law.",
        "Apple Inc. and its subsidiaries are third-party beneficiaries of this license. Upon your acceptance, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third-party beneficiary. Apple has no obligation to provide maintenance or support. To the extent any warranty applies and is not effectively disclaimed, and if the app fails to conform to it, you may notify Apple and Apple may refund the purchase price (if any) you paid to Apple; to the maximum extent permitted by law, Apple will have no other warranty obligation. Apple is not responsible for addressing claims relating to the app or your possession and use, including product-liability claims, failure to conform to legal or regulatory requirements, consumer-protection claims, or intellectual-property infringement claims. You represent you are not in a U.S. embargoed country and not on a U.S. prohibited or restricted-party list.",
      ],
    },
    {
      heading: "4. Credentials and keys",
      paragraphs: [
        "v0peer World citizenship uses a credentials file (credentials.json) and related secrets. That file is a bearer instrument. Anyone who holds it can act as that node. Viroke does not store a copy in a first-party password database and cannot reset or reconstruct a lost file.",
        "You are solely responsible for generating, storing, backing up, and withholding credentials, passphrases, and wallets. Sharing the file, pasting it into a ticket, or storing it in an untrusted location is at your risk.",
      ],
    },
    {
      heading: "5. Virtual economy; no investment contract",
      paragraphs: [
        "APW$ and related in-world units are nominal units of the Second Economy. They are not United States dollars, are not legal tender, and are not offered as securities, commodities, or investment contracts by Viroke under these Terms. Nothing in the Service is investment, legal, or tax advice.",
        "Displayed balances, conversion, merchant settlement, and on-chain activity, if any, are provided by Econext or other third parties under their terms. Values can go to zero. We do not guarantee liquidity, redemption, or continued operation of any world or rail.",
      ],
    },
    {
      heading: "6. Third-party services",
      paragraphs: [
        "The Service may link to or embed Origin, Econext, v0peer World, Apple, hosting providers, and other third parties. Those services are not under our control. Your use of them is at your risk and subject to their terms. Viroke is not a bank, broker-dealer, money transmitter, or fiduciary by reason of linking to those surfaces.",
      ],
    },
    {
      heading: "7. Acceptable use",
      paragraphs: [
        "You will not use the Service to violate law; attack, scrape, or overload our systems or Origin; impersonate others; distribute malware; infringe intellectual property; exploit minors; or interfere with other users. You will not attempt to bypass shake, license, or geographic restrictions except as Apple or applicable law allows.",
        "We may investigate and suspend access. We may cooperate with law enforcement.",
      ],
    },
    {
      heading: "8. Intellectual property",
      paragraphs: [
        "The Service, including software, branding, splash art, and documentation (excluding third-party world content and your own lawful submissions), is owned by Viroke or its licensors and protected by U.S. and international intellectual-property laws. These Terms do not transfer title.",
        "Feedback you send us may be used by Viroke without restriction or compensation.",
      ],
    },
    {
      heading: "9. Disclaimers",
      paragraphs: [
        'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITH ALL FAULTS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, VIROKE DISCLAIMS ALL WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, QUIET ENJOYMENT, AND ACCURACY.',
        "We do not warrant that Origin will load, that a world will be uninterrupted or secure, that credentials cannot be lost, or that virtual units have any particular value. Some jurisdictions do not allow certain disclaimers; they apply to the fullest extent permitted.",
      ],
    },
    {
      heading: "10. Limitation of liability",
      paragraphs: [
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, VIROKE AND ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, AND LICENSORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, VIRTUAL UNITS, OR CREDENTIALS, ARISING OUT OF OR RELATED TO THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY.",
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE SERVICE OR THESE TERMS WILL NOT EXCEED THE GREATER OF (A) ONE HUNDRED U.S. DOLLARS (US $100) OR (B) THE AMOUNTS YOU PAID TO VIROKE FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE CLAIM.",
        "These limits are a fundamental allocation of risk and apply to the fullest extent permitted, including where a remedy fails of its essential purpose.",
      ],
    },
    {
      heading: "11. Indemnification",
      paragraphs: [
        "You will defend, indemnify, and hold harmless Viroke and its directors, officers, employees, and agents from claims, damages, losses, and reasonable attorneys' fees arising out of your use of the Service, your credentials or wallets, your violation of these Terms or law, or your dispute with a world, bank, or other user.",
      ],
    },
    {
      heading: "12. Termination",
      paragraphs: [
        "You may stop using the Service at any time. We may suspend or terminate access immediately if we reasonably believe you violated these Terms, created legal or security risk, or as required by Apple or law. Sections that should survive (including licenses limited to surviving obligations, disclaimers, limits of liability, indemnity, and dispute resolution) survive termination.",
      ],
    },
    {
      heading: "13. Dispute resolution; Delaware law; arbitration",
      paragraphs: [
        `Informal resolution. Before filing a claim, you agree to email ${SUPPORT_EMAIL} with a description of the dispute and to attempt in good faith to resolve it for thirty (30) days.`,
        `Governing law. These Terms and any dispute are governed by the laws of ${LEGAL_JURISDICTION} and the Federal Arbitration Act, without regard to conflict-of-law rules, except where mandatory consumer-protection law in your place of residence provides otherwise.`,
        "Arbitration. Except for (i) individual claims in small-claims court and (ii) claims for injunctive or other equitable relief to protect intellectual property or unauthorized use of the Service, any dispute arising out of or relating to these Terms or the Service will be resolved by binding individual arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules. The seat of arbitration will be Wilmington, Delaware, unless we agree otherwise. Judgment on the award may be entered in any court of competent jurisdiction.",
        "Class waiver. You and Viroke waive any right to a jury trial and to participate in a class, collective, or representative action to the extent permitted by law. If the class waiver is found unenforceable as to a particular claim, that claim must proceed in court and not in arbitration.",
        "Opt out. You may opt out of arbitration within thirty (30) days of first accepting these Terms by emailing us with the subject line ARBITRATION OPT-OUT and your name. If arbitration is unenforceable, exclusive venue lies in the state or federal courts located in Delaware, and you consent to personal jurisdiction there.",
      ],
    },
    {
      heading: "14. General",
      paragraphs: [
        "These Terms and the Privacy Policy are the entire agreement between you and Viroke regarding the Service and supersede prior agreements on the same subject. If a provision is held unenforceable, the remainder remains in effect. You may not assign these Terms without our consent; we may assign them in connection with a merger, financing, or sale of assets. Failure to enforce is not a waiver. We are not liable for delay caused by events beyond our reasonable control. Headings are for convenience only.",
        "If you obtained the app from the Apple App Store and these Terms conflict with the App Store Terms of Use on a subject Apple requires, the App Store Terms of Use control as to that subject as between you and Apple.",
      ],
    },
    {
      heading: "15. Contact",
      paragraphs: [
        `Viroke Technologies Inc., a Delaware corporation. Notices: ${SUPPORT_EMAIL}. Website: https://v0peer.org. Privacy Policy: https://v0peer.org/privacy. Support: https://v0peer.org/support.`,
      ],
    },
  ],
});
