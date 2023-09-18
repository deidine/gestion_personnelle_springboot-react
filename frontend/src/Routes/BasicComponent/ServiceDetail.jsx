import React, { Component } from 'react'
import Moment from 'react-moment'
import { withRouter } from 'react-router'

class ServiceDetail extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.openReceipeForm = this.openReceipeForm.bind(this);
    }

    openReceipeForm(employeeId, Serviceid){
        window.localStorage.setItem("employeeId", employeeId);
        window.localStorage.setItem("ServiceId", Serviceid);
        this.props.history.push('/Service/receipe-form');
    }
    render() {
        return (
            <div>
                <div className="card" >
                    <div className="card-header"><h3> Service Detail</h3> </div>
                    <ul className="text-left list-group list-group-flush">
                        <li className="list-group-item"><b>Service nom : </b>{this.props.nom}</li>
                        <li className="list-group-item"><b>Service code : </b>{this.props.code}</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(ServiceDetail)