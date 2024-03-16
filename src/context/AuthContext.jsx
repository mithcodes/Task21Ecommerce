import { createContext, useContext, useState } from "react";
import { AppState } from "./Context";
const inetialState = {
  user: "",
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  setuser: () => {},
};

const AuthContext = createContext(inetialState);

export const AuthContextProvider = ({ children }) => {
  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userLoggedIn, setUserLoggedIn] = useState(
    token == "null" ? false : true
  );
  const [user, setUser] = useState("user name");
  const loginHandler = (data) => {
    setToken(data.idToken);
    setUserLoggedIn(!!data.idToken);
    localStorage.setItem("token", JSON.stringify(data.idToken));
    localStorage.setItem("logged", true);
   
  };
  const logoutHandler = () => {
    setUserLoggedIn(false);
    setToken(null);
    localStorage.setItem("token", null);
    localStorage.setItem("logged", false);
    setUser("user name");
  };
  const userHandler = (name) => {
    setUser(name);
  };

  const contextValue = {
    user: user,
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setuser: userHandler,
  };
  console.log(contextValue);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const AuthCxt = () => {
  return useContext(AuthContext);
};

export default AuthCxt;