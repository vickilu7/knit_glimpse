// The Page for the Projects List
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import ProjectCard from './ProjectCard.js';
import Navbar from './Navbar.js';
import Filters from './Filters.js';
import Footer from './Footer.js';
import { ReactComponent as HeroImage} from './hero.svg';
import AddProjDrawerForm from './AddProjDrawerForm.js';

import { Button } from 'antd';

const ListProjects = () => {
    // Go to other pages
    let history = useHistory();
    const handleAddProject = () => {
        history.push('/add-project');
    }

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
            <Navbar/>
            <div className = 'content'>
                <div className="App-hero">
                    {/* stuff on left */}
                    <div style={{width: 600}}>
                        <h1 style={{fontSize: 56, fontWeight: 700}}>
                            Catchy Header Maybe Two Lines
                        </h1>

                        <p style={{marginBottom: 60}}>
                            Discover what your next dream team is working on or create an idea of your own!
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>

                        <AddProjDrawerForm/>
                    </div>

                    {/* hero image */}
                    <HeroImage height="auto"/>
                </div>

                <div className = 'project-space'>
                    <div>
                        <Filters/>
                        {/* <Filters allFilterClickListener={this.filterClickHandler}/> */}
                        {/* <a href='users/logout'>Logout</a> */}
                        <table>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Creator</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                                {projects.map(project => (
                                    <tr key={project.id}>
                                        <td> {project.title}</td>
                                        <td> {project.creator_id}</td>
                                        <td> <button onClick={()=>deleteProject(project.id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        {projects && projects.map(project => (
                            <ProjectCard projects={project} key={project.id}/>
                        ))}
                        
                        {/* <Button className="button secondary" style={{
                            display: "flex", margin: "70px auto"
                        }}>
                            Load More
                        </Button> */}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default ListProjects;