import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MeasurementHistory = () => {
  const [data, setData] = useState([]);

  // تحميل البيانات من localStorage عند فتح الصفحة
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("measurements")) || [];
    setData(saved);
  }, []);

  // حذف قياس
  const handleDelete = (id) => {
    const updated = data.filter((item) => item.id !== id);
    setData(updated);
    localStorage.setItem("measurements", JSON.stringify(updated));
    toast.info("Measurement deleted");
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center">Measurement History</h3>

      {data.length === 0 ? (
        <p className="text-center text-muted">No measurements found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Glucose (mg/dL)</th>
                <th>Blood Pressure</th>
                <th>Date</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((m, index) => (
                <tr key={m.id}>
                  <td>{index + 1}</td>
                  <td>{m.glucose}</td>
                  <td>{m.bloodPressure}</td>
                  <td>{new Date(m.date).toLocaleString()}</td>
                  <td>{m.note || "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MeasurementHistory;
