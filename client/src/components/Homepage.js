import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../AuthContext';

import ProjectCard from './ProjectCard.js';
import Navbar from './Navbar.js';
import FiltersComponent from './Filters.js';
import Footer from './Footer.js';
import { ReactComponent as HeroImage} from './hero.svg';
import AddProjDrawerForm from './AddProjDrawerForm.js';


const Homepage = () => {
    const { currentUser, logout } = useAuth();
    const [user, setUser] = useState({});
    const history = useHistory();
    const [error, setError] = useState('');
    const [projects, setProjects] = useState([]); 
    const allInterests = ['Social', 'Crypto', 'Health','AI'];
    const allTypes = ['Mobile', 'Web', 'Hardware'];
    const [Filters, setFilters] = useState({
        "interests": allInterests,
        "types": allTypes
    });
    

    // delete
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
    async function handleLogout(){
        setError('');
        try {
            await logout();
            history.push('/login');
            
        } catch {
            setError('Failed to log out');
        }
    }

    const getProjects = async (f) => {
        try {
            const queryString = new URLSearchParams(f).toString();
            // console.log(queryString);
            const response = await fetch(`api/projects?${queryString}`);
            
            const jsonData = await response.json();

            setProjects(jsonData);
            
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(()=> {
        async function getUser(){
            try {
                const response = await fetch(`api/users/${currentUser.email}`);
                const jsonData = await response.json();
                setUser(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        }

        getProjects(Filters);
        getUser();
    }, [Filters, currentUser]);

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters};

        if(filters.length === 0){
            newFilters[category] = (category ==='interests') ? allInterests : allTypes;
        } else{
            newFilters[category] = filters; //ex: newFilters[interests] = ["social good", "ai"]
        }

        getProjects(newFilters);
        setFilters(newFilters);
    }

    return(
        <div>
            {error && <h4>{error}</h4>}
            <Navbar/>
            <div className = 'content'>
                
                <div className="App-hero">
                    {/* stuff on left */}
                    <div style={{width: 600}}>
                        <h1 style={{fontSize: 56, fontWeight: 700}}>
                            Catchy Header Maybe Two Lines, Welcome {user.first_name} {user.last_name}!
                        </h1>

                        <p style={{marginBottom: 60}}>
                            Discover what your next dream team is working on or create an idea of your own!
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>

                        <AddProjDrawerForm/>
                    </div>

                    {/* hero image */}
                    <HeroImage height='100%'/>
                </div>

                <div className = 'project-space'>
                    <div className="App-filters">
                        <div className='subheader'>Filter By</div>

                        <FiltersComponent
                            handleFilters={filters => handleFilters(filters, "interests")}
                            filterKind="Interests"
                        />
                        <FiltersComponent
                            handleFilters={filters => handleFilters(filters, "types")}
                            filterKind="Types"
                        />

                        <button onClick={handleLogout}>Log Out</button>
                        <h1>Personal Control Panel lol</h1>
                        <table>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Project ID</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                                {projects.map(project => (
                                    <tr key={project.id}>
                                        <td> {project.title}</td>
                                        <td> {project.id}</td>
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
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default Homepage;