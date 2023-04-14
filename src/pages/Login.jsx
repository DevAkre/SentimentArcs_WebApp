import React, { useEffect } from "react";
import {useAuth} from "../hooks/useAuth";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import PrettyLink from "../components/PrettyLink";
import LoginBox from "../components/LoginBox";
import Logo from "../components/Logo";

export default function LoginPage(){
  const {login, user, token} = useAuth();
  useEffect(() => {
    if (user && token) {
      window.location.href = "/dashboard";
    }
  }, [user, token]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      username: data.get("username"),
      password: data.get("password"),
      remember: data.get("remember"),
    });
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo/>
        <LoginBox label = "Log In">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputBox label = "Username" id = "username"/>
              <InputBox label = "Password" id = "password" type="password"/>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <PrettyLink label="Forgot Password?" to="/forgot-password"/>
              </div>
              <SubmitButton label = "Log In"/>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <PrettyLink label="Create an account" to="/register"/>
              </p>
            </form>
          </LoginBox>
      </div> 
    </section>
  );
};
