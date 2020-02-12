/* Matheu Plouffe Website
 * Javascript
 * verson: 0.1
 * Last Udpated: 4.20.2016
 */

/* load
 * sets up the keyboard
 * if this is the contact page, sets up the form information and the twitter stream embed
 */
function load(){

	// building the keyboard
	buildKeyboard();
	
	if(document.title == 'matheuPlouffe.com | contact')
	{
		// Twitter stream embed
		var js,
			fjs = document.getElementsByTagName("script")[0],
			p = /^http:/.test(document.location)?'http':'https';
		if(!document.getElementById("twitter-wjs")){
			js = document.createElement("script");
			js.id = "twitter-wjs";
			js.src = p+"://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js,fjs);
		}

		// set up form stuff
		hideErrors();
		document.getElementById("contact").reset();
		
		// attach event listeners to the buttons
		document.getElementById("contact").addEventListener("submit", validate);
		document.getElementById("contact").addEventListener("reset", resetForm);
	}
}

document.addEventListener("DOMContentLoaded", load, false);
