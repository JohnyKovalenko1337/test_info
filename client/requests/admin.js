const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
};

exports.getTasks = () =>{

    options.path = '/server/all-tasks';
    options.method = 'GET';

    return new Promise((resolve, reject)=>{
        http.request(options, (res)=>{
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk);
                resolve(data.tasks);                
            });
        }).on('error', reject)
        .end();
    });
};

exports.updateTask = (id, title, description) => {
    options.path = '/server/admin/updateTask';
    options.method = 'POST';

    const postData = JSON.stringify({
        'title': title,
        'description': description,
        'id': id
    });

    return new Promise((resolve, reject) => {

        http.request(options, (res) => {
            res.on('data', (chunk) => {
                resolve(chunk)
             });
        })
            .end(postData);
    })
};

exports.deleteTask = (id) =>{
    options.path = '/server/admin/deleteTask';
    options.method = 'POST';

    const postData = JSON.stringify({
        'id': id
    });

    return new Promise((resolve, reject) => {

        http.request(options, (res) => {
            res.on('data', (chunk) => {
                resolve(chunk)
             });
        })
            .end(postData);
    })
};