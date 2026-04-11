// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex bg-slate-50 items-center justify-center min-h-[70vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-lime-200 border-t-lime-600 rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500 animate-pulse tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}
