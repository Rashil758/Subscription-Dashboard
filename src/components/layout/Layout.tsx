import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Toast from "../ui/Toast";
import { useServices } from "../../context/ServiceContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { toast } = useServices();
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
