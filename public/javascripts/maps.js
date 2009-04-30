var map;
var markers = [];
var bounds = new GLatLngBounds();


// Generic Map functions

function initializeMap() {
	if(GBrowserIsCompatible()){
		map = new GMap2(document.getElementById('map'));
		map.addControl(new GSmallMapControl());
		map.setCenter(new GLatLng(0, 0), 2);
		$('#map').animate({
			opacity: 1
		});
	}
};

function placeMarker(markerInfo, infoWindow){
	var point = new GLatLng(markerInfo[1], markerInfo[2]);
	var marker = new GMarker(point);
	map.addOverlay(marker);
	bounds.extend(point);
	if (infoWindow) {
		GEvent.addListener(marker, "click", function() {
			$('div#itemContent').children('a#close').click(function(e) {
				e.preventDefault();
				$(this).parent().fadeOut();
			});
			$('div#itemContent').children('h3').empty().text(markerInfo[0]);
			$('div#itemContent').children('p').empty().html(markerInfo[3]);
			$('div#itemContent').fadeIn();
		});
		
	} else{
		
	};
};

function refreshBounds() {
	map.setZoom(map.getBoundsZoomLevel(bounds));
	map.setCenter(bounds.getCenter());
};

function resetMap() {
	bounds = null;
	bounds = new GLatLngBounds();
	map.clearOverlays();
};

$(document.body).unload(function() {
	if (GBrowserIsCompatible()) {
		GUnload();
	}
});

// Destination Specific Functions

function showDestination() {
	var markerInfo = new Array();
	markerInfo[0] = $('dl#destinations dt.name').text();
	markerInfo[1] = $('dl#destinations dd.lat').text();
	markerInfo[2] = $('dl#destinations dd.lng').text();
	placeMarker(markerInfo);
	refreshBounds();
	map.setZoom(6);
};

function showAttraction() {
	var markerInfo = new Array();
	markerInfo[1] = $('span.lat').text();
	markerInfo[2] = $('span.lng').text();
	placeMarker(markerInfo)
	refreshBounds();
	map.setZoom(11);
};

var prevMarker
function moveAttraction(){
	var markerInfo = new Array();
	markerInfo[1] = $('span.lat').text();
	markerInfo[2] = $('span.lng').text();
	placeMarker(markerInfo)
	refreshBounds();
	map.setZoom(13);
	
  GEvent.addListener(map, "click", function(mark, point) {

	  if (prevMarker != null) {
	  	map.removeOverlay(prevMarker);
	  }
	  var marker = new GMarker(new GLatLng(point.lat(), point.lng()), {title: 'your attraction'});
	  map.addOverlay(marker);
	  prevMarker = marker;

	  $('input#destination_attraction_lat').val(point.lat());
	  $('input#destination_attraction_lng').val(point.lng());
	});
};      

function showListingOnMap(list, infoWindow){
	list.each(function(){
		var markerInfo = new Array();
		markerInfo[0] = $(this).children('div.listingContent').children('h4').text();
		markerInfo[1] = $(this).children('div.mapInformation').children('span.lat').text();
		markerInfo[2] = $(this).children('div.mapInformation').children('span.lng').text();
		markerInfo[3] = $(this).children('div.listingContent').children('p').html();
		
		placeMarker(markerInfo, infoWindow);
		refreshBounds();
	});
};



