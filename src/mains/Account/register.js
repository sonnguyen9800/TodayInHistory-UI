import React from 'react';
import './register.css';
import {Container, Row } from 'react-bootstrap';
import Header from '../../components/Header/header.js';

/*
  COMPONENT FOR REGISTER PAGE

*/

export default class Register extends React.Component {

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
	this.handleRPasswordChange = this.handleRPasswordChange.bind(this);

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

    handleRPasswordChange = (e) => {
	const bio = e.target.value;
	this.setState({
	    repeat_password: bio
	});
    };

    toast = () =>  {
	switch (this.state.response.success){
	case true:
		return (
		    <div className="alert alert-success" role="alert">
		      <p>
			You just registered an account! Click <a href="/" className="alert-link">here</a>  to return to main page. Remember to login first!
		      </p>
		    </div>
		);
	case false:
	    return (
		 <div className="alert alert-danger"  role="alert">
		      <p>
			<strong>
			  Cannot register new account: 
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

    /*
      REQUEST TO SERVER AND FETCH THE RESULT

     */
    async handleSubmit(event) {
	event.preventDefault();

	if (this.state.repeat_password !== this.state.password){
	    console.log("Password not match");
	    this.setState({
		response: {
		    success : false,
		    mess: "Password not match"
		}
	    });
	} else {
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
		const response = await window.fetch('/register', requestOptions);
		let json = await response.json();
		
		// Change state
		this.setState({
		    response : json
		});
		console.log(json);	    
	    }catch(err){
		this.setState({
		    response : {
			success: false,
			mess: "Input Wrong or Sever Disconnection"
		    }
		});
		console.log(err);
	    }
	}
	
	
	
	// window.alert("Username" + this.state.username + " Password: " + this.state.password );	
    }
    
    
    render(){
	return(
	    <div>
	      <Header/>
	      
	      {this.toast()}

	      
	      <Container className="register-banner">
		<Row>
		  <Container>
		    <h1>
		      Enter username and password to make an account
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
		  
		  <div className="form-group">
		    <label>Repeat Password</label>
		    <input type="password" className="form-control" placeholder="Repeat password"onChange={this.handleRPasswordChange} />
		</div>
		  
		  
		  <button type="submit" className="btn btn-outline-light ">
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
