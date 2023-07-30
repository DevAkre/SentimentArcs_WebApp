import { useEffect, useState } from "react";
import { api_figure, api_figure_ensemble } from "../api/modelAPI";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "./SVGElems";

export function PngBoxSingle({clean_text_id, model}){
    const token = useAuth().token;
    const [valid, setValid] = useState(false);
    
    useEffect(() => {
        if(model === null){
            return;
        }
        
        api_figure(token, clean_text_id, model).then(
            (data) => {
                //check if data is json or blob
                if(data.type === "application/json"){
                    setValid(false);
                    console.log(data);
                    return;
                }
                setValid(true);
                const img = document.getElementById("pngbox-img");
                img.src = URL.createObjectURL(data);
            }
        )
    },[model]);

    return (
        <div className="flex justify-center">
            {valid ? "" : "Unavailable"}
            <img id="pngbox-img" className={valid?"":"hidden" +" max-w-full"} alt="Can't find figure!"/>
        </div>
    )
}

export function PngBoxEnsemble({clean_text_id}){
    const token = useAuth().token;
    const [valid, setValid] = useState(false);

    useEffect(() => {
        
        api_figure_ensemble(token, clean_text_id).then(
            (data) => {
                //check if data is json or blob
                if(data.type === "application/json"){
                    console.log(data);
                    return;
                }
                const img = document.getElementById("pngboxens-img");
                img.src = URL.createObjectURL(data);
                setValid(true);
            }
        )
    },[clean_text_id]);

    return (
        <div className="flex justify-center">
            {valid ? "" : <LoadingSpinner/>}
            <img id="pngboxens-img" className=" max-w-full"/>
        </div>
    )
}