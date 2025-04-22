import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const AddMeasurement = () => {
  const initialValues = {
    glucose: '',
    bloodPressure: '',
    date: '',
    note: '',
  };

  const validationSchema = Yup.object({
    glucose: Yup.number().typeError("Must be a number").required("Required"),
    bloodPressure: Yup.string().matches(/^\d+\/\d+$/, "Format: 120/80").required("Required"),
    date: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newMeasurement = {
      ...values,
      id: Date.now(),
    };
  
 
    const existingData = JSON.parse(localStorage.getItem('measurements')) || [];
    const updatedData = [...existingData, newMeasurement];
    localStorage.setItem('measurements', JSON.stringify(updatedData));
  
    
    const glucose = parseInt(values.glucose);
    const [systolic, diastolic] = values.bloodPressure.split("/").map(Number);
  
   
    if (glucose > 180 || glucose < 70 || systolic > 140 || systolic < 90 || diastolic > 90 || diastolic < 60) {
      toast.warn("⚠️ Danger detected! Please review tips and contact your doctor.", {
        onClick: () => window.location.href = '/tips',
        autoClose: 5000,
        pauseOnHover: true,
      });
    } else {
      toast.success("Measurement added ✅");
    }
  
    resetForm();
  };

  return (
    <div className="container my-5">
      <div className="card shadow p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 className="mb-4 text-center">Add Health Measurement</h3>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-3">
              <label className="form-label">Blood Sugar (mg/dL)</label>
              <Field name="glucose" type="text" className="form-control" />
              <ErrorMessage name="glucose" component="div" className="text-danger small" />
            </div>

            <div className="mb-3">
              <label className="form-label">Blood Pressure (e.g., 120/80)</label>
              <Field name="bloodPressure" type="text" className="form-control" />
              <ErrorMessage name="bloodPressure" component="div" className="text-danger small" />
            </div>

            <div className="mb-3">
              <label className="form-label">Date & Time</label>
              <Field name="date" type="datetime-local" className="form-control" />
              <ErrorMessage name="date" component="div" className="text-danger small" />
            </div>

            <div className="mb-3">
              <label className="form-label">Note (optional)</label>
              <Field name="note" as="textarea" rows="3" className="form-control" />
            </div>

            <button type="submit" className="btn btn-success w-100">Save Measurement</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddMeasurement;
