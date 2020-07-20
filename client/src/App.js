import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import UserTable from './table'
import DrawCanvas from './animations'
import BubblesCanvas from './bubbles'
import Boids from './boids'


class Home extends Component {

  render() {
    return (
      <div className="Home">
        <header className="Users-header">
          <img src={logo} className="Users-logo" alt="logo" />
          <h1 className="Users-title">Welcome to React</h1>
        </header>
        This is the home page!
      </div>
    );
  }
}

class About extends Component {
  render() {
    console.log("rendering about us")
    return (
      <div className="About">
        <header className="Users-header">
          <img src={logo} className="Users-logo" alt="logo" />
          <h1 className="Users-title">Welcome to React</h1>
        </header>
        This page contains information about us.
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ul className="App-header">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/users">Registered Users</Link>
            </li>
            <li>
              <Link to="/drawcanvas">Canvas for free drawing</Link>
            </li>
            <li>
              <Link to="/bubbles">Canvas for bubble animations</Link>
            </li>
            <li>
              <Link to="/boids">Canvas for flocking boids animations</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/users' component={UserTable}></Route>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/drawcanvas' component={DrawCanvas}></Route>
            <Route exact path='/bubbles' component={BubblesCanvas}></Route>
            <Route exact path='/boids' component={Boids}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;