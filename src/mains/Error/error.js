import React from 'react';

import {Jumbotron, Button} from 'react-bootstrap';
import './error.css';
import Header from '../../components/Header/header.js';
export default class Error extends React.Component {

    /*
      ERROR PAGE

     */


    render(){
	var styles ={
	    "background-color" : "transparent"
	};
	return(
	    <div>
	      <Header/>
	      <div className="error-banner">
	      <Jumbotron fluid={true} style={styles} >
	      <h1>Ops ... 404 Problem</h1>
	      <p>
		The page you are looking for does not exist!
	      </p>
	      <p>
		<Button	 href='/' variant="outline-light" size='lg' >Back to main page</Button>
	      </p>
	    </Jumbotron>
	    </div>

	    </div>
	    
	    
	);

    }
    
}
