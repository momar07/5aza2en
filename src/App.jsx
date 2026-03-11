import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider }  from "react-helmet-async";
import { Toaster }         from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { AppProvider, useApp } from "./context/AppContext";
import SEOHelmet        from "./components/SEO/SEOHelmet";
import Loader           from "./components/UI/Loader";
import CustomCursor     from "./components/UI/CustomCursor";
import ScrollProgress   from "./components/UI/ScrollProgress";
import Home             from "./pages/Home";
import Products         from "./pages/Products";
import About            from "./pages/About";
import Services         from "./pages/Services";
import Contact          from "./pages/Contact";
import Login            from "./pages/Login";
import DashboardLayout  from "./pages/Dashboard/DashboardLayout";
import Overview         from "./pages/Dashboard/Overview";
import ManageProducts   from "./pages/Dashboard/ManageProducts";
import ManageAds        from "./pages/Dashboard/ManageAds";
import Settings         from "./pages/Dashboard/Settings";

function ProtectedRoute({ children }) {
  const { isAdmin } = useApp();
  return isAdmin ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { loading } = useApp();
  const location    = useLocation();

  if (loading) return <Loader />;

  return (
    <>
      <SEOHelmet />
      <CustomCursor />
      <ScrollProgress />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#E8B96A",
            border: "1px solid rgba(200,151,58,0.3)",
            fontFamily: "Cairo, sans-serif",
            borderRadius: "12px",
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about"    element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index                element={<Overview />} />
            <Route path="products"      element={<ManageProducts />} />
            <Route path="ads"           element={<ManageAds />} />
            <Route path="settings"      element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HelmetProvider>
  );
}
