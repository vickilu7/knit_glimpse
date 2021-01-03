const express = require('express');
const projects = require('./Projects.js');
const cors = require('cors');
const pool = require('./db');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Project API Routes (cleaned up routes)
app.use('/api/projects', require('./routes/api/project_api'));

const port = 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})