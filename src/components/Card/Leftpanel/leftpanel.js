import React from 'react';

import {Container, Figure} from 'react-bootstrap';
import './leftpanel.css';
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
	    <div>
	    
	      <Container fluid={true} className="center-div">
		  <Figure.Image
		    alt={this.props.imgCaption}
		    src={this.props.imgUrl}
		    className="image"
		    />
	
	      </Container>
	      <Figure.Caption>
		{this.props.imgCaption}
	      </Figure.Caption>
	    </div>

	);

    }
    
}
