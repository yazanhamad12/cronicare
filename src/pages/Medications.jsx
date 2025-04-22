import { useEffect, useState } from "react";

const Medications = () => {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    // أدوية مبدئية - لاحقًا ممكن تيجي من API
    const sample = [
      { name: "Metformin", dose: "500mg", time: "08:00 AM" },
      { name: "Insulin", dose: "10 units", time: "06:00 PM" },
    ];
    setMeds(sample);
  }, []);

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">Daily Medications Schedule</h3>

      {meds.length === 0 ? (
        <p className="text-muted text-center">No medications found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {meds.map((med, index) => {
                const now = new Date();
                const medTime = new Date();
                const [hour, minutePart] = med.time.split(":");
                const isPM = med.time.toLowerCase().includes("pm");
                medTime.setHours(parseInt(hour) + (isPM && hour !== "12" ? 12 : 0));
                medTime.setMinutes(parseInt(minutePart));

                const isTaken = now > medTime;

                return (
                  <tr key={index}>
                    <td>{med.name}</td>
                    <td>{med.dose}</td>
                    <td>{med.time}</td>
                    <td>
                      {isTaken ? (
                        <span className="badge bg-success">Taken</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Upcoming</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Medications;
