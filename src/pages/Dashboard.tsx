import { Link } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import DashboardCard from "../components/ui/DashboardCard";
import ServiceCard from "../components/ui/ServiceCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import {
  IconCreditCard,
  IconCheckCircle,
  IconPause,
  IconGrid,
  IconTrendingUp,
  IconPlus,
  IconChevronRight,
} from "../components/ui/Icons";

export default function Dashboard() {
  const {
    services,
    loading,
    error,
    activeServices,
    inactiveServices,
    totalMonthlyCost,
    categoryCounts,
  } = useServices();

  if (loading) return <LoadingSpinner message="Loading your dashboard..." />;
  if (error)
    return (
      <div className="text-center py-24">
        <p className="text-rose-500 font-medium">{error}</p>
      </div>
    );

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const recentServices = services.slice(0, 4);
  const yearlyCost = totalMonthlyCost * 12;

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-3xl font-bold text-slate-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track your subscriptions and monthly spending at a glance.
          </p>
        </div>
        <Link
          to="/add"
          className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          <IconPlus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          label="Monthly Spend"
          value={`$${totalMonthlyCost.toFixed(2)}`}
          sub="Active services only"
          accent="emerald"
          icon={<IconCreditCard className="w-5 h-5" />}
        />
        <DashboardCard
          label="Active Services"
          value={activeServices.length}
          sub={`of ${services.length} total`}
          accent="sky"
          icon={<IconCheckCircle className="w-5 h-5" />}
        />
        <DashboardCard
          label="Paused Services"
          value={inactiveServices.length}
          sub="Not being billed"
          accent="amber"
          icon={<IconPause className="w-5 h-5" />}
        />
        <DashboardCard
          label="Categories"
          value={Object.keys(categoryCounts).length}
          sub="Types of subscriptions"
          accent="rose"
          icon={<IconGrid className="w-5 h-5" />}
        />
      </div>

      {/* ── Main content: recent services + sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent services — left column takes 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-lg font-bold text-slate-800"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Recent Services
            </h2>
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              View all
              <IconChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Empty state if no services exist yet */}
          {recentServices.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <IconGrid className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-700 font-semibold mb-1">
                No services yet
              </p>
              <p className="text-slate-400 text-sm mb-4">
                Add your first subscription to start tracking.
              </p>
              <Link
                to="/add"
                className="inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors"
              >
                <IconPlus className="w-4 h-4" />
                Add Service
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar — right column takes 1/3 width */}
        <div className="space-y-4">
          {/* Yearly cost projection card */}
          <div className="bg-slate-900 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <IconTrendingUp className="w-4 h-4 text-emerald-400" />
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
                Yearly Projection
              </p>
            </div>
            <p
              className="text-4xl font-bold leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ${yearlyCost.toFixed(2)}
            </p>
            <p className="text-slate-400 text-xs mt-2">
              ${totalMonthlyCost.toFixed(2)} per month × 12
            </p>
          </div>

          {/* Category breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">
              By Category
            </h3>
            {topCategories.length === 0 ? (
              <p className="text-slate-400 text-sm">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {topCategories.map(([category, count]) => {
                  const percent = Math.round((count / services.length) * 100);
                  return (
                    <div key={category}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-600">
                          {category}
                        </span>
                        <span className="text-slate-400">{count}</span>
                      </div>
                      {/* Progress bar showing proportion of this category */}
                      <div
                        className="h-1.5 bg-slate-100 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${category}: ${percent}%`}
                      >
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
