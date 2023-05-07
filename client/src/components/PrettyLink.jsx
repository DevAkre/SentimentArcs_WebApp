import {Link} from "react-router-dom";
export default function PrettyLink({label , to}) {
    return (
        <Link
            to={to}
            className="text-sm font-medium text-gray-500 hover:underline dark:text-gray-300"
        >
            {label}
        </Link>
    )
}