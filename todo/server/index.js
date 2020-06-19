const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require("./models/User");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connection = require('./helpers/connection')

//importing routes
const login = require('./routes/api/login')
const register = require('./routes/api/register')
const verify = require('./routes/api/verify')
const addItem = require('./routes/api/addItem')
const getList = require('./routes/api/getList')
const logout = require('./routes/api/logout')
const updateCompleted = require('./routes/api/updateCompleted')
const test = require('./routes/api/test')
const updateEvent = require('./routes/api/updateEvent')



//set up App
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//allows cors
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain)

//sets up express session and cookies
app.set('trust proxy', 1);
const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' })
const sessionOptions = {
    secret:"secret",
    store: sessionStore,
    cookie:{
        // cookie active for 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // on a HTTPS website this would be true but for 
        // deployment purposes it is false
        secure: false,
    },
    resave: true,
    saveUninitialized:false,
}


//Addroutes
app.use("/api/login",login)
app.use("/api/register",register)
app.use('/api/ver',verify)
app.use('/api/addItem',addItem)
app.use('/api/getList', getList)
app.use('/api/logout', logout)
app.use('/api/updateCompleted',updateCompleted)
app.use('/api/test',test)
app.use('/api/updateEvent',updateEvent)




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
