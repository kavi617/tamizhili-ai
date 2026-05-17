export type Locale = "en" | "ta";

export const LOCALE_STORAGE_KEY = "tamizhili-locale";

export const COPY = {
  nav: {
    home: { en: "Home", ta: "முகப்பு" },
    chat: { en: "Chat", ta: "அரட்டை" },
    timeline: { en: "Timeline", ta: "காலவரிசை" },
    tour: { en: "Tour", ta: "சுற்றுலா" },
    library: { en: "Library", ta: "நூலகம்" },
    docs: { en: "Docs", ta: "ஆவணம்" },
  },
  shell: {
    timeline: {
      title: { en: "Timeline", ta: "காலவரிசை" },
      subtitle: {
        en: "Anchoring moments across Chola, Pandya, and Chera histories—use Chat for deeper, sourced answers.",
        ta: "சோழர், பாண்டியர், சேரர் வரலாற்றுத் திருப்பங்கள் — ஆழமான மூல ஆதார விளக்கத்திற்கு அரட்டையைப் பயன்படுத்தவும்.",
      },
    },
    tour: {
      title: { en: "Heritage Tour", ta: "பாரம்பரிய சுற்றுலா" },
      subtitle: {
        en: "Browse themed Tamil-history tours with embedded Google Street View frames—jump to Chat for sourced explanations.",
        ta: "தீம் அடிப்படையிலான தமிழ் வரலாற்றுச் சுற்றுலாக்கள் — உட்பொதிக்கப்பட்ட கூகுள் தெருக்காட்சிச் சட்டகம்; விளக்கத்திற்கு அரட்டை.",
      },
    },
    library: {
      title: { en: "Library", ta: "நூலகம்" },
      subtitle: {
        en: "Curated starters on dynasties, literature, trade, and rulers—jump into Chat for fuller, retrieval-grounded answers.",
        ta: "வம்சங்கள், இலக்கியம், வணிகம், அரசர்கள் பற்றிய தேர்ந்தெடுக்கப்பட்ட அறிமுகங்கள் — முழுமையான பதில்களுக்கு அரட்டைக்குச் செல்லவும்.",
      },
    },
    docs: {
      title: { en: "Documentation", ta: "ஆவணப்படுத்தல்" },
      subtitle: {
        en: "How தமிழி AI is structured, how to run it, and where to find the live HTTP API reference.",
        ta: "தமிழி AI அமைப்பு, இயக்கம், மற்றும் HTTP API குறிப்பிற்கான இணைப்பு.",
      },
    },
  },
  links: {
    askAi: { en: "Ask AI about this", ta: "இதைப் பற்றி AI-யைக் கேளுங்கள்" },
    useInChat: { en: "Use in Chat", ta: "அரட்டையில் பயன்படுத்து" },
    backHome: { en: "← Back to home", ta: "← முகப்புக்கு" },
  },
  navbar: {
    heritage: { en: "Heritage", ta: "பாரம்பரியம்" },
    apiDocs: { en: "API docs", ta: "API ஆவணம்" },
    agentsLive: { en: "4 agents live", ta: "4 முகவர்கள் செயலில்" },
    langToggleTamil: { en: "தமிழ்", ta: "தமிழ்" },
    langToggleEnglish: { en: "EN", ta: "ஆங்கிலம்" },
    langAria: {
      en: "Switch site language to Tamil",
      ta: "தளத்தை ஆங்கிலத்திற்கு மாற்று",
    },
  },
  chat: {
    welcome: {
      en: "Vanakkam. Ask about Tamil dynasties, temples, and Sangam texts—or upload an **inscription** (கல்வெட்டு) photo; we transcribe it to modern Tamil and explain it. Key names appear **bold** in answers.",
      ta: "வணக்கம். தமிழ் அரச வம்சங்கள், கோயில்கள், சங்க இலக்கியம் பற்றிக் கேளுங்கள் — அல்லது **கல்வெட்டு** புகைப்படத்தைப் பதிவேற்றவும்; நாங்கள் அதை நவீன தமிழில் எழுத்துப்பெயர்த்து விளக்குகிறோம். முக்கிய பெயர்கள் பதில்களில் **தடித்த** எழுத்தில் காட்டப்படும்.",
    },
    suggestions: {
      en: [
        "Who built the Brihadeeswarar Temple?",
        "What is Sangam literature?",
        "Tell me about Rajaraja Chola",
        "What was found at Keezhadi?",
      ],
      ta: [
        "பெரிய கோயிலை யார் கட்டினார்கள்?",
        "சங்க இலக்கியம் என்றால் என்ன?",
        "இராஜராஜ சோழனைப் பற்றி சொல்லுங்கள்",
        "கீழடியில் என்ன கண்டுபிடிக்கப்பட்டது?",
      ],
    },
    placeholder: {
      en: "Ask about Tamil history… (optional with inscription photo)",
      ta: "தமிழ் வரலாற்றைக் குறித்துக் கேளுங்கள்… (கல்வெட்டு புகைப்படத்துடன்)",
    },
    inscriptionAttached: {
      en: "Inscription photo attached",
      ta: "கல்வெட்டு புகைப்படம் இணைக்கப்பட்டது",
    },
    inscriptionReady: { en: "Inscription ready to send", ta: "கல்வெட்டு அனுப்பத் தயார்" },
    remove: { en: "Remove", ta: "நீக்கு" },
    uploadInscriptionAria: {
      en: "Upload stone inscription photo",
      ta: "கல்வெட்டு புகைப்படத்தைப் பதிவேற்று",
    },
    uploadInscriptionTitle: {
      en: "Inscription — upload photo",
      ta: "கல்வெட்டு — புகைப்படம் பதிவேற்றம்",
    },
    sendAria: { en: "Send", ta: "அனுப்பு" },
    guideLabel: { en: "Heritage guide", ta: "வழிகாட்டி" },
    historianLabel: { en: "Historian agent", ta: "வரலாற்று முகவர்" },
    loading: { en: "Thinking…", ta: "சிந்திக்கிறேன்…" },
    errorPrefix: { en: "Could not reach the archives.", ta: "காப்பகத்தை அடைய முடியவில்லை." },
    errorGeneric: { en: "Something went wrong. Please try again.", ta: "பிழை ஏற்பட்டது. மீண்டும் முயலவும்." },
    imageTooLarge: {
      en: "Image too large — use under ~10 MB.",
      ta: "படம் பெரியது — ~10 MB க்குக் குறைவாகப் பயன்படுத்தவும்.",
    },
  },
  libraryUi: {
    search: { en: "Search", ta: "தேடு" },
    placeholder: { en: "Dynasty, king, trade…", ta: "வம்சம், அரசர், வணிகம்…" },
    all: { en: "All", ta: "அனைத்தும்" },
    noMatch: {
      en: "No articles match—try another keyword or category.",
      ta: "பொருத்தம் இல்லை — வேறு சொல் அல்லது வகையை முயலவும்.",
    },
  },
  landing: {
    kicker: { en: "Tamil heritage · AI tutoring", ta: "தமிழ்ப் பாரம்பரியம் · AI கல்வி" },
    lead: {
      en: "A calm, museum-style learning environment that combines retrieval-grounded answers, specialist agents, and cultural context—built for students, teachers, and anyone who cares about Tamil history.",
      ta: "மூல ஆதாரத்துடன் பதில்கள், சிறப்பு முகவர்கள், மற்றும் கலாச்சாரச் சூழல் — மாணவர், ஆசிரியர், வரலாற்றின் மீது அக்கறை கொண்ட அனைவருக்கும்.",
    },
    enterChat: { en: "Enter Chat", ta: "அரட்டைக்குச் செல்" },
    timelinePageCta: { en: "Explore timeline", ta: "காலவரிசையைக் காண்க" },
    whatItDoes: { en: "What it does", ta: "செயல்பாடு" },
    whatItDoesBody: {
      en: "Routes your question through intent detection, historian-grade grounding on archival snippets, optional character/story modes, and validation—then a single clear answer with references when available.",
      ta: "கேள்வியை நோக்கம் கண்டறிதல், காப்பகத் துணுக்குகளில் வரலாற்று அடிப்படை, தேர்வுக்கேற்ற பாத்திரம்/கதை முறைகள், சரிபார்ப்பு வழியே அனுப்புகிறது — பின்னர் தெளிவான பதிவுடன் பதில்.",
    },
    whyExists: { en: "Why it exists", ta: "நோக்கம்" },
    whyExistsBody: {
      en: "To make serious Tamil history easier to learn and to preserve narrative and facts together—without replacing scholars or primary sources.",
      ta: "தமிழ் வரலாற்றை எளிதில் கற்கவும், கதையும் உண்மையும் ஒன்றாகப் பாதுகாக்கவும் — அறிஞர்களையோ மூல நூல்களையோ மாற்றாமல்.",
    },
    exploreTitle: { en: "What you can explore", ta: "ஆராயலாம்" },
    exploreChat: { en: "Chat", ta: "அரட்டை" },
    exploreChatNote: { en: "with inscription photo upload", ta: "கல்வெட்டு புகைப்படம்" },
    exploreTimeline: { en: "Dynastic timeline", ta: "வம்ச காலவரிசை" },
    exploreTour: {
      en: "Heritage tour (Street View)",
      ta: "பாரம்பரிய சுற்றுலா (தெருக்காட்சி)",
    },
    exploreLibrary: { en: "Topic library", ta: "தலைப்பு நூலகம்" },
  },
} as const;

export type PageShellKey = keyof typeof COPY.shell;
