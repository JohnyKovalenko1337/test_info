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

    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            let check;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                if (data.user === undefined) {
                    check = false;
                }
                else {
                    check = true;
                }
            });
            res.on('end', () => {
                resolve(check);
            })
        })
            .on('error', reject)
            .end(postData);
    })

}


exports.signup = (login, password) => {
    options.path = '/server/signup';
    options.method = 'POST';

    const postData = JSON.stringify({
        'login': login,
        'password': password
    });
    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                resolve(chunk);
            });
        })
            .on('error', reject)
            .end(postData);
    })
};

exports.user_login = (login) => {
    options.path = '/server/getUser';
    options.method = 'POST';

    const postData = JSON.stringify({
        'login': login
    });


    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                resolve(data.user);
            });
        }).end(postData)
            .on('error', reject);
    });

}