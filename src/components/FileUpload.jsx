import React, {useState, useRef} from 'react';
import InputBox from './InputBox';
import SubmitButton from './SubmitButton';
import {useAuth} from '../hooks/useAuth';

const DEFAULT_MAX_FILE_SIZE = 10000000; // 10MB
const DEFAULT_ACCEPT_TYPES = ".txt,.pdf";



export default function FileUpload({label, fileCallBack, maxFileSize = DEFAULT_MAX_FILE_SIZE, accept= DEFAULT_ACCEPT_TYPES
}) {
    const {token} = useAuth();
    const [file, setFile] = useState(null);
    const ref = useRef(null);
    const handleFileChange = (event) => {
        if (event.target.files) {
            if (event.target.files[0].size > maxFileSize) {
                alert("File is too big!");
                event.target.value = null;
                return;
            }else{
                setFile(event.target.files[0]);
            }
        }
    };
    
    const handleFileUpload = async (event) => {
        event.preventDefault();
        if(!file){
            return;
        }
        const data = new FormData(event.currentTarget);
        data.append("token", token);
        console.log(data);
        const response = await fetch("/api/text/upload", {
            method: "POST",
            body: data
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error uploading file");
        });
        const responseData = await response.json();
        console.log(responseData);
        if(responseData.success){
            event.target.reset();
            setFile(null);
            fileCallBack(responseData);
        }else
            alert("Error uploading file: " + responseData.error);

    }

    return (
        <div>
            <div>
                <form className="space-y-2"  onSubmit={handleFileUpload}>
                    <label>{label}</label>
                    <span> Upload New File:</span>
                    <input 
                    className = "block w-full text-sm text-slate-900 border border-slate-300 rounded-lg cursor-pointer bg-slate-50 dark:text-slate-400 focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 file:mr-4 file:py-2 file:px-4 file:full file:border-0 file:text-sm file:font-semibold file:bg-slate-200 file:dark:bg-slate-900 file:dark:text-white hover:file:bg-slate-100 hover:file:dark:bg-slate-800" 
                    aria-describedby="file_input_help" ref={ref} name="file" id="file" type="file" accept=".txt, application/pdf" required onChange={handleFileChange}/>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-300" id="file_input_help">TXT or PDF (Max. {maxFileSize/1000000} MB).</p>
                    <InputBox label="Title" id="title" inline/>
                    <InputBox label="Author" id="author" inline/>
                    <SubmitButton label = "Upload File"/>
                </form>
            </div>
            <div>
                <section className='text-l'>
                    {file && (
                        "Selected: " + file.name + " " + file.size + "B " + file.type
                    )}
                </section>
            </div>
        </div>
    );
}