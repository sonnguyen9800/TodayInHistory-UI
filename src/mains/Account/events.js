import React from 'react';

import {Container, Table} from 'react-bootstrap';
import Header from '../../components/Header/header.js';
import './events.css';
import {TiDelete} from 'react-icons/ti';
import {Button} from 'react-bootstrap';
/*
  THIS COMPONENT SHOWS ALL EVENTS SAVED IN YOUR ACCOUNT

*/

export default class Events extends React.Component {
    
    constructor(){
	super();

	this.state = {
	    result : null,
	    loggin: false,
	    deleteSuccess: null,
	};
	
	this.fetchEvents = this.fetchEvents.bind(this);
	this.tableBody = this.tableBody.bind(this);

	this.deleteButton = this.deleteButton.bind(this);
	this.deleteEvent = this.deleteEvent.bind(this);
	
    }

    componentDidMount(){
	this.fetchEvents();
    }


    /*
      GET YOUR EVENTS BY QUERY. USING YOUR SAVED TOKEN TO QUERY

     */
    async fetchEvents(){
	// get token from window 
	const token = "JWT "+ window.sessionStorage.getItem('tih-jsonwebtoken');
	console.log("Token:" + token);
	const requestOptions = {
	    method: 'GET',
	    headers: {
		'Content-Type': 'application/json',
		'Authorization': token
	    },
	};
	try {
	    const response = await window.fetch('/events', requestOptions);
	    const data = await response.json();

	    this.setState({
		result: data.result,
		loggin: true
	    });
	    
	    console.log(data);
	}catch(err){
	    console.log(err);
	       this.setState({
		result: null,
		loggin: false
	    });
	}
    }

    randomKey(){
	return Math.floor(Math.random() * 100);	 
    }

    deleteButton(id){
	return (
	    <div>
	      <Button block={true}
		      style={{backgroundColor: "transparent", border: "none"}}
		      onClick={ () => this.deleteEvent(id)}
		      onMouseDown={(e) =>  e.preventDefault()}
		>
		<TiDelete size={28}/>
	      </Button>
	    </div>
	);
    }

    /*
      DELETE BUTTON AND DELETE FUNCTION: USING JWT AND MAKE REQUEST TO SERVER
     */

    
    async deleteEvent(id){
	const token = "JWT "+ window.sessionStorage.getItem('tih-jsonwebtoken');
	console.log("Token:" + token);
	const requestOptions = {
	    method: 'DELETE',
	    headers: {
		'Content-Type': 'application/json',
		'Authorization': token
	    },
	};
	try {
	    const response = await window.fetch('/events/'+id, requestOptions);
	    const data = await response.json();

	    this.fetchEvents();
	   
	    console.log(data);
	}catch(err){
	    console.log(err);
	}
    }


    /*
      SHOWING HOW THE TABLE SHOULD BE

     */
    
    tableBody(){
	if (this.state.result != null && this.state.result.length > 1){
	   
	    return (
		<tbody>
		  {this.state.result.slice(1).map(event => 
		      <tr key={event.desc+this.randomKey()} >
		      <td> {event.desc}	 </td>

		<td>	  {event.wikipedia.map(unit =>
					       <Container key={unit.wikipedia}>
			      <i>
			      <a style={{color: "white"}} href={unit.wikipedia}>{unit.title}</a>
			      </i>
			      </Container>
		      )} </td>
			  <td>
						  {this.deleteButton(event.id)}
						  
			  </td>			  
		      </tr>
		      )
		  }
		</tbody>
	    );
	} else {
	    return (
		<tbody>
		<td>You have no record saved!</td>
		</tbody>
	    );
	}
    };
    
    
    /*
      SHOWING TABLES, OR ALERTS IF THERE IS NO RESULT (EVENT) FOUND
     */
    renderTable(){
	if (this.state.result != null && this.state.result.length > 1){
		return(
	       <Table striped bordered hover variant='dark'>
		      <thead>
			<tr>
			  <th>Description</th>
			  <th>Wikipedias</th>
			  <th>Delete</th>
			</tr>
	
		      </thead>
			{this.tableBody()}					  
		    </Table>
		);
	}
	else if (this.state.result != null && this.state.result.length === 1){
	     return (
		<Container>
			<div className="alert alert-danger" role="alert">
			<p><strong>No Events Found </strong></p>
			</div>	
		</Container>
	    );
	}
	else {
	    return (
		<Container>
			<div className="alert alert-warning"role="alert">
			  <p><strong>You must loggin first to use this function. In case you sure that you did loggin, successfully, please wait for seconds to load the data </strong></p>
			</div>	
		</Container>
	    );
	}

    }
    
    render(){
	return(
		<div>
		  <Header/>
		  <Container className='table'>
		    {this.renderTable()}
		  </Container>

		</div>
	
	);

    }
    
}
