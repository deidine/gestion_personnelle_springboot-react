import React, { Component } from 'react'
import EmployeeService from '../../services/EmployeeService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";

export default class EditEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            matricule: '',
            nom: '',
            id: '',
            date_naissence: null,
            range: '',
            date_emboche: null,
            grade: '',
            fonction: '',
            prenom: '',
            email: '',
            phoneNo: '',
            gender: 'Male',
            city: 'Adrar',
            cities: []

        }
        this.loadEmployee();
        this.loadEmployee = this.loadEmployee.bind(this);
        this.getAllCities();
    }
    getAllCities() {
        EmployeeService.getCities().then(res => {
            this.setState({ cities: res.data });
        });
    }
    componentDidMount() {
        this.loadEmployee();
        this.getAllCities();
    }

    loadEmployee() {
        EmployeeService.getEmployeeById(window.localStorage.getItem("employeeId")).then((res) => {
            let p = res.data;
            this.setState({
                id: p.id,
                nom: p.nom,
                prenom: p.prenom,
                email: p.email,
                phoneNo: p.phoneNo,
                date_naissence: p.date_naissence,
                date_emboche: p.date_emboche,
                range: p.range,
                fonction: p.fonction,
                grade: p.grade,
                gender: p.gender,
                city: p.city,
            });
        });
    }
    editEmployee = (e) => {
        e.preventDefault();
        let employee = this.state;
        employee['employeeid'] = window.localStorage.getItem("employeeId");
        EmployeeService.editEmployee(employee).then(res => {
            this.props.history.push('/employees');
            alertify.success("Updated Employee is ok");
        });
    }
    onChangeData(type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({ stateData });
    }
    render() {
        let bornDate = null;

        if (this.state.date_naissence !== null)
            bornDate = new Date(this.state.date_naissence.toString());
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        let EmbochDate = null;

        if (this.state.date_emboche !== null)
        EmbochDate = new Date(this.state.date_emboche.toString());
        const isWeekday2 = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        let { nom, grade, fonction, date_emboche, date_naissence, prenom, phoneNo, email, matricule, range, gender, city } = this.state;
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
                            <label>fonction *</label>
                            <input placeholder="fonction" name="fonction" className="form-control" value={fonction} onChange={e => this.onChangeData('fonction', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input placeholder="Email" name="email" className="form-control" value={email} onChange={e => this.onChangeData('email', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>  date de naissence *</label>
                            {EmbochDate !== null ?
                                <div className="form-group">
                                    <DatePicker
                                        className="form-control"
                                        // showTimeSelect
                                        showTimeInput
                                        selected={EmbochDate}
                                        onChange={e => this.onChangeData('EmbochDate', e)}
                                        filterDate={isWeekday2}          // disable weekend
                                        timeIntervals={15}              // time range around 15 min
                                        //showWeekNumbers               // show week number
                                        timeFormat="HH:mm"              // show time format
                                        dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                    />
                                </div>
                                :
                                null

                            }
                        </div>


                        <div className="form-group">
                            <label>date d'emboche *</label>
                            {bornDate !== null ?
                                <div className="form-group">
                                    <DatePicker
                                        className="form-control"
                                        // showTimeSelect
                                        showTimeInput
                                        selected={bornDate}
                                        onChange={e => this.onChangeData('bornDate', e)}
                                        filterDate={isWeekday}          // disable weekend
                                        timeIntervals={15}              // time range around 15 min
                                        //showWeekNumbers               // show week number
                                        timeFormat="HH:mm"              // show time format
                                        dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                    />
                                </div>
                                :
                                null

                            }
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select className="form-control"
                                value={gender}
                                onChange={e => this.onChangeData('gender', e.target.value)} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
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
  <button className="btn btn-success" onClick={this.editEmployee}>Update</button>
                     </form>
                </div>
                <div className="col"></div>
                <div className="col-lg-3">
                    <img style={{ height: 200 }} src="https://i1.wp.com/www.nosinmiubuntu.com/wp-content/uploads/2013/02/New-Database.png?w=770" alt="" />
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