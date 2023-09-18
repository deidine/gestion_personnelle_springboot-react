
import React, { Component } from 'react'
import FonctionService from '../../services/FonctionService';
import { ErrorMessage, Field, Form, Formik } from "formik";
import ReactDatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import AlertifyService from '../../services/AlertifyService';
//import Select from 'react-select';

var statuses = [];
export default class FonctionFormComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {

            nom: '',
            code: '',
            selectedOption: null,
            options: []
        }
    }
    componentDidMount() {
        // this.loadStatus();
    }


    validate(values) {
        let errors = {};
        if (!values.nom)
            errors.nom = 'Enter a Fonction Name!';
        else if (values.nom.length < 5)
            errors.nom = 'Enter at least 5 characters into Fonction Name!';

        if (!values.code)
            errors.code = 'Enter a Fonction Name!';
        else if (values.code.length < 5)
            errors.code = 'Enter at least 5 characters into Fonction Name!';
        return errors;
    }
    addFonction = () => {
        if (this.state.nom === '' || this.state.code === '') {
            AlertifyService.alert("Fill in the blanks");
        } else {
            let newFonction = this.state;
            FonctionService.add(newFonction).then(res => {
                // let data = res.data;
                this.setState({
                    nom: '',
                    code: ''
                });
                AlertifyService.successMessage("Saving Fonction  is ok.. ");
            });
        }

    }
    onChangeData(type, e) {
        const addFonction = this.state;
        addFonction[type] = e;
        this.setState({ addFonction });
    }
    back() {
        this.props.history.push('/fonctions');
    }
    render() {
        let { nom, code } = this.state;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <h5>Fonction Form</h5>
                    <hr />
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.back()} >  Back </button>
                    <hr />
                    <div className="col-sm-8">
                        <Formik
                            onSubmit={this.addFonction}
                            validate={this.validate}
                            initialValues={{ nom, code }}
                            enableReinitialize={true} >
                            <Form>
                                <fieldset className="form-group">
                                    <label>Fonction Name :</label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        name="nom"
                                        value={nom}
                                        onChange={e => this.onChangeData('nom', e.target.value)} />
                                    <ErrorMessage name="nom" component="div" className="alert alert-danger text-danger" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Fonction code :</label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        name="nom"
                                        value={code}
                                        onChange={e => this.onChangeData('code', e.target.value)} />
                                    <ErrorMessage name="code" component="div" className="alert alert-danger text-danger" />
                                </fieldset>
                                {/* <fieldset className="form-group">
                                <label>Fonction Name :</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="nom"
                                    value={nom}
                                    onChange={e => this.onChangeData('nom', e.target.value)} />
                                <ErrorMessage name="nom" component="div" className="alert alert-danger text-danger" />
                            </fieldset>
              */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        // onClick={() => this.viewemployee(this.state.employeeid)}
                                        data-dismiss="modal">Close</button>
                                    <div className="dropdown-divider"></div>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className="col">
                <div className="col-lg-3">
                    <img style={{ height: 200 }} src={require('../../Assets/img/add_data.webp')} alt="" />
                <div className="col-sm-12">
                    <hr />
                    <hr />
                    <hr />
</div>
                </div>
                </div>
            </div >
        )
    }
}
