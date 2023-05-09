import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { AuthLogin, AuthLogout, AuthRegister } from "../api/userAPI.js";
const AuthContext = createContext();

//Development only
// const fakeAuth = (data) =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve(data["username"]), 250);
//   });


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [settings, setSettings] = useLocalStorage("settings", {"theme": "dark", "language": "English", "HTMLgraphs": false});

  const navigate = useNavigate();

  const login = async (data) => {
    if(data === null){
      if(user != null && token != null){
        const response = await AuthLogin({"username": user, "token": token});
        if(response.success){
          navigate("/dashboard", { replace: true });
        }
      }
      return;
    }
    const response = await AuthLogin({"username": data.username, "password": data.password});
    
    if(response.success){
      console.log(response);
      setUser(data.username);
      setToken(response.access_token);
      if(data.remember){
        localStorage.setItem('token', data.username);
        localStorage.setItem('user', response.access_token);
      }
      navigate("/dashboard", { replace: true });
    }
    else{
      alert("Invalid credentials");
    }
  };

  const register = async (data) => {
    const response = await AuthRegister({"username": data.username, "password": data.password});
    if(response.success){
      alert("Registration successful. Please login to continue.")
      navigate("/login", { replace: true });
    }else{
      alert(response["error"]);
    }
  };

  const logout = () => {
    AuthLogout({"username": user, "access_token": token});
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      userSettings: {settings,
      setSettings},
      login,
      logout,
      register
    }),
    [user, token, settings]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};