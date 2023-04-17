import React from 'react';
import FileUpload from '../components/FileUpload';
import TextSelect from '../components/TextSelect';
import CleanTextSelect from '../components/CleanTextSelect';
// import RecentActivity from '../components/RecentActivity';
// import LineChart from '../components/LineChart';
import { useAuth } from '../hooks/useAuth';
import testData from '../PrideAndPrejudiceVader.json';
import {ColumnGrid, Column} from '../components/ColumnGrid';

export default function HomePage() {
  const {user} = useAuth();
  const fileCallBack = (file) => {};
  return(
    <>
      <h3>
        Welcome, {user}.
      </h3>
      <ColumnGrid n_col="1" n_cols_md="2">
        <Column>
          <FileUpload fileCallBack={fileCallBack}/>
          <div className=" flex items-center justify-center">OR</div>
          <TextSelect/>
          {/* <RecentActivity/> WIP*/}
        </Column>

        <Column>
          <CleanTextSelect/>

          {/* <LineChart lineLabels = {["Vader"]}  datasets = {[testData]} /> */}
        </Column>
      </ColumnGrid>
    </>
  );
}
