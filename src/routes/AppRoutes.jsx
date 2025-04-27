import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import { useAuth } from '../context/AuthContext';
import AddMeasurement from '../pages/AddMeasurement';
import MeasurementHistory from "../pages/MeasurementHistory";
import HealthTips from '../pages/HealthTips';
import Medications from "../pages/Medications";
import ContactDoctor from '../pages/ContactDoctor';
import Messages from '../pages/Messages';
import Profile from '../pages/Profile';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import InsulinCalculator from '../pages/InsulinCalculatorCarbs';
import HbA1cTest from '../pages/HbA1cTest'; // ✅ أضفنا استيراد HbA1cTest

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/add-measurement"
        element={token ? <AddMeasurement /> : <Navigate to="/login" />}
      />
      <Route
        path="/history"
        element={token ? <MeasurementHistory /> : <Navigate to="/login" />}
      />
      <Route
        path="/tips"
        element={token ? <HealthTips /> : <Navigate to="/login" />}
      />
      <Route
        path="/medications"
        element={token ? <Medications /> : <Navigate to="/login" />}
      />
      <Route
        path="/contact"
        element={token ? <ContactDoctor /> : <Navigate to="/login" />}
      />
      <Route
        path="/messages"
        element={token ? <Messages /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/hba1c"
        element={token ? <HbA1cTest /> : <Navigate to="/login" />}
      /> {/* ✅ مسار فحص HbA1c */}
      
      <Route
        path="/insulin"
        element={token ? <InsulinCalculator /> : <Navigate to="/login" />}
      />
      <Route path="/about" element={<About />} />

      <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
