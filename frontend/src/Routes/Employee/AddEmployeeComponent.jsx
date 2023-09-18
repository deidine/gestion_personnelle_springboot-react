import React, { Component } from 'react'
import EmployeeService from '../../services/EmployeeService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';
import ServiceService from '../../services/ServiceService';
import FonctionService from '../../services/FonctionService';

class AddEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matricule: '',
            nom: '',
            date_naissence: new Date(),
            range: '',
            date_emboche: new Date(),
            grade: '',
            prenom: '',
            email: '',
            phoneNo: '',
            gender: 'Male',
            city: 'Adrar',
            cities: [],
            serviceDepartment: '',
            fonction: '',
            services: [],
            fonctions: [],

        }

        this.saveEmployee = this.saveEmployee.bind(this);
        this.getAllCities();
        this.getAllFonctions();
        this.getAllServices();
    }
    getAllCities() {
        EmployeeService.getCities().then(res => {
            this.setState({ cities: res.data });

        });
    }
    getAllFonctions() {
        FonctionService.getAllFonction().then(res => {
            this.setState({ fonctions: res.data }); 

        });
    }
    getAllServices() {
        ServiceService.getAllService().then(res => {
            this.setState({ services: res.data }); 
            

        });
    }
    controlQuickly() {
        return this.state.name === null || this.state.name === '' || this.state.name === ' ' ||
            this.state.prenom === null || this.state.prenom === '' || this.state.prenom === ' ' || 
            this.state.fonction === '' || this.state.serviceDepartment === ''  ;
    }
    
    saveEmployee = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
        
            // this.state.fonction = {
            //     id: this.state.fonction1
            // };
            // this.state.serviceDepartment = {
            //     id: this.state.serviceDepartment1
            // };

            let employee = this.state;
            // alert(employee.fonction)
            EmployeeService.addEmployee(employee)
                .then(res => {
                    console.log(employee)
                    this.setState({ message: 'User added successfully.' });
                    this.props.history.push('/employees');
                    alertify.success("Adding Employee is ok");
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, employeeid: null });
                        AlertifyService.alert(error.response.data.message);
                        //this.props.history.push('/Employees');
                    }
                    else if (error.request) console.log(error.request);
                    else console.log(error.message);
                });
        } else
            AlertifyService.alert(' * toute les champs sont obligatoire ...');
    }
    onChangeData(type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({ stateData });
    }
    back() {
        this.props.history.push('/employees');
    }
    render() {
        //let bornDate = this.state.bornDate;
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        let { nom, grade, date_emboche, date_naissence, prenom, phoneNo, email, matricule, range, gender, city, serviceDepartment, fonction } = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <hr />
                </div> 
                <div className="col-sm-8">
                    <h2 className="text-center">Ajouter un Employes</h2>
                    <form>
                        <div className="form-group">
                            <label>nom *</label>
                            <input type="text" placeholder="name" name="nom" className="form-control" value={nom} onChange={e => this.onChangeData('nom', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>prenom *</label>
                            <input placeholder="prenom" name="prenom" className="form-control" value={prenom} onChange={e => this.onChangeData('prenom', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Phone *</label>
                            <input placeholder="phone" name="phone No" className="form-control" value={phoneNo} onChange={e => this.onChangeData('phoneNo', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>matricule *</label>
                            <input placeholder="matricule" name="matricule" className="form-control" value={matricule} onChange={e => this.onChangeData('matricule', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>grade *</label>
                            <input placeholder="grade" name="grade" className="form-control" value={grade} onChange={e => this.onChangeData('grade', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>range *</label>
                            <input placeholder="range" name="range No" className="form-control" value={range} onChange={e => this.onChangeData('range', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input placeholder="Email" name="email" className="form-control" value={email} onChange={e => this.onChangeData('email', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>  date de naissence *</label>
                            <div className="form-group">
                                <DatePicker
                                    className="form-control"
                                    // showTimeSelect
                                    showTimeInput
                                    selected={date_naissence}
                                    onChange={e => this.onChangeData('date_naissence', e)}
                                    filterDate={isWeekday}          // disable weekend
                                    timeIntervals={15}              // time range around 15 min
                                    //showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>date d'emboche *</label>
                            <div className="form-group">
                                <DatePicker
                                    className="form-control"
                                    showTimeSelect
                                    showTimeInput
                                    selected={date_emboche}
                                    onChange={e => this.onChangeData('date_emboche', e)}
                                    filterDate={isWeekday}          // disable weekend
                                    timeIntervals={15}              // time range around 15 min
                                    showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select className="form-control"
                                value={gender}
                                onChange={e => {
                                    this.onChangeData('gender', e.target.value)
                                    
                                    }} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Service *</label>
                            <select className="form-control"
                                value={serviceDepartment.id}
                                onChange={e => {
                                    // this.onChangeData('serviceDepartment1', e.target.value)
                                
                                this.setState({ serviceDepartment: {id: e.target.value} });
                                }} >
                                    <option >selctionner une service</option>

                                {this.state.services.map(service =>
                                    <option key={service.id} value={service.id}>{service.id}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Fonction *</label>
                            <select className="form-control"
                                value={fonction.id}
                                 onChange={e => {
                                    // this.onChangeData('fonction1', e.target.value)
                                    this.setState({ fonction: {id: e.target.value} });

                                }} >
                                    <option >selctionner une fonction</option>


                                {this.state.fonctions.map(fonction =>
 
                                    <option key={fonction.id} value={fonction.id}>{fonction.id}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>City *</label>
                            <select className="form-control"
                                value={city}
                                onChange={e => this.onChangeData('city', e.target.value)} >
                                {this.state.cities.map(city =>
                                    <option key={city} value={city}>{city}</option>
                                )}
                            </select>
                        </div>

                        <button className="btn btn-success" type="button" onClick={this.saveEmployee}>Save</button>
                    </form>
                </div>
                <div className="col"></div>
                <div className="col-lg-3">
                    <img style={{ height: 200 }} src={require('../../Assets/img/add_data.webp')} alt="" />
                </div>
                <div className="col-sm-12">
                    <hr />
                    <hr />
                    <hr />
                </div>
            </div>
        );
    }
}

export default AddEmployeeComponent;