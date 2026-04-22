import { IconCheck, IconTrash } from "./Icons";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

// Toast notification — slides up from the bottom after any user action.
// Green for confirmations, dark for removals.
export default function Toast({ message, type = "success" }: ToastProps) {
  const isError = type === "error";
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 toast-enter
        flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium text-white
        min-w-64 max-w-sm ${isError ? "bg-slate-800" : "bg-emerald-600"}`}
    >
      {/* Icon on the left */}
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isError ? "bg-white/20" : "bg-white/25"}`}
      >
        {isError ? (
          <IconTrash className="w-3.5 h-3.5" />
        ) : (
          <IconCheck className="w-3.5 h-3.5" />
        )}
      </span>
      {message}
    </div>
  );
}
