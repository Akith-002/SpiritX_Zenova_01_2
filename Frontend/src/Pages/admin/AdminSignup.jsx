import { useState } from "react";
import { Link } from "react-router-dom"; // Add this import
import signupImage from "../../assets/adminsignupimage.jpg"; // Ensure the image exists in assets folder

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    console.log("Admin Email:", email, "Admin Password:", password);

    // Admin registration logic here (e.g., API call)
    // On successful signup, you can redirect the user or show a success message
    setErrorMessage(""); // Clear previous errors
    // Redirect to admin login page or show success
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#2D336B] to-[#A9B5DF]">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Side with Image */}
        <div className="w-1/2 bg-[#2D336B] flex items-center justify-center relative">
          <img
            src={signupImage}
            alt="Admin Signup"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/2 p-12 bg-[#F4F6FF] flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#2D336B] text-center mb-4">ADMIN SIGN UP</h2>
          <p className="text-center text-[#7886C7] mb-6">Create a new admin account</p>

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
            <div>
              <label className="block text-[#2D336B] font-semibold">CONFIRM PASSWORD</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#7886C7] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2D336B] text-white py-3 rounded-lg hover:bg-[#1F2855] transition duration-200 font-semibold mt-4"
            >
              SIGN UP
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/admin/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
