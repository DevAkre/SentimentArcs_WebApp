import React, {useState, useContext} from 'react';
import {CustomSubmitButton} from './SubmitButton';
import {useAuth} from '../hooks/useAuth';
import {StoreContext} from '../contexts/StoreContext';
import { api_list, api_delete} from '../api/clean_textAPI';
import Dropdown from './Dropdown';

function ListItem({id, label, onClickSelect, onClickDelete, extraInfo= null}){
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
                    </div>
                </div>
                
            </li>
    );
}

export default function CleanTextSelect({text_id}) {
    const [cTextList, setCTextList] = useState([]);
    const selected_clean_text = useContext(StoreContext).selected_clean_text;
    const {token} = useAuth();

    

    const handleSelect = (event) => {
        const text_id = parseInt(event.currentTarget.id);
        if(selected_clean_text.cleanText===null || text_id !== selected_clean_text.cleanText.clean_text_id){
            for(var i = 0; i < cTextList.length; i++){
                if(cTextList[i].clean_text_id === text_id){
                    selected_clean_text.setCleanText(cTextList[i]);
                    break;
                }
            }
        }
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        const text_id = parseInt(event.currentTarget.id);
        api_delete(token, text_id).then(
            (data) => {
                if(data.success){
                    //remove from list
                    for(var i = 0; i < cTextList.length; i++){
                        if(cTextList[i].clean_text_id === text_id){
                            const cTextListCopy = [...cTextList];
                            cTextListCopy.splice(i,1);
                            console.log("Deleted text ", text_id, " at index ", i, " from list");
                            setCTextList(cTextListCopy);
                            if(selected_clean_text.cleanText !== null && selected_clean_text.cleanText.clean_text_id === text_id){
                                selected_clean_text.setCleanText(null);
                            }
                            break;
                        }
                    }
                }else {
                    console.error("Error: ", data.error);
                }
        });
    }

    const handleDrop = () => {
        api_list(token,text_id).then(
            (data) => {
                if(data.success){
                    setCTextList(JSON.parse(data.cleanTexts));
                }else {
                    console.error("Error: ", data.error);
                    alert("Error: " + data.error)
                }
            });
    }

    return(
        <div>
            <div className='mb-2'> Select previously cleaned text:</div>
            <Dropdown label ={selected_clean_text.cleanText===null? "Select text":"Selected: " + selected_clean_text.cleanText.options} dropFunction={handleDrop} Effect={selected_clean_text.cleanText}>
                {cTextList.map((text, i) => 
                    <ListItem key={text.clean_text_id} id = {text.clean_text_id} label = {text.options}
                    extraInfo = {"Date: " + text.date_processed.split(' ')[0] + ", clean_id: " + text.clean_text_id}
                    onClickSelect = {handleSelect} onClickDelete = {handleDelete}/>
                )}
            </Dropdown>
        </div>
    );
}