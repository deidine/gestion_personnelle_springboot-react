import React, { Component } from 'react'
import Moment from 'react-moment'
import { withRouter } from 'react-router'

class FonctionDetailModal extends Component {

    constructor(props) {
        super(props)
        this.state = {

        } 
    }
 
    render() {
        return (
            <div className="modal fade" id="fonctionModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Fonction Detail</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="card" >
                                    <div className="card-header"><h3> Fonction Detail</h3> </div>
                                    <ul className="text-left list-group list-group-flush">
                                        <li className="list-group-item"><b>Fonction Name : </b>{this.props.fonction.nom}</li>
                                        <li className="list-group-item"><b>Fonction code : </b>{this.props.fonction.code}</li>
                                    
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
export default withRouter(FonctionDetailModal)