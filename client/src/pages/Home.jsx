import React, {useContext} from 'react';
import FileUpload from '../components/FileUpload';
import TextSelect from '../components/TextSelect';
import CleanText from '../components/CleanText';
import CleanTextSelect from '../components/CleanTextSelect';
import {StoreContext} from '../contexts/StoreContext';
import ModelHome from '../components/ModelHome';
import { useAuth } from '../hooks/useAuth';
import {ColumnGrid, Column} from '../components/ColumnGrid';
import CleanTextPreview from '../components/CleanTextPreview';

export default function HomePage() {
  const {user} = useAuth();
  const fileCallBack = (file) => {};
  const selected_text = useContext(StoreContext).selected_text.text;
  const selected_clean_text = useContext(StoreContext).selected_clean_text.cleanText;
  
  return(
    <>
      <h3>
        Welcome, {user}.
      </h3>
      <ColumnGrid>
        <Column>
          <FileUpload fileCallBack={fileCallBack}/>
          <div className=" flex items-center justify-center">OR</div>
          <TextSelect/>
          {(selected_text !== null) ? 
          <div>
            <hr/>
            <CleanText text_id={selected_text.text_id}/>
            <div className=" flex items-center justify-center">OR</div>
            <CleanTextSelect text_id={selected_text.text_id}/>
          </div>: <></>}
        </Column>
        <Column>
          {(selected_clean_text !== null) ? 
          <div>
            <CleanTextPreview/>
            <hr/>
            <ModelHome/>
          </div>: <></>}
        </Column>
      </ColumnGrid>
    </>
  );
}
