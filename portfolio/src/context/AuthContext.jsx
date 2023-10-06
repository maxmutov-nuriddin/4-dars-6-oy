import { createContext, useState } from "react";
import { ROLE, TOKEN } from "../constants";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );
  const [role, setRole] = useState(Cookies.get(ROLE));
  const state = {
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
