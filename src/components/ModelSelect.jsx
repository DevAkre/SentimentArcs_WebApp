import React, {useState, useContext} from 'react';
import {SubmitButton, CustomSubmitButton} from './SubmitButton';
import {useAuth} from '../hooks/useAuth';
import SearchBox from './SearchBox';
import {StoreContext} from '../contexts/StoreContext';
import { GreenCheck, LoadingSpinner } from './SVGElems';
const model_options = require("../constants/modelOptions.json")

function ListItem({id, label, status}){
    let icon = null;
    if(status === "completed"){
        icon = <GreenCheck/>;
    } else if(status === "running"){
        icon = <LoadingSpinner/>;
    }
    return(
            <li id={id} className="cursor-pointer flex p-2 w-full border-b items-center rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                {label} 
                {icon}
            </li>
    );
}

export default function TextSelect(_) {
    const modelList = model_options;

    const handleSelect = (event) => {
        
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
                        <ListItem key={i} id = {i} label = {model.name} status = {"completed"}/>
                    )}
                </ul>
        </div>
    );
}