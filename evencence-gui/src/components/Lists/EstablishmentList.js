import React, { Component } from 'react';
import DeleteModal from '../Establishment/DeleteModal';
import './EstablishmentList.css';
import { Table, Button, Alert } from 'react-bootstrap';
import Forbidden from '../exceptions/Forbidden'
import Pagination from 'react-js-pagination';

export class EstablishmentList extends Component {
  // sync : you send a request then you wait for the response... It not the better solution. It's recommand to disable it
  // async : you send a request then you don't have to wait... This solution is better for the user experience.

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      establishment: {},
      establishments: [],
      response: {},
      show: true,
      activePage: 1,
      pageSize: 10
    };
  }

  componentDidMount() {
    this.requestEstablishmentPage(this.state.activePage)
  }

  requestEstablishmentPage = (page, size) => {
    const apiUrl = `/establishment/establishments?page=${page - 1}&size=10&sort=businessName`;


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
                establishments: result.content,
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

  deleteEstablishmentById = (id) => {
    const { establishments } = this.state;
    const apiUrl = '/establishment/' + id;

    const options = {
      method: 'DELETE'
    }
    fetch(apiUrl, options)
      .then(
        (result) => {
          this.setState({
            response: result,
            establishments: establishments.filter(establishment => establishment.id !== id)
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
    this.requestEstablishmentPage(pageNumber)
  }

  render() {
    let status = this.props.edited && this.props.created
    const { error, isLoaded, establishments } = this.state;
    if (error) {
      return <Forbidden />;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div>
          {!status && this.state.response.status === 200 && <div><br />
            <Alert show={this.state.show} variant="danger" onClose={() => this.hideAlert()} dismissible>
              <Alert.Heading>Ce contrat a été supprimé correctement.</Alert.Heading>
              <p>
                Si vous souhaitez insérer cet établissement dans l'application, il vous voudra vous munir de la nouvelle demande de subscription.
              </p>
            </Alert></div>}
          <div className={'titleManagerEstab'}>
            <h4>Espace de gestion des contrats</h4>
          </div>
          <div className={'imperativeBlock'}>
            <h5 className={'imperativeWord'}>IMPERATIF!</h5>
            <h6 className={'introImperative'}>En fonction du cas qui s'offre à vous. Vous devez disposer de l'extrait Kbis initial, Kbis modifié ou de l'écrit de la société (mail, courrier...) souhaitant la suppression de ses données.</h6>
          </div>
          <div className={'blockInfoManager'}>
            <p className={'onScreen'}>Sur cet écran, vous pouvez :</p>
            <li className={'liManager'}>Consulter tous les contrats.</li>
            <li className={'liManager'}>Ajouter un nouvel établissements afin de générer l'identifiant client de ce dernier.</li>
            <li className={'liManager'}>Modifier une ou plusieurs information pour un contrat donné.</li>
            <li className={'liManager'}>Supprimer un établissement lorsque cela s'avère nécessaire.</li>
          </div>
          <div className={'btnAddPaginationTopBlock'}>
            <Button className={'addBtn'} onClick={() => this.props.openToCreate()}>Ajouter un contrat</Button>
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
                  <th>Raison sociale</th>
                  <th>Numéro siret</th>
                  <th>Rue, avenue, allée</th>
                  <th>Complément d'adresse</th>
                  <th>Code postal</th>
                  <th>Ville</th>
                  <th>Adresse e-mail</th>
                  <th>Numéro de téléphone</th>
                  <th>Identifiant client</th>
                  <th>Date début contrat</th>
                  <th>Date fin contrat</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {establishments.map(establishment =>
                  <tr key={establishment.id}>
                    <td>{establishment.businessName}</td>
                    <td>{establishment.siretNumber}</td>
                    <td>{establishment.addressEstablishment.road}</td>
                    <td>{establishment.addressEstablishment.additionalAddress}</td>
                    <td>{establishment.addressEstablishment.zipCode}</td>
                    <td>{establishment.addressEstablishment.cityName}</td>
                    <td>{establishment.emailAddress}</td>
                    <td>{establishment.phoneNumber}</td>
                    <td>{establishment.customerEstablishment.customerIdentifier}</td>
                    <td>{establishment.customerEstablishment.startDateSubscription}</td>
                    <td>{establishment.customerEstablishment.endDateSubscription}</td>
                    <td><Button className={'btnTabsEstab'} variant="info" onClick={() => this.props.establishmentById(establishment.id)}>Modifier</Button></td>
                    <td><DeleteModal deleteById={this.deleteEstablishmentById} id={establishment.id}/></td>
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

export default EstablishmentList;