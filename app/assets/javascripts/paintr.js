// Define your functions here


// //Bind your events here
// $(document).ready(function(){
//   console.log('The DOM is loaded!');
// });


var current_color = '';
var is_painting = false;
var undoMemory = [[]]
var strokeNum = 0;

function add_color(color_choice){
  
  var color_input = $('#color-input').val()
  var color_choice = color_input || color_choice
  // var color_choice = color_choice || color_input;

  console.log('Color Added:' + color_choice)
  var new_swatch = $('<div>')
  new_swatch.addClass('swatch');
  new_swatch.css('background-color', color_choice);
  $('#pallette').append(new_swatch)
  $('#color-input').val('')
}

function add_image(image_choice){
  
  var image_input = $('#image-input').val()
  var image_choice = image_input || image_choice

  console.log('Image Added:' + image_choice)
  var new_image_swatch = $('<div>')
  new_image_swatch.addClass('image-swatch');
  new_image_swatch.css('background-image', 'url(\'' + image_choice + '\')');
  new_image_swatch.css('background-repeat', 'no-repeat');
  new_image_swatch.css('background-size', '100%');
  $('#image-pallette').append(new_image_swatch)
  $('#image-input').val('')
}

function select_color(){
  var color = $(this).css('background-color')
  $('#selected-color').css('background-color', color)
  current_color = color
}

function select_image(){
  var image = $(this).css('background-image')
  $('#canvas').css('background-image', image)
  $('#canvas').css('background-repeat', 'no-repeat');
  $('#canvas').css('background-size', '100%');
}

function draw(){
  console.log(is_painting)
  if (is_painting){
    $(this).css('background-color', current_color)
  }
}

function populate_canvas(){
  for (var i = 0; i<1200; i++){
  var dot = $('<div id=dot_'+i+'></div>');
  dot.addClass('paint-dot');
  $('#canvas').prepend(dot);
  }
}

function clear_pallette(){
  $('#pallette').empty()
}

function clear_image_pallette(){
  $('#image-pallette').empty()
}

function genMemory(){
  var newMem = [];
  var numchilds = $('#canvas').children().length;
  for(var i=0; i<numchilds; i++){
    if($('#dot_'+i).css('background-color')!='rgba(0, 0, 0, 0)' ){
      newMem.push(['#dot_'+i, $('#dot_'+i).css('background-color')])
    }
  }
  undoMemory.push(newMem)
}


function undo(){
  undoMemory.pop()
  var lastState = undoMemory.pop()
  var numchilds = $('#canvas').children().length;
  for(var i=0; i<numchilds; i++){
    $('#dot_'+i).css('background-color', '')
  }
  for(var i=0; i<lastState.length; i++){
    cell = lastState[i];
    $(cell[0]).css('background-color', cell[1])
  }
}


//Alternate (pretty) way to run code after DOM load
$(function(){
  // console.log('DOM loaded...');
  populate_canvas();
  add_color('red')
  add_color('green')
  add_color('blue')
  add_image('http://AndrewMadden.com/images/face.png')
  
  $('#add-color').on('click', add_color)
  $('#clear-pallette').on('click', clear_pallette)
  $('#undo').on('click', undo)
  $('#pallette').on('click', '.swatch', select_color)
  $('#canvas').on('mouseover', '.paint-dot', draw)

  $('#add-image').on('click', add_image)
  $('#clear-image-pallette').on('click', clear_image_pallette)
  $('#image-pallette').on('click', '.image-swatch', select_image)


  $('#canvas').on('mousedown', function(){
    is_painting = true
    })
  $('#canvas').on('mouseup', function(){
    is_painting = false
     genMemory()
  })
  $('#canvas').on('mouseleave', function(){
    if (is_painting){
      is_painting = false
     genMemory()
   }

  })


})