exports.loginCheck = (login) => {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/quizResponse',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });
    req.write({login: login});
}