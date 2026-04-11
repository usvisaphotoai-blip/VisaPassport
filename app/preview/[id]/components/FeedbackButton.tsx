"use client";
import React, { useState } from "react";

export default function FeedbackButton({ photoId }: { photoId?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, photoId }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setIsOpen(false), 2000);
      }
    } catch {
      alert("Failed to send feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-2 z-50 bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center font-bold"
        aria-label="Feedback"
      >
        💬 Feedback
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2">We value your feedback</h3>
            {success ? (
              <p className="text-lime-600 font-medium py-4">
                Thank you! Your feedback has been sent to our team.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-sm text-slate-500">
                  Did everything work perfectly? Did something break? Please let
                  us know how we can improve.
                </p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                  rows={4}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none text-slate-800"
                  placeholder="Tell us what you think..."
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="w-full bg-lime-600 hover:bg-lime-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  {loading ? "Sending..." : "Submit Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
