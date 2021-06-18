import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HeaderNavbar from './components/Header/HeaderNavbar';
import FooterBar from './components/Footer/FooterBar';
import EstablishmentManager from './components/Establishment/EstablishmentManager';
import ProjectIndividualizedManager from './components/ProjectIndividualized/ProjectIndividualizedManager';
import HomePage from './components/HomePage/HomePage';
import LogOut from './components/LoginPage/LogOut';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userLoggedIn: localStorage.getItem('session') || false,
      userAuthorized: false,
      role: localStorage.getItem("authority") ,
      userName: localStorage.getItem("username") || '',
      user: {}
    }
    this.anonUser = {
      username: 'Anon',
      userLoggedIn: false,
      userAuthorized: false,
      credentialsNonExpired: false,
    }
  }
  componentDidUpdate(_prevProp, prevState) {
    this.getUserIfConnected(prevState)
  }

  getUserIfConnected = (prevState) => {
    fetch('/users').then(resp => {
      console.log(resp)
      if (resp.ok) {
        return resp.json()
      }
      // if not ok, set a default anonymous user
      // else {
      //   return this.anonUser
      // }
    }).then(resp => {
      console.log(resp)
      //if (resp.enabled && resp.credentialsNonExpired && resp.accountNonExpired)
      // if user is logged then get his infos
      if (this.state.userLoggedIn !== prevState.userLoggedIn && this.state.userLoggedIn){
        localStorage.setItem("username", resp.username)
        localStorage.setItem("authority", resp.authorities[0].authority)
        this.setState({
          userName: resp.username,
          role: resp.authorities[0].authority
        })
      }
    
    })
      .catch(err => console.log(err))
  }

  handleUserSubmit = (values, actions) => {
    //https://stackoverflow.com/questions/13391579/how-to-rename-json-key
    //https://www.oauth.com/oauth2-servers/access-tokens/password-grant/
    // setTimeout(() => console.log(JSON.stringify(values)), 1000)
    const oauthURL = '/login'
    const initRequest = {
      method: 'POST',
      body: `username=${encodeURIComponent(values.email)}&password=${values.password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    fetch(oauthURL, initRequest)
      .then(resp => {
        if (resp.ok) {
          //user is authorized get his role
          console.log(resp)
          localStorage.setItem("session", "true")
          this.setState({
            userLoggedIn: true
          })
        }
        else {
          console.log(resp)
          actions.resetForm()
          actions.setStatus("L'e-mail ou le mot de passe saisi ne correspond à aucun compte. Veuillez réessayer ou contactez le support.")
        }
      })
      //.then(resp =>  console.log(resp.body))
      .catch(err => console.log("Error :", err))
  }

  logout = () => {
    console.log('LOGOUT')
    fetch('/logOut', {
      method: 'POST',
      mode: 'no-cors',

    }).then(resp => {
      console.log(resp)
      localStorage.removeItem("session")
      localStorage.removeItem("username")
      localStorage.removeItem("authority")

      this.setState({
        userLoggedIn: false
      })
    })
      .catch(err => console.log(err)
      )
  }

  redirectByRole = () => {
    if(this.state.userLoggedIn && this.state.role === "ROLE_CONTRACTMANAGER"){
      return <EstablishmentManager/>
    }
    else if (this.state.userLoggedIn && this.state.role === "ROLE_MANAGER"){
      return <ProjectIndividualizedManager/>
    }
  }

  render() {
    return (
    //https://reactrouter.com/web/api/Redirect
      <Router>
        <div className={'Main'}>
          <HeaderNavbar name={this.state.userName} role={this.state.role} isAuth={this.state.userLoggedIn} logout={this.logout} />
          <Switch>
            <Route exact path="/HomePage">
              {this.state.userLoggedIn ? 
              <Redirect push to="/" /> : 
              <HomePage login={this.handleUserSubmit} isAuth={this.state.userLoggedIn} />}
            </Route>
            <Route exact path="/" render={()=> this.redirectByRole()} />
            <Route exact path="/LogOut" component={LogOut}>
            {!this.state.userLoggedIn ? <Redirect push to="/HomePage" /> : <LogOut/>}
            </Route>
          </Switch>
          <FooterBar />
        </div>
      </Router>
    )
  };
}


export default App;
