import React, { Component } from 'react'

class Forbidden extends Component {
    state = {}
    // create a template based on status code
    render() {
        return (
            <div>
                <h1>Votre session a expiré ou vous n'etes pas autorisé à accéder à cette page</h1>
                <p>{this.props.message}</p>
            </div>
        );
    }
}

export default Forbidden;