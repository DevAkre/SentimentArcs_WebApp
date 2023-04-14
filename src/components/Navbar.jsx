import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Logo from './Logo';

const navbarItems=  [
    {name: "Home", link: "/dashboard/"},
    {name: "Single", link: "/dashboard/single"},
    {name: "Ensemble", link: "/dashboard/ensemble"},
    {name: "Settings", link: "/dashboard/settings"},
    {name: "Help", link: "/dashboard/help"},
]

export default function Navbar(){
    //eslint-disable-next-line
    const { user, logout } = useAuth(); 
    const curLocation = useLocation();
    return (
        <nav className="bg-slate-300 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-slate-950">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Logo inline/>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col mt-3 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-700 dark:border-gray-700">
                        {navbarItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={item.link} className={"block px-4 py-2 "+((curLocation.pathname===item.link)?"md:dark:text-blue-300 text-blue-600":"hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-600 dark:active:bg-gray-500 dark:text-white")}>{item.name}</Link>
                                </li>
                            );
                        }
                        )}
                        <li>
                            <button onClick={logout} className="block px-4 py-2 outline hover:bg-gray-100 rounded active:bg-red-200 dark:hover:bg-red-700 dark:active:bg-red-600 dark:text-white">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
