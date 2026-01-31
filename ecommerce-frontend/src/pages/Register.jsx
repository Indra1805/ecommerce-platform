import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Username"
          required
          className="w-full border px-3 py-2 rounded"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Email"
          type="email"
          className="w-full border px-3 py-2 rounded"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          required
          className="w-full border px-3 py-2 rounded"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-gray-900 text-white py-2 rounded cursor-pointer">
          Register
        </button>
      </form>
    </div>
  );
}
