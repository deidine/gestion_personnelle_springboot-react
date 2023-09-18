import React, { Component } from 'react'
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';

import FonctionService from '../../services/FonctionService';
import AlertifyService from '../../services/AlertifyService';
import { withRouter } from 'react-router';
import FonctionDetailModal from '../BasicComponent/FonctionDetailModal';

let filterAllFonction;
const items = [
    'nom',
    'code'
];
let filterArray = []
let checked = {
    nom: false,
    code: false
}
let filterAllFonctions

class FonctionsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fonctions: [],
            filters: [],
            fonction: {},

        }
        this.getAllFonctions = this.getAllFonctions.bind(this);
    }
    componentDidMount() {
        this.getAllFonctions();
    }
    getAllFonctions() {
        FonctionService.getAllFonction().then(res => {
            filterAllFonction = res.data
            this.setState({ fonctions: res.data });
        });
    }

    onChangeSearchByName = (e) => {
        this.filterFunctions(e.target.value);
    }
    filterFunctions = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllFonction.filter(fonction => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        let control = fonction[filter.toLowerCase()].toLowerCase().indexOf(value.toLowerCase());
                        if (control > -1) find = true;
                    });
                    return find;
                });
                this.setState({ fonctions: results });
            }
            else { this.getAllFonctions(); }
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
    deleteFonction(id) {
        alertify.confirm("Are you sure to delete the Fonction.",
            ok => {
                FonctionService.delete(id).then(res => {
                    //this.setState({ Fonctions: this.state.Fonctions.filter(p => p.id !== id) });
                    AlertifyService.successMessage('Deleting is ok : ');
                    this.getAllFonctions();
                });
            },
            cancel => { AlertifyService.errorMessage('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    viewFonction(id) {
        window.localStorage.setItem("id", id);
        this.props.history.push('/fonction/' + id);
    }
    viewQuickly(fonction) {
        this.setState({ fonction: fonction });
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
    addFonction() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/add-fonction');
    }
    back() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/');
    }

    render() {
        let fonctions = this.state.fonctions;
        return (
            <div className="row">
                <p className="h3 d-flex justify-content-center">Fonctions</p>
                <div className="col-lg-12">
                    <button
                        className="btn btn-warning"
                        onClick={() => this.addFonction()}>
                        Add Fonction
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
                            placeholder="Search Fonction by choosing any parameter"
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
                                <th>Fonction Nom </th>
                                <th>Fonction Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fonctions.map(fonction =>

                                <tr className="bg-default" key={fonction.id}>
                                    <td>{fonction.nom}</td>

                                    <td>{fonction.code}</td>

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
                                                    onClick={() => this.viewFonction(fonction.id)} >
                                                    View </button>
                                                <div className="dropdown-divider"></div>
                                                <button
                                                    className="dropdown-item"
                                                    data-toggle="modal" data-target="#fonctionModal"
                                                    onClick={() => this.viewQuickly(fonction)} >
                                                    View Quickly </button>
                                                <div className="dropdown-divider"></div>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => this.deleteFonction(fonction.id)} >
                                                    Delete </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <FonctionDetailModal fonction={this.state.fonction} />
                    <hr />
                    <hr />
                    <hr />
                </div>
            </div> 
        )
    }
}
export default withRouter(FonctionsComponent);