import { useEffect, useState } from "react";

const HealthTips = () => {
  const [latest, setLatest] = useState(null);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("measurements")) || [];
    if (all.length > 0) {
      const last = all[all.length - 1];
      setLatest(last);
      generateTips(last);
    }
  }, []);

  const generateTips = (data) => {
    const result = [];
    const glucose = parseInt(data.glucose);
    const [systolic, diastolic] = data.bloodPressure.split("/").map(Number);

    // نصائح السكر
    if (glucose > 180) {
      result.push("⚠️ Your blood sugar is high. Avoid sweets and drink water.");
    } else if (glucose < 70) {
      result.push("⚠️ Your blood sugar is low. Eat something with carbohydrates.");
    } else {
      result.push("✅ Your blood sugar is in a good range.");
    }

    // نصائح الضغط
    if (systolic > 140 || diastolic > 90) {
      result.push("⚠️ Your blood pressure is high. Reduce salt and walk daily.");
    } else if (systolic < 90 || diastolic < 60) {
      result.push("⚠️ Your blood pressure is low. Stay hydrated and consult your doctor.");
    } else {
      result.push("✅ Your blood pressure is normal.");
    }

    setTips(result);
  };

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">Personalized Health Tips</h3>

      {!latest ? (
        <p className="text-muted text-center">No measurements found.</p>
      ) : (
        <div className="alert alert-info p-4 shadow">
          <h5>Based on your last entry ({new Date(latest.date).toLocaleString()}):</h5>
          <ul className="mt-3">
            {tips.map((tip, index) => (
              <li key={index} className="mb-2">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthTips;
