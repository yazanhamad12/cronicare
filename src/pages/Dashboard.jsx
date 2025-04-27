import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [latestMeasurement, setLatestMeasurement] = useState(null);
  const [hba1cData, setHba1cData] = useState(null);

  useEffect(() => {
    const measurements = JSON.parse(localStorage.getItem("measurements")) || [];
    if (measurements.length > 0) {
      setLatestMeasurement(measurements[measurements.length - 1]);
    }

    const hba1cResults = JSON.parse(localStorage.getItem("hba1cResults")) || [];
    if (hba1cResults.length > 0) {
      const latestHbA1c = hba1cResults[hba1cResults.length - 1];
      const nextCheck = new Date(latestHbA1c.date);
      nextCheck.setMonth(nextCheck.getMonth() + 3);

      setHba1cData({
        value: latestHbA1c.value,
        nextCheckup: nextCheck.toLocaleDateString()
      });
    }
  }, []);

  const buttons = [
    { icon: "➕", action: () => navigate("/add-measurement"), title: "Add Measurement" },
    { icon: "📜", action: () => navigate("/history"), title: "View History" },
    { icon: "💡", action: () => navigate("/tips"), title: "Personalized Tips" },
    { icon: "🧪", action: () => navigate("/hba1c"), title: "HbA1c Test" },
    { icon: "💊", action: () => navigate("/medications"), title: "Daily Medications" },
    { icon: "📩", action: () => navigate("/contact"), title: "Contact Doctor" },
    { icon: "📂", action: () => navigate("/messages"), title: "My Messages" },
    { icon: "🧮", action: () => navigate("/insulin"), title: "Insulin Calculator" },
  ];

  const getEvaluation = (value) => {
    if (value < 5.7) return "Normal";
    if (value < 6.5) return "Prediabetes";
    return "Diabetes";
  };

  const getHbA1cColor = (value) => {
    if (value < 5.7) return "#d4edda"; // أخضر فاتح
    if (value < 6.5) return "#fff3cd"; // أصفر فاتح
    return "#f8d7da"; // أحمر فاتح
  };

  const pieData = hba1cData
    ? {
        labels: ["HbA1c %", "Remaining %"],
        datasets: [
          {
            data: [hba1cData.value, 100 - hba1cData.value],
            backgroundColor: ["#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
          },
        ],
      }
    : null;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {user?.name} 👋</h2>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      {/* البطاقات الرئيسية */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow">
            <div className="card-body">
              <h5 className="card-title">Blood Sugar</h5>
              <p className="card-text fs-4">
                {latestMeasurement?.glucose ? `${latestMeasurement.glucose} mg/dL` : "No Data"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success shadow">
            <div className="card-body">
              <h5 className="card-title">Blood Pressure</h5>
              <p className="card-text fs-4">
                {latestMeasurement?.bloodPressure ? latestMeasurement.bloodPressure : "No Data"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning shadow">
            <div className="card-body">
              <h5 className="card-title">Medications</h5>
              <p className="card-text fs-5">Metformin, Insulin</p>
            </div>
          </div>
        </div>
      </div>

      {/* زرار وفحص */}
      <div className="row mt-5">
        <div className="col-md-3">
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "70px",
                  height: "70px",
                  fontSize: "28px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                }}
                title={btn.title}
                onClick={btn.action}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

        {/* الفحص التراكمي */}
        <div
          className="col-md-9 d-flex flex-column align-items-center justify-content-center fade-in"
          style={{
            backgroundColor: hba1cData ? getHbA1cColor(hba1cData.value) : "#f0f0f0",
            borderRadius: "15px",
            padding: "30px",
          }}
        >
          <h4>🧪 Last HbA1c Test</h4>
          {hba1cData ? (
            <>
              <p className="fs-2">{hba1cData.value}% - {getEvaluation(hba1cData.value)}</p>
              <p className="text-muted">Next Checkup: {hba1cData.nextCheckup}</p>
              <div style={{ width: "200px", margin: "0 auto" }}>
                <Pie data={pieData} />
              </div>
              {hba1cData.value >= 8 && (
                <div className="alert alert-danger mt-3 p-2">
                  ⚠️ Warning: High HbA1c level. Please consult your doctor.
                </div>
              )}
            </>
          ) : (
            <p>No HbA1c Test Recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
