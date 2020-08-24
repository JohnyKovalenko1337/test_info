const http = require('http');


const options = {
    hostname: 'localhost',
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
};


exports.loginCheck = (login) => {

    options.path = '/server/getUser';
    options.method = 'POST';

    const postData = JSON.stringify({
        'login': login
    });



    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            const data = JSON.parse(chunk)
            if (!data.user) {
                return false
            }
            else{
                return true;
            }

        });
    });
    req.write(postData);
    req.end();
}


exports.signup = (login, password) => {
    options.path = '/server/signup';
    options.method = 'POST';


    const postData = JSON.stringify({
        'login': login,
        'password': password
    });



    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
        });
    });
    req.write(postData);
    req.end();
};