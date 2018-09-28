'use strict';

const dateRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

function parseItem(source) {
    if (Array.isArray(source))
        return deepParseJSONArrayWithDates(source);
    else if (typeof(source) === 'object')
        return deepParseJSONObjectWithDates(source);
    else if (typeof(source) === 'string' && dateRegex.test(source))
        return Date.parse(source);
    else
        return source;
}

function deepParseJSONArrayWithDates(data) {
    const result = new Array(data.length);
    for (let i = 0; i < data.length; ++i)
        result[i] = parseItem(data[i]);

    return result;
}

function deepParseJSONObjectWithDates(data) {
    const result = {};
    for (let el in data) {
        if (!data.hasOwnProperty(el)) continue;
        result[el] = parseItem(data[el]);
    }

    return result;
}

function deepParseJSONWithDates(source) {
    const data = JSON.parse(source);
    return parseItem(data);
}

module.exports = deepParseJSONWithDates;
