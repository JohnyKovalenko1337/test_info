const http = require('http');
const { resolve } = require('path');
const { rejects } = require('assert');


const options = {
    hostname: 'localhost',
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
};

exports.addTask = (title, description, creator) => {

    options.path = '/server/add-task';
    options.method = 'POST';

    const postData = JSON.stringify({
        'title': title,
        'description': description,
        'creator': creator
    });

    http.request(options, (res) => {
        res.on('data', (chunk) => { });
    }).end(postData);

};

exports.myTasks = (username) => {
    options.path = '/server/my-tasks';
    options.method = 'POST';
    const postData = JSON.stringify({
        'creator': username
    });

    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            let tasks;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                tasks = data.tasks;
            });
            res.on('end', () => {
                resolve(tasks);
            })
        })
            .on('error', reject)
            .end(postData);
    })

};