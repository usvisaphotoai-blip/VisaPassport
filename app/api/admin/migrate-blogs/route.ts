import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    await connectToDatabase();
    const dataPath = path.join(process.cwd(), "data", "blog-posts.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const posts = JSON.parse(rawData);

    const migrated = [];
    for (const post of posts) {
      const existing = await Blog.findOne({ slug: post.slug });
      if (!existing) {
        const p = await Blog.create({ ...post, isPublished: true });
        migrated.push(p.slug);
      }
    }
    return NextResponse.json({ success: true, migrated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
