import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Define authorized admin emails in .env.local via ADMIN_EMAILS (comma separated)
  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];

  const userEmail = session?.user?.email?.toLowerCase() || "";

  if (!session || !adminEmails.includes(userEmail)) {
    redirect("/"); // Kick out non-admins
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-4 bg-slate-950 font-black text-white text-lg tracking-tight">
          AdminPanel
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link
            href="/admin"
            className="px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
          >
            📊 Analytics
          </Link>
          <Link
            href="/admin/blogs"
            className="px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
          >
            ✍️ Manage Blogs
          </Link>
          <Link
            href="/admin/feedback"
            className="px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
          >
            💬 View Feedback
          </Link>
          <a
            href="/"
            className="px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors font-medium text-sm flex items-center gap-2 text-slate-400 mt-auto"
          >
            ← Back to Site
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">{children}</div>
    </div>
  );
}
