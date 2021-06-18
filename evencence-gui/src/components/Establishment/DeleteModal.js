import React, { Component } from 'react';
import { Button , Modal} from 'react-bootstrap';

export default class DeleteModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show : false,
    }
  }
  
  getEstablishmentById = (id) => {
      const apiUrl = '/establishment/getone/' + id;
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
            establishment: result,
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

  //cette fonction c'est pour cacher. Lors que show est a 'true' la box est affichée.
  handleHide = () => {
    // Do not mutate state directly. Do not use this.state.show = false but use setState() instead
    this.setState({
      show: false,
    })
  };

  //Etape 1 : i want retrieve a establishment when i click on the detele button to have the establishment id and some informations
  //Etape 2 : i want to delete this establishment when the user confirm it's ok to delete it
  //Etape 3 : i want that the modal hide when i confirm it's ok or when i click on the cancel button
  //Etape 4 : display a message to confirm that the establishment has been deleted

render (){
  let BusinessNameEstablishment = this.state.establishment ? this.state.establishment.businessName : ''
  let siretNumberEstablishment = this.state.establishment ? this.state.establishment.siretNumber : ''
  let emailAddressEstablishment = this.state.establishment ? this.state.establishment.emailAddress : ''

  return (
  <>
    <Button className={'backBtn'} variant="danger" onClick={() =>this.handleShow()}>Supprimer</Button>
    <Modal show={this.state.show} onHide={() => this.handleHide()} onEnter={()=> this.getEstablishmentById(this.props.id)}>
      <Modal.Header closeButton>
      <Modal.Title className={'warningBlock'}>!!! ATTENTION !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Êtes-vous sûr de vouloir supprimer cette établissement de l'application ?</h5>
              <li>Raison sociale :  {BusinessNameEstablishment}</li>
              <li>Numéro siret : {siretNumberEstablishment}</li>
              <li>Adresse e-mail : {emailAddressEstablishment} </li>
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
