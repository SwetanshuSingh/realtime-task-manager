const handleSignOut = (setAuth, navigate) => {
  localStorage.removeItem("auth");
  setAuth(null);
  navigate("/signin")
}

export default handleSignOut;