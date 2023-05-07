import React, {useState, useContext} from 'react';
import {SubmitButton} from './SubmitButton';
import {useAuth} from '../hooks/useAuth';
import {StoreContext} from '../contexts/StoreContext';
import {api_create } from '../api/clean_textAPI';
const default_options = require('../constants/cleanOptions.json');


function ListItem({id, parentId, label, isChecked, type="checkbox", name=null, mandatory=false, listChildren = null, depth = 0}){
    let children = null;
    if(listChildren !== null){
        children = <ul>
            {listChildren.map((option, index) => 
                <ListItem key={option.name} id={option.name} parentId={id} label={option.name} isChecked={option.value} type={option.type} mandatory={option.mandatory} listChildren={option.children} depth={depth+1}/>
            )}
        </ul>
    }
    const liClassName = "cursor-pointer border-b items-center " + ((depth>0)?"ml-4":"");
    let input;
    if(type === "checkbox" || type === "radio"){
        input = <>
        <input id={type+"-"+id} name={parentId} type={type} className="h-4 w-4" defaultChecked={isChecked} readOnly={mandatory}/>
        <label htmlFor={type+"-"+id} className="pl-2 w-full py-2">
            {label}
        </label>
        </>
    }else if(type === "text" || type === "number"){
        input = <>
        <label htmlFor={type+"-"+id} className="pl-2 w-full py-2">
            {label}
        </label>
        <input id={type+"-"+id} type={type} className="grow bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " defaultValue={isChecked} readOnly={mandatory}/>
        </>
    }else if(type === "section"){
        input = <>
        <label htmlFor={type+"-"+id} className="pl-2 w-full py-2">
            {label}
        </label>
        </>
    }
    return(
            <li id={id} className={liClassName}>
                <div className= "flex items-center md-text-lg w-full hover:bg-gray-100 dark:hover:bg-gray-600">
                    {input}         
                </div>
                {children} 
            </li>
    );
}

function updateOptions(options){
    for(let i = 0; i < options.length; i++){
        // console.log(options[i].type+"-"+options[i].name);
        if(options[i].type === "text" || options[i].type === "number") options[i].value = document.getElementById(options[i].type+"-"+options[i].name).value;
        else if(options[i].type === "checkbox" || options[i].type === "radio") options[i].value = document.getElementById(options[i].type+"-"+options[i].name).checked;
        if(options[i].children !== null){
            options[i].children = updateOptions(options[i].children);
        }
    }
    return options;
}

function optionToData(options){
    let temp = [];
    for(let i = 0; i < options.length; i++){
        if(options[i].value){
            if(options[i].type === "text" || options[i].type === "number"){
                temp.push(options[i].name + ":" + options[i].value);
            }else if(options[i].type === "checkbox" || options[i].type === "radio"){
                temp.push(options[i].name);
            }
        }
        if(options[i].children !== null){
            temp = temp.concat(optionToData(options[i].children));
        }
    }
    return temp;
}

export default function CleanText({text_id}) {
    const [options, setOptions] = useState(default_options);
    const selected_clean_text = useContext(StoreContext).selected_clean_text;
    const {token} = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        const newOptions = updateOptions(options);
        setOptions(newOptions);
        const sendData = optionToData(newOptions);
        console.log(sendData);
        api_create(token, text_id, sendData, selected_clean_text.setCleanText)
    }

    return(
        <form className = "mb-2" onSubmit={handleSubmit}>
            <div className='mb-2'> Select text cleaning options:</div>
            <div id="cleaningOptions" className="z-10 bg-white rounded-lg shadow bg-slate-300 dark:bg-slate-900">
                <ul className="h-48  px-3 pb-3 overflow-y-auto">
                    {options.map((option, i) => 
                        <ListItem key={option.name} id={option.name} parentId={"cleaningOptions"} type={option.type}  label={option.name} isChecked={option.value} mandatory={option.mandatory} listChildren={option.children}
                        />
                    )}
                </ul>
                <SubmitButton label="Clean Text"/>
            </div>
        </form>
    );
}