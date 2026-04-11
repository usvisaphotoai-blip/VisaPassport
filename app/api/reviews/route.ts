import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET() {
  try {
    await connectMongo();
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    
    // Format them to match the existing INITIAL_REVIEWS shape
    const formattedReviews = reviews.map((r: any) => ({
      id: r._id.toString(),
      name: r.name,
      text: r.text,
      rating: r.rating,
      date: new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(r.createdAt)),
      country: r.country
    }));

    return NextResponse.json({ success: true, reviews: formattedReviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, text, rating, country } = await req.json();

    if (!name || !text) {
      return NextResponse.json({ success: false, error: "Name and review text are required" }, { status: 400 });
    }

    await connectMongo();
    
    // Auto-approve reviews for now. You can change `isApproved` to false if moderation is needed.
    const newReview = await Review.create({
      name,
      text,
      rating: rating || 5,
      country: country || "USA",
      isApproved: true 
    });

    const formattedReview = {
      id: newReview._id.toString(),
      name: newReview.name,
      text: newReview.text,
      rating: newReview.rating,
      date: "Just now",
      country: newReview.country
    };

    return NextResponse.json({ success: true, review: formattedReview }, { status: 201 });
  } catch (error) {
    console.error("Error storing review:", error);
    return NextResponse.json({ success: false, error: "Failed to save review" }, { status: 500 });
  }
}
