import React, {useState, useContext, useEffect} from 'react';
import {StoreContext} from '../contexts/StoreContext';
import { useAuth } from '../hooks/useAuth';
import {SubmitButton} from './SubmitButton';
const PREVIEW_SENTENCE_NUM = 3;

//function fetches preview of clean text from server and return component displaying it
export default function CleanTextPreview(_){
    const {token} = useAuth();
    const [preview, setPreview] = useState([]);
    const [mode, setMode] = useState(2);
    const clean_text = useContext(StoreContext).selected_clean_text.cleanText;

    useEffect(() => {
        if(!clean_text) return;
        fetch('/api/clean_text/preview', {
            method: "POST",
            // body: JSON.stringify({"token": token, "clean_text_id": clean_text.clean_text_id}),
            body: JSON.stringify({"token": token, "clean_text_id": null, "num": PREVIEW_SENTENCE_NUM}),
            headers: {
                'Content-Type': 'application/json'
            }}).then(response => response.json()
            ).then(data => {
                if(data.success){
                   setPreview(data.preview);
                }else{
                    console.error("Error: ", data.error);
                }});
    }, [clean_text, token]);
        
    const handleClick = () => {
        if(mode === 2) setMode(1);
        else setMode(2);
    }
    
    return(
        <div className= "p-2">
            <div className='mb-2'>Clean Text Preview: 
            </div>
            <div className="z-10 h-80 overflow-y-auto px-3 pb-3 bg-white rounded-lg shadow bg-slate-300 dark:bg-slate-900">
                <p>Start of Text</p>
                <hr/>
                {preview.map((sentArr, index) => {
                    return (
                    <div key = {index} className= "pb-2">{sentArr.map((sent, index) =>
                        {return (sent[mode] + " ")}
                    )}
                    {(index < 2)?<div>...</div>:null}
                    </div>
                    );
                })}
                <hr/>
                <p>End of Text</p>
            </div>
            <div>
                <SubmitButton label={mode===2?"Cleaned Text":"Original Text"} onClick={handleClick}/>
            </div>
        </div>
    );
}