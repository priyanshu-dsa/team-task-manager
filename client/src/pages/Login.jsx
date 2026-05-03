import { useState } from "react";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden 
    bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">

      
      <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl bottom-10 right-10"></div>

    
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <input
          className="w-full border border-gray-200 p-3 rounded-lg mb-4 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border border-gray-200 p-3 rounded-lg mb-6 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don't have an account?
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="w-full mt-2 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg"
        >
          Go to Signup
        </button>

      </div>
    </div>
  );
}