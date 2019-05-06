//10.2

var carousellTemplate= document.getElementById('template-carousell-slide').innerHTML;

var carousellSlidesAdded = '';


for(var i = 0; i < carousellSlides.length; i++){
    console.log(carousellSlides[i]);
    carousellSlidesAdded += Mustache.render(carousellTemplate, carousellSlides[i]);
}

var mainCarousel = document.getElementById('carousel')
mainCarousel.insertAdjacentHTML('beforeend', carousellSlidesAdded)

//Initializing
$('.main-carousel').flickity({
    cellAlign: 'left',
    contain: true,
    hash: true
});

var flkty = new Flickity('.main-carousel');

// Reset button
var reset = document.getElementById('reset')

reset.addEventListener( 'click', function( event ) {
    if ( !matchesSelector( event.target, '.button' ) ) {
        return;
    }
    var selector = event.target.getAttribute('data-selector');
    flkty.selectCell( selector );
})


//Progress bar
var progressBar = document.querySelector('.progress-bar')

flkty.on( 'scroll', function( progress ) {
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
});

//GMaps
// Initialize and add the map
window.initMap = function() {
    var thailandBeach = carousellSlides[0].coords;
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: thailandBeach});
    var markers = [];

    for (i=0; i<carousellSlides.length; i++) {
        markers[i] = new google.maps.Marker({
            position: carousellSlides[i].coords,
            map: map,
            id: i
        });
        markers[i].addListener('click', function(){
            flkty.select(this.id)
        })
    }

    flkty.on( 'change', function(index) {
        smoothPanAndZoom(map, 4, carousellSlides[index].coords)
    });
}

function smoothPanAndZoom (map, zoom, coords) {

    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
    jumpZoom = Math.min(jumpZoom, zoom -1);
    jumpZoom = Math.max(jumpZoom, 3);

    smoothZoom(map, jumpZoom, function(){
        smoothPan(map, coords, function(){
            smoothZoom(map, zoom);
        });
    });
};

function smoothZoom (map, zoom, callback) {
    var startingZoom = map.getZoom();
    var steps = Math.abs(startingZoom - zoom);

    if(!steps) {
        if(callback) {
            callback();
        }
        return;
    }

    var stepChange = - (startingZoom - zoom) / steps;

    var i = 0;
    var timer = window.setInterval(function(){
        if(++i >= steps) {
            window.clearInterval(timer);
            if(callback) {
                callback();
            }
        }
        map.setZoom(Math.round(startingZoom + stepChange * i));
    }, 80);
};

function smoothPan (map, coords, callback) {
    var mapCenter = map.getCenter();
    coords = new google.maps.LatLng(coords);

    var steps = 12;
    var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

    var i = 0;
    var timer = window.setInterval(function(){
        if(++i >= steps) {
            window.clearInterval(timer);
            if(callback) callback();
        }
        map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
    }, 1000/30);
};
