import React from "react";
import {Link} from "react-router-dom";
import InputBox from "../components/InputBox";
import LoginBox from "../components/LoginBox";
import Logo from "../components/Logo";
import PrettyLink from "../components/PrettyLink";
import SubmitButton from "../components/SubmitButton";
import {useAuth} from "../hooks/useAuth";


export default function RegisterPage(){
  const {register} = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get("password") !== data.get("confirm-password")){
      alert("Passwords don't match");
      return;
    }else{
      register({
        username: data.get("username"),
        password: data.get("password")
      });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Logo/>
            <LoginBox label = "Create a new account">
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <InputBox label = "Username" id = "username"/>
                <InputBox label = "Password" id = "password" type = "password"/>
                <InputBox label = "Confirm Password" id = "confirm-password" type = "password"/>
                <SubmitButton label="Create an account" />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <PrettyLink label="Login here" to="/login"/>
                </p>
                </form>
            </LoginBox>
        </div>
        </section>

  );
};
