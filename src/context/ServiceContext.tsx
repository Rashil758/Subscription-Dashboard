import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { mockServices, type Service } from "../data/mockServices";

// Types
interface Toast {
  message: string;
  type: "success" | "error";
}

interface ServiceContextValue {
  services: Service[];
  loading: boolean;
  error: string | null;
  toast: Toast | null;
  activeServices: Service[];
  inactiveServices: Service[];
  totalMonthlyCost: number;
  categoryCounts: Record<string, number>;
  addService: (data: Omit<Service, "id">) => void;
  updateService: (id: string, data: Omit<Service, "id">) => void;
  deleteService: (id: string) => void;
  toggleStatus: (id: string) => void;
  getServiceById: (id: string) => Service | null;
}

// Context
const ServiceContext = createContext<ServiceContextValue | null>(null);

// Provider
export function ServiceProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  // Simulate async data load on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("subtrack_services");
        setServices(stored ? (JSON.parse(stored) as Service[]) : mockServices);
        setLoading(false);
      } catch {
        setError("Failed to load services. Please refresh the page.");
        setLoading(false);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("subtrack_services", JSON.stringify(services));
    }
  }, [services, loading]);

  function showToast(message: string, type: Toast["type"] = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function addService(data: Omit<Service, "id">) {
    const newService: Service = { ...data, id: Date.now().toString() };
    setServices((prev) => [newService, ...prev]);
    showToast(`"${data.name}" has been added.`);
  }

  function updateService(id: string, data: Omit<Service, "id">) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s)),
    );
    showToast(`"${data.name}" has been updated.`);
  }

  function deleteService(id: string) {
    const service = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast(`"${service?.name}" has been removed.`, "error");
  }

  function toggleStatus(id: string) {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s,
      ),
    );
  }

  function getServiceById(id: string): Service | null {
    return services.find((s) => s.id === id) ?? null;
  }

  // Derived values
  const activeServices = services.filter((s) => s.status === "Active");
  const inactiveServices = services.filter((s) => s.status === "Inactive");

  const totalMonthlyCost = activeServices.reduce((sum, s) => {
    return sum + (s.billingCycle === "Yearly" ? s.price / 12 : s.price);
  }, 0);

  const categoryCounts = services.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] ?? 0) + 1;
    return acc;
  }, {});

  const value: ServiceContextValue = {
    services,
    loading,
    error,
    toast,
    activeServices,
    inactiveServices,
    totalMonthlyCost,
    categoryCounts,
    addService,
    updateService,
    deleteService,
    toggleStatus,
    getServiceById,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

// Hook
export function useServices(): ServiceContextValue {
  const ctx = useContext(ServiceContext);
  if (!ctx) throw new Error("useServices must be used within ServiceProvider");
  return ctx;
}
