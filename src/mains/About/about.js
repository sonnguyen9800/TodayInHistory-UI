import React from 'react';

import {Jumbotron, Button, Container} from 'react-bootstrap';
import './about.css';
import Header from '../../components/Header/header.js';

export default class About extends React.Component {



    render(){
	var styles ={
	    "backgroundColor" : "transparent"
	};
	return(
	    <div>
	      <Header/>
	    <div className="about-banner">
	      <Jumbotron fluid={true} style={styles} >
		<Container>
		  <h1>This is an app for education purpose!</h1>
		  <p>
		    This app show you an event which occured in the past which has the same date as today. The events shown are randomly picked
		    from Wikipedia Resources. You can also sign up an account, log in and save any event to your account to see it at anytime you want!
		  </p>
		  <Button href='/' variant="outline-light" size='lg' >Back to main page</Button>

		</Container>
	    </Jumbotron>
	    </div>
	    </div>

	    
	);

    }
    
}
