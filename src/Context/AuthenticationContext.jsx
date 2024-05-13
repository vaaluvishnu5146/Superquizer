import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useJwt } from "react-jwt";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  token: {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const { decodedToken, isExpired } = useJwt(token || "");

  useEffect(() => {
    if (decodedToken && !isExpired) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [decodedToken, isExpired]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token: decodedToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
