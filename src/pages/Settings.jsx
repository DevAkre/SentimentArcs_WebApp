import React from 'react';
import {useAuth} from '../hooks/useAuth';

export default function SettingsPage() {
  const {user} = useAuth();
  console.log(user);
  return(
    <h2>Settings</h2>
  );
}
