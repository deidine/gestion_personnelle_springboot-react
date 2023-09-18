import React, { Component } from 'react'
import EmployeeService from '../../services/EmployeeService'; 
import EmployeeDetail from '../BasicComponent/EmployeeDetail';
import AlertifyService from '../../services/AlertifyService';
// import ProblemsComponent from './ProblemComponent/ProblemsComponent';
import tresore  from '../../Assets/img/tresore.webp';
 
export default class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
            id: props.match.params.employeeid,
            matricule:'',
            nom: '',
            date_naissence: null,
            range: '',
            date_emboche: null,
            grade: '',
            fonction: '',
            prenom: '',
            email: '',
            phoneNo: '',
            gender: '',
            city: '',
            cities: [],       
            employee: null,
        
            problems: [],  
            message: null 
        }
        this.loadEmployee = this.loadEmployee.bind(this); 
    }

    componentDidMount() {
        this.loadEmployee(); 
    }
    
    loadEmployee() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            let p = res.data;
            this.setState({ employee: p });
            this.setState({
                employeeid: p.id,
                problems: p.problems
            }); 
        }).catch((error) => {
            if (error.response) {
                // AlertifyService.alert(error.response.data.message);
                // this.props.history.push('/employees');
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
    } 
    viewProblem(problemid) { 
        this.props.history.push('/problem/' + problemid);
    }
    viewProblemForm(Employeeid){ 
        window.localStorage.setItem("employeeId", Employeeid);
        this.props.history.push('/add-problem'); 
    } 
    back(){
        this.props.history.push('/employees'); 
    } 
    render() { 
        let employee = this.state.employee; 
        return (
            <div className="row">
                {/* Show and close modal */}
                <div className="col-lg-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <button
                        type="button"
                        className="btn btn-warning ml-1"
                        onClick={() => this.viewProblemForm(employee.id)}
                        data-whatever="@getbootstrap">Add Problem</button>
 
                    <hr />
                </div>
                {/* Employee Details */}
                <div className="col-lg-7">
                    {employee != null ?
                        <EmployeeDetail
                            id={employee.id}
                            nom={employee.nom}
                            prenom={employee.prenom}
                            phoneNo={employee.phoneNo}
                            email={employee.email}
                            city={employee.city}
                            date_naissence={employee.date_naissence}
                            gender={employee.gender}
                            showButtons={true}
                            // array={['Employeeid','name','lastname','email','city','bornDate','gender']}
                        />
                        : null}
                </div> 
                <div className="col"></div>
                <div className="col-lg-4">
                <img src={tresore} className="img-fluid" style={{ borderRadius: " 1rem 0 0 1rem;" }} alt="login form" />

                    {/* <img style={{ height: 300 }} src="https://cdn4.iconfinder.com/data/icons/business-colored-vol-1/100/business-colored-7-05-512.png" alt="" /> */}
                </div> 
                <div className="col-lg-12">
                        {/* <ProblemsComponent   Employeeid={this.state.Employeeid}/> */}
                </div> 
            </div>
        )
    }
}