import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import HomeDesigns from "./pages/HomeDesigns";
import About from "./pages/About";
import Process from "./pages/Process";
import ServiceDetail from "./pages/ServiceDetail";
import Consultation from "./pages/Consultation";
import ConsultationInfo from "./pages/ConsultationInfo";
import CustomerPortal from "./pages/CustomerPortal";
import AdminDashboard from "./pages/AdminDashboard";

import DesignDetail from "./pages/DesignDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="designs" element={<HomeDesigns />} />
          <Route path="designs/:id" element={<DesignDetail />} />
          <Route path="about" element={<About />} />
          <Route path="process" element={<Process />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="consultation-info" element={<ConsultationInfo />} />
          <Route path="portal" element={<CustomerPortal />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
