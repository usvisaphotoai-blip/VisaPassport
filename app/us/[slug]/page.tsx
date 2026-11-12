import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegionalPage, getRegionalPages } from "@/lib/regional-content";
import RegionalGuidePage, { regionalMetadata } from "@/app/components/guide/RegionalGuidePage";

const REGION = "us";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getRegionalPages(REGION).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getRegionalPage(REGION, (await params).slug);
  return page ? regionalMetadata(page) : {};
}

export default async function USGuidePage({ params }: PageProps) {
  const page = getRegionalPage(REGION, (await params).slug);
  if (!page) notFound();
  return <RegionalGuidePage page={page} />;
}
