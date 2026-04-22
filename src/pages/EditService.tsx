import { useNavigate, useParams, Link } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import ServiceForm from "../components/features/ServiceForm";
import { IconArrowLeft, IconWarning } from "../components/ui/Icons";
import type { Service } from "../data/mockServices";

export default function EditService() {
  const { id } = useParams<{ id: string }>();
  const { getServiceById, updateService } = useServices();
  const navigate = useNavigate();

  const service = id ? getServiceById(id) : null;

  // Error state — shown if the service ID in the URL doesn't match any service
  if (!service) {
    return (
      <div className="max-w-lg mx-auto text-center py-24">
        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <IconWarning className="w-7 h-7 text-amber-500" />
        </div>
        <h2
          className="text-2xl font-bold text-slate-800 mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Service Not Found
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          This service may have been deleted or the link is incorrect.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  // Save changes and return to the services list
  function handleSubmit(data: Omit<Service, "id">) {
    updateService(service!.id, data);
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

      {/* ── Page header with service name ── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          {/* Service initial badge */}
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-500">
              {service.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1
            className="text-3xl font-bold text-slate-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Edit Service
          </h1>
        </div>
        <p className="text-slate-500 text-sm mt-1 ml-13">
          Editing <strong className="text-slate-700">{service.name}</strong>
        </p>
      </div>

      {/* ── Pre-filled form card ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <ServiceForm
          initialData={service}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
