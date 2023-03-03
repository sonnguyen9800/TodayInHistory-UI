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
		    from Wikipedia Resources. 
		  </p>
		  <p>
		    The app was developed based on byabbe.se API and WikiAPI. Also, credits to react-bootstrap & create-react-app package
		  </p>
		  <Button href='/' variant="outline-light" size='lg' >Back to main page</Button>

		</Container>
	    </Jumbotron>
	    </div>
	    </div>

	    
	);

    }
    
}
