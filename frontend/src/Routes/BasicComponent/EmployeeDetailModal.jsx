import React, { Component } from 'react' 
import { withRouter } from 'react-router';
import Moment from 'react-moment';

class EmployeeDetailModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:  props.employee.id,
            matricule:props.employee.matricule,
            date_naissence: props.employee.date_naissence,
            nom: props.employee.nom,
            date_emboche: props.employee.date_emboche,
            prenom: props.employee.prenom,
            fonction: props.employee.fonction,
            phoneNo: props.employee.phoneNo,
            email: props.employee.email,
            date: props.employee.bornDate, 
            gender: props.employee.gender,
            city: props.employee.city, 
        
             
            message: ''
        }; 
    } 
    render() {
        var age = null;
        if (this.props.employee.date_naissence != null) {
            var born = Number(this.props.employee.date_naissence.substr(0, 4));
            var now = Number(new Date().toLocaleDateString('tr-TR').substr(6, 4));
            age = now - born;
        }
        return (
            <div className="modal fade" id="employeeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Employee Detail</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="card" >
                                    <div className="card-header"> <h3>{this.props.employee.nom} {this.props.employee.prenom}</h3></div>
                                    <ul className="text-left list-group list-group-flush">
                                        <li className="list-group-item"><b>Employee id : </b>{this.props.employee.id}</li>
                                        <li className="list-group-item"><b>matricule : </b>{this.props.employee.matricule}</li>
                                        <li className="list-group-item"><b>nom : </b>{this.props.employee.nom}</li>
                                        <li className="list-group-item"><b>prenom : </b>{this.props.employee.prenom}</li>
                                        <li className="list-group-item"><b>Phne No : </b>{this.props.employee.phoneNo}</li>
                                        <li className="list-group-item"><b>Age : </b>
                                            {age !== null ? age : null}
                                        </li>
                                        <li className="list-group-item"><b>date_naissence : </b>
                                            {this.props.employee.date_naissence !== null ?
                                                <Moment format="YYYY / MM / DD  HH:mm"> {this.props.employee.date_naissence} </Moment> : null
                                            }
                                        </li>
                                        <li className="list-group-item"><b>date_emboche : </b>
                                            {this.props.employee.date_emboche !== null ?
                                                <Moment format="YYYY / MM / DD  HH:mm"> {this.props.employee.date_emboche} </Moment> : null
                                            }
                                        </li>
                                        
                                        <li className="list-group-item"><b>Email : </b>{this.props.employee.email}</li>
                                        <li className="list-group-item"><b>City : </b>{this.props.employee.city}</li>
                                        <li className="list-group-item"><b>Gender : </b>{this.props.employee.gender}</li>
                                        <li className="list-group-item"><b>fonction : </b>{this.props.employee.fonction}</li>
                                        <li className="list-group-item"><b>grade : </b>{this.props.employee.grade}</li>
                                        <li className="list-group-item"><b>range : </b>{this.props.employee.range}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(EmployeeDetailModal)
