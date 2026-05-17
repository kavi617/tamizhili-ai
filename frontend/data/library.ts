export type LibraryCategory = "Dynasties" | "Literature" | "Trade" | "Kings";

export type LibraryItem = {
  id: string;
  category: LibraryCategory;
  title: string;
  summary: string;
  titleTa: string;
  summaryTa: string;
};

/** Display labels for filters (keys stay English for state). */
export const CATEGORY_LABELS: Record<
  LibraryCategory,
  { en: string; ta: string }
> = {
  Dynasties: { en: "Dynasties", ta: "வம்சங்கள்" },
  Literature: { en: "Literature", ta: "இலக்கியம்" },
  Trade: { en: "Trade", ta: "வணிகம்" },
  Kings: { en: "Kings", ta: "அரசர்கள்" },
};

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: "chola",
    category: "Dynasties",
    title: "Chola imperial formation",
    summary:
      "Kaveri-hearted polity famous for navy-led outreach and monumental Śaiva programmes—often studied through epigraphy and temple archaeology.",
    titleTa: "சோழர் சாம்ராஜ்ய அமைப்பு",
    summaryTa:
      "காவேரி மண்டல அரசியல்; கடற்படைத் தலைமையிலான வெளிநாட்டுத் தொடர்புகளும் பெரிய சைவ கோயில் திட்டங்களும் புகழ் — கல்வெட்டியல், கோயில் அகழாய்வு வழியாக அறியப்படுவது.",
  },
  {
    id: "pandya",
    category: "Dynasties",
    title: "Pandyas of Madurai",
    summary:
      "Southern lineage remembered alongside Sangam prestige and temple-city patronage across medieval centuries.",
    titleTa: "மதுரை பாண்டியர்",
    summaryTa:
      "தென் வம்சம்; சங்ககாலப் பெருமையும் நடுக்கால கோயில் நகர ஆதரவும் கூடி நினைவுகூறப்படுகிறது.",
  },
  {
    id: "chera",
    category: "Dynasties",
    title: "Chera / Kerala littoral",
    summary:
      "West-coast kingdoms tied to pepper circuits and Indian Ocean sailing traditions linking Arabia and beyond.",
    titleTa: "சேரர் / கேரள கடற்கரை",
    summaryTa:
      "மேற்குக் கடற்கரை அரசுகள்; மிளகு வணிகச் சுற்றுகளும் அரபு உள்ளிட்ட இந்தியப் பெருங்கடல் கப்பல் பாரம்பரியங்களும் இணைந்தவை.",
  },
  {
    id: "sangam",
    category: "Literature",
    title: "Sangam corpus memory",
    summary:
      "Classical Tamil verse anthologies mapping landscapes, ethics, and kings—still central to Tamil literary education.",
    titleTa: "சங்க இலக்கியத் தொகுப்பு நினைவு",
    summaryTa:
      "பண்டைத் தமிழ் பாடல் தொகுப்புகள் — நிலம், ஒழுக்கம், அரசர்கள்; இன்றும் தமிழ் இலக்கியக் கல்வியின் மையம்.",
  },
  {
    id: "silappatikaram",
    category: "Literature",
    title: "Silappatikaram epic lens",
    summary:
      "Narrative glimpse into ancient Tamil urban life, ritual, and overseas traders—interpreted alongside archaeology.",
    titleTa: "சிலப்பதிகாரம் — கண்ணோட்டம்",
    summaryTa:
      "பண்டைத் தமிழ் நகர வாழ்க்கை, சடங்கு, கடல் கடந்த வணிகர் — அகழாய்வுடன் இணைத்து விளக்கப்படுவது.",
  },
  {
    id: "maritime",
    category: "Trade",
    title: "Bay of Bengal circuits",
    summary:
      "Coromandel harbours connecting Tamil merchants with Sri Lanka and Southeast Asian entrepôts.",
    titleTa: "வங்காள விரிவுக்கடல் வணிகப் பாதைகள்",
    summaryTa:
      "கொரமண்டல துறைமுகங்கள்; இலங்கை, தென்கிழக்கு ஆசிய வணிக மையங்களுடன் தமிழ் வணிகரை இணைத்தல்.",
  },
  {
    id: "rajendra",
    category: "Kings",
    title: "Rajendra Chola campaigns",
    summary:
      "Inscriptions celebrate eastern naval projection—subject of debate alongside Southeast Asian material traces.",
    titleTa: "இராசேந்திர சோழர் படையெடுப்புகள்",
    summaryTa:
      "கிழக்குக் கடற்படை வெளிப்பாடு கல்வெட்டுகளில் — தென்கிழக்கு ஆசியப் பொருளியல் சான்றுகளுடன் விவாதத்திற்குரியது.",
  },
  {
    id: "rajaraja",
    category: "Kings",
    title: "Rajaraja Chola temple politics",
    summary:
      "Thanjavur Brihadeeswarar-scale patronage used as window into revenue, ritual, and artisan mobilisation.",
    titleTa: "இராஜராஜ சோழர் கோயில் அரசியல்",
    summaryTa:
      "தஞ்சை பிருஹதீசுவரர் அளவிலான ஆதரவு; வருவாய், சடங்கு, கைத்தறித் தொழிலாளர் ஏற்றுமதி ஆகியவற்றின் சாளரம்.",
  },
];
