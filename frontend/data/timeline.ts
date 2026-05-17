export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  dynasty: "Chola" | "Pandya" | "Chera" | "General";
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "c. 300 BCE – 300 CE",
    title: "Classical Tamil milieu",
    description:
      "Urban nodes on coast and inland; early Tamil polities and long-distance exchange remembered later as Sangam-era geography.",
    dynasty: "General",
  },
  {
    year: "c. 848–1279 CE",
    title: "High Chola period",
    description:
      "Territorial consolidation under rulers such as Vijayalaya; temple-centered administration and Bay-oriented ventures mature.",
    dynasty: "Chola",
  },
  {
    year: "985–1014 CE",
    title: "Rajaraja Chola I",
    description:
      "Major Brihadeeswarar-style monuments and tighter articulation of Chola power across the Kaveri basin.",
    dynasty: "Chola",
  },
  {
    year: "1014–1044 CE",
    title: "Rajendra Chola & eastern ventures",
    description:
      "Strong naval presence across the Bay of Bengal; ties with Southeast Asian ports intensify.",
    dynasty: "Chola",
  },
  {
    year: "12th–14th cent.",
    title: "Pandya resurgence",
    description:
      "Madurai-centered kingship and renewed sponsorship of Tamil literary life alongside temple networks.",
    dynasty: "Pandya",
  },
  {
    year: "Chera coast",
    title: "Western littoral exchange",
    description:
      "Malabar-side harbours plug west-coast and Indian Ocean circuits—spices, textiles, and shipwright traditions.",
    dynasty: "Chera",
  },
];
