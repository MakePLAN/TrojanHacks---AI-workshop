var oakImgSrc = "img/oak.jpg";
var ashImgSrc = "img/ash.png";

var client_access_token = <replace with your client access token>;
var developer_access_token = <replace with your developer access token>;


function sendButtonPressed(){
	var input = document.getElementById("textField");
	sendMessageUser(input.value);
}

function sendMessageUser(msg){
	var chatBody = document.getElementById("chatBody");

	var line = document.createElement("hr");
	line.setAttribute("class","hr-clas");

	var message = document.createElement("div");
	message.setAttribute("class","chat-box-right");

	var text = document.createTextNode(msg);
	message.appendChild(text);

	var tag = document.createElement("div");
	tag.setAttribute("class", "chat-box-name-right");

	var profilePic = document.createElement("img");
	profilePic.setAttribute("src", ashImgSrc);
	profilePic.setAttribute("alt", "bootstrap Chat box user image");
	profilePic.setAttribute("class", "img-circle");
	tag.appendChild(profilePic);

	var text1 = document.createTextNode("- Ash Ketchum");
	tag.appendChild(text1);

	chatBody.appendChild(line);
	chatBody.appendChild(message);
	chatBody.appendChild(tag);

	send(msg);
	
}

function sendMessageOak(msg){
	var chatBody = document.getElementById("chatBody");

	var line = document.createElement("hr");
	line.setAttribute("class","hr-clas");

	var message = document.createElement("div");
	message.setAttribute("class","chat-box-left");

	var text = document.createTextNode(msg);
	message.appendChild(text);

	var tag = document.createElement("div");
	tag.setAttribute("class", "chat-box-name-left");

	var profilePic = document.createElement("img");
	profilePic.setAttribute("src", oakImgSrc);
	profilePic.setAttribute("alt", "bootstrap Chat box user image");
	profilePic.setAttribute("class", "img-circle");
	tag.appendChild(profilePic);

	var text1 = document.createTextNode("- Professor Oak");
	tag.appendChild(text1);

	chatBody.appendChild(line);
	chatBody.appendChild(message);
	chatBody.appendChild(tag);
}

function send(msg) {
  var text = msg;
  $.ajax({
    type: "POST",
    url: "https://api.api.ai/v1/" + "query/",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + client_access_token,
      "ocp-apim-subscription-key": developer_access_token
    },
    data: JSON.stringify({q: text, lang: "en"}),

    success: function(data) {
      //get response from api.ai
      
    },
    error: function() {
      //got error on getting response from api.ai
      respond(messageInternalError);
    }
  });
}

function prepareResponse(val) {
  //do something with data from api.ai

}

function getPokemonData(pokemonName)
{
    var url = 'http://pokeapi.co/api/v2/pokemon/' + pokemonName + '/';
    $.getJSON(url, function(data) {
    	var name = data["name"];
    	var id = data["id"];
    	var height = data["height"];
    	var weight = data["weight"];
    	var type = data["types"];
    	
    	var result = 'Name: ' + name;
    	result += ', ID: ' + id;
    	result += ', Height: ' + height;
    	result += ', Weight: ' + weight;
    	result += ', Type: ';
    	for (var i = 0; i <type.length; i++){
    		if (i != type.length - 1)
    			result += (type[i]["type"]["name"] + ',');
    		else
    			result += (type[i]["type"]["name"]);
    	}
    	
    	sendMessageOak(result);
});
}




