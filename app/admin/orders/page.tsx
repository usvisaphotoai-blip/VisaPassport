import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import User from "@/models/User";
import fs from "fs/promises";
import path from "path";
import Image from "next/image";

// Disable caching for admin dashboard
export const revalidate = 0;

export default async function AdminOrdersPage() {
  await dbConnect();

  // Fetch paid photos
  const paidPhotos = await Photo.find({ status: "paid" }).sort({ createdAt: -1 });

  // Get unique user IDs to fetch emails
  const userIds = Array.from(new Set(paidPhotos.map((p) => p.userId).filter(Boolean)));
  const users = await User.find({ _id: { $in: userIds } }).select("email");
  const userMap = users.reduce((acc: any, user: any) => {
    acc[user._id.toString()] = user.email;
    return acc;
  }, {});

  // Load country specs for mapping
  const specsPath = path.join(process.cwd(), "data", "countries-specs.json");
  const specsData = JSON.parse(await fs.readFile(specsPath, "utf-8"));
  const countryMap = specsData.reduce((acc: any, country: any) => {
    acc[country.id] = country.name;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-600 text-white p-2 rounded-xl text-xl shadow-lg">
            📦
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Paid Photo Downloads
          </h1>
        </div>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Track and manage all processed photos that have been successfully paid for. 
          Monitor customer activity and document types in real-time.
        </p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User / Guest</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Country / Spec</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Preview</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paidPhotos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                    No paid photos found yet. Keep marketing! 🚀
                  </td>
                </tr>
              ) : (
                paidPhotos.map((photo: any) => {
                  const email = photo.guestEmail || userMap[photo.userId?.toString()] || "Anonymous";
                  const countryName = countryMap[photo.documentType] || photo.documentType;
                  
                  return (
                    <tr key={photo._id.toString()} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{email}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 font-mono uppercase tracking-tighter">
                            {photo.userId ? "Registered" : "Guest Checkout"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700">{countryName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{photo.documentType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-600">
                            {new Date(photo.createdAt).toLocaleDateString(undefined, { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(photo.createdAt).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 group cursor-zoom-in">
                          <Image
                            src={photo.previewUrl || photo.secureUrl}
                            alt="Photo Preview"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <a 
                            href={photo.secureUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {photo.razorpayPaymentId ? (
                            <code className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-mono border border-emerald-100 w-fit">
                              {photo.razorpayPaymentId}
                            </code>
                          ) : (
                            <span className="text-xs text-slate-400 italic">No manual ID</span>
                          )}
                          <span className="text-[9px] text-slate-300 font-mono">
                            {photo.razorpayOrderId}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
