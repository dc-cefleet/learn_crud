const request = async (url, method, data)=>{
    let options = {
        method:method,
        headers:{
            'Content-Type': 'application/json'
        }
    }
    if(data && method.toLowerCase() !== 'get') {
        options.body = JSON.stringify(data)
    }

    let response = await fetch(url, options);
    return response.json();
};

export default request;