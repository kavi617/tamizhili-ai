import type { Metadata } from "next";
import TourClient from "@/components/tour/TourClient";

export const metadata: Metadata = {
  title: "Heritage Tour · தமிழி AI",
};

export default function TourPage() {
  return <TourClient />;
}
