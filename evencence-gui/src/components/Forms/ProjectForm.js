import React, { Component } from 'react';
import './EstablishmentForm.css';
import { FormGroup, Button } from "react-bootstrap";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


class ProjectForm extends Component {

  render() {
    let {projectRetrieved} = this.props
    let {onFormSubmit} = this.props
    let pageTitle;
    
    if(projectRetrieved.id) {
      pageTitle = <div>
                    <h5 className={'titleFormEstab'}>Modifier les informations de ce projet</h5>
                  </div>
    } else {
      pageTitle = <div>
                    <h5 className={'titleFormEstab'}>Nouveau projet d'accompagnement</h5>
                  </div>
    }

    const validationSchemaTest = Yup.object().shape({
        personalData : Yup.object().shape({
            lastName :  Yup.string()
            .required('Le nom du résident est manquant')
            .min(1)
            .max(30, 'Vous avez atteint le nombre limite de caractères.'),
            firstName : Yup.string()
            .required('Le prénom du résident est manquant')
            .min(5)
            .max(40, 'Vous avez atteint le nombre limite de caractères.'),
            gender : Yup.string()
            .required('Le sexe du résident est manquant')
            .min(1)
            .max(10, 'Vous avez atteint le nombre limite de caractères.'),
            birthdate : Yup.string()
            .required('La date de naissance est manquante')
            .min(6)
            .max(20, 'Vous avez atteint le nombre limite de caractères.'),
            maritalStatus : Yup.string()
            .required('Le statut marital est manquant')
            .min(3)
            .max(35, 'Vous avez atteint le nombre limite de caractères.')}),
            whereComeFrom : Yup.string()
            .required('Veuillez indiquer d\'où vient le résident.')
            .min(3, 'Veuillez insérer au moins trois caractères.')
            .max(55, 'Vous avez atteint le nombre limite de caractères.'),
            isItYourDecision : Yup.string()
            .required('Veuillez insérer le décision')
            .min(1, 'Veuillez insérer au moins un caractère.')
            .max(255, 'Vous avez atteint le nombre limite de caractères.'),
            lastProfessionExercised : Yup.string()
            .required('Veuillez insérer le dernier poste occupé.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(120, 'Vous avez atteint le nombre limite de caractères.'),
            isoResourceGroups : Yup.string()
            .required('Veuillez insérer la GIR du résident.')
            .min(2, 'Veuillez insérer au moins quatre caractères.')
            .max(120, 'Vous avez atteint le nombre limite de caractères.'),
            washHabit : Yup.string()
            .required('Veuillez insérer les informations aux habitudes de vie du résident.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(1200, 'Vous avez atteint le nombre limite de caractères.'),
            clothingHabit : Yup.string()
            .required('Veuillez insérer les informations aux habitudes de vie du résident.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(1200, 'Vous avez atteint le nombre limite de caractères.'),
            dietaryHabit : Yup.string()
            .required('Veuillez insérer les informations aux habitudes de vie du résident.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(1200, 'Vous avez atteint le nombre limite de caractères.'),
            mobiltyHabit : Yup.string()
            .required('Veuillez insérer les informations aux habitudes de vie du résident.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(1200, 'Vous avez atteint le nombre limite de caractères.'),
            breathingHabit : Yup.string()
            .required('Veuillez insérer les informations aux habitudes de vie du résident.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(1200, 'Vous avez atteint le nombre limite de caractères.'),
            eliminationHabit : Yup.string()
            .required('Veuillez insérer les informations aux habitudes de vie du résident.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(1200, 'Vous avez atteint le nombre limite de caractères.'),
            sleepHabit : Yup.string()
            .required('Veuillez insérer les informations aux habitudes de vie du résident.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(1200, 'Vous avez atteint le nombre limite de caractères.'),
            communicationHabit : Yup.string()
            .required('Veuillez insérer les informations aux habitudes de vie du résident.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(1200, 'Vous avez atteint le nombre limite de caractères.'),
            cultureAndHobbiesHabit : Yup.string()
            .required('Veuillez insérer les informations aux habitudes de vie du résident.')
            .min(2, 'Veuillez insérer au moins deux caractères.')
            .max(1200, 'Vous avez atteint le nombre limite de caractères.'),
            peoplePresent : Yup.string()
            .required('Veuillez insérer le nom, le prénom et l\'affiliation')
            .min(10, 'La raison sociale doit contenir au moins 10 caractères.')
            .max(255, 'Vous avez atteint le nombre limite de caractères.')
    })
    return(
      <div className={'allBlockForm'} >
            <div className={'leftCreateformBlockEstab'}>
              <div className={'backgroundCreateformBlock'}/>
              <div className={'imageCreateEstab'}/>
            </div>
            <div className={'rightCreateFormBlockEstab'}>
            <Formik
              initialValues={projectRetrieved}
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
                          <label >Nom *</label>
                          <Field type="text" name="personalData.lastName" placeholder="Nom" className={'inputSBox'} minLength={1} maxLength={30} />
                          <ErrorMessage name="personalData.lastName" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Prénom *</label>
                          <Field type="text" name="personalData.firstName" placeholder="Prénom" className={'inputSBox'} minLength={1} maxLength={40} />
                          <ErrorMessage name="personalData.firstName" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Sexe *</label>
                          <Field type="text" name="personalData.gender" placeholder="Sexe" className={'inputSBox'} minLength={1} maxLength={40} />
                          <ErrorMessage name="personalData.gender" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Date de naissance *</label>
                          <Field type="text" name="personalData.birthdate" placeholder="Date de naissance" className={'inputSBox'} minLength={1} maxLength={40} />
                          <ErrorMessage name="personalData.birthdate" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Lieu de naissance</label>
                          <Field type="text" name="personalData.birthplace" placeholder="Lieu de naissance" className={'inputSBox'} minLength={1} maxLength={40} />
                          <ErrorMessage name="personalData.birthplace" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Language natale</label>
                          <Field type="text" name="personalData.nativeLanguage" placeholder="Language natale" className={'inputSBox'} minLength={1} maxLength={40} />
                          <ErrorMessage name="personalData.nativeLanguage" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Autres langues parlées</label>
                          <Field type="text" name="personalData.otherslanguagesSproken" placeholder="Autres langues parlées" className={'inputSBox'} minLength={1} maxLength={40} />
                          <ErrorMessage name="personalData.otherslanguagesSproken" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Status marital *</label>
                          <Field type="text" name="personalData.maritalStatus" placeholder="Status marital" className={'inputSBox'} minLength={3} maxLength={35}/>
                          <ErrorMessage name="personalData.maritalStatus" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label >Où étiez-vous avant d'intégrer la résidence ? *</label>
                          <Field type="text" name="whereComeFrom" placeholder="d'où venez-vous ?" minLength={3} maxLength={55} className={'inputSBox'}/>
                          <ErrorMessage name="whereComeFrom" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup >
                          <label>Est-ce votre volonté d'intégrer un EHPA ? *</label>
                          <Field type="text" name="isItYourDecision" placeholder="Est-ce votre décision ?" minLength={1} maxLength={10} className={'inputSBox'}/>
                          <ErrorMessage name="isItYourDecision" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Êtes-vous croyant(e) ? Si oui, quelle est votre religion ?</label>
                          <Field type="text" name="religion" placeholder="Religion, si il y a."  className={'inputSBox'} maxLength={225}/>
                          <ErrorMessage name="religion" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Avez-vous travaillez ? Quel a été le dernier poste occupé ? *</label>
                          <Field type="text" name="lastProfessionExercised" placeholder="Dernier poste occupé" className={'inputSBox '} minLength={1} maxLength={100}/>
                          <ErrorMessage name="lastProfessionExercised" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Indiquer la GIR :  *</label>
                          <Field type="text" name="isoResourceGroups" placeholder="GIR" className={'inputSBox'}  minLength={4} maxLength={4}/>
                          <ErrorMessage name="isoResourceGroups" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <h3>Habitudes de vie du résident</h3>
                        <FormGroup>
                          <label>Que pouvez-vous dire au sujet de l'hygiène ? (corporel, dentaire, difficultés...) *</label>
                          <Field type="text" name="washHabit" placeholder="Hygiène corporel, dentaire" className={'inputSBox'}  minLength={2} maxLength={1200}/>
                          <ErrorMessage name="washHabit" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Que pouvez-vous dire au sujet de l'habillement ? (tenue vestimentaire, maquillage, bijoux, difficultés...) *</label>
                          <Field type="text" name="clothingHabit" placeholder="Habitudes de l'habillement" className={'inputSBox'}  minLength={2} maxLength={1200}/>
                          <ErrorMessage name="clothingHabit" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Que pouvez-vous dire au sujet de l'alimentation ? (régime spécial, difficultés...) *</label>
                          <Field type="text" name="dietaryHabit" placeholder="Habitudes alimentaires" className={'inputSBox'}  minLength={2} maxLength={1200}/>
                          <ErrorMessage name="dietaryHabit" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Que pouvez-vous dire au sujet de la modibilté ? (seul, canne, déambulateur...) *</label>
                          <Field type="text" name="mobiltyHabit" placeholder="A propos de la mobilité" className={'inputSBox'}  minLength={2} maxLength={1200}/>
                          <ErrorMessage name="mobiltyHabit" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>A t il des difficultés respiratoires ? (matériels d'assistance...) *</label>
                          <Field type="text" name="breathingHabit" placeholder="Difficultés respiratoires" className={'inputSBox'}  minLength={2} maxLength={1200}/>
                          <ErrorMessage name="breathingHabit" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Cette personne a t-elle difficultés a éliminer ? *</label>
                          <Field type="text" name="eliminationHabit" placeholder="difficultés à éliminer" className={'inputSBox'}  minLength={2} maxLength={1200}/>
                          <ErrorMessage name="eliminationHabit" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Que pouvez-vous dire au sujet du sommeil de cette personne ?  (sieste, nuit, réveil...) *</label>
                          <Field type="text" name="sleepHabit" placeholder="Habites au sujet du sommeil" className={'inputSBox'}  minLength={2} maxLength={1200}/>
                          <ErrorMessage name="sleepHabit" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Avez-vous noté des difficultés a communiquer à parler ? *</label>
                          <Field type="text" name="communicationHabit" placeholder="Difficultés à communiquer, à parler" className={'inputSBox'}  minLength={2} maxLength={1200}/>
                          <ErrorMessage name="communicationHabit" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Quelles sont ses activités ? (poker, visites amis et famille, lecture...) *</label>
                          <Field type="text" name="cultureAndHobbiesHabit" placeholder="Difficultés à communiquer, à parler" className={'inputSBox'}  minLength={2} maxLength={1200}/>
                          <ErrorMessage name="cultureAndHobbiesHabit" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        <FormGroup>
                          <label>Indiquez le nom, le prénom et l'affiliation des personnes présentes à cet entretien : *</label>
                          <Field type="text" name="peoplePresent" placeholder="Personnes présentes à cet entretien" className={'inputSBox'}  minLength={10} maxLength={255}/>
                          <ErrorMessage name="peoplePresent" component="div" className={'errorMsgFormEstab'}/>
                        </FormGroup>
                        </div>
                        </div>
                        <FormGroup className={'btnFormEstab'}>
                          <Button className={'backBtn'}variant="secondary" type="button" onClick={() => this.props.closeForm()}>Retour</Button>
                          <Button className={'saveBtn'} type="submit" >Enregistrer</Button>
                        </FormGroup>
                  </div>
                </Form>
              )}
            </Formik>
            </div>
        </div>
    )}
}

export default ProjectForm;