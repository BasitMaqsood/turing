import React from 'react';
import { Route , Redirect , Switch } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/resigisterForm';
import LoginForm from './components/loginForm';
import Home from './components/home';
import NavBAr from './components/navBar';
import NotFound from './components/not-found';

function App() {
  return (
      <React.Fragment>
        <NavBAr />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/home" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
      
  
    
  );
}

export default App;
