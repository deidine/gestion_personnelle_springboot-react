import { ACCESS_TOKEN } from '../../../constants/constants';
import tokenStorage from '../../../services/token-storage';
import React, { Component } from 'react'
import AuthService from '../../../services/AuthService';
import { ErrorMessage, Field, Form, Formik } from "formik";
import ReactDatePicker from 'react-datepicker';
import Select from 'react-select';
import tresore from '../../../Assets/img/tresore.jpeg';
import "react-datepicker/dist/react-datepicker.css";
import AlertifyService from '../../../services/AlertifyService';
//import Select from 'react-select';

var statuses = [];
export default class SignupFormComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {

            username: '',
            password: '',
            email: '',
            appUserRoles: '',
   
        }
    }
    componentDidMount() {
        // this.loadStatus();
    }


    validate(values) {
        let errors = {};
        if (!values.username)
            errors.username = 'Enter a Signup Name!';
        else if (values.username.length < 5)
            errors.username = 'Enter at least 5 characters into Signup Name!';

        if (!values.password)
            errors.password = 'Enter a Signup Name!';
        else if (values.password.length < 5)
            errors.password = 'Enter at least 5 characters into Signup Name!';
        return errors;
    }

    signup = () => {
        if (this.state.username === '' || this.state.password === '') {
            AlertifyService.alert("Fill in the blanks");
        } else {
            let newService = this.state;
            AuthService.signup(newService).then(res => {
                // let data = res.data;
                tokenStorage.saveUser(res)
                tokenStorage.saveToken(res.accessToken)
                localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);

                this.setState({
                    username: '',
                    password: '',
                    email:''
                   
                });
                AlertifyService.successMessage("Saving Signup  is ok.. ");

            }).catch(
                err => AlertifyService.errorMessage("username ou password incorect.. ")

            );
        }

    }
    onChangeData(type, e) {
        const signup = this.state;
        signup[type] = e;
        this.setState({ signup });
    }
    back() {
        this.props.history.push('/services');
    }
    render() {
        let { username, password ,email} = this.state;
 this.state.appUserRoles=["ROLE_CLIENT"]
        return (

            <section className="vh-100" style={{ backgroundColor: " #9A616D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className=" col-md-6 col-lg-5 d-none d-md-block">
                                        <img src={tresore} className="img-fluid"
                                            style={{ borderRadius: " 1rem 0 0 1rem;", marginInline: "auto" }} alt="login form" />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: " #ff6219" }}></i>
                                                <span className="h1 fw-bold mb-0">trésor général</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>


                                            <Formik
                                                onSubmit={this.signup}
                                                validate={this.validate}
                                                initialValues={{ username, password }}
                                                enableReinitialize={true} >
                                                <Form>
                                                    <div className="form-outline mb-4">

                                                        <fieldset className="form-group">
                                                            <label className="form-label"> email :</label>
                                                            <Field
                                                                className="form-control form-control-lg"
                                                                type="email"
                                                                name="email"
                                                                value={email}
                                                                onChange={e => this.onChangeData('email', e.target.value)} />
                                                            <ErrorMessage name="email" component="div" className="alert alert-danger text-danger" />
                                                        </fieldset>
                                                    </div>
                                                    <div className="form-outline mb-4">

                                                        <fieldset className="form-group">
                                                            <label className="form-label"> UserName :</label>
                                                            <Field
                                                                className="form-control form-control-lg"
                                                                type="text"
                                                                name="username"
                                                                value={username}
                                                                onChange={e => this.onChangeData('username', e.target.value)} />
                                                            <ErrorMessage name="username" component="div" className="alert alert-danger text-danger" />
                                                        </fieldset>
                                                    </div>

                                                    <div className="form-outline mb-4">

                                                        <fieldset className="form-group">
                                                            <label className="form-label"> Password :</label>
                                                            <Field
                                                                className="form-control form-control-lg"
                                                                type="password"
                                                                name="username"
                                                                value={password}
                                                                onChange={e => this.onChangeData('password', e.target.value)} />
                                                            <ErrorMessage name="password" component="div" className="alert alert-danger text-danger" />
                                                        </fieldset>
                                                    </div>

                                                    <div className="pt-1 mb-4">

                                                        {/* <button
                                                            type="button"
                                                            className="btn btn-dark btn-lg btn-block"
                                                            // onClick={() => this.viewemployee(this.state.employeeid)}
                                                            data-dismiss="modal">Close</button> */}
                                                        <div className="dropdown-divider"></div>
                                                        <button className="btn btn-dark btn-lg btn-block" type="submit">Registeration</button>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >

            </section >

        )
    }
}
