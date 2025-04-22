import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LandingPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-center bg-light">
      <div className="container">
        <h1 className="display-4 fw-bold mb-3 text-primary">👋 Welcome to Chronicare</h1>
        <p className="lead mb-4">
          Your intelligent assistant for managing <strong>Diabetes</strong> and <strong>Hypertension</strong>.
        </p>

        <div className="mb-4">
          <img
            src="../public/cronic.jpg"
            alt="health icon"
            style={{ width: "230px" }}
          />
        </div>

        <Link to="/login" className="btn btn-primary btn-lg px-5">Get Started</Link>
        <div className="mt-3">
          <Link to="/about" className="btn btn-outline-secondary">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
