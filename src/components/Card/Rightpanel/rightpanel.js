import React from 'react';

import {Container, Button} from 'react-bootstrap';

import './rightpanel.css';
export default class Leftpanel extends React.Component {

    // Type: a flag that shows how the card will render Left + Right panel
    /*
      Type: 0: no show anything
      Type: 1: show full Left and Rightpanel
      Type: 2: show left but a part of rightpanel
      Type: 3: show left panel only
      Type: 4: show right panel only
     */
       
    render(){
	return(
	    <div className="rightpanel">
		<Container>
		  <Button href={this.props.link} variant="outline-light" size='lg' className="button-link">
		    <strong>
		      {this.props.title}
		    </strong>
		  </Button>
		  <p id="content"> {this.props.content} </p>
		</Container>
	    </div>
	);

    }
    
}
