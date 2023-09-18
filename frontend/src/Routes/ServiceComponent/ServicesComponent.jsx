import React, { Component } from 'react'
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';

import ServiceService from '../../services/ServiceService';
import AlertifyService from '../../services/AlertifyService';
import { withRouter } from 'react-router';
import ServiceDetailModal from '../BasicComponent/ServiceDetailModal';

let filterAllService;
const items = [
    'nom',
    'code'
];
let filterArray = []
let checked = {
    nom: false,
    code: false
}
let filterAllServices

class ServicesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            filters: [],
            service: {},

        }
        this.getAllServices = this.getAllServices.bind(this);
    }
    componentDidMount() {
        this.getAllServices();
    }
    getAllServices() {
        ServiceService.getAllService().then(res => {
            filterAllService = res.data
            this.setState({ services: res.data });
        });
    }

    onChangeSearchByName = (e) => {
        this.filterFunctions(e.target.value);
    }
    filterFunctions = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllService.filter(service => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        let control = service[filter.toLowerCase()].toLowerCase().indexOf(value.toLowerCase());
                        if (control > -1) find = true;
                    });
                    return find;
                });
                this.setState({ services: results });
            }
            else { this.getAllServices(); }
        } else {
            alertify.set('notifier', 'delay', 2);
            //alertify.set('notifier','position', 'top-center');
            alertify.error('Please select any parameters');
        }
    }
    changeStateForChecked = (e, label) => {
        checked[label] = e.target.checked;
        var index = filterArray.indexOf(label);
        if (checked[label]) {
            if (index === -1) { filterArray.push(label); }
        } else {
            if (index !== -1) { filterArray.splice(index, 1); }
        }
    }
 
    limitingPatientDetail(data) {
        if (data.length < 31) return data;
        else return data.substr(0, 30) + "...";
    }
    deleteService(id) {
        alertify.confirm("Are you sure to delete the Service.",
            ok => {
                ServiceService.delete(id).then(res => {
                    //this.setState({ Services: this.state.Services.filter(p => p.id !== id) });
                    AlertifyService.successMessage('Deleting is ok : ');
                    this.getAllServices();
                });
            },
            cancel => { AlertifyService.errorMessage('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    viewService(id) {
        window.localStorage.setItem("id", id);
        this.props.history.push('/service/' + id);
    }
    viewQuickly(service) {
        this.setState({ service: service });
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
    addService() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/add-service');
    }
    back() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/');
    }

    render() {
        let services = this.state.services;
        return (
            <div className="row">
                <p className="h3 d-flex justify-content-center">Services</p>
                <div className="col-lg-12">
                    <button
                        className="btn btn-warning"
                        onClick={() => this.addService()}>
                        Add Service
                    </button>

                    <button
                                className="btn btn-danger ml-1"
                                onClick={() => this.back()}>
                                Back </button>
                    <hr />
                </div>
                <hr />
                <hr />
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Service by choosing any parameter"
                            name="searchByName"
                            className="form-control"
                            onChange={this.onChangeSearchByName} />
                    </div>
                    <hr />
                </div>
                <div className="col-lg-6"> {this.createCheckboxes()} </div>
                <hr />
                <div className="table-responsive">
                    <table className="table table-bordered table-sm table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Service Nom </th>
                                <th>Service Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service =>

                                <tr className="bg-default" key={service.id}>
                                    <td>{service.nom}</td>

                                    <td>{service.code}</td>

                                    <td>
                                        <div className="btn-group" role="group">
                                            <button id="btnGroupDrop1"
                                                type="button"
                                                className="btn btn-sm btn-secondary dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"> Actions </button>

                                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => this.viewService(service.id)} >
                                                    View </button>
                                                <div className="dropdown-divider"></div>
                                                <button
                                                    className="dropdown-item"
                                                    data-toggle="modal" data-target="#ServiceModal"
                                                    onClick={() => this.viewQuickly(service)} >
                                                    View Quickly </button>
                                                <div className="dropdown-divider"></div>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => this.deleteService(service.id)} >
                                                    Delete </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <ServiceDetailModal service={this.state.service} />
                    <hr />
                    <hr />
                    <hr />
                </div>
            </div> 
        )
    }
}
export default withRouter(ServicesComponent);