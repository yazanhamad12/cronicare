import { useState } from "react";
import { toast } from "react-toastify";

const HbA1cTest = () => {
  const [hba1c, setHba1c] = useState("");

  const handleSave = () => {
    if (!hba1c) {
      toast.error("Please enter your HbA1c result!");
      return;
    }

    const newRecord = {
      value: parseFloat(hba1c),
      date: new Date().toISOString()
    };

    const existingResults = JSON.parse(localStorage.getItem("hba1cResults")) || [];
    const updatedResults = [...existingResults, newRecord];
    localStorage.setItem("hba1cResults", JSON.stringify(updatedResults));

    setHba1c("");
    toast.success("HbA1c result saved successfully!");
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">🧪 Add New HbA1c Test Result</h2>

      <div className="mb-3">
        <input
          type="number"
          step="0.1"
          className="form-control w-50 mx-auto"
          placeholder="Enter your HbA1c (%)"
          value={hba1c}
          onChange={(e) => setHba1c(e.target.value)}
        />
      </div>

      <button className="btn btn-success btn-lg" onClick={handleSave}>
        💾 Save Result
      </button>
    </div>
  );
};

export default HbA1cTest;
