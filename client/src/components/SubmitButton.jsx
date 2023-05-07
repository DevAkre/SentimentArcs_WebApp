export function SubmitButton({label, ...props}) {
    return (
        <button
        type="submit"
        className="w-full text-gray-900 bg-slate-200 dark:text-white dark:bg-slate-700 hover:bg-slate-300 focus:ring-4 focus:outline focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-slate-600 dark:focus:ring-primary-800"
        {...props}
        >
            {label}
        </button>
    )
}

export function CustomSubmitButton({label,text_color = ["text-gray-900","dark:text-white"], bg_color = ["bg-slate-200","dark:bg-slate-700"], hover_bg_color = ["hover:bg-slate-300", "dark:hover:bg-slate-600"],  ...props}) {

    return (
        <button
        type="submit"
        className={"w-full focus:ring-4 focus:outline focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800 " + text_color[0] + " " + bg_color[0] + " " + hover_bg_color[0] + " " + text_color[1] + " " + bg_color[1] + " " + hover_bg_color[1]}
        {...props}
        >
            {label}
        </button>
    )
}