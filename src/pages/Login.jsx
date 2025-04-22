import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    
    const dummyUser = { name: 'Yazan Hamad', email: values.email };
    const dummyToken = '123456789TOKEN';
    login(dummyUser, dummyToken);
    toast.success("Logged in successfully 🎉");
    navigate('/');

  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px', borderRadius: '20px' }}>
        <div className="text-center mb-4">
          <img src="../public/cronic.jpg" alt="Chronicare Logo" className="mb-3" style={{ width: '100px' }} />
          <h3>Welcome to Chronicare</h3>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3 text-start">
              <label className="form-label">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage component="div" name="email" className="text-danger small mt-1" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage component="div" name="password" className="text-danger small mt-1" />
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </Form>
        </Formik>

        <div className="text-center mt-3">
          <small>Don't have an account? <a href="#">Register</a></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
