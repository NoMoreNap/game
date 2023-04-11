const noop = () => {};
const NO_PARAMS = {};
const NO_HEADERS = {};


export function tonyFetch({
    url,
    method,
    body,
    headers = NO_HEADERS,
    params = NO_PARAMS,
    responseType = 'json',
    onSuccess = noop,
    onError = noop
}) {
    const urlParams = new URLSearchParams(params);
    const queryString = urlParams.toString();
    fetch(url + (queryString ? `?${queryString}` : ''), {
                method: method,
                body: JSON.stringify(body),
                headers: headers,
            })
            .then( response =>  {
                if (response.ok) {
                    switch (responseType) {
                        case 'json':
                            return response.json()
                            break
                        case 'text':
                            return response.text();
                            break
                    }
            } else {
                return onError(response.status)
            }})
            .then( data =>  data ? onSuccess(data) : noop)
}




export function tonyAjax({
    method = 'GET',
    url,
    body,
    headers = NO_HEADERS,
    params = NO_PARAMS,
    responseType = 'json',
    requestType = 'json',
    async = true,
    onSuccess = noop,
    onError = noop,
}) {
    const urlParams = new URLSearchParams(params);
    const queryString = urlParams.toString();
    const req = new XMLHttpRequest();
    
    req.open(method,url + (queryString ? `?${queryString}` : ''),async);

    Object.keys(headers).forEach( key => {
        req.setRequestHeader(key, headers[key]);
    })

    req.responseType = responseType; 

    req.onload = function(e) {
        const target = e.target;
        if (target.status > 299) {
            return onError(target.status);
        }
        onSuccess(target.response);
    }

    let dataBody = body;

    if (requestType === 'urlencoded') {
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        const bodyParams = new URLSearchParams(dataBody);

        dataBody = bodyParams.toString();
    }

    if (requestType === 'json') {
        req.setRequestHeader('Content-type', 'application/json');

        dataBody = JSON.stringify(body);
    }
    if(requestType === 'text') {
        req.setRequestHeader('Content-type', 'text/plain');

        dataBody = JSON.stringify(body);
    }


    req.send(dataBody);
}