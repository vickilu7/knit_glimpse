const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('./db');

//param is passport library bc wanna use same instance of passport throughout app
module.exports = function(passport){
    console.log(passport);
    
    passport.use(
        new localStrategy(async (username, password, done) => {
            console.log('hereee?');

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

        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.username);
      });

    passport.deserializeUser( async (username, cb) => {
        const checkForUser = await pool.query(
            'SELECT * FROM dummyusers WHERE username=$1', [username]
        );
        const userInformation = {
            username: checkForUser.rows[0].username
        };
        cb(null, userInformation);
    });
}

// function initialize(passport, getUserByEmail){
//     const authenticateUser = (email, password, done) => {
//         const user = getUserByEmail(email);
//         if (user == null){
//             return done(null, false, {message: 'No user with that email'});
//         }
//         try {
//             if (password === user.password){
//                 return done(null, user);
//             } else {
//                 return done(null, false, {message: 'Password incorrect'});
//             }  
//           } catch (e) {
//             return done(e)
//         }

//     }
//     passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));

//     passport.serializeUser((user, done) => { });

//     passport.deserializeUser((id, done) => { });
// }

// module.exports = initialize;