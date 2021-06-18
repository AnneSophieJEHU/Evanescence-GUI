import React from 'react';
import { Alert } from 'react-bootstrap';
import ProjectForm from '../Forms/ProjectForm';
import ProjectList from '../Lists/ProjectList';


class ProjectIndividualizedManager extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    isAddProject: false,
    isEditProject: false,
    error: null,
    response: {},
    show: true 
  }
}


onCloseForm = () => {
  this.setState({ 
    isAddProject: false,
    isEditProject: false
  });
}

onCreate = () => {
  this.setState({ 
    isAddProject: true 
  });
}
    
onFormEditSubmit = (data) => {
  console.log(data);
  console.log(this.state.project.id)
  const apiUrl = '/individualizedProject/update/' + this.state.project.id;

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
        isAddProject: false,
        isEditProject: false,
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
  const apiUrl = '/individualizedProject';

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
        isAddProject: false,
        isEditProject: false,
        show: true
      })
    },
    (error) => {
      this.setState({ error });
    }
    )
    setTimeout(()=> this.setState({show: false}), 8000)
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
      console.log(result)
      this.setState({
        project: result,
        isAddProject: true,
        isEditProject: true
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
    const emptyProject = {
      id:'',
      personalData: {
        lastName: '',
        firstName: '',
        gender: '',
        birthdate : '', 
        birthplace : '',
        nativeLanguage : '',
        otherslanguagesSproken : '',
        maritalStatus : ''
      },
      whereComeFrom: '',
      isItYourDecision : '',
      religion : '',
      lastProfessionExercised : '',
      isoResourceGroups : '',
      washHabit : '',
      clothingHabit : '',
      dietaryHabit : '',
      mobiltyHabit : '',
      breathingHabit : '',
      eliminationHabit : '',
      sleepHabit : '',
      communicationHabit : '',
      cultureAndHobbiesHabit : '',
      peoplePresent : ''
    }  
    let projectFormComponent;
    if(this.state.isEditProject){
      projectFormComponent = <ProjectForm onFormSubmit={this.onFormEditSubmit} projectRetrieved={this.state.project} closeForm={this.onCloseForm}/>
    }else if(this.state.isAddProject){
      projectFormComponent = <ProjectForm onFormSubmit={this.onFormAddSubmit} projectRetrieved={emptyProject} closeForm={this.onCloseForm}/>
    }
  
return (
    <div className={'blockManager'}>
      {!this.state.isAddProject && this.state.response.status === 201 && <div><br />
        <Alert show={this.state.show} variant="info" onClose={()=>this.hideAlert()} dismissible>
          <Alert.Heading>Le projet a bien été créé!</Alert.Heading>
            <p>
              Référez-vous à la liste des projets si vous souhaitez effectuer des modifications ou le supprimer.
            </p>
        </Alert></div>}
      {!this.state.isAddProject && !this.state.isEditProject && this.state.response.status === 204 && <div><br />
        <Alert show={this.state.show} variant="info" onClose={()=>this.hideAlert()} dismissible>
          <Alert.Heading>Les informations de ce projet ont correctement été modifiées.</Alert.Heading>
            <p>
              Référez-vous à la liste des projets si vous souhaitez apporter des modifications ou le supprimer.
            </p>
        </Alert></div>}
      {!this.state.isAddProject && <ProjectList projectById={this.getProjectById} 
      edited={this.state.isEditProject} created={this.state.isAddProject} openToCreate={this.onCreate}/>}
      {projectFormComponent}
      {this.state.error && <div>Error: {this.state.error.message}</div>}
    </div>
  );
  }
}

export default ProjectIndividualizedManager;
