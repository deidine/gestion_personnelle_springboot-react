import React, { Component } from 'react'
import Moment from 'react-moment'
import { withRouter } from 'react-router'

class ServiceDetailModal extends Component {

    constructor(props) {
        super(props)
        this.state = {

        } 
    }
 
    render() {
        return (
            <div className="modal fade" id="ServiceModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Service Detail</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="card" >
                                    <div className="card-header"><h3> Service Detail</h3> </div>
                                    <ul className="text-left list-group list-group-flush">
                                        <li className="list-group-item"><b>Service Name : </b>{this.props.service.nom}</li>
                                        <li className="list-group-item"><b>Service code : </b>{this.props.service.code}</li>
                                    
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
export default withRouter(ServiceDetailModal)