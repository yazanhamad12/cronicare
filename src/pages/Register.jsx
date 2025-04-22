import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';


const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (values) => {
   
    const newUser = { name: values.name, email: values.email };
    const token = 'NEW_USER_TOKEN';
    login(newUser, token);
    toast.success("Registration successful 🎉");
    navigate('/dashboard');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(to right, #c1dfc4, #deecdd)' }}>
      <div className="card p-4 shadow-lg" style={{ width: '450px' , borderRadius: '20px',height:"600px" }}>
        <div className="text-center mb-4">
          <img src="../public/cronic.jpg" alt="Logo" className="mb-3" style={{ width: '100px' }}  />
          <h3>Create your Chronicare account</h3>
        </div>

        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Please confirm your password'),
          })}
          onSubmit={handleRegister}
        >
          <Form>
            <div className="mb-3 text-start">
              <label className="form-label">Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger small" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger small" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger small" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Confirm Password</label>
              <Field name="confirmPassword" type="password" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
            </div>

            <button type="submit" className="btn btn-success w-100">Register</button>
          </Form>
        </Formik>

        <div className="text-center mt-3">
          <small>Already have an account? <a href="/login">Login</a></small>
        </div>
      </div>
    </div>
  );
};

export default Register;
