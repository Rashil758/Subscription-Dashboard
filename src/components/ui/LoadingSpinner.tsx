import { IconSpinner } from "./Icons";

interface LoadingSpinnerProps {
  message?: string;
}

// Full-page loading state shown while services are being fetched
export default function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-32 gap-4"
      role="status"
      aria-label={message}
    >
      <IconSpinner className="w-8 h-8 text-emerald-500" />
      <p className="text-sm text-slate-400 font-medium">{message}</p>
    </div>
  );
}
