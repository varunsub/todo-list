/**
 * Creates connection to the database
 */

const mongoose = require("mongoose");
const CONNECTION_URL = process.env.CONNECTION_URL

mongoose.set('useFindAndModify', true);

const connection =  mongoose.createConnection('mongodb://heroku_q3nk3075:e6dh8ohh6kkhn4g7e06ggg9f44@ds015584.mlab.com:15584/heroku_q3nk3075', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
connection.on('connecting', () => {
    console.log('connected');
});

module.exports = connection;