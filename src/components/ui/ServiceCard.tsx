import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "./Badge";
import Modal from "./Modal";
import { IconEdit, IconTrash, IconPower } from "./Icons";
import { useServices } from "../../context/ServiceContext";
import type { Service } from "../../data/mockServices";

export default function ServiceCard({ service }: { service: Service }) {
  const { deleteService, toggleStatus } = useServices();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // If billing is yearly, convert to monthly cost for display
  const monthlyCost =
    service.billingCycle === "Yearly"
      ? (service.price / 12).toFixed(2)
      : service.price.toFixed(2);

  const isActive = service.status === "Active";

  return (
    <>
      <div
        className={`bg-white rounded-2xl border shadow-sm p-5 fade-in flex flex-col gap-4 transition-all duration-200 hover:shadow-md ${
          isActive ? "border-slate-200" : "border-slate-200 opacity-60"
        }`}
      >
        {/* ── Top row: service name + status badge ── */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {/* Service initial avatar */}
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-slate-500">
                {service.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              {/* Service name — truncated if too long */}
              <h3 className="font-semibold text-slate-800 text-sm truncate">
                {service.name}
              </h3>
              <div className="mt-1">
                <Badge label={service.category} variant="category" />
              </div>
            </div>
          </div>
          <Badge label={service.status} variant="status" />
        </div>

        {/* ── Price display ── */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-2xl font-bold text-slate-900 leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ${monthlyCost}
                <span
                  className="text-sm font-normal text-slate-400 ml-0.5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  /mo
                </span>
              </p>
              {/* Show yearly note if billed annually */}
              {service.billingCycle === "Yearly" && (
                <p className="text-xs text-slate-400 mt-1">
                  Billed ${service.price.toFixed(2)} yearly
                </p>
              )}
            </div>
            {/* Started date */}
            <p className="text-xs text-slate-400">
              Since{" "}
              {new Date(service.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
          {/* Toggle active/inactive */}
          <button
            onClick={() => toggleStatus(service.id)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-150 ${
              isActive
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
            aria-label={`${isActive ? "Pause" : "Reactivate"} ${service.name}`}
          >
            <IconPower className="w-3.5 h-3.5" />
            {isActive ? "Pause" : "Reactivate"}
          </button>

          {/* Spacer pushes edit and delete to the right */}
          <div className="flex-1" />

          {/* Edit */}
          <button
            onClick={() => navigate(`/edit/${service.id}`)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors duration-150"
            aria-label={`Edit ${service.name}`}
          >
            <IconEdit className="w-3.5 h-3.5" />
            Edit
          </button>

          {/* Delete — opens confirmation modal */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors duration-150"
            aria-label={`Delete ${service.name}`}
          >
            <IconTrash className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showModal && (
        <Modal
          title="Delete Service"
          message={`Are you sure you want to remove "${service.name}"? This cannot be undone.`}
          onConfirm={() => {
            deleteService(service.id);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
