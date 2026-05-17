"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageShell from "@/components/layout/PageShell";
import {
  HERITAGE_TOURS,
  googleMapsSearchOpenUrl,
  googleStreetViewOpenUrl,
  type HeritageTour,
  type TourLocation,
} from "@/data/tours";
import { ROUTES } from "@/lib/routes";

function chatTopic(loc: TourLocation, tour: HeritageTour) {
  return `${ROUTES.chat}?topic=${encodeURIComponent(
    `Explain the historical significance of ${loc.title} in the context of ${tour.name}. Keep it concise.`,
  )}`;
}

export default function TourClient() {
  const [tourId, setTourId] = useState(HERITAGE_TOURS[0].id);
  const tour = useMemo(
    () => HERITAGE_TOURS.find((t) => t.id === tourId) ?? HERITAGE_TOURS[0],
    [tourId],
  );
  const [locId, setLocId] = useState(tour.locations[0].id);

  const location = useMemo(() => {
    const loc = tour.locations.find((l) => l.id === locId);
    return loc ?? tour.locations[0];
  }, [tour, locId]);

  const streetHref = googleStreetViewOpenUrl(location.lat, location.lng);
  const mapHref = location.mapsShareUrl ?? googleMapsSearchOpenUrl(location.lat, location.lng);

  return (
    <PageShell pageKey="tour">
      <div className="space-y-6">
        <div className="rounded-xl border border-[#e8dfd0] bg-[#fffefb] p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8b7355]">
            Tours
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {HERITAGE_TOURS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTourId(t.id);
                  setLocId(t.locations[0].id);
                }}
                className={`rounded-full px-3 py-2 text-left text-xs font-medium transition sm:text-sm ${
                  tourId === t.id
                    ? "border border-[#c4a574] bg-[#faf3e8] text-[#3d2914]"
                    : "border border-transparent text-[#5c4a3d] hover:bg-[#faf3e8]/80"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#e8dfd0] bg-[#fffefb] p-3 shadow-sm">
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-[#8b7355]">
            Locations
          </p>
          <div className="flex flex-wrap gap-2">
            {tour.locations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setLocId(loc.id)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm ${
                  location.id === loc.id
                    ? "bg-[#4a3428] text-[#faf7f2]"
                    : "bg-[#faf7f2] text-[#5c4a3d] hover:bg-[#e8dfd0]"
                }`}
              >
                {loc.title}
              </button>
            ))}
          </div>
        </div>

        <article className="rounded-xl border border-[#e8dfd0] bg-[#fffefb] p-6 shadow-sm">
          <h2 className="font-tamil text-xl font-semibold text-[#2c1810]">{location.title}</h2>
          <p className="font-heritage mt-3 text-[15px] leading-relaxed text-[#5c4a3d]">
            {location.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={streetHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#5c4333] to-[#3d2914] px-5 py-3 text-sm font-semibold text-[#faf7f2] shadow-md shadow-[#3d2914]/25 transition hover:brightness-110 active:scale-[0.98]"
            >
              <span aria-hidden>📍</span>
              Open Street View
            </a>
            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#c4a574] bg-[#faf3e8] px-5 py-3 text-sm font-semibold text-[#3d2914] shadow-sm transition hover:bg-[#f5ead8] active:scale-[0.98]"
            >
              <span aria-hidden>🗺️</span>
              Open in Google Maps
            </a>
          </div>

          <Link
            href={chatTopic(location, tour)}
            className="mt-5 inline-flex rounded-xl border-2 border-[#6b5344] bg-[#fffefb] px-5 py-2.5 text-sm font-semibold text-[#3d2914] transition hover:bg-[#faf3e8]"
          >
            Ask AI about this place
          </Link>
        </article>
      </div>
    </PageShell>
  );
}
