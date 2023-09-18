import React, { Component } from 'react'
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import { ACCESS_TOKEN } from '../../../constants/constants';
import tokenStorage from '../../../services/token-storage';
import AuthService from '../../../services/AuthService';
import tresore  from '../../../Assets/img/tresore.jpeg';
 
import { withRouter } from 'react-router';
import Moment from 'react-moment';

class Profile extends Component {
    constructor(props) {
         super(props)
        this.state = { 
            id: props.id,
            date_naissence: props.date_naissence,
            nom: props.nom,
            date_emboche: props.date_emboche,
            prenom: props.prenom,
            fonction: props.fonction,
            phoneNo: props.phoneNo,
            email: props.email,
            date: props.bornDate, 
            gender: props.gender,
            city: props.city, 
        };
        // props.array.map(a => {
        //     console.log(a + ' : ' + props[a] + ' : ' + (typeof props[a]))
        // })
    }
    
    componentDidMount() {
        // this.loadUser(); 
    }
    
     
    viewProblem(problemid) { 
        this.props.history.push('/problem/' + problemid);
    }
    viewProblemForm(Userid){ 
        window.localStorage.setItem("UserId", Userid);
        this.props.history.push('/add-problem'); 
    } 
    back(){
        this.props.history.push('/Users'); 
    }
    editUser(id) {
        alertify.confirm(
            "Are you sure to edit this User.",
            ok => {
                window.localStorage.setItem("UserId", id);
                this.props.history.push('/edit-User');
            },
            cancel => {
                alertify.error('Cancel');
            }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    deleteUser(Userid) {
        alertify.confirm("Are you sure to delete this User.",
            function () {
                AuthService.deleteUser(Userid)
                    .then(res => {
                        window.location.href = '/Users';
                        alertify.success("Deleting is ok ");
                    })
            },
            function () {
                alertify.error('Cancel');
            }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    render() {
        var email=window.localStorage.getItem("currentUserEmail");
        var role=window.localStorage.getItem("currentUserRole");
        var username=window.localStorage.getItem("currentUserName");
        var id=window.localStorage.getItem("currentUserId");
        
        return (
            <div>
                <div className="card" >
                    <div className="card-header"> <h3> User Detail</h3>  </div>
                    <ul className="text-left list-group list-group-flush">
                        <li className="list-group-item"><b>User id : </b> {  id.replace(/['\"]+/g, "") }</li>
                        <li className="list-group-item"><b>Name : </b> {username.replace(/['\"]+/g, "")}</li>
                    
                        <li className="list-group-item"><b>Email : </b> {email.replace(/['\"]+/g, "")}</li>
                        <li className="list-group-item"><b>role  : </b> {role.replace(/['\"]+/g, "")}</li>
                         {this.props.showButtons?
                        <li className="list-group-item">
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => this.editUser(this.props.id)} >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => this.deleteUser(this.props.id)}>
                                Delete 
                            </button>
                        </li>
                         : null}
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(Profile)
