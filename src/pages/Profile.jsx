import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
  
    // التحقق من كلمة المرور فقط إذا أراد تغييرها
    if (formData.newPassword || formData.confirmPassword) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
  
      if (formData.currentPassword !== storedUser.password) {
        toast.error("❌ Current password is incorrect.");
        return;
      }
  
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("❌ New passwords do not match.");
        return;
      }
  
      storedUser.password = formData.newPassword;
      localStorage.setItem("user", JSON.stringify(storedUser));
      login(storedUser, localStorage.getItem("token"));
      toast.success("✅ Password updated successfully.");
    }
  
    // تحديث الاسم والإيميل
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      password: formData.newPassword || user.password,
    };
  
    localStorage.setItem("user", JSON.stringify(updatedUser));
    login(updatedUser, localStorage.getItem("token"));
    toast.success("✅ Profile updated.");
  
    setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" });
  };
  

  return (
    <div className="container py-5">
      <div className="card shadow mx-auto p-4" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center">👤 My Profile</h3>

        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
  <label className="form-label">Current Password</label>
  <input
    type="password"
    name="currentPassword"
    className="form-control"
    value={formData.currentPassword || ""}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label className="form-label">New Password</label>
  <input
    type="password"
    name="newPassword"
    className="form-control"
    value={formData.newPassword || ""}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label className="form-label">Confirm New Password</label>
  <input
    type="password"
    name="confirmPassword"
    className="form-control"
    value={formData.confirmPassword || ""}
    onChange={handleChange}
  />
</div>


          <button type="submit" className="btn btn-primary w-100">Save Changes</button>
          
        </form>
      </div>
    </div>
  );
};

export default Profile;
