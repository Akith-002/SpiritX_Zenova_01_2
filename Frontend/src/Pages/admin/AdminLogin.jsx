import { useState } from "react";

import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    console.log("Admin Email:", email, "Admin Password:", password);

    // Admin authentication logic here (e.g., API call)
    if (email !== "admin@example.com" || password !== "adminpassword") {
      setErrorMessage("Invalid email or password.");
      return;
    }

    // On successful login, redirect or perform necessary actions
    setErrorMessage(""); // Clear previous errors
    // You can redirect or continue the login flow here (e.g., navigate to dashboard)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#2D336B] to-[#A9B5DF]">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Right Side (Form) */}
        <div className="w-full p-12 bg-[#F4F6FF] flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#2D336B] text-center mb-4">ADMIN LOGIN</h2>
          <p className="text-center text-[#7886C7] mb-6">Login as an admin to manage the system</p>

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#2D336B] font-semibold">E-MAIL</label>
              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#7886C7] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#2D336B] font-semibold">PASSWORD</label>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#7886C7] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2D336B] text-white py-3 rounded-lg hover:bg-[#1F2855] transition duration-200 font-semibold mt-4"
            >
              LOGIN
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/admin/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
