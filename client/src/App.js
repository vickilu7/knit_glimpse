import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import Homepage from './components/Homepage';
import Register from './components/forms/Register';
import Login from './components/forms/Login';
import PrivateRoute from './components/PrivateRoute';

import Footer from './components/Footer';

import './App.less';
import './fonts.css';

class App extends React.Component {
  render(){
    return (
          <div className="App">
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path= '/' component= {Homepage}/>
                <Route exact path= '/register' component= {Register}/>
                <Route exact path= '/login' component= {Login}/>

                <Route exact path='/dev' component = {Footer}/>
              </Switch>
            </AuthProvider>
          </Router>
        </div>
    );
  }

}

export default App;
