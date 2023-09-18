import React, { Component } from 'react'
import ServiceService from '../../services/ServiceService'
//import Moment from 'react-moment';
 import ServiceDetail from '../BasicComponent/ServiceDetail';
import "@material/react-checkbox/dist/checkbox.css";
import AlertifyService from '../../services/AlertifyService';
 



export default class ViewServiceComponent extends Component {

    constructor(props) {
        super(props)

         this.state = {
            id: props.match.params.serviceid,
          
            nom: null,
            code: null,
            // id: null, 
            errorMessage: ""
        }
        // this.loadServiceDetail();
        this.loadServiceDetail = this.loadServiceDetail.bind(this);
    }
    componentDidMount() {
        this.loadServiceDetail();
    }

    loadServiceDetail() {
        ServiceService.getService(this.state.id).then(res => {
            let p = res.data;
            this.setState({
          
                nom:p.nom,
                code:p.code
            });
        }).catch((error) => {
            // Error
            if (error.response) {
                this.setState({ errorMessage: error.response.data.message, id: null });
                AlertifyService.alert(error.response.data.message);
                
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
        });
    }
    back(){
        this.props.history.push('/Services'); 
    }  
    render() {

        return (
            <div className="row">
                <div className="col-sm-12">
                    <h1>Service Details</h1>
                    <hr />
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <button
                                className="btn btn-danger"
                                onClick={() => this.back()}>
                                Back </button>
                            <button
                                className="btn btn-warning ml-1"
                                onClick={() => this.props.history.push('/add-Service')} >
                                Add Service </button>
                            <hr />
                        </div>
                        
                        <div className="col-lg-6">
                            <ServiceDetail
                                id={this.state.id}
                                nom={this.state.nom}
                                code={this.state.code}
                                creationDate={this.state.creationDate}
                             />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    {/* <ReceipesComponent  id={this.state.id} /> */}
                </div>
            </div>
        )
    }
}
