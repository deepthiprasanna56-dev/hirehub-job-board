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
          className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl shadow-2xl border backdrop-blur-2xl transition-all duration-300 transform translate-y-0 ${
            toast.type === "success"
              ? "bg-slate-900/95 text-white border-amber-500/40 gold-glow"
              : toast.type === "error"
              ? "bg-slate-900/95 text-white border-rose-500/40 shadow-rose-500/10"
              : "bg-slate-900/95 text-white border-white/20 shadow-xl"
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-amber-300" />
            )}
          </div>

          <div className="flex-1 text-sm font-semibold leading-relaxed">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
