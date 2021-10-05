import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react'
import LoginButton from './commponent/LoginButton'
import LogoutButton from './commponent/LogoutButton'
import Main from './commponent/Min';
import FavWach from './commponent/FavWach';
import 'bootstrap/dist/css/bootstrap.min.css';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export class App extends Component {
  render() {
    return (
      
      
          <Router>
         <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">FavWatch</Link>
            </li>
            <li>
            { this.props.auth0.isAuthenticated ? <LogoutButton/>
                 : <LoginButton/> }
                
            
            </li>
          </ul>
        </nav>

        <Switch>
        { this.props.auth0.isAuthenticated && 
           <>
           <Route exact path="/">
                <Main />
            </Route>
            <Route exact path="/FavWach">
                                    <FavWach />
                                </Route> 
                                </>
          
          }
         
        </Switch>
       </div>
    </Router>

    
      
    )
  }
}

export default withAuth0(App);
