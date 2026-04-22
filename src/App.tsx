import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ServiceProvider } from "./context/ServiceContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";

export default function App() {
  return (
    <BrowserRouter>
      <ServiceProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/add" element={<AddService />} />
            <Route path="/edit/:id" element={<EditService />} />
            <Route
              path="*"
              element={
                <div className="text-center py-24">
                  <p className="text-5xl mb-4" aria-hidden="true">
                    🔍
                  </p>
                  <h2
                    className="text-2xl font-bold text-slate-800 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Page Not Found
                  </h2>
                  <p className="text-slate-500 text-sm">
                    The page you are looking for does not exist.
                  </p>
                </div>
              }
            />
          </Routes>
        </Layout>
      </ServiceProvider>
    </BrowserRouter>
  );
}
