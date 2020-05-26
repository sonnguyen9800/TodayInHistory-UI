import React from 'react';
import './card.css';

import {Container, Row, Col} from 'react-bootstrap';


import Leftpanel from './Leftpanel/leftpanel.js';
import Rightpanel from './Rightpanel/rightpanel.js';

import {getIntro, getImgSrc} from '../../api/wiki.js';


/*
  WHEN EVENT FETCHED, THERE CAN BE MANY EXTRA INFORMATION ATTACHED WITH.

  EACH OF THESE INFORMATION PIECES WILL BE STORE IN ONE CARD

  EACH CARD HAS LEFT PANEL AND RIGHT PANEL. LEFT PANEL SHOWS IMAGE; RIGHTPANEL SHOWS
  EXTRA INFORMATION WITH A LINK TO THE WIKI PAGE

*/


export default class Card extends React.Component {

    // Type: a flag that shows how the card will render Left + Right panel
    /*
      Type: 0: no show anything
      Type: 1: show full Left and Rightpanel
      Type: 2: show left but a part of rightpanel
      Type: 3: show left panel only
      Type: 4: show right panel only
     */
    
    
    constructor(props){
	super(props);
	this.contentMax = 1500;
	this.state={
	    
	    type: 0,
	    // collect from props
	    title: props.title,
	    link: props.url,

	    // fetch from api:
	    content: "Loading ...",
	    imgUrl: null,
	    imgCaption: null
	};
    }

    componentDidMount(){
	this.fetchData();
    }


    /*
      FETCH CONTENT FOR RIGHTPANEL; FETCH IMAGE FOR LEFTPANEL

     */

    async fetchData(){
	let resultContent = await this.fetchContent();
	let resultImg = await this.fetchImage();

	console.log("Key " + this.state.title + " resultContent: " + resultContent + " result img: " + resultImg);
	const max_length = this.contentMax;

	if (resultContent && resultImg &&  this.state.content != null && this.state.content.length < max_length ){
	    this.setState({
		type: 1
	    });
	} else if (resultContent && resultImg && this.state.content != null  && this.state.content.length >= max_length){
	    this.setState({
		type: 2
	    });
	    
	} else if (!resultContent && resultImg ){
	    this.setState({
		type: 3
	    });
	} else if (resultContent && !resultImg){
	    this.setState({
		type: 4
	    });
	} else {
	    this.setState({
		type: 0
	    });
	}
	    
	
    }
    
    async fetchContent(){
	try {
	    const content = await getIntro(this.state.title);
	    this.setState({
		content: content
	    });
	    return true;

	}catch(erro){
	    //any error will make failed
	    return false;
	}
    };

    async fetchImage(){
	try{
	    const fetchResult = await getImgSrc(this.state.title);
	    console.log(fetchResult);
	    this.setState({
		imgUrl : fetchResult.imgSrc,
		imgCaption : fetchResult.caption
	    });
	    
	    return true;
	}catch(err){
	    console.log(err);
	    return false;
	}
    }


    /*
      HOW THE CARD SHOULD BE SHOWN IS BASED ON THE state.type
      OFTENLY, LEFTPANEL WILL BE IGNORED IF NO IMAGE IS FETCHED.

     */
    
    show(){
	switch(this.state.type){
	case 1:
	    return(
		<div>
		  <Row>
		    <Col xs={6}>
		      <Leftpanel imgUrl={this.state.imgUrl} imgCaption={this.state.imgCaption} />
		    </Col>
		    <Col xs={6}>
		      <Rightpanel title={this.state.title} content={this.state.content} link={this.state.link} />
		    </Col>
		  </Row>
		  <hr className="dashed"/>
					      
		</div>
	    );
	case 2:

	    return(
		<div>
		  
		  <Row>
		    <Container>
		     <Leftpanel imgUrl={this.state.imgUrl} imgCaption={this.state.imgCaption} />

		    </Container>
		   </Row>
		  <Row>
		    <Container>
		      <Rightpanel title={this.state.title} content={this.state.content} link={this.state.link} />
		    </Container>
		    
		  </Row>
		  <hr className="dashed"/>
					      
		</div>
	    );

	case 3:
	    return(
		<div>
		  <Leftpanel imgUrl={this.state.imgUrl} imgCaption={this.state.imgCaption} />
		  <hr className="dashed"/>

		</div>
	    );
	case 4:
	    return(
		<div>
		  <Rightpanel content={this.state.content} title={this.state.title} link={this.state.link} />
		  <hr className="dashed"/>

		</div>
	    );
	    
	default:
	    return(
		<div>
		</div>
	    );
	}
	
    };

    render(){
	return(
	    <div >
	      {this.show()}
	    </div>
	);

    }
    
}
