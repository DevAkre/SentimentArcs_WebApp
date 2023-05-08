import React, {useState, useContext, useEffect} from 'react';
import {useAuth} from '../hooks/useAuth';
import {StoreContext} from '../contexts/StoreContext';
import { GreenCheck, LoadingSpinner, RedCross} from './SVGElems';
import { api_create, api_list } from '../api/modelAPI';
const model_options = require("../constants/modelOptions.json")

function ListItem({id, label, status, onClick}){
    let icon = null;
    let className ="gap-x-2 flex p-2 w-full border-b items-center rounded";
    if(status === "completed"){
        icon = <GreenCheck/>;
    } else if(status === "running"){
        icon = <LoadingSpinner/>;
    } else if(status === "stopped"){
        icon = <RedCross/>;
        className += " hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ";
    }
    return(
            <li id={id} className={className} onClick={onClick}>
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
        api_list(token, clean_text.clean_text_id).then(data => {
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
            api_create(token,modelList[modelID].name,clean_text.clean_text_id).then(data=>{
                console.log(data)
                if(data.success){
                    setStatus(status.map((s, i) => i === modelID ? "completed" : s));
                } else {
                    console.error(data.error);
                    alert(data.error);
                    setStatus(status.map((s, i) => i === modelID ? "stopped" : s));
                }
            })
        }
    }

    const handleDelete = (event) => {
        
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