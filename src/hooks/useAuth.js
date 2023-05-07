import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

//Development only
// const fakeAuth = (data) =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve(data["username"]), 250);
//   });

const AuthLogin = async (data) => {
  return fetch(
    "/api/user/login",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)})
    .then((response) => {
        if(response.ok)
          return response.json()
        else
          return {success: false}
      }
    )
    .catch((error) => {
        console.error("Error:", error);
        alert("Error: " + error);
      }
    );
};


const AuthRegister = async (data) => {
  return fetch(
    "/api/user/register",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),})
    .then((response) => {
      if(response.ok)
        return response.json()
      else
        return {success: false}
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error: " + error);
    }
    );
}
      

const AuthLogout = async (data) => {
  return fetch(
    "/api/user/logout",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    }).then(response => response.json());
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
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
      login,
      logout,
      register
    }),
    [user, token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};