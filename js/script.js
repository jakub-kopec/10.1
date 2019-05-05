//10.2

var carousellTemplate= document.getElementById('template-carousell-slide').innerHTML;

var carousellSlidesAdded = '';


for(var i = 0; i < carousellSlides.length; i++){
    console.log(carousellSlides[i]);
    carousellSlidesAdded += Mustache.render(carousellTemplate, carousellSlides[i]);
}

var mainCarousel = document.getElementById('carousel')
console.log('mainCarousel', mainCarousel)
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
    // The location of Thailand Beach
    var thailandBeach = {lat: 9.482070, lng: 100.012520};
    // The map, centered at Thailand Beach
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: thailandBeach});
    // The marker, positioned at Thailand Beach
    var marker = new google.maps.Marker({position: thailandBeach, map: map});

    carousellSlides.forEach(function(element) {
        var coordinates = element.coords
        console.log(coordinates)
        var marker = new google.maps.Marker({position: coordinates, map: map})
    })
}
