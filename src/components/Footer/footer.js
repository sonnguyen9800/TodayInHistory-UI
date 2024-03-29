import React from 'react';
import './footer.css';

import {Container, Col, Row, Button} from 'react-bootstrap';

import {FaLinkedinIn,FaYoutube,FaGithub,FaCopyright } from 'react-icons/fa';

/*
  FOOTER COMPONENTS
*/

export default class Footer extends React.Component {
	constructor (){
		super();
		var today = new Date(),
		date = today.getFullYear();
	
		this.state = {
			date: date
		};
	}



    render(){
		return(
			<div className="footer">
			<Container fluid={true}>
			<Row>
			<Col>
				<blockquote className="blockquote">
				<p className="mb-0">"Those who do not learn history are doomed to repeat it"</p>
				<footer className="blockquote-footer">George Santayana </footer>
				</blockquote>	
			</Col>
			
			<Col>
			<Container>
				<p id="contact-text">
				Contact Me!
				</p>

				<Row className="contacts-link">
				<Container>

				<Button variant="link" href="https://www.linkedin.com/in/sonnguyen9800/"  className="button-icon" style={{color: 'lightgrey'}}>
				<FaLinkedinIn id="icon" size={28} />
				</Button>
				{' '}

				
				<Button variant="link" href="https://www.youtube.com/@sonnguyen9800"	 className="button-icon" style={{color: 'lightgrey'}}>
				<FaYoutube  size={28} />
				</Button>
				{' '}

				<Button variant="link" href="https://github.com/sonnguyen9800"	 className="button-icon" style={{color: 'lightgrey'}}>
				<FaGithub  size={28} />
				</Button>
				
				</Container>

				</Row>

				
			</Container>
			</Col>
			</Row>
		
			
			</Container>
			
			<Container className='copyright'>
			
			CopyRight {' '}
			<FaCopyright/>	{' '}
			{this.state.date}: Sonnguyen9800
			</Container>

			</div>
		);

    }
    
}
