import type { Category } from "../../data/mockServices";

// Colour map for each subscription category
const categoryColors: Record<Category, string> = {
  Streaming: "bg-purple-100 text-purple-700",
  Music: "bg-pink-100   text-pink-700",
  Software: "bg-sky-100    text-sky-700",
  Productivity: "bg-amber-100  text-amber-700",
  Cloud: "bg-slate-100  text-slate-600",
  Education: "bg-emerald-100 text-emerald-700",
  Health: "bg-rose-100   text-rose-700",
  Finance: "bg-teal-100   text-teal-700",
  Other: "bg-slate-100  text-slate-500",
};

interface BadgeProps {
  label: string;
  variant?: "category" | "status";
}

export default function Badge({ label, variant = "category" }: BadgeProps) {
  // Status badge — green dot for Active, grey dot for Inactive
  if (variant === "status") {
    const isActive = label === "Active";
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
          isActive
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-slate-50 text-slate-500 border-slate-200"
        }`}
      >
        {/* Coloured dot indicator */}
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-emerald-500" : "bg-slate-400"}`}
        />
        {label}
      </span>
    );
  }

  // Category badge — uses the colour map above
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[label as Category] ?? categoryColors.Other}`}
    >
      {label}
    </span>
  );
}
