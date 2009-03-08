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




jQuery.fn.checked = function(){
  return this.attr('checked');
}










//message
function async_message(m, d){message(m, d);}
function messages(m, d){message(m, d);}
function msg(m, d){message(m, d);}
function message(message, duration){
    if (duration == undefined){ duration = 3000;}
    if (jq.browser.msie) { jq("#message").css({position: 'absolute'}); }
    jq("#message").text(message).show().check_width().center();
    setTimeout('jq("#message").hide().css("width", "");',duration);
    return false;
}
//message


function debug(m){if (typeof console != 'undefined'){console.log(m);}}
function puts(m){debug(m);}


jQuery.fn.center = function(){
  return this.each(function(){
    var win = jq(window).width();
    var width = jQuery(this).width();
    jq(this).css({width: width +'px', left: (win/2 - width/2) + 'px'});
  })
}


jQuery.fn.check_width = function(){
  return this.each(function(){
    var win = jq(window).width();
    var width = jQuery(this).width();
    var height = jQuery(this).height();
    if (width/2 > height || width*2 >= win){ return; }
    jq(this).css({width: width*2 +'px'});
  })
}





function reinit_events(){
  $('input.chooseDate').datePicker({clickInput:true});
}






//startup
jq(function(){
	jQuery("#waiter").ajaxStart(function(){jq(this).show();}).ajaxStop(function(){jq(this).hide();}).ajaxError(function(){jq(this).hide();});
	reinit_events();
})
//startup

// Conor's Mad house of unobtrusiveness!!!

function toDoJS(){
	// Toggles the new To-Do form
	$('a#addNewToDo').click(function(e){
			e.preventDefault();
			var text = $(this).text();
			if (text == "Add") {
				$('div#newToDo').slideDown();
				$(this).text("Cancel");
			}else{
				$('div#newToDo').slideUp();
				$(this).text("Add");
			};
		});

	
	// Hides the new To-Do form on submission
	$('div#newToDo form').submit(function(){
		$('a#addNewToDo').text("Add");
		$(this).parent().slideUp();
	});
	
	// // Shows, and hides delete link for each list item
	// 	var beingShown = false;
	// 	var visible = false;
	// 	
	// 	$('ul#todos_list li').mouseover(
	// 		function(){
	// 			var popup = $(this).children('div').children('div.todo_heading').children('a');
	// 			
	// 			if(beingShown || visible) {
	// 				return;
	// 			}else{
	// 				beingShown = true;
	// 				
	// 				popup.animate({
	// 					opacity: 1
	// 				}, '', function(){
	// 					beingShown = false;
	// 					visible = true;
	// 				});
	// 			}
	// 			
	// 	}).mouseout(
	// 		function(){
	// 			var popup = $(this).children('div').children('div.todo_heading').children('a');
	// 			
	// 			popup.animate({
	// 				opacity: 0
	// 			}, '', function(){
	// 				visible = false;
	// 			});
	// 	});
};

$(document).ready(function() {
	
	var label = $('#destinationSearchForm label').text()
	$('#destinationSearchForm label').remove();
	$('input.destinationSearch').addClass("formDescription").attr('value', label);
	
	$('input.destinationSearch').focus(function(){
		$(this).removeClass("formDescription").attr('value', '');
	});

	
});







