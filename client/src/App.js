import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/signin' exact component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;