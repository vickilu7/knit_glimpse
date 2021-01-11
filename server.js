const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Project API Routes (cleaned up routes)
app.use('/api/projects', require('./routes/project_api'));

// User API Routes
app.use('/api/users', require ('./routes/user_api'));


const port = 5000;
// const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})