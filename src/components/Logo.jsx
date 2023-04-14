export default function Logo({inline = false}){
    if(!inline){
        return(
            <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
                className="w-8 h-8 mr-2"
                src="logo192.png"
                alt="Logo"
            />
            SentimentArcs
            </span>      
        );
    }else{
        return(
            <span className="flex items-center">
                <img
                    src="logo192.png" 
                    className="h-6 mr-3 sm:h-9" 
                    alt="Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SentimentArcs</span>
            </span>   
        );
    }
        
}