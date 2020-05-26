import React from 'react';
import './register.css';
import {Container, Row} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import Header from '../../components/Header/header.js';

/*
  LOGGIN PAGE

*/


export default class Login extends React.Component {

    constructor() {
	super();

	this.state = {
	    username: null,
	    password: null,
	    repeat_password: null,
	    response: {
		success: null,
		mess: null
	    }
	};
	
	this.handleSubmit = this.handleSubmit.bind(this);

	this.handleUsernameChange = this.handleUsernameChange.bind(this);
	this.handlePasswordChange = this.handlePasswordChange.bind(this);

	this.toast = this.toast.bind(this);
    }


     handleUsernameChange = (e) => {
	 const bio = e.target.value;
	 this.setState({
	     username: bio
	 });
     };


    handlePasswordChange = (e) => {
	 const bio = e.target.value;
	 this.setState({
	     password: bio
	 });
    };

    /*
      DISPLAY ALERT FOR USER INPUT
     */
    toast = () =>  {
	switch (this.state.response.success){
	case true:
		return (		
			<Redirect to={{
			    pathname: '/',
			    state: {
				loggin: "just-loggin",
				username: this.state.username
			    }
			}} />
		);
	case false:
	    return (
		 <div className="alert alert-danger"  role="alert">
		      <p>
			<strong>
			  Cannot loggin 
			</strong>
			{' '}
			{this.state.response.mess}
		      </p>
		 </div>
	    );
	default:
	    // Return nothing
	    return (
		<div>
		</div>
	    );
	}
    }
    
    async handleSubmit(event) {
	event.preventDefault();
 
	const data = {
	    username: this.state.username,
	    password: this.state.password
	};
	
	const requestOptions = {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(data)
	};
	    
	try{
	    const response = await window.fetch('/login', requestOptions);

	    // From Response make a json object
	    let json = await response.json();
	    
	    // Change state
	    this.setState({
		response : json
	    });
	    console.log("Finish login");
	    json.extra = "Confirmed";
	    console.log(json);
	    // Checking if response is success: Login is ok, save the token
	    if (json.success != null && json.success === true){
		console.log("Success");
		if ( typeof(window.Storage) !== 'undefined') {
		    // Khởi tạo sesionStorage
		    window.sessionStorage.setItem('tih-jsonwebtoken', json.token);
		    console.log("Success Save token to sessionStorage");

		} else {
		    alert('Trình duyệt của bạn không hỗ trợ!');
}
	    } else {
		console.log("erro");
	    }
	    //console.log(json);	    
	}catch(err){
	    this.setState({
		response : {
		    success: false,
		    mess: "Input Wrong or Sever Disconnection"
		}
	    });
	    console.log(err);
	}
	
    
	
	// window.alert("Username" + this.state.username + " Password: " + this.state.password );	
    }
    
    
    render(){
	return(
	    <div>
	      <Header/>
	      
	      {this.toast()}

	      
	      <Container className="loggin-banner">
		<Row>
		  <Container>
		    <h1>
		      Please enter username and password 
		    </h1>
		    
		  </Container>
		</Row>

		<form onSubmit={this.handleSubmit}>
		  <div className="form-group">
		    <label>Username</label>
		    <input className="form-control" placeholder="Enter username" onChange={this.handleUsernameChange} />
		  </div>
		  
		  <div className="form-group">
		    <label>Password</label>
		    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handlePasswordChange} />
		  </div>
				 
		  
		  <button type="submit" className="btn btn-outline-light btn-block">
		    <strong>
		      Submit
		  </strong>		    
		</button>				  
		</form>
	      </Container>			      
	    </div>		    
	);
	
    }
    
}
