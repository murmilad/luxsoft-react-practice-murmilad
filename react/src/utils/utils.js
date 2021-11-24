import SERVER from "../actions/server";

export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function isStringEmpty(str) {
    return (!str || /^\s*$/.test(str));
}

export const api = (resource, callback) =>
    SERVER.get(resource)
    .then(response => {
        return callback(response)
    })
    .catch(error => {
      throw Error(error.message)
})