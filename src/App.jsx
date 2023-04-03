import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import HomePage from './pages/Home';
import SinglePage from './pages/Single';
import EnsemblePage from './pages/Ensemble';
import HelpPage from './pages/Help';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPasswordPage from './pages/ForgotPassword';
import SettingsPage from './pages/Settings';
import { ProtectedOutlet } from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';


function App() {
  //initiate dark mode
  document.querySelector('html').classList.add('dark');
  return (
    <AuthProvider>
    <div className="wrapper h-screen bg-white dark:bg-slate-700 dark:text-white">
      <Routes>
        <Route path="/" element = {<Navigate to="/login"/>}/>
        <Route path="login" element = {<LoginPage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path= "dashboard" element = {<><Navbar/><ProtectedOutlet/></>}>
          <Route path="" element={<HomePage/>}/>
          <Route path="single" element = {<SinglePage/>}/>
          <Route path="ensemble" element = {<EnsemblePage/>}/>
          <Route path="settings" element={<SettingsPage/>}/>
          <Route path="help" element = {<HelpPage/>}/>
        </Route>
      </Routes>
    </div>   
    </AuthProvider>
  )
}

export default App;
