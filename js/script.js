//Initializing
$('.main-carousel').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    hash: true
});

var flkty = new Flickity('.main-carousel');

// Reset button
var goTo1Btn = document.getElementById('go-to-1')

goTo1Btn.addEventListener( 'click', function( event ) {
    // filter for button clicks
    if ( !matchesSelector( event.target, '.button' ) ) {
        // console.log('dupa')
        return;
    }
    var selector = event.target.getAttribute('data-selector');
    flkty.selectCell( selector );
    console.log('data-selector', selector)
})


//Progress bar
var progressBar = document.querySelector('.progress-bar')

flkty.on( 'scroll', function( progress ) {
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
});