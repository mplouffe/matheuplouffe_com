/*
 * Order Form Validation: 
 * Handles the validation of form elements on the order page.
 *
 * Script: formValidate.js
 * Author: Matheu Plouffe (except where noted)
 * Version: 1.3
 * Date Created: 4.02.2016
 * Last Updated: 4.20.2016
 *
 */

/* removes whitespace from a string value
 * retunrs a string with leading and trailing whitespace-removed
 * Author: Alan Simpson
 */
 function trim(str)
 {
 	// Uses a regex to remove spaces from a string.
 	return str.replace(/^\s+|\s+$/g,"");
 }

/* ensures a form field has input
 * returns true if there is input, false if there is no input
 * Author: Alan Simpson
 */
function formFieldHasInput(fieldElement)
{
	if(fieldElement.value == null || trim(fieldElement.value) == "")
	{
		return false;
	}
	
	return true;
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	hideErrors();
	
	if(formHasErrors())
	{
		e.preventDefault();
		return false;
	}
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Clear input?') )
	{
		// Ensure all error fields are hidden
		hideErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{	
	// set the errorFlag
	var errorFlag = false;
	
	// check the name field for input
	var nameField = document.getElementById('fullname');

	if(!formFieldHasInput(nameField))
	{
		// if empty set, turn on the error
		document.getElementById("fullname_error").style.display = "block";
		
		// if it's the first error encountered, set focus and select text
		if(!errorFlag)
		{
			nameField.focus();
			nameField.select();
			errorFlag = true;
		}
	}

	// check the phone number
	// phone regex taken from: http://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
	var phoneNumber = document.getElementById('phone');
	var phoneregex = new RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);

	if(!formFieldHasInput(phoneNumber))
	{
		document.getElementById('phone_error').style.display = "block";

		if(!errorFlag)
		{
			phone.focus();
			phone.select();
			errorFlag = true;
		}
	}
	else if(!phoneregex.test(phoneNumber.value))
	{
		document.getElementById('phoneformat_error').style.display = "block";

		if(!errorFlag)
		{
			phone.focus();
			phone.select();
			errorFlag = true;
		}
	}

	// check the email
	// regex taken from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	var emailRegex = new RegExp(/\S+@\S+\.\S+/);
	var email = document.getElementById("email");
	
	// check the email
	if(!formFieldHasInput(email))
	{
		// if the postal code is empty
		document.getElementById("email_error").style.display = "block";
		if(!errorFlag)
		{
			email.focus();
			email.select();
			errorFlag = true;
		}
	}
	else if(!emailRegex.test(email.value))
	{
		// if the postal code has a value, but isn't an email address
		document.getElementById("emailformat_error").style.display = "block";
		if(!errorFlag)
		{
			email.focus();
			email.select();
			errorFlag = true;
		}
	}
	
	return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
	// get all the errors
	 var errors = document.getElementsByClassName("error");
	 
	 for(var i = 0; i < errors.length; i++){
		 errors[i].style.display = "none";
	 }
}