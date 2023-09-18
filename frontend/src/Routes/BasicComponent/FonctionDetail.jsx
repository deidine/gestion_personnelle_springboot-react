import React, { Component } from 'react'
import Moment from 'react-moment'
import { withRouter } from 'react-router'

class FonctionDetail extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.openReceipeForm = this.openReceipeForm.bind(this);
    }

    openReceipeForm(employeeId, fonctionid){
        window.localStorage.setItem("employeeId", employeeId);
        window.localStorage.setItem("fonctionId", fonctionid);
        this.props.history.push('/fonction/receipe-form');
    }
    render() {
        return (
            <div>
                <div className="card" >
                    <div className="card-header"><h3> Fonction Detail</h3> </div>
                    <ul className="text-left list-group list-group-flush">
                        <li className="list-group-item"><b>Fonction nom : </b>{this.props.nom}</li>
                        <li className="list-group-item"><b>Fonction code : </b>{this.props.code}</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(FonctionDetail)