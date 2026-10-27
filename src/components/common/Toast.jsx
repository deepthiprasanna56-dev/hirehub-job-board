import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function Toast() {
  const { toasts, removeToast } = useJobs();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === "success"
              ? "bg-white/95 text-slate-800 border-emerald-200 shadow-emerald-500/10"
              : toast.type === "error"
              ? "bg-white/95 text-slate-800 border-rose-200 shadow-rose-500/10"
              : "bg-white/95 text-slate-800 border-indigo-200 shadow-indigo-500/10"
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-5 h-5 text-rose-600" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-indigo-600" />
            )}
          </div>

          <div className="flex-1 text-sm font-medium leading-relaxed">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
