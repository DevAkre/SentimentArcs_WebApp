import React, {useState, useContext} from 'react';
import {SubmitButton, CustomSubmitButton} from './SubmitButton';
import {useAuth} from '../hooks/useAuth';
import SearchBox from './SearchBox';
import {StoreContext} from '../contexts/StoreContext';

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
    const [drop, setDrop] = useState(false);
    const [cTextList, setCTextList] = useState([]);
    const selected_clean_text = useContext(StoreContext).selected_clean_text;
    const {token} = useAuth();

    const handleSelect = (event) => {
        const text_id = parseInt(event.currentTarget.id);
        if(selected_clean_text.cleanText===null || text_id !== selected_clean_text.cleanText.clean_text_id){
            for(var i = 0; i < cTextList.length; i++){
                if(cTextList[i].clean_text_id === text_id){
                    selected_clean_text.setCleanText(cTextList[i]);
                    setDrop(false);
                    break;
                }
            }
        }
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        const text_id = parseInt(event.currentTarget.id);
        fetch('/api/clean_text/delete', {
            method: "POST",
            body: JSON.stringify({"token":token, "clean_text_id":text_id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                if(response.ok){
                    return response.json();
                }
        }).then(
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

    const handleDrop = async(event) => {
        //to be dropped down
        if(!drop){
            //get list of files
            fetch('/api/clean_text/list', {
                method: "POST",
                body: JSON.stringify({"token":token, "text_id":text_id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                (response) => {
                    if(response.ok){
                        return response.json();
                    }
            }).then(
                (data) => {
                    if(data.success){
                        setCTextList(JSON.parse(data.cleanTexts));
                        setDrop(!drop);
                    }else {
                        console.error("Error: ", data.error);
                        alert("Error: " + data.error)
                    }
                });
        }else setDrop(!drop);
    }
    return(
        <div>
            <div className='mb-2'> Select previously cleaned text:</div>
            <SubmitButton label = {selected_clean_text.cleanText===null? "Select text":"Selected: " + selected_clean_text.cleanText.options} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" onClick = {handleDrop} / >
            <div id="dropdownSearch" className={(drop?"":"hidden") + " z-10 bg-white rounded-lg shadow bg-slate-300 dark:bg-slate-900"}>
                <SearchBox/>

                <ul className="h-48  px-3 pb-3 overflow-y-auto">
                    {cTextList.map((text, i) => 
                        <ListItem key={text.clean_text_id} id = {text.clean_text_id} label = {text.options}
                        extraInfo = {"Date: " + text.date_processed.split(' ')[0] + ", clean_id: " + text.clean_text_id}
                        onClickSelect = {handleSelect} onClickDelete = {handleDelete}/>
                    )}
                </ul>
            </div>
        </div>
    );
}