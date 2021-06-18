import React, { Component } from 'react';
import "./HomePage.css"
import SignInandSignUpTabs from '../SignInandSignUpTabs/SignInandSignUpTabs';



class HomePage extends Component {
    render () {
        return(
            <div className={'authBox'}>
                <div className={'leftBox'}>
                    <div className={'backgroundLeftBox'}/>
                    <div className={'imageAuth'}/>
                    <div className={'imageText style2'}>
                        <p>"Evanescence, c'est l'outil d'aide au management des projets d'accompagnement individualisé de vos résidents."</p>
                        <p className={'imageText style1'}>Marie-Christine, Évreux</p>
                    </div>
                </div>
                <div className={'rightBox'}>
                    <div>
                        <SignInandSignUpTabs login={this.props.login}/>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default HomePage;