import {React, useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import ToggleButton from '../components/toggleButton';

export default function SettingsPage() {
  const {user} = useAuth();

  const [darkMode, setDarkMode] = useState(document.querySelector('html').classList.contains('dark'));
  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode)
    const darkMode = document.querySelector('html').classList.toggle('dark');
    localStorage.setItem('darkMode', darkMode);
    console.log(darkMode);
  };

  return(
    <div className="bg-white px-2 sm:px-4 py-2.5 text-l dark:text-white dark:bg-slate-700">
      <h2 className= "text-2xl font-semibold pb-3">Settings</h2>
      <ul>
        <li>
          <ToggleButton value={darkMode} toggleFunc={toggleDarkMode} label= "Dark Mode"/>
        </li>
      </ul>
    </div>
  );
}
