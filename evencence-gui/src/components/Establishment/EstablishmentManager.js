import React from 'react';
import { Alert } from 'react-bootstrap';
import EstablishmentList from '../Lists/EstablishmentList';
import EstablishmentForm from '../Forms/EstablishmentForm';
import './EstablishmentManager.css';


class EstablishmentManager extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    isAddEstablishment: false,
    isEditEstablishment: false,
    error: null,
    response: {},
    show: true 
  }
}

/*EstablishmentManager.js:24 Uncaught TypeError: this.setState is not a function
  => Maybe the function is not an arrow function or must be bind to the constructor
  I need to be pushed!
*/
onCloseForm = () => {
  this.setState({ 
    isAddEstablishment: false,
    isEditEstablishment: false
  });
}

onCreate = () => {
  this.setState({ 
    isAddEstablishment: true 
  });
}
    
onFormEditSubmit = (data) => {
  console.log(data);
  const apiUrl = '/establishment/update/' + this.state.establishment.id;

  fetch(apiUrl, {
    method: 'PUT',
    headers: {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    })
    .then(result => {
      console.log(result)
      this.setState({
        response: result,
        isAddEstablishment: false,
        isEditEstablishment: false,
        show: true,
        })
    },
    (error) => {
      this.setState({ error });
    }
    )
    setTimeout(()=> this.setState({show: false}), 8000)
}

onFormAddSubmit = (data) => {
  const apiUrl = '/establishment';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json"
    },
    body: JSON.stringify(data),   
    })
    .then(result => {
      this.setState({
        response: result,
        isAddEstablishment: false,
        isEditEstablishment: false,
        show: true
      })
    },
    (error) => {
      this.setState({ error });
    }
    )
    setTimeout(()=> this.setState({show: false}), 8000)
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
      console.log(result)
      this.setState({
        establishment: result,
        isAddEstablishment: true,
        isEditEstablishment: true
      });
    },
    (error) => {
      this.setState({ error });
     }
    )
}

hideAlert = () => {
  this.setState({
    show: false
  })
}
    
render() {
  const emptyEstablishment = {
    id:'',
    businessName: '',
    siretNumber: '',
    addressEstablishment: {
      road: '',
      additionalAddress: '',
      zipCode : '', 
      cityName : '' 
    },
    emailAddress: '',
    phoneNumber : ''
  }  
  let establishmentFormComponent;
  if(this.state.isEditEstablishment){
    establishmentFormComponent = <EstablishmentForm onFormSubmit={this.onFormEditSubmit} establishmentRetrieved={this.state.establishment} closeForm={this.onCloseForm}/>
  }else if(this.state.isAddEstablishment){
    establishmentFormComponent = <EstablishmentForm onFormSubmit={this.onFormAddSubmit} establishmentRetrieved={emptyEstablishment} closeForm={this.onCloseForm}/>
  }
  
return (
  /*In this Container, i ask to display some components recording that i want
  Line 1 : if isAddEstablishment is 'false', i want to display the "Add a new establishment" button.
  */
    <div className={'blockManager'}>
      {!this.state.isAddEstablishment && this.state.response.status === 201 && <div><br />
        <Alert show={this.state.show} variant="info" onClose={()=>this.hideAlert()} dismissible>
          <Alert.Heading>Ce contrat a été créé! correctement.</Alert.Heading>
            <p>
              Référez-vous à la liste si vous souhaitez effectuer des modifications ou le supprimer.
            </p>
        </Alert></div>}
      {!this.state.isAddEstablishment && !this.state.isEditEstablishment && this.state.response.status === 204 && <div><br />
        <Alert show={this.state.show} variant="info" onClose={()=>this.hideAlert()} dismissible>
          <Alert.Heading>Les informations de ce contrat ont correctement été modifiées.</Alert.Heading>
            <p>
              Référez-vous à la liste si vous souhaitez effectuer des modifications ou le supprimer.
            </p>
        </Alert></div>}
      {!this.state.isAddEstablishment && <EstablishmentList establishmentById={this.getEstablishmentById} 
      edited={this.state.isEditEstablishment} created={this.state.isAddEstablishment} openToCreate={this.onCreate}/>}
      {establishmentFormComponent}
      {this.state.error && <div>Error: {this.state.error.message}</div>}
    </div>
  );
  }
}

export default EstablishmentManager;
