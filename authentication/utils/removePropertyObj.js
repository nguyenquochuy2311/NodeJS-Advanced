async function removeProperyObj(obj, propertyArr) {
    if (propertyArr.length) {
        propertyArr.forEach(element => {
            if (obj.hasOwnProperty(`${element}`))
                delete obj[`${element}`];
        });
    }
    return obj;
}

module.exports = removeProperyObj;