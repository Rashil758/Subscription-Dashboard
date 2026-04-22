import { useNavigate, Link } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import ServiceForm from "../components/features/ServiceForm";
import { IconArrowLeft } from "../components/ui/Icons";
import type { Service } from "../data/mockServices";

export default function AddService() {
  const { addService } = useServices();
  const navigate = useNavigate();

  // After submitting the form, add the service and go back to the list
  function handleSubmit(data: Omit<Service, "id">) {
    addService(data);
    navigate("/services");
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* ── Back navigation ── */}
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <IconArrowLeft className="w-4 h-4" />
        Back to Services
      </Link>

      {/* ── Page header ── */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-slate-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Add Service
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Fill in the details below to start tracking a new subscription.
        </p>
      </div>

      {/* ── Form card ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <ServiceForm onSubmit={handleSubmit} submitLabel="Add Service" />
      </div>
    </div>
  );
}
