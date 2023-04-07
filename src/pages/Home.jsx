import React from 'react';
import FileUpload from '../components/FileUpload';
import RecentActivity from '../components/RecentActivity';
import LineChart from '../components/LineChart';
import { useAuth } from '../hooks/useAuth';
import testData from '../PrideAndPrejudiceVader.json';

export default function HomePage() {
  const {user} = useAuth();
  const fileCallBack = (file) => {};
  return(
    <>
      <h3>Welcome, {user}</h3>
      <div className = "grid grid-cols-1 md:grid-cols-2 gap-2 px-3 py-3">
        <div>
          <FileUpload fileCallBack={fileCallBack}/>
          <RecentActivity/>
        </div>
        <div><LineChart lineLabels = {["Vader"]}  datasets = {[testData]} /></div>
      </div>
    </>
  );
}
