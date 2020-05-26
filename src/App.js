import React from 'react';
//import logo from './logo.svg';
import './App.css';

// Import Component
//import Header from './components/Header/header.js';
import Footer from './components/Footer/footer.js';

// Import pages
import Error from './mains/Error/error.js';
import About from './mains/About/about.js';
import Main from './mains/Main/main.js';



import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
/*
  MAIN COMPONENT HERE

*/
class App extends React.Component {
    
    render(){
	return (

	    <Router>
	      
	      <div className="App">
		
		<div id="mainframe">
		  <Switch>
		    <Route path="/" component={Main} exact  />
		    <Route path="/main" component={Main} exact	/>
		    <Route path="/about" component={About} />
		    <Route component={Error} />
		  </Switch>
		</div>
		<Footer/>
	  
	      </div>	
	    </Router>
	);
    }

}

export default App;
