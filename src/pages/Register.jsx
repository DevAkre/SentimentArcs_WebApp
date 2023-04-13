import React from "react";
import {Link} from "react-router-dom";
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
            <span
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
            <img
                className="w-8 h-8 mr-2"
                src="logo192.png"
                alt="logo"
            />
            SentimentArcs
            </span>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a new account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Username
                    </label>
                    <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    />
                </div>
                <div>
                    <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    />
                </div>
                <div>
                    <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Confirm password
                    </label>
                    <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-primary-600 outline hover:bg-primary-700 focus:ring-4 focus:outline-double focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                    to="/login"
                    className="font-medium text-gray-500 hover:underline dark:text-gray-300"
                    >
                    Login here
                    </Link>
                </p>
                </form>
            </div>
            </div>
        </div>
        </section>

  );
};
