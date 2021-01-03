import React from 'react';
import './App.css';
import ListProjects from './components/ListProjects';
import AddProject from './components/AddProject';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
        projects: [],
        filters: {
            projectType: [],
            interest: [],
            role: []
        }
    };
  }
  

  componentDidMount(){
    fetch('/api/projects')
        .then(res => res.json())
        .then(projects => this.setState({projects: projects}, ()=>
            console.log('Projects fetched..', projects)
        )
    );
  }

  render(){
    // const projects = this.state.projects;
    // const listProjects = projects.map(project => <ProjectCard>{ project }</ProjectCard>);

    return (
      <div className="App">
        {/* <div>{ listProjects }</div> */}
        <AddProject/>
        <ListProjects/>
      </div>
    );
  }

}

export default App;
