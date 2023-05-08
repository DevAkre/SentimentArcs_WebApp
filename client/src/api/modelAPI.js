export function api_list(token, clean_text_id){
    return fetch('/api/model/list', {
        method: "POST",
        body: JSON.stringify({"token":token, "clean_text_id":clean_text_id}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}

export function api_create(token, model_name,clean_text_id){
    return fetch("/api/model/run", {
        method: "POST",
        body: JSON.stringify({"token" : token, "model_name": model_name, "clean_text_id":clean_text_id}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}