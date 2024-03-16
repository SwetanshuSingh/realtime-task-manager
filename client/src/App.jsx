import SignUpPage from "./pages/SignUpPage.jsx"
import SignInPage from "./pages/SignInPage.jsx"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider.jsx";
import { Toaster } from "react-hot-toast";
import AdminPage from "./pages/AdminPage.jsx";

const App = () => {

  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={auth?.token ? <Navigate to="/home" /> : <SignUpPage />} />
        <Route path="/signin" element={auth?.token ? <Navigate to="/home" /> : <SignInPage />} />
        <Route path="/home" element={auth?.token ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/admin" element={auth?.role === "admin" ? <AdminPage /> : <Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;