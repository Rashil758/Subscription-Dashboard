import { useState } from "react";
import {
  CATEGORIES,
  BILLING_CYCLES,
  EMOJI_MAP,
  type Service,
  type Category,
  type BillingCycle,
  type ServiceStatus,
} from "../../data/mockServices";

type FormData = {
  name: string;
  category: Category | "";
  price: string;
  billingCycle: BillingCycle;
  status: ServiceStatus;
  startDate: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: Omit<Service, "id">) => void;
  submitLabel?: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  category: "",
  price: "",
  billingCycle: "Monthly",
  status: "Active",
  startDate: "",
};

// Shared input style — used for all text/number/date/select inputs
const inputBase =
  "w-full px-4 py-2.5 text-sm bg-white border rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-150 placeholder-slate-400";

export default function ServiceForm({
  initialData,
  onSubmit,
  submitLabel = "Add Service",
}: ServiceFormProps) {
  const [form, setForm] = useState<FormData>(
    initialData
      ? {
          name: initialData.name,
          category: initialData.category,
          price: String(initialData.price),
          billingCycle: initialData.billingCycle,
          status: initialData.status,
          startDate: initialData.startDate,
        }
      : EMPTY_FORM,
  );
  const [errors, setErrors] = useState<FormErrors>({});

  // Update one field and clear its error immediately
  function handleChange<K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  // Validate all required fields before submitting
  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Service name is required.";
    else if (form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters.";
    if (!form.category) e.category = "Please select a category.";
    if (!form.price) e.price = "Price is required.";
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Enter a valid price greater than zero.";
    if (!form.startDate) e.startDate = "Start date is required.";
    return e;
  }

  function handleSubmit() {
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    const category = form.category as Category;
    onSubmit({
      name: form.name.trim(),
      category,
      price: parseFloat(form.price),
      billingCycle: form.billingCycle,
      status: form.status,
      startDate: form.startDate,
      emoji: EMOJI_MAP[category],
    });
  }

  const inputCls = (field: keyof FormData) =>
    `${inputBase} ${errors[field] ? "border-rose-300 bg-rose-50/50" : "border-slate-200"}`;

  return (
    <div className="space-y-5">
      {/* ── Service Name ── */}
      <div>
        <label
          htmlFor="service-name"
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          Service Name{" "}
          <span className="text-rose-400 font-normal" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="service-name"
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g. Netflix, Spotify, AWS"
          className={inputCls("name")}
          aria-required="true"
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p
            id="name-error"
            role="alert"
            className="text-xs text-rose-500 mt-1.5 flex items-center gap-1"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* ── Category ── */}
      <div>
        <label
          htmlFor="service-category"
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          Category{" "}
          <span className="text-rose-400 font-normal" aria-hidden="true">
            *
          </span>
        </label>
        <select
          id="service-category"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value as Category)}
          className={inputCls("category")}
          aria-required="true"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && (
          <p role="alert" className="text-xs text-rose-500 mt-1.5">
            {errors.category}
          </p>
        )}
      </div>

      {/* ── Price + Billing Cycle (side by side) ── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="service-price"
            className="block text-sm font-semibold text-slate-700 mb-1.5"
          >
            Price (USD){" "}
            <span className="text-rose-400 font-normal" aria-hidden="true">
              *
            </span>
          </label>
          <div className="relative">
            {/* Dollar sign prefix inside input */}
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">
              $
            </span>
            <input
              id="service-price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="0.00"
              className={`${inputCls("price")} pl-8`}
              aria-required="true"
            />
          </div>
          {errors.price && (
            <p role="alert" className="text-xs text-rose-500 mt-1.5">
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="billing-cycle"
            className="block text-sm font-semibold text-slate-700 mb-1.5"
          >
            Billing Cycle
          </label>
          <select
            id="billing-cycle"
            value={form.billingCycle}
            onChange={(e) =>
              handleChange("billingCycle", e.target.value as BillingCycle)
            }
            className={inputCls("billingCycle")}
          >
            {BILLING_CYCLES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Start Date ── */}
      <div>
        <label
          htmlFor="start-date"
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          Start Date{" "}
          <span className="text-rose-400 font-normal" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="start-date"
          type="date"
          value={form.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          className={inputCls("startDate")}
          aria-required="true"
        />
        {errors.startDate && (
          <p role="alert" className="text-xs text-rose-500 mt-1.5">
            {errors.startDate}
          </p>
        )}
      </div>

      {/* ── Status toggle ── */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-2">Status</p>
        <div className="inline-flex gap-1 bg-slate-100 p-1 rounded-xl">
          {(["Active", "Inactive"] as ServiceStatus[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleChange("status", s)}
              aria-pressed={form.status === s}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                form.status === s
                  ? s === "Active"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "bg-white text-slate-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Submit button ── */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
            text-white font-semibold text-sm py-3 rounded-xl
            transition-colors duration-150 shadow-sm"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
