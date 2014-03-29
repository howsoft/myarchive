
var joins = [], joining = false, suitor = '', canvas, ctx;

function init() {

  if(typeof Storage === 'undefined') {
	$('#btn_save').hide();
  }

  canvas = document.getElementById('the_canvas');
  ctx = canvas.getContext('2d');

  $('.btn_adder').click(function() {
	add_node( $(this).css('background-color') );
  });

  $('#btn_save').click(function() {

	var map_name = prompt('Please enter a name for this map:');

	if(map_name === null || map_name.trim() === '') {
	  return;
	}

	var save_string = '', $node, job = {}; /* job is json object */

	$('.nodediv').each(function(index, node) {

	    var $node = $(node), id, $textarea;

	 	id = $node.attr('id');
	  	$textarea = $( ('#' + id) + ' textarea');

	  	save_string += '\nid: ' + id + '\n' +
		'text: ' +  $textarea.val()  +
		'\nx: ' + $node.position().top +
		'\ncolor: ' + $textarea.css('background-color') +
		'\n----------------------------\n';
	});

	save_string += '\njoins\n';

	$(joins).each(function(index, join) {
	  console.log('\n' + join.a + ' : ' + join.b + '\n');

	});

	//alert(save_string);

  });

  function add_node(bgcolor) {

	var theid = get_next_id();

	$('#map').append("<div tabindex='1' id='div" + theid + "' class='nodediv'><div tabindex='1' class='btn_join'>join</div><div tabindex='1' class='btn_close'>x</div><br/><textarea  id='" + theid + "' class='nodetext'></textarea></div>");

	var $textarea = $('#' + theid);
	var $div = $('#div' + theid);
	var $closebutton = $('#div' + theid + ' .btn_close');
	var $joinbutton = $('#div' + theid + ' .btn_join');

	$textarea.css('background-color', bgcolor);

	$closebutton.click(function() {
	  	remove_joins( $(this).parent().attr('id') );
	   	$(this).parent().remove();
	    draw_all_joins();
	});

	$joinbutton.click(function() {

	  	$joinlink = $(this);

	   	if(suitor === $joinlink.parent().attr('id') ) {
		  return; /* clicked the same one again */
		} else {
		  if(!joining) {
			suitor = $joinlink.parent().attr('id');
			joining = true;
			$joinlink.css({
			  	'font-weight': 'bold',
				'color': 'blue',
			  	'text-decoration': 'none'
			});
			$joinlink.html('joining');

		  }else {
	        add_join(suitor, $joinlink.parent().attr('id'));
			suitor = '';
			joining = false;
		  }
		}
	});

	$div.draggable({
		 	drag: function() {
			  draw_all_joins();
			}
		}
	);

	$div.attr('tabIndex', '1');

  }
}

function remove_joins(theid) {

  var new_joins = new Array();

  for(var i=0; i<joins.length; i++) {

	if(joins[i].a !== theid && joins[i].b !== theid) {
	    new_joins.push(joins[i]);
	}
  }

  joins = new_joins;

}

function add_join(a, b) {

  	$joinlink = $( ('#' + a + ' .btn_join') );
  	$joinlink.html('join');
	$joinlink.css({
	  'font-weight': 'normal',
	  'color': 'black',
	  'text-decoration': 'underline'
	});

  	joins.push({'a': a, 'b': b});

  	draw_all_joins()
}

function draw_all_joins() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

  	for(var i=0; i<joins.length; i++) {
	  draw_join(joins[i].a, joins[i].b);
	}
}

function draw_join(a, b) {

  var a_top, a_left, a_width, a_height,
	b_top, b_left, b_width, b_height,
	$a = $('#' + a),
	$b = $('#' + b),
  	a_pos = $a.position(),
  	b_pos = $b.position(),
	startx, endx, starty, endy, grad;

 	a_top = a_pos.top;
  	a_left = a_pos.left;
  	a_width = $a.width();
  	a_height = $a.height();

  	b_top = b_pos.top;
  	b_left = b_pos.left;
  	b_width = $b.width();
  	b_height = $b.height();

  	startx = a_left + (a_width/2);
  	starty = a_top + (a_height/2);

  	endx = b_left + (b_width/2);
  	endy = b_top + (b_height/2);

  	grad= ctx.createLinearGradient(startx, starty, endx, endy);
  	grad.addColorStop(0, "black");
  	grad.addColorStop(1, "white");

    ctx.strokeStyle = grad;
  	ctx.lineWidth = 4;
  	ctx.beginPath();
	ctx.moveTo(startx, starty);
	ctx.lineTo(endx, endy);
	ctx.stroke();
	ctx.closePath();
}

function get_next_id() {
  return 'node_' + new Date().getTime();
}