'use strict';

/**
 * Prototype for implementation of debounce concept for any function.
 *
 * @param {int} [intervalTime=10000] - time interval for debounce.
 */
Function.prototype.debounce = function (intervalTime = 10000) {
    const fn = this;
    let timer = null;
    return async function (...params) {
        if (timer) {
            clearTimeout(timer);
        }
        return new Promise((resolve) => {
            timer = setTimeout(async () => {
                const data = await fn.apply(null, params);
                resolve(data);
            }, intervalTime);
        })
    };
}

/**
 * Method to make rest api call.
 *  
 * @param {string} url - rest api url.
 * @returns {Promise} Response of api in json format.
 */
async function ajexCall(url = "") {
    return await (await fetch(url)).json();
}

/**
 * Method to get some browser data.
 * 
 * @returns {Object} Object with some browser details.
 */
async function webApis() {
    const { protocol, hostname, port, search } = window.location || {};
    const { platform, vendor } = window.navigator || {};
    return {
        protocol,
        hostname,
        port,
        search,
        platform,
        vendor
    };
}

/**
 * Method to multiple all elements of array.
 * 
 * @param {Array} arr - list of integer no.
 * @returns {int} final result of multiplication 
 */
function multiplication(...arr) {
    return arr.reduce((result, ele) => result * ele, 1);
}

// get debounce instance of functions.
const getIpAddress = ajexCall.debounce(1000);
const getBrowserInfo = webApis.debounce(2000);
const multiplyAll = multiplication.debounce(500);


async function fnForAsyncCall() {
    const apiRes = await getIpAddress("https://api.ipify.org?format=json");
    const calcResult = await multiplyAll(5, 10, 2);
    console.log(" using async/await : apiRes > ", apiRes);
    console.log(" using async/await : calcResult > ", calcResult);
}

function fnForSyncCall() {
    getBrowserInfo().then((result) => {
        console.log(" using sync : browserDetail > ", result);
    }).catch((err) => {
        console.error(" using sync : browserDetail > ", err);
    });
}

