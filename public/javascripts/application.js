jq = jQuery;
var SLIDE_SPEED = 500;










//tog
function tog(clicker, toggler, callback, speed){
  if (speed == undefined) {speed = SLIDE_SPEED;}
  if (callback) {jq(clicker).click(function(){jq(toggler).slideToggle(speed, callback); return false;});}
  else {jq(clicker).click(function(){jq(toggler).slideToggle(speed); return false;});}

}
function togger(j, callback, speed){
  if (speed == undefined) {speed = SLIDE_SPEED}
  if(callback) {jq(j).slideToggle(speed, callback); }
  else {jq(j).slideToggle(speed); }
}
//tog














//message
function async_message(m, d){message(m, d);}
function msg(m, d){message(m, d);}
function messages(m, d){message(m, d);}
function message(message, duration){
    if (duration == undefined){ duration = 3000;}
    if (jq.browser.msie) { jq("#message").css({position: 'absolute'}); }
    jq("#message").text(message).fadeIn(1000);
    setTimeout('jq("#message").fadeOut(2000)',duration);
    return false;
}
//message


function debug(m){if (typeof console != 'undefined'){console.log(m);}}
function puts(m){debug(m);}













//startup
jq(function(){
	jQuery("#waiter").ajaxStart(function(){jq(this).show();}).ajaxStop(function(){jq(this).hide();}).ajaxError(function(){jq(this).hide();});
})
//startup

// Conor's Mad house of unobtrusiveness!!!

$(document).ready(function() {
	
	var label = $('#destinationSearchForm label').text()
	$('#destinationSearchForm label').remove();
	$('input.destinationSearch').addClass("formDescription").attr('value', label);
	
	$('input.destinationSearch').focus(function(){
		$(this).removeClass("formDescription").attr('value', '');
	});
	
});








