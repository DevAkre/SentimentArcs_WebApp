import {React} from 'react';
import CleanTextPreview from '../components/CleanTextPreview';
import {LoadingSpinner,GreenCheck, RedCross} from '../components/SVGElems';


export default function TestPage() {
  return(
    <>
    <LoadingSpinner/> Brubber 
    <br/>
    <GreenCheck/> Brubber
    <br/>
    <RedCross/> Brubber
    </>
  );
}
