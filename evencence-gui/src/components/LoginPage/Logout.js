import React, {Component} from 'react'

class LogOut extends Component {
    state = {  }
    render() { 
        return ( 
            <div className={'logOutBlock'}>
                <h3>Déconnexion réussie</h3>
                <h1>Vous allez être redigé vers l'écran d'accueil.</h1>
            </div>
         );
    }
}
 
export default LogOut;