import { useState } from "react";
import signupImage from "../../assets/signupImage.jpg"; // Ensure the image exists in assets folder
import { useNavigate } from "react-router-dom"; // Corrected import

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Name:", name, "Password:", password);
    
    navigate("/dashbord"); // Corrected spelling
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#2D336B] to-[#A9B5DF]">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Side (Image) */}
        <div className="w-1/2 bg-[#2D336B] flex items-center justify-center relative">
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/2 p-12 bg-[#F4F6FF] flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#2D336B] text-center mb-4">
            SIGN UP
          </h2>
          <p className="text-center text-[#7886C7] mb-6">
            Unlock your cricket world
          </p>

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
              <label className="block text-[#2D336B] font-semibold">NAME</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              className="w-full bg-[#2D336B] text-white py-3 rounded-lg hover:bg-[#1F2855] transition duration-200 font-semibold mt-4"
            >
              SIGN UP
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")} // Corrected the navigation
              className="text-blue-500 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
