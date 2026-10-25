import type { Metadata } from "next";
import GuideHub from "@/app/components/guides/GuideHub";
import { buildHubMetadata } from "@/lib/guides";

export const metadata: Metadata = buildHubMetadata();

export default function GuidesHubPage() {
  return <GuideHub />;
}
