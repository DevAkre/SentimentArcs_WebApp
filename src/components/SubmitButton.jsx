export default function SubmitButton({label, ...props}) {
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