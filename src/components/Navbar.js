import React, { Component,Fragment } from 'react'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';

import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Task from './task';
import Tasks from './Atask';
export default class Navbar extends Component {
  render() {
    return (
        <Router>
            <Fragment>
        <nav className="navbar navbar-expand-sm bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/task">Task</Link>
          </li>
        </ul>
      
      </nav>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/task" component={Tasks} />
      </Fragment>
      </Router>
    )
  }
}
