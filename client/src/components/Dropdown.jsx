import SearchBox from "./SearchBox"
import { SubmitButton } from "./SubmitButton";
import { useState, useEffect } from "react";

export default function Dropdown({isSearchable = true, label, dropFunction,Effect, children}){
    const [drop, setDrop] = useState(false);
    const handleDrop = async(event) => {
        if(!drop){
            dropFunction();
        }
        setDrop(!drop);
    }

    useEffect(() => {
        setDrop(Effect === null && drop);
    }, [Effect]);

    return(
    <div>
        
        <SubmitButton label = {label} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" onClick = {handleDrop} / >
        <div id="dropdownSearch" className={(drop?"":"hidden") + " z-10 bg-white rounded-lg shadow bg-slate-300 dark:bg-slate-900"}>
            {isSearchable?<SearchBox/>:""}
            <ul className="h-48  px-3 pb-3 overflow-y-auto">
                {children}
            </ul>
        </div>
    </div>
    );
}