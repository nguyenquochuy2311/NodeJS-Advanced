function request(type) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            type === 'a' ? resolve('resolved') : reject('rejected')
        }, 2000);
    })
}

async function getData() {
    let err, result;
    [err, result] = await await handlerRequest(request('a'));
    if (err)
        console.error(`Error show: ${err}`);

    [err, result] = await await handlerRequest(request('b'));
    if (err)
        console.error(`Error show b: ${err}`);
}

const handlerRequest = promise => {
    return promise
        .then(data => ([undefined, data]))
        .catch(err => ([err, undefined]))   
}

getData();