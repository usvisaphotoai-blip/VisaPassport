"use client";

import dynamic from "next/dynamic";

// Lazy-loaded so the root not-found boundary doesn't pull the photo tool
// (and its country specs data) into every route's client bundle.
const ToolPage = dynamic(() => import("../passport-photo-online/page"));

export default function NotFoundTool() {
  return <ToolPage />;
}
