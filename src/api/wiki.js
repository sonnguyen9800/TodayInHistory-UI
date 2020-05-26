/*
API FROM WIKIPEDIA
*/


// Get content api
function makeAPIIntro(code){
    let title = encodeURI(code);
    return "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="+title+"&origin=*";
}

function parseIntroFromData(data){
    let content = data.query.pages;
    const index = Object.keys(content);
    const result = content[index].extract;
    return result;
}


/*
  RETURN EVENT's EXTRA INFORMATION
  
*/
export async function getIntro(title){
    const api = makeAPIIntro(title);
    let response = await window.fetch(api);
    let data = await response.json();
    console.log("LAMBDA FAILED");    
    return parseIntroFromData(data);
}

// Get thumpsnail url:
function makeAPIThumsnail(code){
    let title = encodeURI(code);
    return "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles="+ title +"&pithumbsize=1000&format=json&origin=*";
}
function parseImgUrl(data){
    let content = data.query.pages;
    const index = Object.keys(content);
    const result = content[index];
    return {
	imgSrc : result.thumbnail.source,
	caption: result.pageimage
    };
}


/*
  RETURN IMAGE SRC
  
*/
export async function getImgSrc(title){
    const api = makeAPIThumsnail(title);
    let response = await window.fetch(api);
    let data = await response.json();   
    return parseImgUrl(data);
}
