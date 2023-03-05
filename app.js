const express= require('express')
const cookieSession = require('cookie-session');
require('./middleware/passport');
const {sequelize} =require('./config/db_connect')
const models = require('./models/MODL');
const passport = require('passport');
const session = require('express-session');
const addUser = require('./controllers/addToDb');
const sendLetter = require('./controllers/sendNewsLetter');
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.set('view engine', 'ejs')
sequelize.sync()



app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}))

  

//initializing Passport js
app.use(passport.initialize());
app.use(passport.session());

// check whether a user is logged In
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.render('Pages/login');
    }
}

const isLoggedInAsAdmin = (req, res, next) => {
    if (req.user) {
        if (req.user.email == "eddymugisha65@gmail.com" || req.user.email == "princeineza@gmail.com" ) {
            next();
        }
    } else {
        res.render('Pages/login');
    }
}
// login Page or initial Page
app.get("/", (req, res) => {
    res.render('Pages/login');
});

// on login Failure
app.get("/failed", (req, res) => {
    res.render('Pages/failed')
})

// on successful login
app.get("/success",isLoggedIn, (req, res) => {
    res.render('Pages/success', {
        user: req.user
    })
})

// logout 
app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

// google passport authentication
app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
));

// response after google authenticates
app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')
    }
);

// add user to Users database
app.post('/add/', addUser)

// send email to all users in database and store record
app.post('/send', sendLetter)

// preview page of sending email
app.get('/send-letter', isLoggedInAsAdmin, (req, res) => {
    res.render('Pages/sendNewsLetter')
})

app.listen(process.env.PORT,()=> {console.log(`server connected on PORT ${process.env.PORT}`)})
sequelize
