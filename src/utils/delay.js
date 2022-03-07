/**
 * Debounce function: Input as function which needs to be debounced and delay is the debounced 
 * time in milliseconds
 * @param {Function} func 
 * @param {Number} wait 
 */
export const debounce = (func, wait=100) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}