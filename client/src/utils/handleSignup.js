import toast from "react-hot-toast";

const handleSignUp = async (
  evt,
  setAuth,
  navigate,
  formData,
  setFormData,
  isLoading,
  setIsLoading
) => {
  try {
    evt.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
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
  } catch (error) {
    toast.error("Internal Server Error");
  } finally {
    setFormData({ username: "", email: "", password: "", role: "user" });
    setIsLoading(false);
  }
};

export default handleSignUp;
