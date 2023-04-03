import React from 'react';
import FileUpload from '../components/fileUpload';
import LineChart from '../components/lineChart';
import { useAuth } from '../hooks/useAuth';
import testData from '../PrideAndPrejudiceVader.json';

export default function HomePage() {
  const {user} = useAuth();
  return(
    <>
      <h2>Home</h2>
      <h3>Welcome, {user}</h3>
      <div className = "grid grid-cols-1 md:grid-cols-2 gap-2">
        <FileUpload/>
        <div><LineChart dataset = {testData} /> </div>
      </div>
    </>
  );
}
