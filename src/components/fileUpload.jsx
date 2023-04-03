import React, {useState, useRef} from 'react';

const DEFAULT_MAX_FILE_SIZE = 10000000; // 10MB
const DEFAULT_ACCEPT_TYPES = ".txt,.pdf";

export default function FileUpload({label, fileCallBack, maxFileSize = DEFAULT_MAX_FILE_SIZE, accept= DEFAULT_ACCEPT_TYPES
}) {
    const [file, setFile] = useState(null);
    const fileInputField = useRef(null);
    

    return (
        <div>
            <div>
                <label>{label}</label>
                <button type="button">
                <i className="" />
                <span className = "px-3"> Upload New File:</span>
                </button>
                
                <input className = "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" ref={fileInputField} type="file"/>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">TXT or PDF (Max. {maxFileSize/1000000} MB).</p>
            </div>
            <div>
                <section>
                    {file && (
                        file.name + " " + file.size + " " + file.type
                    )}
                </section>
            </div>
        </div>
    );
}