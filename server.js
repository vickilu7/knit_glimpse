const express = require('express');
// const projects = require('./Projects.js');
const cors = require('cors');
const pool = require('./db');
const uuid = require('uuid');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// Project API Routes (cleaned up routes)
app.use('/api/projects', require('./routes/api/project_api'));

// User API Routes
app.use('/api/users', require ('./routes/api/user_api'));


const port = 5000;
// const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})