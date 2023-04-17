import React, {useState, useContext} from 'react';
import SubmitButton from './SubmitButton';
import {useAuth} from '../hooks/useAuth';
import SearchBox from './SearchBox';
import {StoreContext} from '../contexts/StoreContext';

function ListItem({id, label, onClick, extraInfo= null}){
    return(
            <li id={id} className="cursor-pointer flex py-2 w-full border-b items-center justify-between rounded hover:bg-gray-100 dark:hover:bg-gray-600" onClick = {onClick}>
                <div className= "md-text-lg">
                    {label}
                </div> 
                <div className="text-red-500">
                    {extraInfo}
                </div>
            </li>
    );
}

export default function TextSelect(_) {
    const [drop, setDrop] = useState(false);
    const [textList, setTextList] = useState([]);
    const store = useContext(StoreContext);
    const {token} = useAuth();

    const handleSelect = (event) => {
        const text_id = parseInt(event.currentTarget.id);
        if(store.selected_text.text===null || text_id !== store.selected_text.text.text_id){
            for(var i = 0; i < textList.length; i++){
                if(textList[i].text_id === text_id){
                    store.selected_text.setText(textList[i]);
                    setDrop(false);
                    break;
                }
            }
        }
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
            <SubmitButton label = {store.selected_text.text===null? "Select text":"Selected: " + store.selected_text.text.title + (store.selected_text.text.author?" by " + store.selected_text.text.author: "")} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" onClick = {handleDrop} / >
            <div id="dropdownSearch" className={(drop?"":"hidden") + " z-10 bg-white rounded-lg shadow bg-slate-300 dark:bg-slate-900"}>
                <SearchBox/>

                <ul className="h-48  px-3 pb-3 overflow-y-auto">
                    {textList.map((text, i) => 
                        <ListItem key={text.text_id} id = {text.text_id} label = {text.title + " - " + text.author}
                        extraInfo = {"Date: " + text.date_uploaded.split(' ')[0] + ", text_id: " + text.text_id}
                        onClick = {handleSelect}/>
                    )}
                </ul>
                <div className="flex p-3 text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
                    {
                        //DOES NOT WORK YET. WIP
                    }
                    Delete Text
                </div>
            </div>
        </div>
    );
}