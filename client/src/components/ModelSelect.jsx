import React, {useState, useContext, useEffect} from 'react';
import {SubmitButton, CustomSubmitButton} from './SubmitButton';
import {useAuth} from '../hooks/useAuth';
import SearchBox from './SearchBox';
import {StoreContext} from '../contexts/StoreContext';
import { GreenCheck, LoadingSpinner, RedCross} from './SVGElems';
const model_options = require("../constants/modelOptions.json")

function ListItem({id, label, status, onClick}){
    let icon = null;
    if(status === "completed"){
        icon = <GreenCheck/>;
    } else if(status === "running"){
        icon = <LoadingSpinner/>;
    } else if(status === "stopped"){
        icon = <RedCross/>;
    }
    return(
            <li id={id} className="cursor-pointer gap-x-2 flex p-2 w-full border-b items-center rounded hover:bg-gray-100 dark:hover:bg-gray-600" onClick={onClick}>
                {icon}
                {label} 
            </li>
    );
}

export default function TextSelect(_) {
    const modelList = model_options;
    const clean_text = useContext(StoreContext).selected_clean_text.cleanText;
    const {token} = useAuth();
    const [status, setStatus] = useState(Array(modelList.length).fill("stopped"));

    useEffect(() => {
        fetch('/api/model/list', {
            method: "POST",
            body: JSON.stringify({"token":token, "clean_text_id":clean_text.clean_text_id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            let newStatus = Array(modelList.length).fill("stopped");
            modelList.map((model, i) => {
                if(data.models.includes(model.name)){
                    newStatus[i] = "completed";
                }
            })
            setStatus(newStatus);
        })
    },[clean_text]);


    const handleSelect = async (event) => {
        const modelID = parseInt(event.currentTarget.id);
        if(clean_text === null){
            return;
        }
        if(status[modelID] === "stopped"){
            setStatus(status.map((s, i) => i === modelID ? "running" : s));
            let response = await fetch("/api/model/run", {
                method: "POST",
                body: JSON.stringify({"token" : token, "model_name": modelList[modelID].name, "clean_text_id": clean_text.clean_text_id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if(response.ok){
                let data = await response.json();
                console.log(data)
                if(data.success){
                    setStatus(status.map((s, i) => i === modelID ? "completed" : s));
                } else {
                    console.error(data.error);
                    alert(data.error);
                    setStatus(status.map((s, i) => i === modelID ? "stopped" : s));
                }
            }else {
                console.error("Response not ok");
                setStatus(status.map((s, i) => i === modelID ? "stopped" : s));
            }
        }
    }

    const handleDelete = (event) => {
        
    }

    const handleSubmit = async(event) => {
        
    }

    return(
        <div>
            <div className='mb-2'> Select models to run:</div>
                <ul className="h-80 px-3 pb-3">
                    {modelList.map((model, i) => 
                        <ListItem key={i} id = {i} label = {model.name} status = {status[i]} onClick={handleSelect} />
                    )}
                </ul>
        </div>
    );
}