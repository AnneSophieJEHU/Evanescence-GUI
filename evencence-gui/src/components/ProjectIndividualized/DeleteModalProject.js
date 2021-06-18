import React, { Component } from 'react';
import { Button , Modal} from 'react-bootstrap';

export default class DeleteModalProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show : false,
    }
  }
  
  getProjectById = (id) => {
      const apiUrl = '/individualizedProject/getone/' + id;
      fetch(apiUrl, {
        method: 'GET',
        headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
        } 
        })
        .then(res => res.json())
        .then((result) => {
          this.setState({
            project: result,
          });
        },
        (error) => {
         }
        )
    }

  //this.setState modifie la valeur de 'show' qui est dans le state de false à true.
  handleShow = () => {
    this.setState({
      show: true
    })
  };

  handleHide = () => {
    this.setState({
      show: false,
    })
  };

render (){
  let lastNameProject = this.state.project ? this.state.project.personalData.lastName : ''
  let firstNameProject = this.state.project ? this.state.project.personalData.firstName : ''
  let birthdateProject = this.state.project ? this.state.project.personalData.birthdate : ''

  return (
  <>
    <Button className={'backBtn'} variant="danger" onClick={() =>this.handleShow()}>Supprimer</Button>
    <Modal show={this.state.show} onHide={() => this.handleHide()} onEnter={()=> this.getProjectById(this.props.id)}>
      <Modal.Header closeButton>
      <Modal.Title className={'warningBlock'}>!!! ATTENTION !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Êtes-vous sûr de vouloir supprimer ce projet de l'application ?</h5>
              <li>Nom :  {lastNameProject}</li>
              <li>Prénom : {firstNameProject}</li>
              <li>Date de naissanance : {birthdateProject} </li>
        </Modal.Body>
        <Modal.Footer>
          <Button className={'backBtn'} variant="secondary" onClick={() => this.handleHide()}>
            Annuler
          </Button>
          <Button className={'backBtn'} variant="danger" onClick={() => this.props.deleteById(this.props.id)} >
            Supprimer définitivement
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  );
}
}
