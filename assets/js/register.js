document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if ('serviceWorker' in navigator && navigator.onLine) {
        navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
            console.log('Registration success!', reg);
        }, (err) => {
            console.error('Registration failed!', err);
        });
    }
}