import React, { Component } from 'react'
import FonctionService from '../../services/FonctionService'
//import Moment from 'react-moment';
 import FonctionDetail from '../BasicComponent/FonctionDetail';
import "@material/react-checkbox/dist/checkbox.css";
import AlertifyService from '../../services/AlertifyService';
 



export default class ViewFonctionComponent extends Component {

    constructor(props) {
        super(props)

         this.state = {
            id: props.match.params.fonctionid,
          
            nom: null,
            code: null,
            // id: null, 
            errorMessage: ""
        }
        // this.loadFonctionDetail();
        this.loadFonctionDetail = this.loadFonctionDetail.bind(this);
    }
    componentDidMount() {
        this.loadFonctionDetail();
    }

    loadFonctionDetail() {
        FonctionService.getFonction(this.state.id).then(res => {
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
        this.props.history.push('/fonctions'); 
    }  
    render() {

        return (
            <div className="row">
                <div className="col-sm-12">
                    <h1>Fonction Details</h1>
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
                                onClick={() => this.props.history.push('/add-fonction')} >
                                Add Fonction </button>
                            <hr />
                        </div>
                        
                        <div className="col-lg-6">
                            <FonctionDetail
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
