import React, { useState } from "react";

function StarRating({ rating, setRating }: { rating: number; setRating?: (r: number) => void }) {
  return (
    <div className="flex text-amber-400 text-lg cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating && setRating(star)}
          className={`w-6 h-6 ${star <= rating ? "fill-current" : "text-gray-300 fill-current"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const text = formData.get("review") as string;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text, rating, country: "USA" })
      });

      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 3000);
      }
    } catch (error) {
      console.error("Failed to submit review", error);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          ✕
        </button>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Leave a Review</h3>
        <p className="text-slate-500 mb-6 text-sm">How was your experience generating your visa photo with us?</p>

        {formState === "success" ? (
          <div className="bg-emerald-50 text-emerald-800 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <svg className="w-16 h-16 text-emerald-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h4 className="font-bold text-xl mb-2">Thank you!</h4>
            <p className="text-sm">Your review has been published on our wall.</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-[#3b5bdb] text-white rounded-lg font-bold shadow-sm hover:bg-[#2f4ac7] transition"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formState === "error" && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm border border-red-100">
                Something went wrong. Please try again later.
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/50 focus:border-transparent transition"
                placeholder="Ex. John Doe"
                disabled={formState === "submitting"}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Rating</label>
              <StarRating rating={rating} setRating={setRating} />
            </div>
            <div>
              <label htmlFor="review" className="block text-sm font-bold text-slate-700 mb-1">Your Review</label>
              <textarea
                id="review"
                name="review"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/50 focus:border-transparent transition resize-none"
                placeholder="Tell us what you loved..."
                disabled={formState === "submitting"}
              />
            </div>
            <button
              type="submit"
              disabled={formState === "submitting"}
              className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg shadow-[#3b5bdb]/20 text-base font-bold text-white bg-[#3b5bdb] hover:bg-[#2f4ac7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5bdb] transition-all disabled:opacity-70 mt-2"
            >
              {formState === "submitting" ? "Publishing..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
