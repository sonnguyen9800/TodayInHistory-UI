import React from 'react';
import './main.css';

import Card from '../../components/Card/card.js';
import Result from '../../components/Result/result.js';
import Header from '../../components/Header/header.js';
import {getRandomEvents} from '../../api/tih.js';
//import { browserHistory } from 'react-router';
import moment from 'moment';
import {Container } from 'react-bootstrap';


/*

  COMPONENT MAIN HAS TWO TYPE OF CHILDRENS:
  - CARD (CAN HAS MORE THAN ONE CARD);
  - RESULT (ONLY ONE)

*/


export default class Main extends React.Component {
      _isMounted = false;

    /*
      Type = 1: events
      Type = 2: birth day of somebody
      Type = 3: Death day of somebody
      
     */
    constructor(props){
	super(props);

	this.state ={
	    desc: null,
	    year: null,
	    wikipedia: null,
	    type: null,

	    saveSuccess: null
	};
	this.fetchData = this.fetchData.bind(this);
	this.update = this.update.bind(this);
	this.saveEvent = this.saveEvent.bind(this);
	this.toast = this.toast.bind(this);
	this.makeDesc = this.makeDesc.bind(this);
    }

    
    
    getTime(){
	return moment().format('MMMM Do ') + this.state.year;
    }


    /*
      A Small toast or alert box appears on on the main page!
      
     */
    toast = () =>  {

	const {location} = this.props;
	if (location.state != null && location.state.loggin === "just-loggin" && this.saveSuccess == null){ 
		return (		
			<div className="alert alert-success"role="alert">
			<p>
			<strong>
			Loggin Success, Hello {location.state.username} ! Wish you have a good day!
		    </strong>
			</p>
			</div>		    
		);
	} else if (this.state.saveSuccess === true) {
	    return (
		<Container>
			<div className="alert alert-success"role="alert">
			<p><strong>Added Events to your account </strong></p>
			</div>	
		</Container>
	    );
	} else if (this.state.saveSuccess === false){
	    return (
		<Container>
			<div className="alert alert-danger"role="alert">
			<p><strong>You may need to loggin first. Or the event has been added before </strong></p>
			</div>	
		</Container>
	    );	    
	} else {
	    return (
		<div>
		</div>
	    );
	}
	   
    }

    /*
      Fetching Data from API. Calling functions from src/api/tih
      
     */

    
    async fetchData(){
	//this.props.location.state.loggin = null;

	const result = await getRandomEvents();
	console.log(result);
	this.setState({
	    year: result.event.year,
	    desc: result.event.description,
	    type: result.type,
	    wikipedia: result.event.wikipedia
	});

	
    }
    
    componentDidMount(){
	this._isMounted = true;
	this.fetchData();
    }

    componentWillUnmount() {
	this._isMounted = false;
    }

    /*
      Based on events fetched, render CARD COMPONENT(S) (CAN BE MORE THAN ONE)
      
     */
    
    renderCards(){
	if (this.state.wikipedia != null){
	    const array = this.state.wikipedia;
	    return(
		 <div>
		   {array.map(item => (
			 <Card key={item.title} title={item.title} url={item.wikipedia} className="card"/>	
		   ))}
		</div>
	    );
	} else {
	    return (
		<div>
		  "Loading"
		</div>
	    );
	}
    }

    /*
      RE-FETCHING THE DATA

     */
    update(){
	this.fetchData();
	const {history} = this.props;
	history.replace() ;
	this.setState({
	    saveSuccess: null
	});
    }
    
    makeRandom(){
	return Math.floor(Math.random() * 100);	 
    }

    /*
      BASED ON TYPE OF EVENT FETCHED (EVENT, BIRTHDAY or DEATH DAY), the 
      RESULT OR DESCRIPTION SHOWN SHOULD BE DIFFERENT
      
     */

    makeDesc(){
	switch(this.state.type){
	case 1:
	    return "Event at " + this.getTime() + ": "+ this.state.desc;
	case 2:
	    return this.getTime() + " "+ this.state.desc + " was born";
	case 3:
	    return this.getTime() + " "+ this.state.desc + " was born";

	default:
	    return this.state.desc;
	}
    }

    /*
      ACTION WHEN USER USER SAVE EVENTS
      USING token Saved in SESSION STORAGE

     */
    
    async saveEvent(){
	// get token from window
	const {history} = this.props;
	history.replace() ;
	const token = "JWT "+ window.sessionStorage.getItem('tih-jsonwebtoken');

	// get the desc
	const desc = (typeof (this.state.desc) === 'undefined') ? "No Description" : this.makeDesc();
	// get the wiki
	const wiki = (typeof (this.state.wikipedia) === 'undefined') ? [] : this.state.wikipedia;
	// get the time
	const time = (typeof (this.state.year) === 'undefined') ? "Unknown Time" : this.getTime();
	
	const requestOptions = {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
		'Authorization': token
	    },
	    body: JSON.stringify({
		"desc" : desc,
		"time" : time,
		"wikipedia" : wiki
	    })
	};
	try {
	    const response = await window.fetch('/events', requestOptions);
	    const data = await response.json();	    
	    console.log(data);

	    if (data.success === true){
		this.setState({
		    saveSuccess: true,

		});
	    } else{
		this.setState({
		    saveSuccess: false,
		});
	    }
	    
	}catch(err){
	    console.log(err);
	    this.setState({
		saveSuccess: false,

	    });
	}
    }
    
    render(){
	return(
	    <div>

		<Header page={"main"} parentRefresh={this.update} parentSaveEvent={this.saveEvent} />
				      {this.toast()}

	      <Result desc={this.state.desc} type={this.state.type} year={this.state.year}/>	     
	      {this.renderCards()}
	    </div>
	);
    }
    
}
