export function api_create(token, text_id,sendData, setCleanText){
    fetch('/api/clean_text/create', {
        method: "POST",
        body: JSON.stringify({"token":token, "text_id":text_id, "options":sendData}),
        headers: {
            'Content-Type': 'application/json'
        }}).then(response => response.json()
        ).then(data => {
            if(data.success){
                console.log(data)
                setCleanText(data.cleanText);
            }else{
                console.error("Error: ", data.error);
                alert("Error: " + data.error)
            }
        });
}

export function api_list(token, text_id){
    return fetch('/api/clean_text/list', {
        method: "POST",
        body: JSON.stringify({"token":token, "text_id":text_id}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (response) => {
            if(response.ok){
                return response.json();
            }
    });
}

export function api_delete(token, clean_text_id){
    return fetch('/api/clean_text/delete', {
        method: "POST",
        body: JSON.stringify({"token":token, "clean_text_id":clean_text_id}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (response) => {
            if(response.ok){
                return response.json();
            }
    });
}

export function api_preview(token,clean_text_id, num ){
    return fetch('/api/clean_text/preview', {
        method: "POST",
        // body: JSON.stringify({"token": token, "clean_text_id": clean_text.clean_text_id}),
        body: JSON.stringify({"token": token, "clean_text_id": clean_text_id, "num": num}),
        headers: {
            'Content-Type': 'application/json'
        }}).then(response => response.json()
        );
}