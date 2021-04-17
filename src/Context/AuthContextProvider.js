import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : {};
  const [auth, setAuth] = useState(token);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};
