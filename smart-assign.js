const deepCopy = require('./deep-copy');

function assignItem(destination, source) {
    if (Array.isArray(source))
        return deepAssignArray(destination, source);
    else if (typeof(source) === 'object')
        return deepAssignObject(destination, source);
    else
        return source;
}

function deepAssignArray(destination, source) {
    const maxI = destination.length - 1;

    for (let i = 0; i < source.length; ++i) {
        if (maxI < i)
            destination.push(deepCopy(source[i]));
        else
            destination[i] = assignItem(destination[i], source[i]);
    }

    return destination;
}

function deepAssignObject(destination, source) {
    for (let key in source) {
        if (!source.hasOwnProperty(key)) continue;

        if (!destination.hasOwnProperty(key))
            destination[key] = deepCopy(source[key]);
        else
            destination[key] = assignItem(destination[key], source[key]);
    }

    return destination;
}

function smartAssign(destination, source) {
    if (typeof(destination) !== 'object' || typeof(source) !== 'object')
        return null;

    if (Array.isArray(source))
        return deepAssignArray(destination, source);
    return deepAssignObject(destination, source);
}

module.exports = smartAssign;
