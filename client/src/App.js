import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import UserTable from './table'

class Users extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    // Call our fetch function below once the component mounts
    console.log("component mounted")
    this.callBackendAPI()
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/users');
    const body = await response.json();
    console.log("GOT body!")
    console.log(typeof body)
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    console.log("Rendering users page")
    console.log(this.state.data)
    const users = this.state.data.map((player, index) => <li key={index}>{player.lastname} {player.firstname}</li>);
    return (
      <div className="Users">
        <header className="Users-header">
          <img src={logo} className="Users-logo" alt="logo" />
          <h1 className="Users-title">Welcome to React</h1>
        </header>
        This is the users page!
        <p className="Users-intro">{users}</p>
      </div>
    );
  }
}
// export default Users;

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
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/users' component={UserTable}></Route>
            <Route exact path='/about' component={About}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;