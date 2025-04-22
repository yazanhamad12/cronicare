import { useState } from "react";
import { toast } from "react-toastify";

const foodList = [
  { name: "Arabic Bread (1 piece)", carbs: 30 },
  { name: "Toast Bread (1 slice)", carbs: 15 },
  { name: "Boiled Egg", carbs: 1 },
  { name: "White Rice (1 cup)", carbs: 45 },
  { name: "Pasta (1 cup)", carbs: 40 },
  { name: "Date (1 piece)", carbs: 6 },
  { name: "Apple (medium)", carbs: 25 },
  { name: "Banana (medium)", carbs: 27 },
  { name: "Orange", carbs: 15 },
  { name: "Yogurt (small)", carbs: 10 },
  { name: "Milk (1 cup)", carbs: 12 },
  { name: "Lentil Soup (1 cup)", carbs: 30 },
  { name: "Grilled Chicken (100g)", carbs: 0 },
  { name: "Grilled Beef (100g)", carbs: 0 },
  { name: "White Cheese (30g)", carbs: 1 },
  { name: "Fava Beans (½ cup)", carbs: 22 },
  { name: "Hummus (½ cup)", carbs: 20 },
  { name: "French Fries (½ cup)", carbs: 30 },
  { name: "Boiled Potato (1 piece)", carbs: 30 },
];

const InsulinCalculator = () => {
  const [quantities, setQuantities] = useState({});
  const [bloodSugar, setBloodSugar] = useState("");
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [carbDose, setCarbDose] = useState(null);
  const [correctionDose, setCorrectionDose] = useState(null);
  const [totalDose, setTotalDose] = useState(null);

  const handleQuantityChange = (index, value) => {
    const newQuantities = { ...quantities, [index]: Number(value) };
    setQuantities(newQuantities);
  };

  const calculate = () => {
    let total = 0;
    foodList.forEach((food, index) => {
      const qty = quantities[index] || 0;
      total += qty * food.carbs;
    });
    setTotalCarbs(total);

    const carbRatio = 15;
    const isf = 50;
    const targetSugar = 120;

    const doseFromCarbs = +(total / carbRatio).toFixed(1);
    const correction = bloodSugar > targetSugar ? +((bloodSugar - targetSugar) / isf).toFixed(1) : 0;
    const totalFinal = +(doseFromCarbs + correction).toFixed(1);

    setCarbDose(doseFromCarbs);
    setCorrectionDose(correction);
    setTotalDose(totalFinal);

    toast.success(`Total dose: ${totalFinal} units (carbs: ${doseFromCarbs}, correction: ${correction})`);
  };

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">💉 Rapid Insulin Dose Calculator</h3>

      <div className="mb-4 text-center">
        <label className="form-label">Current Blood Sugar (mg/dL)</label>
        <input
          type="number"
          className="form-control w-50 mx-auto"
          placeholder="e.g. 180"
          value={bloodSugar}
          onChange={(e) => setBloodSugar(Number(e.target.value))}
        />
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Food Item</th>
              <th>Carbs/Unit (g)</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {foodList.map((food, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{food.name}</td>
                <td>{food.carbs}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    placeholder="0"
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button className="btn btn-primary btn-lg" onClick={calculate}>
          🧮 Calculate Total Dose
        </button>
      </div>

      {totalDose !== null && (
        <div className="alert alert-info text-center mt-4 fs-5">
          Total Carbohydrates: <strong>{totalCarbs}</strong> g<br />
          Dose from Carbs: <strong>{carbDose}</strong> units<br />
          Correction Dose: <strong>{correctionDose}</strong> units<br />
          <hr />
          ✅ <strong>Total Dose: {totalDose} units</strong>
        </div>
      )}
    </div>
  );
};

export default InsulinCalculator;
