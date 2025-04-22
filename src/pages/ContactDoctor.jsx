import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ContactDoctor = () => {
  const handleSubmit = (values, { resetForm }) => {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const newMessage = { ...values, id: Date.now() };
    localStorage.setItem("messages", JSON.stringify([...messages, newMessage]));

    toast.success("Message sent to doctor 📩");
    resetForm();
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center">Contact Your Doctor</h3>

        <Formik
          initialValues={{ subject: "", message: "" }}
          validationSchema={Yup.object({
            subject: Yup.string().required("Please choose a subject"),
            message: Yup.string().min(10, "Message must be at least 10 characters").required("Please enter your message"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <Field as="select" name="subject" className="form-select">
                <option value="">Select a subject</option>
                <option value="blood_sugar">Blood Sugar</option>
                <option value="blood_pressure">Blood Pressure</option>
                <option value="medications">Medications</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="subject" component="div" className="text-danger small" />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <Field as="textarea" name="message" className="form-control" rows="4" />
              <ErrorMessage name="message" component="div" className="text-danger small" />
            </div>

            <button type="submit" className="btn btn-primary w-100">Send Message</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ContactDoctor;
