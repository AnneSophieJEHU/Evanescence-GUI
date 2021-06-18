import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import './SignIn.css'

//TODO error message on login failed and failed attempt
// button to reveal password
// lost password link
// unique button to go to homepage and "Bienvenue <Username>"

//https://github.com/jquense/yup#usage
// https://blog.theodo.com/2019/03/quick-formik-login-screen/ how to use ErrorMessage Component
class SignIn extends React.Component {


    render() {
        const initialValues = { email: '', password: '' }

        return (
            <Formik initialValues={initialValues}
                onSubmit={(values, actions) => this.props.log(values, actions)}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Ceci n'est pas une adresse mail valide")
                        .required("Votre adresse mail est obligatoire"),
                    password: Yup.string()
                        .min(6, 'Votre mot de passe doit contenir au moins 6 caractères')
                        .required('Votre mot de passe est requis')
                })}>
                {({ errors, status, touched, isSubmitting }) => (
                    <Form>
                        <div className="form-row">
                            <div className="form-group col">
                                <Field className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} name="email" type="email" placeholder="Votre adresse mail" />
                                <ErrorMessage className="input-feedback" name="email" component="div" />

                                <Field className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} name="password" type="password" placeholder="Votre mot de passe" />
                                <ErrorMessage className="input-feedback" name="password" component="div" />

                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <button className="btnAuth" type="submit" disabled={isSubmitting}>Se connecter</button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                <div className="input-feedback">{status}</div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )
                }

            </Formik>
        )
    }
}
export default SignIn