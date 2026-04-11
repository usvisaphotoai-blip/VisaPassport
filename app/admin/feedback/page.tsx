import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  const session = await getServerSession(authOptions);
  
  // Security check is technically handled in AdminLayout, but doing a double check
  if (!session) redirect("/");

  await dbConnect();
  
  // Parse all feedbacks, sorting by newest first
  const feedbacks = await Feedback.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-slate-800 tracking-tight">User Feedback</h1>
      <p className="text-slate-500 max-w-2xl">
        Monitor reviews and feedback submitted by users on the preview checkout pages.
      </p>

      {feedbacks.length === 0 ? (
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <p className="text-slate-500 font-medium">No feedback received yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((fb: any) => (
            <div key={fb._id.toString()} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {new Date(fb.createdAt).toLocaleDateString()} at {new Date(fb.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {fb.userEmail && (
                  <span className="text-xs text-lime-700 bg-lime-50 px-2 py-1 rounded-full font-medium truncate max-w-[120px]" title={fb.userEmail}>
                    {fb.userEmail}
                  </span>
                )}
              </div>
              
              <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">
                "{fb.message}"
              </p>
              
              {fb.photoId && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1 uppercase font-semibold tracking-wider">Related Photo ID</span>
                  <Link href={`/preview/${fb.photoId}`} className="text-xs font-mono bg-slate-50 px-2 py-1 rounded text-slate-600 hover:text-lime-600 transition-colors">
                    {fb.photoId}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
