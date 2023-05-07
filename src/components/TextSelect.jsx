import React, {useState, useContext, useEffect} from 'react';
import {SubmitButton, CustomSubmitButton} from './SubmitButton';
import {useAuth} from '../hooks/useAuth';
import SearchBox from './SearchBox';
import {StoreContext} from '../contexts/StoreContext';

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
    const [drop, setDrop] = useState(false);
    const [textList, setTextList] = useState([]);
    const selected_text = useContext(StoreContext).selected_text;
    const selected_clean_text = useContext(StoreContext).selected_clean_text;
    const {token} = useAuth();
    console.log(drop);

    //If selected text becomes null when drop is open, close drop
    useEffect(() => {
        setDrop(selected_text.text === null && drop);
    }, [selected_text.text]);

    const handleSelect = (event) => {
        const text_id = parseInt(event.currentTarget.id);
        if(selected_text.text===null || text_id !== selected_text.text.text_id){
            for(var i = 0; i < textList.length; i++){
                if(textList[i].text_id === text_id){
                    selected_text.setText(textList[i]);
                    selected_clean_text.setCleanText(null);
                    setDrop(false);
                    break;
                }
            }
        }
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        const text_id = parseInt(event.currentTarget.id);
        fetch('/api/text/delete', {
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
        fetch('/api/text/download', {
            method: "POST",
            body: JSON.stringify({"token":token, "text_id":text_id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                return response.blob();
        }).then(
            (blob) => {
                const href = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.download = text.title + "-" + text.author  + ".txt";
                a.href = href;
                console.log(a);
                a.click();
                a.href = "";
                
        });
    }

    const handleDrop = async(event) => {
        //to be dropped down
        if(!drop){
            //get list of files
            fetch('/api/text/list', {
                method: "POST",
                body: JSON.stringify({"token":token}),
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
                        setTextList(JSON.parse(data.texts));
                        setDrop(!drop);
                    }else {
                        console.error("Error: ", data.error);
                    }
                });
            

        }else setDrop(!drop);
        
    }

    return(
        <div>
            <div className='mb-2'> Select previously uploaded files:</div>
            <SubmitButton label = {selected_text.text===null? "Select text":"Selected: " + selected_text.text.title + (selected_text.text.author?" by " + selected_text.text.author: "")} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" onClick = {handleDrop} / >
            <div id="dropdownSearch" className={(drop?"":"hidden") + " z-10 bg-white rounded-lg shadow bg-slate-300 dark:bg-slate-900"}>
                <SearchBox/>

                <ul className="h-48  px-3 pb-3 overflow-y-auto">
                    {textList.map((text, i) => 
                        <ListItem key={text.text_id} id = {text.text_id} label = {text.title + " - " + text.author}
                        extraInfo = {"Date: " + text.date_uploaded.split(' ')[0] + ", text_id: " + text.text_id}
                        onClickSelect = {handleSelect} onClickDelete = {handleDelete} onClickDownload = {handleDownload}/>
                    )}
                </ul>
            </div>
        </div>
    );
}