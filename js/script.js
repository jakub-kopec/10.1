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

