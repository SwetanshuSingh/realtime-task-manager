import toast from "react-hot-toast";

const handleSignUp = async ( evt, setAuth, navigate, formData, setFormData ) => {
  evt.preventDefault();
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (response.status === 200) {
    toast.success(data.message);
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
    navigate("/home");
  } else {
    toast.error(data.error);
  }
  setFormData({ username: "", email: "", password: "", role: "user" });
};

export default handleSignUp;