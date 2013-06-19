

$(document).ready(function(){
  var bit = 0
  var bit_pix_cnt = 10000

  $('#bit_canvas').wrap($('<div>').attr('id', bit+'').attr('class', 'bit_pix'))

  for (bit = 1; bit<bit_pix_cnt; bit++){
      $('#0').after($('<div>').attr('class', 'bit_pix'))
  }

  // $('.bit_pix').on('mouseover', function(){
  //   alert('mo')
  //   // $(this).background('red')
  // })

});