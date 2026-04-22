import { IconSearch } from "../ui/Icons";

type FilterOption = "All" | "Active" | "Inactive";

interface FilterBarProps {
  search: string;
  onSearch: (value: string) => void;
  filter: FilterOption;
  onFilter: (value: FilterOption) => void;
}

const FILTERS: FilterOption[] = ["All", "Active", "Inactive"];

// Search bar + filter button group shown above the services list
export default function FilterBar({
  search,
  onSearch,
  filter,
  onFilter,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* ── Search input ── */}
      <div className="relative flex-1">
        <label htmlFor="search-services" className="sr-only">
          Search services
        </label>

        {/* Search icon inside the input */}
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <IconSearch className="w-4 h-4" />
        </span>

        <input
          id="search-services"
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by name or category..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl
            text-slate-700 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent
            transition-all duration-150"
        />
      </div>

      {/* ── Filter buttons ── */}
      <div
        className="flex gap-1.5 bg-slate-100 p-1 rounded-xl"
        role="group"
        aria-label="Filter services by status"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilter(f)}
            aria-pressed={filter === f}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
              filter === f
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
