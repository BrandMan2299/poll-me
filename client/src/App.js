import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import Signin from './components/Signin';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';
import NewPoll from './components/NewPoll';
import OnePoll from './components/OnePoll';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Switch>
            <PrivateRoute path='/' exact component={HomePage} />
            <PrivateRoute path='/newpoll' exact component={NewPoll} />
            <PrivateRoute path='/dashboard/:id' exact component={Dashboard} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/poll/:id' exact component={OnePoll} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;