import React, {useEffect, useState} from 'react';
import ProjectCard from './ProjectCard.js';
import EditProject from './EditProject';

const ListProjects = () => {
    //projects is our state, setProjects is only way to change
    const [projects, setProjects] = useState([]); 

    //delete
    const deleteProject = async (id) => {
        try {
            const delProject = await fetch(`http://localhost:5000/api/projects/${id}`,{
                method: "DELETE"
            });

            console.log(delProject);
            setProjects(projects.filter(project => project.id !== id)); 
        } catch (err) {
            console.error(err.message);
        }
    }
    
    const getProjects = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/projects");
            const jsonData = await response.json();
            // console.log(jsonData); 

            setProjects(jsonData);
            
        } catch (err) {
            console.erorr(err.message);
        }
    }

    useEffect(()=> {
        getProjects();
    }, []);

    return(
        <div>
            <h1>All Projects</h1>

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

            {projects.map(project => (
                <ProjectCard>{ project }</ProjectCard>
            ))}
        </div>
    )
};

export default ListProjects;