import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAdminEmails } from "@/lib/admin-auth";
import AdminLoginForm from "./AdminLoginForm";
import { Suspense } from "react";

export const metadata = {
  title: "Admin Login | PixPassport",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  const adminEmails = getAdminEmails();
  const userEmail = session?.user?.email?.toLowerCase().trim() || "";

  // If already logged in with admin credentials, redirect to /admin directly
  if (session && adminEmails.includes(userEmail)) {
    redirect("/admin");
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
          Loading Admin Portal...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
