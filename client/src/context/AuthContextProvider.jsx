import { createContext, useState } from "react";

export const AuthContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || null);

  return <AuthContext.Provider value={{ auth, setAuth }}>
    {children}
  </AuthContext.Provider>
}