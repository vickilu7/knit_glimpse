const express = require('express');
// const projects = require('./Projects.js');
const cors = require('cors');
const pool = require('./db');
const uuid = require('uuid');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();

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
    resave: true, //should these both be false?
    saveUninitialized: true
}));
app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());

require('./passport-config.js')(passport);
// user auth routes (backend 5000 routes)
app.post('/login', (req, res, next) => { 
    console.log(req.body);
    // console.log(passport);

    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        console.log(user);
        if (!user) {
            console.log('no user exists');
            res.send("No User Exists");
        }
        else {
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.send("Successfully Authenticated");
            console.log('success');
            console.log(req.user);
        });
        }
    })(req, res, next);

    return res.json({msg: 'asdfa'});
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