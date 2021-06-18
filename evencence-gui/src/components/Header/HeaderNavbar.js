import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './HeaderNavbar.css'
import EvanescenceLogoWhiteBackground from '../../assets/EvanescenceLogoWhiteBackground.png';
import avatarIconProfile from '../../assets/avatarIconProfile.png';

class HeaderNavbar extends Component {

    state = {
        isOpen: false,
        connected: this.props.isAuth
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isAuth !== this.props.isAuth) {
            this.setState({...prevState, connected: this.props.isAuth})
        }
    }

    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    closeNavbar = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <nav>
                <div className={'logoBtn'}>
                    <div className={'boxLogo'}>
                        <Link to='/HomePage' onClick={this.closeNavbar}>
                            <img src={EvanescenceLogoWhiteBackground} alt="" className={'logoImg'} />
                        </Link>
                    </div>
                    {this.props.isAuth ?
                    <div className={'groupBar'} onClick={this.handleClick}>
                         <div className={'barProfil'}>Profil</div>
                        <img src={avatarIconProfile} alt="" className={'iconProfileImg'} />
                    </div> : ''}
                </div>
                <ul className={this.state.isOpen ? 'showNav' : 'undefined'}>
                    {this.props.isAuth && <li >{this.props.name}</li>}
                    {this.props.isAuth && <li ><Link to='/Logout' onClick={() => this.props.logout()}>Se déconnecter</Link></li>}
                </ul>
            </nav>
        );
    }
}
// TODO https://react-bootstrap.github.io/components/navs/#using-dropdowns
export default HeaderNavbar; 