import { type ReactNode } from "react";

// Reusable stat card shown on the Dashboard page.
// accent controls the icon background colour.

interface DashboardCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent: "emerald" | "rose" | "amber" | "sky";
  icon: ReactNode;
}

const accentMap: Record<DashboardCardProps["accent"], string> = {
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50   text-rose-500",
  amber: "bg-amber-50  text-amber-500",
  sky: "bg-sky-50    text-sky-500",
};

export default function DashboardCard({
  label,
  value,
  sub,
  accent,
  icon,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm fade-in">
      {/* Icon badge */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${accentMap[accent]}`}
      >
        {icon}
      </div>

      {/* Main number */}
      <p
        className="text-2xl font-bold text-slate-900 leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </p>

      {/* Label */}
      <p className="text-sm font-medium text-slate-600 mt-1.5">{label}</p>

      {/* Optional sub-label */}
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}
