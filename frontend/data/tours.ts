/** Lat/lng for opening Street View / Maps in Google (new tab). Optional mapsShareUrl is the user’s pinned place link. */



export type TourLocation = {

  id: string;

  title: string;

  description: string;

  lat: number;

  lng: number;

  /** Short Google Maps link (e.g. maps.app.goo.gl) — pinned place in Maps. */

  mapsShareUrl?: string;

};



export type HeritageTour = {

  id: string;

  name: string;

  locations: TourLocation[];

};



/** Eight documented sites, grouped by ruling period / building phase (approximate dates in tour titles). */

export const HERITAGE_TOURS: HeritageTour[] = [

  {

    id: "chola-imperial",

    name: "Imperial Chola — 11th–12th century",

    locations: [

      {

        id: "brihad",

        title: "Brihadeeswarar Temple, Thanjavur",

        description:

          "Śiva temple completed around 1010 CE under Rajaraja I; UNESCO Great Living Chola Temples. Its vimāna scale and Chola bronze tradition anchor studies of South Indian imperial temple programmes.",

        lat: 10.7829,

        lng: 79.1318,

        mapsShareUrl: "https://maps.app.goo.gl/jVKFeHFCoP5KPB1J9",

      },

      {

        id: "gkc",

        title: "Arulmigu Peruvudaiyar Temple, Gangaikonda Cholapuram",

        description:

          "Capital temple founded by Rajendra I (c. 1020s CE); paired with Thanjavur and Darasuram as UNESCO Chola monuments. Key for comparing Rajaraja’s and Rajendra’s monumental patronage.",

        lat: 11.2064,

        lng: 79.4483,

        mapsShareUrl: "https://maps.app.goo.gl/NqW8b9vtibCXpDkk7",

      },

      {

        id: "airavatesvara",

        title: "Airavatesvara Temple, Darasuram",

        description:

          "12th-century Chola complex under Rajaraja II; famed carved narrative panels and courtyard planning. Completes the UNESCO “Great Living Chola Temples” trio with Thanjavur and Gangaikonda Cholapuram.",

        lat: 10.9481,

        lng: 79.3567,

        mapsShareUrl: "https://maps.app.goo.gl/NTqQKqHN9K6nQjPP8",

      },

    ],

  },

  {

    id: "pallava-shore",

    name: "Pallava Mamallapuram — late 7th–8th century",

    locations: [

      {

        id: "shore",

        title: "Shore Temple, Mahabalipuram",

        description:

          "Granite Shore Temple complex attributed to Pallava rulers such as Narasimhavarman II (Rajasimha), late 7th–early 8th century CE. UNESCO site illustrating Pallava coastal architecture before full Chola imperial scale.",

        lat: 12.6167,

        lng: 80.1994,

        mapsShareUrl: "https://maps.app.goo.gl/rePFmboP8usdcy6u9",

      },

    ],

  },

  {

    id: "nayak-madurai",

    name: "Nayak-period Madurai — 16th–17th century",

    locations: [

      {

        id: "meenakshi",

        title: "Meenakshi Amman Temple, Madurai",

        description:

          "Ancient Pandya-associated shrine expanded notably under Nayaka rulers (e.g. major work under Tirumala Nayaka). Towered enclosures exemplify late-medieval Tamil temple–urban growth around the Vaigai sacred core.",

        lat: 9.9195,

        lng: 78.1193,

        mapsShareUrl: "https://maps.app.goo.gl/kyEhgPJDoqckj7TXA",

      },

      {

        id: "nayakkar-mahal",

        title: "Thirumalai Nayakkar Mahal, Madurai",

        description:

          "Palace largely associated with Tirumala Nayaka (17th century): hybrid Indo–Islamic arcades and courtyard layout. Primary secular Nayak landmark beside the Meenakshi temple precinct.",

        lat: 9.9149,

        lng: 78.1196,

        mapsShareUrl: "https://maps.app.goo.gl/ZJgCUrKMAmUgi8rz7",

      },

    ],

  },

  {

    id: "malabar-chera",

    name: "Malabar coast — Chera sphere & Kodungallur",

    locations: [

      {

        id: "kodungallur-bhagavathy",

        title: "Kodungallur Bhagavathy Temple, Kodungallur",

        description:

          "Ancient Kerala shrine at historic Kodungallur (classical Muziris belt), long tied to west-coast trade and Chera-period geography. Central to regional goddess worship and maritime Kerala memory.",

        lat: 10.2276,

        lng: 76.1946,

        mapsShareUrl: "https://maps.app.goo.gl/KRi79Td8QgxFPHcL7",

      },

      {

        id: "cheraman-mosque",

        title: "Cheraman Juma Masjid, Kodungallur",

        description:

          "Malabar mosque traditionally linked to very early Islam on the Kerala coast (popular attribution to the 7th century; scholarly dating varies). Often paired with Muziris-era trade narratives and Arab–Indian Ocean contacts.",

        lat: 10.2189,

        lng: 76.1976,

        mapsShareUrl: "https://maps.app.goo.gl/W9WtBdLa8LRS6g2N6",

      },

    ],

  },

];



/** Opens Google Maps Street View at this viewpoint (new tab). No API key. */

export function googleStreetViewOpenUrl(lat: number, lng: number): string {

  return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;

}

/** Fallback Maps search when no shared pin URL exists. */

export function googleMapsSearchOpenUrl(lat: number, lng: number): string {

  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

}

