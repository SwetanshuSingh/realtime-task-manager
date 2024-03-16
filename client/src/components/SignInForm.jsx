import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import handleSignIn from "../utils/handleSignIn";
import { LoaderCircle } from "lucide-react"

const SignInFrom = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData((prev) => {
      return { ...prev, [evt.target.name]: evt.target.value }
    })
  }

  return (
    <form
      className=" w-72 h-fit flex flex-col justify-around gap-4 items-center bg-[#212121] p-4 rounded-xl border-2 border-[#f9f9f9] border-opacity-5"
      action="/"
      onSubmit={(evt) => {handleSignIn(evt, formData, setAuth, navigate, setFormData, setIsLoading)}}
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

      <button onClick={(evt) => {handleSignIn(evt, formData, setAuth, navigate, setFormData, setIsLoading)}} className="w-full h-full p-1 mt-5 bg-[#f5ebe0] rounded text-lg font-semibold flex justify-center items-center">
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Sign In"}
      </button>
      <p className="text-gray-50">Not an exisiting user? <Link to="/" className="underline underline-offset-2">Sign Up</Link></p>
    </form>
  );
};

export default SignInFrom;
