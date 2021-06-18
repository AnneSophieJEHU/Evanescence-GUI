import React, { Component } from 'react';
import './FooterBar.css';


class FooterBar extends Component {
    render(){
        return(    
            <footer className={'footerBlock'}>
                <div className={'footerNameStudio'}>
                 © 2019-2020 Evanescence Masterwork Studios
                 </div>
            </footer>
        )
    }
}

export default FooterBar;