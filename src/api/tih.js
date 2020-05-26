/*
The api is get from: https://byabbe.se/on-this-day/
*/


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeAPIEvent(month, day){
    return "https://byabbe.se/on-this-day/"+month+"/"+day+"/events.json";
}
function makeAPIBirth(month, day){
    return "https://byabbe.se/on-this-day/"+month+"/"+day+"/births.json";
}
function makeAPIDeath(month, day){
    return "https://byabbe.se/on-this-day/"+month+"/"+day+"/deaths.json";
}

// Make API Births events
export async function getEvents(){
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const api = makeAPIEvent(month, day);
    let response = await window.fetch(api);
    let json = await response.json();
    let data = json.events;
    var item = data[Math.floor(Math.random() * data.length)];
    return item;    
}

// Make API Births events
export async function getBirths(){
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const api = makeAPIBirth(month, day);
    let response = await window.fetch(api);
    let json = await response.json();
    let data = json.births;
    var item = data[Math.floor(Math.random() * data.length)];
    return item;    
}


// Get a random deaths event
export async function getDeaths(){
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const api = makeAPIDeath(month, day);
    let response = await window.fetch(api);
    let json = await response.json();
    let data = json.deaths;
    var item = data[Math.floor(Math.random() * data.length)];
    return item;    
}



/*
  FUNCTION: TO GET EVENTS. FETCH  EVENTS FROM API

*/
export async function getRandomEvents(){
    const random = getRandomInt(1,3);
    switch (random){
    case 1:
    	return {
    	    event: await getEvents(),
    	    type: 1
    	};
    case 2:
    	return {
    	    type: 2,
    	    event: await getBirths()
    	};
    case 3:
    	return {
    	    type: 3,
    	    event: await getDeaths()};
    default:
    	return{
    	    event: await getEvents(),
    	    type: 1
    	};
    }
}

