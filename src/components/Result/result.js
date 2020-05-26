import React from 'react';

import { Container} from 'react-bootstrap';
import moment from 'moment';
import { Transition} from 'react-spring/renderprops';
import './result.css';


/*
  THIS ONE SHOW DESCRIPTION ON EVENT FETCHED.

*/

export default class Result extends React.Component {

     /*
      Type = 1: events
      Type = 2: birth day of somebody
      Type = 3: Death day of somebody
      
     */
    
    show(){
	const time =  moment().format('MMMM Do ') + this.props.year;


	switch(this.props.type){
	case 1:
	    return(
		<div>
		  <h1>
		    <i>Event at </i> {time} : {this.props.desc}
		  </h1>
		</div>
	    );
	case 2:
	    return(
		<div>
		  <h1>
		    {time}: {this.props.desc}
		    <i> was born</i>
		  </h1>
		</div>
	    );

	case 3:
	     return(
		<div>
		  <h1>
		    {time}: {this.props.desc} 
		    <i> was dead </i>
		  </h1>
		</div>
	    );
	default:
	    return(
		<div>
		  <h1>
		    <i> Loading </i>
		    {this.props.desc}
		  </h1>
		</div>
	    );
	}
    }
    render(){
	return(
	    <Container className="result">



	      <Transition
		items={this.show()} keys={this.props.desc}
		 from={{ opacity: 0, transform: 'translate3d(100%,0,0)' }}
		enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
		leave={{ opacity: 0, transform: 'translate3d(-50%,0,0)' }}
		>
		{item => props => <div style={props}>{item}</div>}
	      </Transition>


	    </Container>
	    
	);

    }
    
}
