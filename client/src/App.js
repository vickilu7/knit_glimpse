import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './components/fonts.css';
import ListProjects from './components/ListProjects';
import AddProject from './components/AddProject';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';


class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //       projects: [],
  //       filters: {
  //           projectType: [],
  //           interest: [],
  //           role: []
  //       }
  //   };
  // }
  

  // componentDidMount(){
  //   fetch('/api/projects')
  //       .then(res => res.json())
  //       .then(projects => this.setState({projects: projects}, ()=>
  //           console.log('Projects fetched..', projects)
  //       )
  //   );
  // }

  render(){

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path= '/home' component= {Home}/>
            <Route exact path= '/users/register' component= {Register}/>
            <Route exact path= '/users/login' component= {Login}/>
            
            <Route exact path= '/' component= {ListProjects}/>

            {/* <Route exact path= '/add-project' component= {AddProject}/>  */}
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
