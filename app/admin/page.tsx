import connectToDatabase from "@/lib/mongodb";
import AnalyticsSession from "@/models/AnalyticsSession";
import AnalyticsEvent from "@/models/AnalyticsEvent";

// Disable caching for admin dashboard
export const revalidate = 0;

export default async function AdminDashboardPage() {
  await connectToDatabase();

  // Metrics
  const totalSessions = await AnalyticsSession.countDocuments();
  const totalPageViews = await AnalyticsSession.aggregate([
    { $group: { _id: null, total: { $sum: "$pageViews" } } },
  ]);
  const avgDuration = await AnalyticsSession.aggregate([
    { $group: { _id: null, avg: { $avg: "$duration" } } },
  ]);

  const razorpayOpens = await AnalyticsEvent.countDocuments({
    eventType: "razorpay_open",
  });

  const countryStatsRaw = await AnalyticsSession.aggregate([
    { $group: { _id: "$country", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  const pageViews = totalPageViews[0]?.total || 0;
  const timeSpentRaw = avgDuration[0]?.avg || 0;
  const timeSpentFormatted =
    timeSpentRaw > 60
      ? `${Math.floor(timeSpentRaw / 60)}m ${Math.floor(timeSpentRaw % 60)}s`
      : `${Math.floor(timeSpentRaw)}s`;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Overview Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor your traffic, engagement, and conversion metrics in real-time.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI value={totalSessions.toString()} label="Unique Sessions" icon="👥" />
        <KPI value={pageViews.toString()} label="Total Page Views" icon="📄" />
        <KPI value={timeSpentFormatted} label="Avg Time Spent" icon="⏱️" />
        <KPI
          value={razorpayOpens.toString()}
          label="Razorpay Checkouts Opened"
          icon="💳"
          highlight
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Stats */}
        <div className="bg-white border text-sm border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            🌍 Top Locations
          </h3>
          <div className="space-y-3">
            {countryStatsRaw.map((stat) => (
              <div
                key={stat._id || "Unknown"}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 font-medium">
                    {stat._id === "Unknown" ? "Unknown (Local/VPN)" : stat._id}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{stat.count}</span>
                  <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          (stat.count / Math.max(1, totalSessions)) * 100 * 2,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informative / Call to action */}
        <div className="bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-start">
          <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4">
            ✨
          </div>
          <h3 className="text-lg font-black text-indigo-900 mb-2">
            Conversion Rate Insights
          </h3>
          <p className="text-sm text-indigo-800/80 leading-relaxed mb-4">
            Out of {totalSessions} total visitors, {razorpayOpens} have initiated
            the Razorpay checkout flow. Focus on optimizing the top-of-funnel
            pages to increase the checkout initiation rate.
          </p>
          <div className="w-full bg-white/60 p-4 rounded-xl border border-white flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-widest">
              Checkout Rate
            </span>
            <span className="text-xl font-black text-indigo-600">
              {totalSessions > 0
                ? ((razorpayOpens / totalSessions) * 100).toFixed(1)
                : 0}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-2xl border ${
        highlight
          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200"
          : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xl ${
            highlight ? "opacity-100 bg-white/20 p-2 rounded-lg" : "opacity-80"
          }`}
        >
          {icon}
        </span>
      </div>
      <div
        className={`text-3xl font-black tracking-tight mb-1 ${
          highlight ? "text-white" : "text-slate-900"
        }`}
      >
        {value}
      </div>
      <div
        className={`text-xs font-bold ${
          highlight ? "text-indigo-100" : "text-slate-500"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
