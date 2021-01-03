const express = require('express');
const router = express.Router();
const projects = require('../../Projects');
const uuid = require('uuid');
const pool = require('../../db');

// Get ALL Projects
// router.get('/', (req, res) => {
//     res.json(projects);
// }); 
router.get('/', async (req, res) => {
    const allProjects = await pool.query("SELECT * FROM projects");
    res.json(allProjects.rows);
});

// Get SINGLE Project
router.get('/:id', async (req, res) => {
    const project = await pool.query("SELECT * FROM projects WHERE id=$1", [parseInt(req.params.id)]);
    res.json(project.rows[0]);

    // Check that project exists
    // const found = projects.some(project => project.id === parseInt(req.params.id));
    // if (found) {
    //     res.json(projects.filter(project => project.id === parseInt(req.params.id)));
    // } else {
    //     res.status(400).json({msg: `Project of id ${req.params.id} not found`});
    // }
    
});

// Create New Project
router.post('/', async (req, res) => {
    const projectID = uuid.v4();
    const creatorID = uuid.v4();

    if(!req.body.title || !req.body.description || !req.body.stage || !req.body.create_date || !req.body.update_date){
        return res.status(400).json({msg: 'Please include all the required fields'});
    }
    const newProject = await pool.query(
        "INSERT INTO projects (id, creator_id, title, description, stage, create_date, update_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [projectID, creatorID, req.body.title, req.body.description, req.body.stage, req.body.create_date, req.body.update_date]
    );
    res.json(newProject.rows[0]);
});

// Update Project
router.put('/:id', async (req, res) => {
    const updProject = await pool.query(
        "UPDATE projects SET title = $1 WHERE id = $2",
        [req.body.title, req.params.id]
    );
    res.json("Project updated!");

    // Check that project exists
    // const found = projects.some(project => project.id === parseInt(req.params.id));
    // if (found) {
    //     const updProject = req.body;
    //     projects.forEach(project => {
    //         if (project.id === parseInt(req.params.id)){
    //             project.name = updProject.name ? updProject.name : project.name;
    //             project.title = updProject.title ? updProject.title : project.title;

    //             res.json({msg: 'Project updated', projects});
    //         }
    //     });
    // } else {
    //     res.status(400).json({msg: `Project of id ${req.params.id} not found`});
    // }
    
});


// Delete Project
// postman shows that project is filtered out, but not reflected in front end cards
router.delete('/:id', async (req, res) => {
    const delProject = await pool.query(
        "DELETE FROM projects WHERE id = $1",
        [req.params.id]
    );

    const allProjects = await pool.query("SELECT * FROM projects");
    res.json({msg: 'Project deleted', projects: allProjects.rows});

    // Check that project exists
    // const found = projects.some(project => project.id === parseInt(req.params.id));
    // if (found) {
    //     res.json({msg: 'Project deleted', projects: projects.filter(project => project.id !== parseInt(req.params.id))});
    // } else {
    //     res.status(400).json({msg: `Project of id ${req.params.id} not found`});
    // }
    
});
module.exports = router;