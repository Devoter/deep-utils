function copyItem(source) {
    if (Array.isArray(source))
        return deepCopyArray(source);
    else if (typeof(source) === 'object')
        return deepCopyObject(source);
    else
        return source;
}

function deepCopyArray(source) {
    const length = source.length;
    const result = new Array(length);
    for (let i = 0; i < length; ++i)
        result[i] = copyItem(source[i]);

    return result;
}

function deepCopyObject(source) {
    const result = {};
    for (let key in source) {
        if (source.hasOwnProperty(key))
            result[key] = copyItem(source[key]);
    }

    return result;
}

function deepCopy(source) {
    if (Array.isArray(source))
        return deepCopyArray(source);
    else if (typeof(source) === 'object')
        return deepCopyObject(source);
    else
        return source;
}

module.exports = deepCopy;
