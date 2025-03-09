import { useState } from "react";
import loginImage from "../../assets/loginImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the backend login endpoint
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to dashboard
      navigate("/dashbord");
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#2D336B] to-[#A9B5DF]">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Side (Image) */}
        <div className="w-1/2 bg-[#2D336B] flex items-center justify-center relative">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/2 p-12 bg-[#F4F6FF] flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#2D336B] text-center mb-4">
            LOGIN
          </h2>
          <p className="text-center text-[#7886C7] mb-6">
            Welcome back! Log in to continue
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#2D336B] font-semibold">
                E-MAIL
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#7886C7] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#2D336B] font-semibold">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#7886C7] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D336B] text-white py-3 rounded-lg hover:bg-[#1F2855] transition duration-200 font-semibold mt-4 disabled:opacity-70"
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-center text-gray-600 text-sm mt-6">
            Admin?{" "}
            <a href="/admin/login" className="text-blue-500 hover:underline">
              Login Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
