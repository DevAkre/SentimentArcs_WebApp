import {React, useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import ToggleButton from '../components/ToggleButton';

export default function SettingsPage() {
  const {userSettings} = useAuth();
  const darkMode = userSettings.settings.theme === "dark";
  const htmlGraphs = userSettings.settings.htmlGraphs;
  console.log(userSettings.settings)
  const toggleDarkMode = () => {
    if(darkMode) document.querySelector('html').classList.remove('dark');
    else document.querySelector('html').classList.add('dark');
    const prevSettings = userSettings.settings;
    prevSettings.theme = !darkMode?"dark":"light";
    userSettings.setSettings(prevSettings);
    console.log(darkMode);
  };

  const toggleHTMLGraph = () => {
    const prevSettings = userSettings.settings;
    prevSettings.htmlGraphs = !htmlGraphs;
    userSettings.setSettings(prevSettings);
  };

  return(
    <div className="bg-white px-2 sm:px-4 py-2.5 text-l dark:text-white dark:bg-slate-700">
      <h2 className= "text-2xl font-semibold pb-3">Settings</h2>
      <ul>
        <li>
          <ToggleButton value={darkMode} toggleFunc={toggleDarkMode} label= "Dark Mode"/>
          <ToggleButton value={htmlGraphs} toggleFunc={toggleHTMLGraph} label= "HTML Graphs"/>
        </li>
      </ul>
    </div>
  );
}
