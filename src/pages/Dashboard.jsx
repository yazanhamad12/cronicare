import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [latestMeasurement, setLatestMeasurement] = useState(null);

  useEffect(() => {
    const measurements = JSON.parse(localStorage.getItem("measurements")) || [];
    if (measurements.length > 0) {
      setLatestMeasurement(measurements[measurements.length - 1]); // آخر قياس
    }
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {user?.name} 👋</h2>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow">
            <div className="card-body">
              <h5 className="card-title">Blood Sugar</h5>
              <p className="card-text fs-4">
                {latestMeasurement?.glucose
                  ? `${latestMeasurement.glucose} mg/dL`
                  : "No Data"}
              </p>
              <small>
                {latestMeasurement
                  ? `Last updated: ${new Date(latestMeasurement.date).toLocaleString()}`
                  : "No recent measurement"}
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success shadow">
            <div className="card-body">
              <h5 className="card-title">Blood Pressure</h5>
              <p className="card-text fs-4">
                {latestMeasurement?.bloodPressure
                  ? latestMeasurement.bloodPressure
                  : "No Data"}
              </p>
              <small>
                {latestMeasurement
                  ? `Last updated: ${new Date(latestMeasurement.date).toLocaleString()}`
                  : "No recent measurement"}
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning shadow">
            <div className="card-body">
              <h5 className="card-title">Medications</h5>
              <p className="card-text fs-5">Metformin, Insulin</p>
              <small>Next dose: 7:00 PM</small>
            </div>
          </div>
        </div>
      </div>

     
      <div className="d-grid gap-3" style={{ maxWidth: "600px" }}>
        <Link to="/add-measurement" className="btn btn-outline-primary btn-lg">➕ Add Measurement</Link>
        <Link to="/history" className="btn btn-outline-secondary btn-lg">📜 View History</Link>
        <Link to="/tips" className="btn btn-outline-success btn-lg">💡 Personalized Tips</Link>
        <Link to="/medications" className="btn btn-outline-warning btn-lg">💊 Daily Medications</Link>
        <Link to="/contact" className="btn btn-outline-danger btn-lg">📩 Contact Doctor</Link>
        <Link to="/messages" className="btn btn-outline-dark btn-lg">📂 My Messages</Link>
      </div>
    </div>
  );
};

export default Dashboard;
