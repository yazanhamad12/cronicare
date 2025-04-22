import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
      <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
  <img
    src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
    alt="Chronicare Logo"
    width="35"
    height="35"
    style={{ borderRadius: "8px" }}
  />
  Chronicare
</Link>



        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          {user ? (
  <>
    <li className="nav-item">
      <Link className="nav-link" to="/dashboard">Dashboard</Link>
    </li>
    <li className="nav-item">
  <Link className="nav-link" to="/about">About</Link>
</li>
    
    <li className="nav-item">
      <span className="nav-link">Hello, {user.name}</span>
    </li>
   
<li className="nav-item">
<Link to="/profile" className="btn btn-outline-info btn-lg">👤 My Profile</Link>  
</li>


    <li className="nav-item">
      <button className="btn btn-outline-info btn-lg ms-2" onClick={handleLogout}>
        Logout
      </button>
    </li>
    
  </>
) : (
  <>
    <li className="nav-item">
      <Link className="nav-link" to="/login">Login</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/register">Register</Link>
    </li>
    <li className="nav-item">
  <Link className="nav-link" to="/about">About</Link>
</li>
  </>
)}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
