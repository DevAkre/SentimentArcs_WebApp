import React, {useState, useContext} from 'react';
import SubmitButton from './SubmitButton';
import {useAuth} from '../hooks/useAuth';
import SearchBox from './SearchBox';
import {StoreContext} from '../contexts/StoreContext';

function ListItem({id, label, onClick, extraInfo= null}){
    return(
            <li id={id} className="cursor-pointer flex py-2 w-full border-b items-center justify-between rounded hover:bg-gray-100 dark:hover:bg-gray-600" onClick = {onClick} >
                <div className= "md-text-lg w-full">
                    <input id={"checkbox-"+id} type="checkbox" value="" class="h-4 mr-2" onClick={(e)=>{e.stopPropagation()}}/>
                    <label for={"checkbox-"+id} class="ml-2 w-full" onClick={(e)=>{e.stopPropagation()}}>
                        {label}
                    </label>         
                </div> 
                <div className="text-red-500">
                    {extraInfo}
                </div>
            </li>
    );
}

export default function TextSelect(_) {
    const optionList = ["option1", "option2", "option3", ];
    const store = useContext(StoreContext);
    const {token} = useAuth();

    const handleSelect = (event) => {
        event.preventDefault();
        const id = parseInt(event.currentTarget.id);
        
    }


    if(store.selected_text.text===null) 
        return <></>
    return(
        <form onClick = {handleSelect}>
            <div className='mb-2'> Select text cleaning options:</div>
            <div id="cleaningOptions" className="z-10 bg-white rounded-lg shadow bg-slate-300 dark:bg-slate-900">
                <ul className="h-48  px-3 pb-3 overflow-y-auto">
                    {optionList.map((option, i) => 
                        <ListItem key={i} id = {i} label = {option}
                        />
                    )}
                </ul>
                <SubmitButton label = "Clean Text"/>
            </div>
        </form>
    );
}