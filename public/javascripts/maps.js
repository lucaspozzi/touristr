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

function placeMarker(lat, lng){
	var point = new GLatLng(lat, lng);
	map.addOverlay(new GMarker(point));
	bounds.extend(point);
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
	var name = $('dl#destinations dt.name').text();
	var lat = $('dl#destinations dd.lat').text();
	var	lng = $('dl#destinations dd.lng').text();
	placeMarker(lat, lng);
	refreshBounds();
	map.setZoom(6);
};

function showDestinations(){
	$('ul#destinations li').each(function(){
		var lat = $(this).children('div.mapInformation').children('span.lat').text();
		var lng = $(this).children('div.mapInformation').children('span.lng').text();
		placeMarker(lat, lng);
		refreshBounds();
	});
};




