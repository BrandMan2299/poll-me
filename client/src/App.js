import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import Signin from './components/Signin';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin} />
            <PrivateRoute path='/' component={HomePage} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;