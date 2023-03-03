import React from 'react';
import './header.css';

import {Container, Button} from 'react-bootstrap';

import { Link } from 'react-router-dom';
/*
  HEADER COMPONENT: THIS ONE RENDER HEADER BASED ON CURRENT PAGE.

*/


// Child from app
export default class Header extends React.Component {
    constructor(props){
	super(props);
	this.refresh = this.refresh.bind(this);

	this.saveEvent = this.saveEvent.bind(this);
    }

    main(){
	if (this.props.page === "main"){
	    return(
		<Button variant="outline-light" size='lg' onClick={this.refresh}>  <strong>More Events </strong> </Button>
	    );
	}else {
	    return(
		<Button href="/" variant="outline-light" size='lg' > <strong>Main</strong> </Button>		 
	    );
	}
    }

    showSaveEvent(){
	if (this.props.page === "main"){
	    return (
		<Button variant="outline-light" size='lg' onClick={this.saveEvent}>  <strong>Save This Event </strong> </Button>
	    );
	} else {
	    return null;
	}
    }
    
    refresh(){
	this.props.parentRefresh();
    }

    saveEvent(){
	this.props.parentSaveEvent();
    }

    render(){
	return(
	    <Container fluid className='header'>
	      <h1 id="title">
		<strong>
		  Today in History
		</strong>
	      </h1>

	      {this.main()}
	      
	      {' '}
		      
	      {' '}
	      
	      <Link to="/about">
		<Button variant="outline-light" size='lg'>
		  <strong>
		    About
		  </strong>
		</Button>
	      </Link>

		  {/* <Link to="/about"> */}
		  {' '}
		      
			{' '}
			  
		  <Link 
		  to={{ pathname: "https://sonnguyen9800.com" }}
		   target="_blank">

			<Button variant="outline-light" size='lg'>
			<strong>
				My Blog
			</strong>
			</Button>
	      </Link>
	      {' '}		      
	    </Container>
	
	);

    }
    
}
