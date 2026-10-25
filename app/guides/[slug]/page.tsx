import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideArticle from "@/app/components/guides/GuideArticle";
import { buildGuideMetadata, getAllGuideSlugs, getGuide } from "@/lib/guides";

interface Props {
  params: Promise<{ slug: string }>;
}

// Only files that exist at build time are served; unknown slugs 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  return guide ? buildGuideMetadata(guide) : { title: "Page not found | PixPassport" };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
