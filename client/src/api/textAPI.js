export function api_delete(token, text_id){
    return fetch('/api/text/delete', {
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

export function api_download(token, text_id, text){
    fetch('/api/text/download', {
        method: "POST",
        body: JSON.stringify({"token":token, "text_id":text_id}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (response) => {
            return response.blob();
    }).then(
        (blob) => {
            const href = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.download = text.title + "-" + text.author  + ".txt";
            a.href = href;
            console.log(a);
            a.click();
            a.href = "";
            
    });
}

export function api_list(token){
    return fetch('/api/text/list', {
        method: "POST",
        body: JSON.stringify({"token":token}),
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

export async function api_upload(data){
    const response = await fetch("/api/text/upload", {
        method: "POST",
        body: data
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Error uploading file");
    });
    return response.json();
}