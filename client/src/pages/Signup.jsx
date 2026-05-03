import { useState } from "react";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleSignup = async () => {
    try {
      if (!form.name || !form.email || !form.password) {
        alert("All fields required");
        return;
      }

      await API.post("/auth/signup", form);

      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden 
    bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">

      
      <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl bottom-10 right-10"></div>

      
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h2>

        <input
          className="w-full border border-gray-200 p-3 rounded-lg mb-3 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border border-gray-200 p-3 rounded-lg mb-3 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full border border-gray-200 p-3 rounded-lg mb-3 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full border border-gray-200 p-3 rounded-lg mb-5 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Signup
        </button>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-2 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg"
        >
          Go to Login
        </button>

      </div>
    </div>
  );
}