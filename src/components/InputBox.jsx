export default function InputBox({label, id, type = "text", required = true, inline = false}){
    return (
        <div className= {(inline ? "md:flex md:items-center mb-6" : "")}>
            <label
                htmlFor= {id}
                className={"block mb-2 font-medium text-gray-900 dark:text-white " + (inline ? "mb-1 md:mb-0 pr-4 md:w-1/5 text-md" : "text-sm")}
            >
                {label}
            </label>
            <input
                name= {id}
                type = {type}
                id= {id}
                className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (inline ? "md:w-4/5" : "")}
                required = {required}
            />
        </div>
    )
}