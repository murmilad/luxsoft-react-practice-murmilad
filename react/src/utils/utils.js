import SERVER from "../actions/server";

export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function isStringEmpty(str) {
    return (!str || /^\s*$/.test(str));
}

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  }

export const api = (resource) =>
    SERVER.get(resource)
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => {
      throw Error(error.statusText)
})