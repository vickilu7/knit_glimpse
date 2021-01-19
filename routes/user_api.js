const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const pool = require('../db');

// Get All Users
router.get('/', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);       
    } catch (err) {
        console.error(err.message);
    }
});

// Get SINGLE User by email or id
router.get('/:identifier', async (req, res) => {
    try {
        const identifier = req.params.identifier;
        const type = identifier.indexOf("@") !== -1 ? 'email' : 'id';
    
        const user = type === 'email' ? await pool.query("SELECT * FROM users WHERE email=$1", [identifier])
            : await pool.query("SELECT * FROM users WHERE id=$1", [identifier]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create (Register) New User
router.post('/', async (req, res) => {
    try {
        const userID = uuid.v4();
        const todays_date = new Date().getTime();
        const { firstName, lastName, email, role } = req.body;
        
        if(!firstName || !lastName || !email ){
            return res.status(400).json({msg: 'Please include all the required fields'});
        }

        const newUser = await pool.query(
            'INSERT INTO users (id, first_name, last_name, email, create_date, update_date, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [userID, firstName, lastName, email, todays_date, todays_date, role]
        );
        res.json(newUser.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// Delete User
router.delete('/:id', async (req, res) => {
    try {
        const delUser = await pool.query(
            "DELETE FROM users WHERE id = $1",
            [req.params.id]
        );
    
        const allUsers = await pool.query("SELECT * FROM users");
        res.json({msg: 'User deleted', projects: allUsers.rows}); 
    } catch (err) {
        console.error(err.message);
    }  
});


module.exports = router;