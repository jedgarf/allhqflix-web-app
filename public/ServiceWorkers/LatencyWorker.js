
const makeAxiosRequest = async () => {
    const startTime = performance.now();
    try {
        await fetch('https://www.google.com', { method: 'HEAD', mode: 'no-cors' });
        const endTime = performance.now();
        const latency = endTime - startTime;
        self.postMessage(latency);
    } catch (error) {
        self.postMessage(0);
        console.log('Error occurred:', error);
    }
};

// Set an interval to make the Axios request every 5 seconds (5000 milliseconds)
setInterval(makeAxiosRequest, 5000);
