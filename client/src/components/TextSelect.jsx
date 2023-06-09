import React, {useState, useContext} from 'react';
import {CustomSubmitButton} from './SubmitButton';
import {useAuth} from '../hooks/useAuth';
import Dropdown from './Dropdown';
import {StoreContext} from '../contexts/StoreContext';
import { api_delete, api_download, api_list } from '../api/textAPI';

function ListItem({id, label, onClickSelect, onClickDelete, onClickDownload, extraInfo= null}){
    return(
            <li id={id} className="cursor-pointer flex py-2 w-full border-b items-center justify-between rounded hover:bg-gray-100 dark:hover:bg-gray-600" onClick = {onClickSelect}>
                <div className= "md-text-lg">
                    {label}
                </div> 
                <div className="text-red-500">
                    {extraInfo}
                    <div className = "flex flex-row space-x-2">
                        <CustomSubmitButton label = "Delete" id={id}
                            text_color = {["text-black", "text-white"]} 
                            bg_color = {["bg-red-700", "bg-red-700"]} 
                            hover_bg_color = {["hover:bg-red-600","dark:hover:bg-red-600"]}
                            onClick = {onClickDelete}
                        />
                        <CustomSubmitButton label = "Download" id={id}
                            text_color = {["text-black", "text-white"]} 
                            bg_color = {["bg-slate-300","dark:bg-slate-800"]} 
                            hover_bg_color = {["hover:bg-slate-200","dark:hover:bg-slate-700"]}
                            onClick = {onClickDownload}
                        />
                    </div>
                </div>
                
            </li>
    );
}

export default function TextSelect(_) {
    const [textList, setTextList] = useState([]);
    const selected_text = useContext(StoreContext).selected_text;
    const selected_clean_text = useContext(StoreContext).selected_clean_text;
    const {token} = useAuth();

    const handleSelect = (event) => {
        const text_id = parseInt(event.currentTarget.id);
        if(selected_text.text===null || text_id !== selected_text.text.text_id){
            for(var i = 0; i < textList.length; i++){
                if(textList[i].text_id === text_id){
                    selected_text.setText(textList[i]);
                    selected_clean_text.setCleanText(null);
                    break;
                }
            }
        }
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        const text_id = parseInt(event.currentTarget.id);
        api_delete(token,text_id).then(
            (data) => {
                if(data.success){
                    //remove from list
                    for(var i = 0; i < textList.length; i++){
                        if(textList[i].text_id === text_id){
                            const textListCopy = [...textList];
                            textListCopy.splice(i,1);
                            console.log("Deleted text ", text_id, " at index ", i, " from list");
                            setTextList(textListCopy);
                            if(selected_text.text !== null && selected_text.text.text_id === text_id){
                                selected_text.setText(null);
                            }
                            break;
                        }
                    }
                }else {
                    console.error("Error: ", data.error);
                }
        });
    }

    const handleDownload = (event) => {
        event.preventDefault();
        const text_id = parseInt(event.currentTarget.id);
        const text = textList.find((text) => text.text_id === text_id)
        api_download(token,text_id, text);
    }

    const handleDrop = (event) => {
        api_list(token).then(
            (data) => {
                if(data.success){
                    setTextList(JSON.parse(data.texts));
                }else {
                    console.error("Error: ", data.error);
                }
            });        
    }

    return(
        <div>
            <Dropdown label={selected_text.text===null? "Select text":"Selected: " + selected_text.text.title + (selected_text.text.author?" by " + selected_text.text.author: "")} dropFunction={handleDrop} Effect={selected_text.text} >
                    {textList.map((text, i) => 
                        <ListItem key={text.text_id} id = {text.text_id} label = {text.title + " - " + text.author}
                        extraInfo = {"Date: " + text.date_uploaded.split(' ')[0] + ", text_id: " + text.text_id}
                        onClickSelect = {handleSelect} onClickDelete = {handleDelete} onClickDownload = {handleDownload}/>
                    )}
            </Dropdown>
        </div>
    );
}