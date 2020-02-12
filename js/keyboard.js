/* Keyboard.js
 * has the code to dynamically build from xml file
 * and implement functionality of an interactive keyboard on the website
 * Code and implementation adapted from:
 * http://code.tutsplus.com/tutorials/creating-a-keyboard-with-css-and-jquery--net-5774
 * Date Created: 04.16.2016
 * Last Update: 04.20.2016
 * Version: 0.1
 * Author: Matheu Plouffe
 */

/* buildKeyboard
 * dynmaically builds the list for the keyboard by reading from the accompanied xml file
 */
 function buildKeyboard(){

 	// get the xml file
 	var keyboard_xml = loadXML("keyboard.xml");

 	// get the element where the keyboard will appear
 	var keyboard = document.getElementById("keyboard");

 	// get all the rows of keys
 	var rows = keyboard_xml.getElementsByTagName("row");
 	console.log(rows);
	
 	// build the first row
 	var symbols = rows[0].getElementsByTagName('symbol');
 	console.log(symbols.length);

 	for(var i = 0; i < symbols.length; i += 2)
 	{
 		// create the html elements I need
 		var li = document.createElement("li");
 		var spanOff = document.createElement("span");
 		var spanOn = document.createElement("span");

 		// set some class attributes
 		li.setAttribute("class", "symbol");
 		spanOn.setAttribute("class", "on");
  		spanOff.setAttribute("class", "off");

 		// get the symbol from the xml
 		spanOff.innerHTML = symbols[i].firstChild.nodeValue;
 		spanOn.innerHTML = symbols[i + 1].firstChild.nodeValue;

 		// build the element
 		li.appendChild(spanOff);
 		li.appendChild(spanOn);

 		// attach the built element to the ul
 		keyboard.appendChild(li);
 	}

 	// build the delete key
 	var del = rows[0].getElementsByTagName("delete")[0];
 	var delli = document.createElement("li");
 	delli.setAttribute("class", "delete lastitem");
 	delli.innerHTML = del.firstChild.nodeValue;
 	keyboard.appendChild(delli);


 	// build the second row
 	// empty space where the tab key would be(I'm leaving the tab key off the keyboard)
 	var tab = document.createElement('li');
 	tab.setAttribute('class', 'tab');
 	keyboard.appendChild(tab);

 	// letters
 	var letters = rows[1].getElementsByTagName('letter');
 	for(var i = 0; i < letters.length; i++)
 	{
 		// create new element and set class
 		li = document.createElement("li");
 		li.setAttribute('class', 'letter');

 		// get the value from the xml
 		li.innerHTML = letters[i].firstChild.nodeValue;

 		// append the li
 		keyboard.appendChild(li);
 	}

 	// symbols
 	symbols = rows[1].getElementsByTagName('symbol');
 	for(var i = 0; i < symbols.length; i += 2)
 	{
 		// create new element and set class
 		li = document.createElement('li');
 		spanOff = document.createElement('span');
 		spanOn = document.createElement('span');
 		li.setAttribute('class', 'symbol');
 		spanOff.setAttribute('class', 'off');
 		spanOn.setAttribute('class', 'on');

 		// get the symbols from the xml
 		spanOff.innerHTML = symbols[i].firstChild.nodeValue;
 		spanOn.innerHTML = symbols[i + 1].firstChild.nodeValue;

 		// if this is the last item, add the lastitem class attribute
 		if(i == 4)
 		{
 			li.setAttribute('class', 'symbol lastitem');
 		}

 		// build and append
 		li.appendChild(spanOff);
 		li.appendChild(spanOn);
 		keyboard.appendChild(li);
 	}


 	// build the third row
 	// capslock key
 	var caps = rows[2].getElementsByTagName('capslock')[0];
 	var capsli = document.createElement('li');
 	capsli.setAttribute('class', 'capslock');
 	capsli.innerHTML = caps.firstChild.nodeValue;
 	keyboard.appendChild(capsli);

 	//letters
 	letters = rows[2].getElementsByTagName('letter');
 	for(var i = 0; i < letters.length; i++)
 	{
 		// create new element and set class
 		li = document.createElement("li");
 		li.setAttribute('class', 'letter');

 		// get the value from the xml
 		li.innerHTML = letters[i].firstChild.nodeValue;

 		// append the li
 		keyboard.appendChild(li);
 	}

 	// symbols
 	symbols = rows[2].getElementsByTagName('symbol');
 	for(var i = 0; i < symbols.length; i += 2)
 	{
 		// create new element and set class
 		li = document.createElement('li');
 		spanOff = document.createElement('span');
 		spanOn = document.createElement('span');
 		li.setAttribute('class', 'symbol');
 		spanOff.setAttribute('class', 'off');
 		spanOn.setAttribute('class', 'on');

 		// get the symbols from the xml
 		spanOff.innerHTML = symbols[i].firstChild.nodeValue;
 		spanOn.innerHTML = symbols[i + 1].firstChild.nodeValue;

 		// build and append
 		li.appendChild(spanOff);
 		li.appendChild(spanOn);
 		keyboard.appendChild(li);
 	}

 	// return key
 	var ret = document.createElement('li');
 	ret.setAttribute('class', 'return lastitem');
 	ret.innerHTML = rows[2].getElementsByTagName('return')[0].firstChild.nodeValue;
 	keyboard.appendChild(ret);


 	// build row four
 	// left shift key
 	var leftshift = document.createElement('li');
 	leftshift.setAttribute('class', 'left-shift');
 	leftshift.innerHTML = rows[3].getElementsByTagName('left-shift')[0].firstChild.nodeValue;
 	keyboard.appendChild(leftshift);

 	// letters
 	letters = rows[3].getElementsByTagName('letter');
 	for(var i = 0; i < letters.length; i++)
 	{
 		// create new element and set class
 		li = document.createElement("li");
 		li.setAttribute('class', 'letter');

 		// get the value from the xml
 		li.innerHTML = letters[i].firstChild.nodeValue;

 		// append the li
 		keyboard.appendChild(li);
 	}

 	// symbols
 	symbols = rows[3].getElementsByTagName('symbol');
 	for(var i = 0; i < symbols.length; i += 2)
 	{
 		// create new element and set class
 		li = document.createElement('li');
 		spanOff = document.createElement('span');
 		spanOn = document.createElement('span');
 		li.setAttribute('class', 'symbol');
 		spanOff.setAttribute('class', 'off');
 		spanOn.setAttribute('class', 'on');

 		// get the symbols from the xml
 		spanOff.innerHTML = symbols[i].firstChild.nodeValue;
 		spanOn.innerHTML = symbols[i + 1].firstChild.nodeValue;

 		// the < and > symbols cause issues because I'm injecting them in the HTML
 		// leaving them in XML in the hopes of fixing them later, but I'm turning them off here
 		if(spanOn.innerHTML == '&lt;')
 		{
 			spanOn.innerHTML = "";
 		}
 		if(spanOn.innerHTML == '&gt;')
 		{
 			spanOn.innerHTML = "";
 		}

 		// build and append
 		li.appendChild(spanOff);
 		li.appendChild(spanOn);
 		keyboard.appendChild(li);
 	}

 	// right shfit key
 	var rightshift = document.createElement('li');
 	rightshift.setAttribute('class', 'right-shift');
 	rightshift.innerHTML = rows[3].getElementsByTagName('right-shift')[0].firstChild.nodeValue;
 	keyboard.appendChild(rightshift);

 	// space bar
 	var space = document.createElement('li');
 	space.setAttribute('class', 'space lastitem');
 	space.innerHTML = "&nbsp;";
 	keyboard.appendChild(space);

 	// WHEW! finished!
}

/* blinkingCursor
 * keeps the blinking cursor in the right place relative to the text
 */
function blinkingCursor(){

	// create a string that will be the cursor
	var cursorString = "";

	// get the length of the text in the write window
	var writeText = document.getElementById('write').innerHTML;
	for(var i = 0; i < writeText.length; i++)
	{
		var cursorString = cursorString + "&nbsp;"; 
	}

	// stick in the cursor
	cursorString = cursorString + "|";

	// update the position of the cursor
	document.getElementById('blinkingCursor').innerHTML = cursorString;
}

/* Pre Written Keyboard Functionality using jQuery
 * code taken from:
 * http://code.tutsplus.com/tutorials/creating-a-keyboard-with-css-and-jquery--net-5774
 * some functionality has been modified by me namely:
 * - adding the updates for the blinking cursor
 * - changing the functionality of the return key
 */
$(function(){
	var $write = $('#write'),
 	shift = false,
 	capslock = false;

	$('#keyboard li').click(function(){
	 	var $this = $(this),
	 	character = $this.html(); // if it's a lowercase letter

		 // shift keys
		if($this.hasClass('left-shift') || $this.hasClass('right-shift')){
		 	$('.letter').toggleClass('uppercase');
		 	$('.symbol span').toggle();

		 	shift = (shift == true) ? false : true;
		 	capslock = false;
		 	return false;
		}

		// capslock
		if($this.hasClass('capslock')){
			$('.letter').toggleClass('uppercase');
			capslock = true;
			return false;
		}

		// delete
		if($this.hasClass('delete')){
			var html = $write.html();
			if(html.length >4)
			{
				$write.html(html.substr(0, html.length - 1));
				blinkingCursor();
			}
			return false;
		}

		// return key
		if($this.hasClass('return')){
			parseCommand();
			return false;
		}

		// special characters
		if($this.hasClass('symbol')) character = $('span:visible', $this).html();
		if($this.hasClass('space')) character = ' ';
		if($this.hasClass('return')) character = "";

		// uppercase letter
		if($this.hasClass('uppercase')) character = character.toUpperCase();

		// remove shift once a key is clicked
		if(shift === true){
			$('.symbol span').toggle();
			if(capslock === false) $('.letter').toggleClass('uppercase');

			shift = false;
		}

		// add the character
		$write.html($write.html() + character);
		blinkingCursor();
	});
});

/* parseCommand
 * parses the commands entered into the virtual keyboard interface and does some stuff based
 * on what has been entered
 */
function parseCommand(){

	// get the user input
	var rawInput = document.getElementById('write').innerHTML;
	var inputString = rawInput.substr(4, rawInput.length - 1);
	inputString = inputString.toUpperCase();

	// switch to do stuff based on input
	switch(inputString){
		// navigation
		case 'HOME':
			if(document.title != 'matheuPlouffe.com')
			{
				location.assign('index.html');
			}
			break;
		case 'PORTFOLIO':
			if(document.title != 'matheuPlouffe.com | portfolio')
			{
				location.assign('portfolio.html');
			}
			break;
		case 'CONTACT':
			if(document.title != 'matheuPlouffe.com | contact')
			{
				location.assign('contact.html');
			}
			break;
		// style changing
		case 'INVERT':
			var mainStyle = document.getElementsByTagName('link')[0];
			var currentStyle = mainStyle.getAttribute('href');
			if(currentStyle == 'css/matheuplouffe.css') {
				mainStyle.setAttribute('href', "css/invert.css");
				document.getElementsByTagName('link')[1].setAttribute('href', 'css/keyboardinvert.css');
			} else {
				mainStyle.setAttribute('href', 'css/matheuplouffe.css');
				document.getElementsByTagName('link')[1].setAttribute('href', 'css/keyboard.css');
			}
			break;
		// active pong
		case 'PONG':
		case 'PONG.EXE':
			setUpPong();
			break;
		// if a invalid command has been entered
		default:
			var currentAnimation = document.getElementById('inputError').style.animationName;
			if(currentAnimation == 'errorBlink1')
			{
				document.getElementById('inputError').style.animationName = "errorBlink2";
				document.getElementById('inputError').style.animationDuration = "0.75s";
				document.getElementById('inputError').style.animationIterationCount = "4";
			} else {
				document.getElementById('inputError').style.animationName = "errorBlink1";
				document.getElementById('inputError').style.animationDuration = "0.75s";
				document.getElementById('inputError').style.animationIterationCount = "4";
			}
			break;
	}

	// reset the field after the enter key has been clicked
	document.getElementById('write').innerHTML = "MP:\\";
	blinkingCursor();
}