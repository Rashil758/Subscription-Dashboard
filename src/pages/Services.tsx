import { useState } from "react";
import { Link } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import ServiceCard from "../components/ui/ServiceCard";
import FilterBar from "../components/features/FilterBar";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { IconGrid, IconPlus, IconSearch } from "../components/ui/Icons";

type FilterOption = "All" | "Active" | "Inactive";

export default function Services() {
  const { services, loading, error } = useServices();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterOption>("All");

  if (loading) return <LoadingSpinner message="Loading services..." />;
  if (error)
    return (
      <div className="text-center py-24">
        <p className="text-rose-500 font-medium">{error}</p>
      </div>
    );

  // Filter services by search term and active/inactive status
  const filtered = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const activeCount = services.filter((s) => s.status === "Active").length;

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-3xl font-bold text-slate-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            All Services
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {services.length} subscription{services.length !== 1 ? "s" : ""} ·{" "}
            {activeCount} active
          </p>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600
            text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors flex-shrink-0"
        >
          <IconPlus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      {/* ── Search and filter bar ── */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
      />

      {/* ── Results count (shown only when filtering or searching) ── */}
      {(search || filter !== "All") && (
        <p className="text-sm text-slate-400 -mt-2">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          {search ? ` for "${search}"` : ""}
        </p>
      )}

      {/* ── Service cards grid or empty state ── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-16 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            {search ? (
              <IconSearch className="w-6 h-6 text-slate-400" />
            ) : (
              <IconGrid className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <p className="text-slate-700 font-semibold mb-1">
            {search ? "No results found" : "No services yet"}
          </p>
          <p className="text-slate-400 text-sm">
            {search
              ? `Nothing matched "${search}". Try a different term.`
              : "Add your first subscription to get started."}
          </p>
          {!search && (
            <Link
              to="/add"
              className="inline-flex items-center gap-2 mt-4 bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors"
            >
              <IconPlus className="w-4 h-4" />
              Add Service
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
