// For Personal Reference:
// 1. In terminal: python3 -m http.server 8007
// 2. Go to http://localhost:8007 in browser
// Work adapted from Nicole He's Example code, found here: https://github.com/nicolehe/ITP-hello-computer-f20/blob/main/week2/speech_to_gif/index.html

const SpeechRecognition = webkitSpeechRecognition;
const giphyAPIKey = "YOUR API KEY";

// var myBtn = document.getElementById("myButton");
var messageP = document.getElementById("message");
// console.log(messageP);
// myBtn.addEventListener("click", processClick);

function processClick() {
    console.log("button got clicked");
   clickTracker.count++;
    console.log(clickTracker.count);
    // const dogs = "new message here";
   document.getElementById("message").innerHTML = clickTracker.getMessage();
    // messageP.innerHTML = dogs;
//    console.log("messsage html = " + document.getElementById("message").innerHTML)
//    console.log("click Tracker messsage = " + clickTracker.getMessage())

}

// var dogs = "new message here";
// var clickTracker = 0;
var clickTracker = {
"count": 0,
getMessage: function () {
    var message;
    switch (this.count) {
        case 1:
            message = "GhostBusters";
            break;
        case 2:
            message = "Shrek";
            break;
        case 3:
            message ="Monty Python and the Holy Grail";
            break;
        case 4:
            message = "Pulp Fiction";
            break;
        case 5:
            message = "Star Wars";
            break;
        case 6:
            message = "The Princess Bride";
            break;
        case 7:
            message = "Mean Girls";
            break;
        case 8:
            message = "Austin Powers";
            break;
        case 9:
            message = "The Big Lebowski";
            break;
        case 10:
            message = "Anchorman";
            break;
        case 11:
            message = "The Godfather";
            break;
        default:
            message = "Ok We're Done Here"
    }
    return message;
}
};


const getSpeech = () => {
	const recognition = new SpeechRecognition();
	recognition.lang = "en-US";
	recognition.start();
	// recognition.continuous = true;
	recognition.interimResults = true;

	recognition.onresult = (event) => {
		const speechResult = event.results[0][0].transcript;
		console.log("result: " + speechResult);
		console.log("confidence: " + event.results[0][0].confidence);
		document.querySelector("#speech-div").textContent = speechResult;
		getGif(speechResult);
	};

	recognition.onend = () => {
		console.log("it is over");

		recognition.stop();
		// getSpeech(); // uncomment for "endless mode"
	};

	recognition.onerror = (event) => {
		console.log("something went wrong: " + event.error);
	};
};

const getGif = (phrase) => {
	// same as:
	// let url = "http://api.giphy.com/v1/gifs/random?api_key=" + giphyAPIKey + "&tag=" + phrase;
	// more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	let url = `http://api.giphy.com/v1/gifs/random?api_key=${giphyAPIKey}&tag=${phrase}`;

	console.log(url);

	// more info: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	fetch(url, {
		mode: "cors",
	})
		.then((response) => response.json())
		.then((result) => {
			let imgUrl = result.data.image_url;
			document.querySelector("#the-gif").src = imgUrl;
		});
};

document.querySelector("#myButton").onclick = () => {
	console.log("lolclicked");
	getSpeech();
};