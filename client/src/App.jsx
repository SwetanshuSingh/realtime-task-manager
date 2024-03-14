import SignUpPage from "./pages/SignUpPage.jsx"
import SignInPage from "./pages/SignInPage.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider.jsx";

const App = () => {

  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth?.token ? <HomePage /> : <SignUpPage />} />
        <Route path="/signin" element={auth?.token ? <HomePage /> : <SignInPage />} />
        <Route path="/home" element={auth?.token ? <HomePage /> : <SignInPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;