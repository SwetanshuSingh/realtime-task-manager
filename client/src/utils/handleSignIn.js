import toast from "react-hot-toast";

const handleSignIn = async (evt, formData, setAuth, navigate, setFormData) => {
  evt.preventDefault();
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();
  if (response.ok) {
    toast.success(data.message);
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
    navigate("/home");
  } else {
    toast.error(data.error);
  }
  setFormData({ username: "", password: "" });
  
}

export default handleSignIn;