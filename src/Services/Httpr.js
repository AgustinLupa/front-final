const backendurl = "http://localhost:8080/";

export default backendurl;


export async function POST(url, request){
    
    return await fetch(backendurl + url, {
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json',           
        },
        body: JSON.stringify(request)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}


export async function GET(url, request = null){

    let uri = "";
    if(request){
        uri = '?' + new URLSearchParams(request).toString();
    }

    return await fetch(backendurl + url + uri, {
        method:'GET',
        mode:'cors'
        
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

export async function PUT(url, request){

    return await fetch(backendurl + url, {
        method:'PUT',
        mode:'cors',
        headers: {            
            'Content-Type':'application/json'
        },
        body: JSON.stringify(request)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

export async function DELETE(url, request){

    let uri = "";
    if(request){
        uri = '?' + new URLSearchParams(request).toString();
    }

    return await fetch(backendurl + url + uri, {
        method:'DELETE',
        mode:'cors'        
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}