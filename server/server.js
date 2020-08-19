const express = require('express');

const app = express();

const enviroment = require('../enviroment');

const port = enviroment.database || 3000;

const adminRoutes = require('./routes/admin-routes');
const userRoutes = require('./routes/user-routes')
app.use('');

app.listen(port, ()=>{
    console.log('client connected');
});