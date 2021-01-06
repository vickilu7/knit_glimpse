// The Page for the Projects List
import React, {useEffect, useState} from 'react';
import ProjectCard from './ProjectCard.js';
import EditProject from './EditProject';
import {useHistory} from 'react-router-dom';

const ListProjects = () => {
    //projects is our state, setProjects is only way to change
    const [projects, setProjects] = useState([]); 

    //delete
    const deleteProject = async (id) => {
        try {
            const delProject = await fetch(`/api/projects/${id}`,{
                method: "DELETE"
            });

            console.log(delProject);
            setProjects(projects.filter(project => project.id !== id)); 
        } catch (err) {
            console.error(err.message);
        }
    }
    
    // Go to Add Project page
    let history = useHistory();
    const handleAddProject = () => {
        history.push('/add-project');
    }

    const getProjects = async () => {
        try {
            const response = await fetch("/api/projects");
            const jsonData = await response.json();

            setProjects(jsonData);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=> {
        getProjects();
    }, []);


    return(
        <div>
            <a href='users/logout'>Logout</a>
            <h1>All Projects</h1>
            <button onClick={() => handleAddProject()}>Add a Project</button>

            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Creator</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td> {project.title}</td>
                            <td> {project.creator_id}</td>
                            <td> <button onClick={()=>deleteProject(project.id)}>Delete</button></td>
                            <td><EditProject/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
                        
            {projects && 
                projects.map(project => (
                // <ProjectCard>{ project}</ProjectCard>
                <ProjectCard projects={project} key={project.id}/>
            ))}
        </div>
    )
};

export default ListProjects;