console.log('Starting app');

// Asynchronous callback
setTimeout(() => {
    console.log('Inside of callback');
}, 2000); // milliseconds

setTimeout(() => {
    console.log('Second timeout');
}, 0);

console.log('Finishing up');

// The output looks like this:
// Starting app
// Finishing up
// Second timeout
// Inside of callback
