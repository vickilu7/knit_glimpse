const express = require('express');
// const projects = require('./Projects.js');
const cors = require('cors');
const pool = require('./db');
const uuid = require('uuid');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Strategy = require('passport-local').Strategy;


const app = express();

passport.use(new Strategy(
    async (username, password, done) => {
        console.log('inside new strategy');

        const checkForUser = await pool.query(
            'SELECT * FROM dummyusers WHERE username=$1', [username]
        );
        if (checkForUser.rows.length === 0){
            return done(null, false);
        } else {
            const user = checkForUser.rows[0]; // user object

            console.log(user.password);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true){
                    console.log('pw compare good!');
                    return done(null, user);
                } else {
                    console.log('here?');
                    return done(null, false);
                }
            })
        }

    }));
passport.serializeUser(function(user, cb) {
    console.log(user.username);
    cb(null, user.username);
});

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// middleware for user auth
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser('secret'));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// require('./passport-config.js')(passport);
// user auth routes (backend 5000 routes)

app.post('/login', (req, res, next) => { 

    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        console.log(user);

        if (!user) {
            console.log('no user exists');
            res.send("No User Exists");
        } else {
            req.logIn(user, (err) => {
                if (err) return next(err);
                console.log('log in success');

                res.send("Successfully Authenticated");
            });
        }
    })(req, res, next);
});

app.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    
    const checkForUser = await pool.query(
        'SELECT * FROM dummyusers WHERE username=$1', [username]
    );

    if (checkForUser.rows.length > 0){
        console.log('user alr exists');
        return res.json({msg: 'User already exists'});
    }
    const regUser = await pool.query(
        'INSERT INTO dummyusers (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPw]  
    );
    res.json(regUser.rows[0]);

});
app.get('/user', (req, res) => {
    
});


// Project API Routes (cleaned up routes)
app.use('/api/projects', require('./routes/api/project_api'));

// User API Routes
app.use('/api/users', require ('./routes/api/user_api'));


const port = 5000;
// const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})