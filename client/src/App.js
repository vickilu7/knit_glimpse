import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './AuthContext';

import Homepage from './components/Homepage';
import Register from './components/forms/Register';
import Login from './components/forms/Login';

import './App.less';
import './fonts.css';

class App extends React.Component {
  render(){
    return (
          <div className="App">
          <Router>
          <AuthProvider>
            <Switch>
              <Route exact path= '/register' component= {Register}/>
              <Route exact path= '/login' component= {Login}/>
              
              <PrivateRoute exact path= '/' component= {Homepage}/>
            </Switch>
            </AuthProvider>
          </Router>
        </div>
    );
  }

}

export default App;
