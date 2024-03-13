import { useState } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "user" });

  const handleChange = (evt) => {
    setFormData((prev) => {
      return { ...prev, [evt.target.name]: evt.target.value }
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return (
    <form
      className=" w-72 h-fit flex flex-col justify-around gap-4 items-center bg-[#212121] p-4 rounded-xl border-2 border-[#f9f9f9] border-opacity-5"
      action="/"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <label className="text-white" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full h-10 rounded-md bg-[#181818] border-2 border-[#f9f9f9] border-opacity-15 outline-none text-white p-2 mt-1"
          type="text"
        />
      </div>

      <div className="w-full">
        <label className="text-white" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-10 rounded-md bg-[#181818] border-2 border-[#f9f9f9] border-opacity-15 outline-none text-white p-2 mt-1"
          type="email"
        />
      </div>

      <div className="w-full">
        <label className="text-white" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-10 rounded-md bg-[#181818] border-2 border-[#f9f9f9] border-opacity-15 outline-none text-white p-2 mt-1"
          type="password"
        />
      </div>

      <div className="w-full">
        <label className="text-white" htmlFor="role">
          Select your role
        </label>
        <select
          id="role"
          name="role"
          defaultChecked
          value={formData.role}
          onChange={handleChange}
          className="w-full h-10 rounded-md bg-[#181818] border-2 border-[#f9f9f9] border-opacity-15 outline-none text-white p-2 mt-1"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button onClick={handleSubmit} className="w-full h-full p-1 mt-5 bg-white rounded text-lg font-semibold">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
