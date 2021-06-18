import React, { Component } from 'react';
import './ProjectList.css';
import DeleteModalProject from '../ProjectIndividualized/DeleteModalProject';
import { Table, Button, Alert } from 'react-bootstrap';
import Forbidden from '../exceptions/Forbidden'
import Pagination from 'react-js-pagination';

export class ProjectList extends Component {
  // sync : you send a request then you wait for the response... It not the better solution. It's recommand to disable it
  // async : you send a request then you don't have to wait... This solution is better for the user experience.

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      project: {},
      projects: [],
      response: {},
      show: true,
      activePage: 1,
      pageSize: 10
    };
  }

  componentDidMount() {
    this.requestProjectPage(this.state.activePage)
  }

  requestProjectPage = (page, size) => {
    const apiUrl = `/individualizedProject/individualizedProjects?page=${page - 1}&size=10`;


    fetch(apiUrl, { credentials: 'include' })
      .then(result => {
        if (!result.ok) {
          this.setState({
            isAuthenticated: false,
            errorMessage: result.statusText,
            isLoaded: true,
            error: result
          })
        } else {
          this.setState({
            isAuthenticated: true,
          })
        }
        return result.json()
      })
      .then(
        (result) => {
          if (this.state.isAuthenticated) {
            this.setState(prevState => {
              return {
                ...prevState,
                isLoaded: true,
                projects: result.content,
                isAuthenticated: true,
                totalItemsCount: result.totalElements
              }
            });
          }

        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            errorMessage: error
          })
        }
      )
  }

  deleteProjectById = (id) => {
    const { projects } = this.state;
    const apiUrl = '/individualizedProject/' + id;

    const options = {
      method: 'DELETE'
    }
    fetch(apiUrl, options)
      .then(
        (result) => {
          this.setState({
            response: result,
            projects: projects.filter(project => project.id !== id)
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
    setTimeout(() => this.setState({ show: false }), 8000)
  }

  hideAlert = () => {
    this.setState({
      show: false
    })
  }

  handlePageChange = (pageNumber) => {
    this.setState(prevState => {
      return{ ...prevState,
        activePage: pageNumber }
    });
    this.requestProjectPage(pageNumber)
  }

  render() {
    let status = this.props.edited && this.props.created
    const { error, isLoaded, projects } = this.state;
    if (error) {
      console.log(error);
      return <Forbidden />;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div>
          {!status && this.state.response.status === 200 && <div><br />
            <Alert show={this.state.show} variant="danger" onClose={() => this.hideAlert()} dismissible>
              <Alert.Heading>Cet projet a été supprimé définitivement de l'application.</Alert.Heading>
              <p>
                Nous espérons que vous avez conservé une sauvegarde papier dans vos archives.
              </p>
            </Alert></div>}
          <div className={'titleManagerEstab'}>
            <h4>Espace de gestion des projets d'accompagnement individualisé</h4>
          </div>
          <div className={'blockInfoManager'}>
            <p className={'onScreen'}>Sur cet écran, vous pouvez :</p>
            <li className={'liManager'}>Consulter les projets individualisés de vos résidents.</li>
            <li className={'liManager'}>Créer le projet individualisé d'un nouveau résident.</li>
            <li className={'liManager'}>Modifier une ou plusieurs information(s) du projet d'un résident souhaité.</li>
            <li className={'liManager'}>Supprimer un projet lorsque cela s'avère nécessaire.</li>
          </div>
          <div className={'btnAddPaginationTopBlock'}>
            <Button className={'addBtn'} onClick={() => this.props.openToCreate()}>Créer un projet individualisé</Button>
            <Pagination
                className={'paginationTop'}
                prevPageText='Précédent'
                nextPageText='Suivant'
                firstPageText='Début'
                lastPageText='Fin'
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.totalItemsCount}
                onChange={this.handlePageChange}
              />
            </div>
            <Table className={'blockTab'}>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Sexe</th>
                  <th>Date de naissance</th>
                  <th>Lieu de naissance</th>
                  <th>Date de création du projet</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(projet =>
                  <tr key={projet.id}>
                    <td>{projet.personalData.lastName}</td>
                    <td>{projet.personalData.firstName}</td>
                    <td>{projet.personalData.gender}</td>
                    <td>{projet.personalData.birthdate}</td>
                    <td>{projet.personalData.birthplace}</td>
                    <td>{projet.creationDate}</td>
                    <td><Button className={'btnTabsEstab'} variant="info" onClick={() => this.props.projectById(projet.id)}>Modifier</Button></td>
                    <td><DeleteModalProject deleteById={this.deleteProjectById} id={projet.id}/></td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className={'paginationBlock'}>
              <div className={'emptyDiv'}>
              </div>
              <Pagination
                prevPageText='Précédent'
                nextPageText='Suivant'
                firstPageText='Début'
                lastPageText='Fin'
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.totalItemsCount}
                onChange={this.handlePageChange}
              />
            </div>
      </div>

      );
    }
  }
}

export default ProjectList;