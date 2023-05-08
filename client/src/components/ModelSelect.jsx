import { useContext } from "react";
import Dropdown from "./Dropdown";
import { ModelContext } from "../contexts/ModelContext";
import { api_list } from "../api/modelAPI";
import { StoreContext } from "../contexts/StoreContext";
import { useAuth } from "../hooks/useAuth";
const modelOptions = require('../constants/modelOptions.json')


function ListItem({id, label, onClickSelect}){
    return(
        <li id={id} className="cursor-pointer flex py-2 w-full border-b items-center justify-between rounded hover:bg-gray-100 dark:hover:bg-gray-600" onClick = {onClickSelect}>
            <div className= "md-text-lg">
                {label}
            </div> 
        </li>
    );
}


export default function ModelSelect(){
    const model = useContext(ModelContext).model;
    const setModel = useContext(ModelContext).setModel;
    const clean_text = useContext(StoreContext).selected_clean_text;
    const {token} = useAuth();

    const handleDrop = () => {
        
    }

    const handleSelect = (event) =>{

    }



    return(
        <div className="flex justify-center">
            <Dropdown isSearchable= {false} label ={"Selected: " + model} dropFunction={handleDrop} Effect={model}>
                {modelOptions.map((model, i) => 
                    <ListItem key={i} id = {model.name} label = {model.name}
                    onClickSelect = {handleSelect}/>
                )}
            </Dropdown>
        </div>
    )
}