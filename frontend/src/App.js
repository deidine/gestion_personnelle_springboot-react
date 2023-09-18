import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom"; //Router,
import ListEmployeeComponent from './Routes/Employee/ListEmployeeComponent';
import ViewEmployeeComponent from './Routes/Employee/ViewEmployeeComponent';
import AddEmployeeComponent from './Routes/Employee/AddEmployeeComponent';
import EditEmployeeComponent from './Routes/Employee/EditEmployeeComponent';
import NotFoundComponent from './NotFound/NotFoundComponent';
import ViewServiceComponent from './Routes/ServiceComponent/ViewServiceComponent';
import ViewFonctionComponent from './Routes/FonctionComponent/ViewFonctionComponent';
import SigninFormComponent from './Routes/auth/signin/SigninFormComponent';
import Profile from './Routes/auth/profile/Profile';
import SignupFormComponent from './Routes/auth/signup/SignupFormComponent';
import { Lines } from 'react-preloaders';
// import ReceipeFormComponent from './Routes/Employee/ReceipeComponent/ReceipeFormComponent';
import NavbarComponent from './Navbar/NavbarComponent';
import ServiceFormComponent from './Routes/ServiceComponent/ServiceFormComponent';
import ServicesComponent from './Routes/ServiceComponent/ServicesComponent';
import FonctionFormComponent from './Routes/FonctionComponent/FonctionFormComponent';
import FonctionsComponent from './Routes/FonctionComponent/FonctionsComponent';
// https://www.youtube.com/watch?v=DQ93TxqKkWo
import tresore  from './Assets/img/tresore.jpeg';

function App() {
  return (            
    <div className="App" >
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
          <NavbarComponent />
          <a href="/">
            {/* style={{width: 400, height: 100}}  */}
            <img style={{ height: "100px", margin: "10px 0"}}  
          src={tresore} alt="" />
          </a>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={ListEmployeeComponent} />
                <Route path="/employees" component={ListEmployeeComponent} />
                <Route path="/view-employee/:employeeid" component={ViewEmployeeComponent} />
                <Route path="/add-employee" component={AddEmployeeComponent} />
                <Route path="/edit-employee" component={EditEmployeeComponent} />
                <Route path="/add-fonction" component={FonctionFormComponent} />
                <Route path="/fonctions" component={FonctionsComponent} />
                <Route path="/fonction/:fonctionid" component={ViewFonctionComponent} />
                <Route path="/add-service" component={ServiceFormComponent} />
                <Route path="/services" component={ServicesComponent} />
                <Route path="/service/:serviceid" component={ViewServiceComponent} />
                 <Route path="/notfound" component={NotFoundComponent} />
                <Route path="/login" component={SigninFormComponent} />
                <Route path="/registeration" component={SignupFormComponent} /> 
                <Route path="/profile" component={Profile} />
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
      {/* <Lines /> */}
      {/* <Lines animation="slide-left" />; */}
      
      <Lines animation="slide" />

      {/* <Lines animation="slide-down" />; */}

      {/* <Lines animation="slide-right" />; */}
    </div>
  );
}

export default App;