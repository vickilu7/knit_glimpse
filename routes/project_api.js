const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const pool = require('../db');
const Joi = require('joi');
const { projectSchema } = require('./validation_schema');

// Get ALL Projects
router.get('/', async (req, res) => {
    try {
        const i = req.query.interests.split(',');
        const t = req.query.types.split(',');
        // console.log(i,t);

        const allProjects = await pool.query(
            'SELECT DISTINCT ON (p.id) * FROM projects p INNER JOIN interests i ON p.id=i.project_id INNER JOIN project_types t ON p.id = t.project_id WHERE i.interest= ANY($1) AND t.type= ANY($2)'
            ,[i, t]
        );     
        
        res.json(allProjects.rows);       
        
    } catch (err) {
        console.error(err.message);
    }
});

// Get SINGLE Project
router.get('/:id', async (req, res) => {
    try {
        const project = await pool.query("SELECT * FROM projects INNER JOIN interests ON projects.id = interests.project_id WHERE projects.id=$1", [req.params.id]);
        res.json(project.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// Create New Project
router.post('/', async (req, res) => {
    try {
        const val = await projectSchema.validateAsync(req.body);

        const { creatorID, title, description, stage, types, interests } = val;
        const projectID = uuid.v4();
        const todays_date = new Date().getTime(); // technically int includes time too, not just date
    
        if(!title || !description || !stage){
            return res.status(400).json({msg: 'Please include all the required fields'});
        }
        const newProject = await pool.query(
            "INSERT INTO projects (id, creator_id, title, description, stage, create_date, update_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [projectID, creatorID , title, description, stage, todays_date, todays_date]
        );
        
        types.forEach(async (type) => {
            const newProjectTypes = await pool.query(
                "INSERT INTO project_types (project_id, type) VALUES ($1, $2) RETURNING *",
                [projectID, type]
            );
        });

        interests.forEach(async (interest) => {
            const newProjectTypes = await pool.query(
                "INSERT INTO interests (project_id, interest) VALUES ($1, $2) RETURNING *",
                [projectID, interest]
            );
        });
        
        res.json(newProject.rows[0]);
    } catch (err) {
        if (Joi.isError(err) === true) {
            res.status(422).json({msg : err.details[0].message});
        }
        console.error(err.message);
    }
});

// Delete Project
router.delete('/:id', async (req, res) => {
    try {
        const delProject = await pool.query(
            "DELETE FROM projects WHERE id = $1",
            [req.params.id]
        );
        
        const allProjects = await pool.query("SELECT * FROM projects");
        res.json({msg: 'Project deleted', projects: allProjects.rows}); 
    } catch (err) {
        console.error(err.message);
    }  
});


// Update Project
router.put('/:id', async (req, res) => {
    try {
        const updProject = await pool.query(
            "UPDATE projects SET title = $1 WHERE id = $2",
            [req.body.title, req.params.id]
        );
        res.json("Project updated!"); 
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;