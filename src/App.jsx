import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
