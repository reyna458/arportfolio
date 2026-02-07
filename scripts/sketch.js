let myPicker;
let c = '#7FC595';

 function setup() {
  createCanvas(100, 100);

  myPicker = createColorPicker(c); 
  myPicker.position(220, 75);
  }



$('#decor').click(function() {
  
 $('input').toggleClass('visible')

 .delay(5000).queue(function() {
   $('input').removeClass('visible')
 })

})

  function draw() {

  let c = myPicker.value();
  $('.colorable').css('background-color', c)
  $('#buttons').css('border-color', c)
   $('button').css('color', 'black')
  $('.selected').css('color', c)
  $('::selection').css('background-color', c)

 
  $(myPicker).css('left', '50%')
}

$('#footername').click(function() {
    $("html, body").animate({
    scrollTop: 0
  }, "slow");
})

