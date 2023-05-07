import {React} from 'react';
import CleanTextPreview from '../components/CleanTextPreview';
import ModelSelect from '../components/ModelSelect';
import {LoadingSpinner,GreenCheck} from '../components/SVGElems';


export default function TestPage() {
  return(
    <>
    <ModelSelect/>
    <LoadingSpinner/> Brubber 
    <br/>
    <GreenCheck/> Brubber
    </>
  );
}
