import React, { Component } from 'react';
import './EstablishmentForm.css';
import { FormGroup, Button } from "react-bootstrap";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


class EstablishmentForm extends Component {

  render() {
    let {establishmentRetrieved} = this.props
    let {onFormSubmit} = this.props
    let pageTitle;
    
    if(establishmentRetrieved.id) {
      pageTitle = <div>
                    <h5 className={'titleFormEstab'}>Modifier les données de cet établissement</h5>
                    <h5 className={'imperativeWord'}>IMPERATIF!</h5>
                    <h6 className={'introImperative'}>Pensez à vous munir de l'extrait Kbis mise à jour!</h6>
                  </div>
    } else {
      pageTitle = <div>
                    <h5 className={'titleFormEstab'}>Créer un nouvel establissement</h5>
                    <h5 className={'imperativeWord'}>IMPERATIF!</h5>
                    <h6 className={'introImperative'}>Pensez à vous munir de l'extrait Kbis!</h6>
                  </div>
    }

    const validationSchemaTest = Yup.object().shape({
      businessName : Yup.string()
        .required('Veuillez insérer le nom de l\'entreprise')
        .min(2, 'La raison sociale doit contenir au moins deux caractères.')
        .max(100, 'Vous avez atteint le nombre limite de caractères.'),
      siretNumber : Yup.string()
        .required('Veuillez insérer le numéro siret')
        .matches(/^[0-9\s]{1,}$/, 'Seulement des chiffres')
        .min(14, 'Le numéro siret est égal à 14 chiffres')
        .max(14, 'Le numéro siret est égal à 14 chiffres'),
      addressEstablishment : Yup.object().shape({
        road :  Yup.string()
        .required('Le n° et nom de la rue sont manquants')
        .min(5)
        .max(255),
        zipCode :  Yup.string()
        .required('Veuillez insérer le code postal')
        .matches(/^[0-9\s]{1,}$/, 'Seulement des chiffres')
        .min(5, 'Le code postal est égal à 5 chiffres')
        .max(5, 'Le code postal est égal à 5 chiffres'),
        cityName :  Yup.string()
        .required('Veuillez insérer la ville')
        .min(1)
        .max(100)}),
      emailAddress : Yup.string()
        .email('L\'adresse email est invalide')
        .required('Veuillez insérer l\'adresse mail')
        .min(6, 'L\'adresse email doit être composée de 6 caractères minimum')
        .max(320),
      phoneNumber : Yup.string()
        .required('Veuillez insérer le numéro de téléphone')
        .min(10, 'Le numéro de téléphone est égal à 10 chiffres')
        .max(10, 'Le numéro de téléphone est égal à 10 chiffres')
  
    })
    
    let stringDigits = (Field) => {
      var number = String.fromCharCode(Field.which);
      if(!(/[0-9]/.test(number))){
          Field.preventDefault();
      }
     }
    return(
      <div className={'allBlockForm'} >
            <div className={'leftCreateformBlockEstab'}>
              <div className={'backgroundCreateformBlock'}/>
              <div className={'imageCreateEstab'}/>
            </div>
            <div className={'rightCreateFormBlockEstab'}>
            <Formik
              initialValues={establishmentRetrieved}
              validationSchema={validationSchemaTest}
              onSubmit={onFormSubmit}
            >
              {(props) => (
                <Form>
                  <div>
                  <div> {pageTitle}</div>
                  <div className={'formBlock'}>
                      <div className={'legend'}>
                        <p className={'insertData'}>Insérez les données ici :</p>
                        <p>* : champs obligatoires</p>
                      </div>
                      <div className={'formGroupBlock'}>
                        <FormGroup>
                          <label >Raison sociale *</label>
                          <Field type="text" name="businessName" placeholder="Raison sociale" className={'inputSBox'} minLength={2} maxLength={100} />
                          <ErrorMessage name="businessName" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Numéro siret *</label>
                          <Field type="text" name="siretNumber" placeholder="Numéro siret" className={'inputSBox'} onKeyPress={stringDigits} minLength={14} maxLength={14}/>
                          <ErrorMessage name="siretNumber" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Numéro et rue, avenue, allée *</label>
                          <Field type="text" name="addressEstablishment.road" placeholder="Numéro et nom de rue" minLength={5} maxLength={255} className={'inputSBox'}/>
                          <ErrorMessage name="addressEstablishment.road" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup >
                          <label>Complément d'adresse (Immeuble, )</label>
                          <Field type="text" name="addressEstablishment.additionalAddress" placeholder="Bâtiment, étage, appartement" minLength={5} maxLength={255} className={'inputSBox'}/>
                          <ErrorMessage name="addressEstablishment.additionalAddress" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Code postal *</label>
                          <Field type="text" name="addressEstablishment.zipCode" placeholder="Code postal"  className={'inputSBox'} minLength={5} maxLength={5}/>
                          <ErrorMessage name="addressEstablishment.zipCode" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Ville *</label>
                          <Field type="text" name="addressEstablishment.cityName" placeholder="Ville, commune" className={'inputSBox '} minLength={1} maxLength={100}/>
                          <ErrorMessage name="addressEstablishment.cityName" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Adresse e-mail *</label>
                          <Field type="email" name="emailAddress" placeholder="adresse e-mail" className={'inputSBox'}  minLength={6} maxLength={320}/>
                          <ErrorMessage name="emailAddress" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Numéro de téléphone fixe ou portable *</label>
                          <Field type="text" name="phoneNumber" placeholder="Numéro de téléphone" className={'inputSBox'} onKeyPress={stringDigits} minLength={10} maxLength={10}/>
                          <ErrorMessage name="phoneNumber" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        </div>
                        <FormGroup className={'btnFormEstab'}>
                          <Button className={'backBtn'}variant="secondary" type="button" onClick={() => this.props.closeForm()}>Retour</Button>
                          <Button className={'saveBtn'} type="submit" >Enregistrer</Button>
                        </FormGroup>
                  </div>
                  </div>
                </Form>
              )}
            </Formik>
            </div>
        </div>
    )}
}

export default EstablishmentForm;