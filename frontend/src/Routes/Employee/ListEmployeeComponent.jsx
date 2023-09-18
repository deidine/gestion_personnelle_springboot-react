import React, { Component } from 'react'
import EmployeeService from '../../services/EmployeeService';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import "../../Assets/css/ListEmployeeComponent.css"
// import Modal from 'react-modal'; 
import * as alertify from 'alertifyjs';

import Moment from 'react-moment';
import EmployeeDetailModal from '../BasicComponent/EmployeeDetailModal';

const items = [
    'nom',
    'prenom',
    'Email',
    'City'
];
let filterArray = []
let checked = {
    nom: false,
    prenom: false,
    email: false,
    city: false
}
let filterAllEmployees
class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            message: null,
            indeterminate: false,
            filters: [],
            employee: {}
        }
        this.reloadEmployeeList = this.reloadEmployeeList.bind(this);
    }
    componentDidMount() {
        this.reloadEmployeeList();
    }

    reloadEmployeeList() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data })
            filterAllEmployees = res.data
        });
    }
    deleteEmployee(id) {
        alertify.confirm(
            "Are you sure to delete this Employee.",
            ok => {
                EmployeeService.deleteEmployee(id).then(res => {
                    this.setState({ message: 'User deleted successfully. ' + res });
                    this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
                });
                alertify.success('to delete Employee is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    editEmployee(id) {
        alertify.confirm(
            "Are you sure to edit this Employee.",
            ok => {
                window.localStorage.setItem("employeeId", id);
                this.props.history.push('/edit-employee');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    viewEmployee(id) {
        window.localStorage.setItem("employeeId", id);
        this.props.history.push('/view-employee/' + id);
    }
    addEmployee() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/add-employee');
    }
    onChangeSearchByName = (e) => {
        this.filterEmployees(e.target.value);
    }
    filterEmployees = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllEmployees.filter(employee => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        let control = employee[filter.toLowerCase()].toLowerCase().indexOf(value.toLowerCase());
                        if (control > -1) find = true;
                    });
                    return find;
                });
                this.setState({ employees: results });
            }
            else { this.reloadEmployeeList(); }
        } else {
            alertify.set('notifier', 'delay', 2);
            //alertify.set('notifier','position', 'top-center');
            alertify.error('Please select any parameters');
        }
    }
    createCheckboxes = () => (items.map((item) => this.createCheckbox(item)))
    createCheckbox = label => (
        <div className="float-left" style={{ margin: "0 25px 0 0" }} key={label} >
            <Checkbox
                nativeControlId='my-checkbox'
                checked={checked[label]}
                onChange={(e) => { this.changeStateForChecked(e, label); }}
            />
            <label className="checkbox-label" ><b>{label}</b></label>
        </div>
    )
    changeStateForChecked = (e, label) => {
        checked[label] = e.target.checked;
        var index = filterArray.indexOf(label);
        if (checked[label]) {
            if (index === -1) { filterArray.push(label); }
        } else {
            if (index !== -1) { filterArray.splice(index, 1); }
        }
    }
    viewEmployeeQuickly(employee) {
        this.setState({ employee });
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <button
                        className="btn btn-warning"
                        onClick={() => this.addEmployee()}>
                        Add Employee
                    </button>
                    <hr />
                </div>
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Employee by choosing any parameter"
                            name="searchByName"
                            className="form-control"
                            onChange={this.onChangeSearchByName} />
                    </div>
                    <hr />
                </div>
                <div className="col-lg-6"> {this.createCheckboxes()} </div>
                <div className="col-lg-12">
                    <div className="table-responsive-lg">
                        <table className="table table-bordered table-sm table-dark table-hover" style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>matricule</th>
                                    <th>nom complete</th>
                                    {/* <th>fonction</th> */}
                                    <th>range</th>
                                    <th>Email et telephone</th>
                                    <th>date d'emboche</th>
                                    <th>City</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.employees.map(employee =>
                                    <tr className={employee.gender === "Male" ? "bg-default" : "bg-danger"} key={employee.id}>
                                        <td>{employee.matricule}</td>
                                        <td>{employee.nom} {employee.prenom}</td>
                                        {/* <td>  {employee.fonction}</td> */}
                                        <td>{employee.range}</td>
                                        <td>{employee.email} {employee.phoneNo}</td>
                                        <td>
                                            {employee.date_emboche !== null ?
                                                <Moment format="YYYY/MM/DD HH:mm">
                                                    {employee.date_emboche}
                                                </Moment>
                                                : null}
                                        </td>
                                        <td>{employee.city}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button id="btnGroupDrop1"
                                                    type="button"
                                                    className="btn btn-secondary btn-sm dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"> Actions </button>
                                                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.viewEmployee(employee.id)} >  View </button>
                                                    <div className="dropdown-divider"></div>
                                                    <button
                                                        className="dropdown-item"
                                                        data-toggle="modal" data-target="#employeeModal"
                                                        onClick={() => this.viewEmployeeQuickly(employee)} >  View Quickly </button>
                                                    <div className="dropdown-divider"></div>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.editEmployee(employee.id)} > Edit</button>
                                                    <div className="dropdown-divider"></div>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.deleteEmployee(employee.id)}> Delete </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <EmployeeDetailModal employee={this.state.employee} />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>
            </div>
        );
    }

}

export default ListEmployeeComponent;