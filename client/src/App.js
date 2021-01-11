import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './components/fonts.css';
import ListProjects from './components/ListProjects';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

import { AuthProvider } from './AuthContext';

class App extends React.Component {
  render(){

    return (
          <div className="App">
          <Router>
          <AuthProvider>
            <Switch>
              <Route exact path= '/register' component= {Register}/>
              <Route exact path= '/login' component= {Login}/>
              
              <PrivateRoute exact path= '/' component= {ListProjects}/>
            
            </Switch>
            </AuthProvider>
          </Router>
        </div>
    );
  }

}

export default App;
