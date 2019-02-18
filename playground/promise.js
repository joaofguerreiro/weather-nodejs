var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 2000);
    });
};

var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // We can only either reject or resolve a promise, can't do both
        resolve('Voilá');
        resolve('Oh lá lá');
        // reject('Sacre bleu!');
    }, 3000);
});

somePromise.then((message) => {
    console.log(`Success: ${message}`);
}, (errorMessage) => {
    console.log(`Error: ${errorMessage}`);
});

asyncAdd(2, 5).then((result) => {
    console.log(`Result: ${result}`);
    return asyncAdd(result, 14);
}).then((result) => {
    console.log(`Result of second promise: ${result}`);
}).catch((errorMessage) => {  // catches error from both promises
    console.log(errorMessage);
});
