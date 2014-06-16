 
(function($) {
  $.randomize = function(arr) {
     for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
     return arr;
  };
})($);
$(document).ready(function(){
		
		
	// Properties of each choice
	
	// Display choices using data from data.js
	var choices=[];
	if($.isArray(data.choices))
	{
		$.each(data.choices, function(key, item) {
		choice_num = key + 1;
		choices.push("<a id=\"choice"+choice_num+"\" href=\"javascript:void(0)\" class=\"choice\"><span>"+ item.text+"</span></a>");	
		});
	}
	
	//do a quick shuffle
	if(data.randomize == "yes") {
		$.randomize(choices);
	}	
	// Display choices using data from data.js
	for (var choice in choices){
		$(".choices").append(choices[choice]);
	}	
		
		
	$('.choice').draggable( {
		containment: '#content',
		cursor: 'move',
		stack: '.choice',
		revert: true,
		start: function(event, ui) {
			that = this;
		 },
		stop: function(event, ui) {
			$('div.mark:empty').each(function(){
		if($.trim($(this).html()).length == 0){
 			$(this).append("<a href=\"javascript:void(0)\"><img src=\"clear.gif\" border=\"0\"></img></a>");
			$(".targets div.selected").css("border","none");			
		}
});
		
		
		}

	} );
	
	// Write background image from data.js at the top of targets div	
	 $(".targets").prepend(" <img src=\"" + data.backgroundimage + "\"></img>");
		
	// Display labels and set css from data.js
	if($.isArray(data.labels))
	{
		$.each(data.labels, function(key, item) {
		label_num = key + 1;
		$(".targets").append("<div id=\"labeltext"+label_num+"\" class=\"label\"><span>"+ item.text+"</span></div>");	
		$("#labeltext"+label_num).css("top",item.top);
		$("#labeltext"+label_num).css("left",item.left);
		$("#labeltext"+label_num).css("width",item.width);
		$("#labeltext"+label_num).css("text-align",item.textalign);			
		
		});
	}		
	
	
	// Apply locations of droppable areas from data.js (in css)
	if($.isArray(data.droppableareas))
	{
		$.each(data.droppableareas, function(key, item) {
		droppable_num = key + 1;
		$(".targets").append("<div id=\"droppable-area"+droppable_num+"\" class=\"choice"+droppable_num+" droppable mark\"><a href=\"javascript:void(0)\"><img src=\"clear.gif\" border=\"0\"></img></a></div>");
		$("#droppable-area"+droppable_num).css("top",item.top);
		$("#droppable-area"+droppable_num).css("left",item.left);		
        });
		
	}
	
	$(".choice").css("font-size",data.choicefontsize);
	$(".choice").css("color",data.choicetextcolour);
	$(".label").css("font-size",data.labelfontsize);
	$(".label").css("color",data.labeltextcolour);
	
	// Make choices div droppable so can drop choices back
	$(".choices").droppable ({
		drop:function(event, ui){
			ui.draggable.css({top:"0px",left:"0px"});
			$(this).append(ui.draggable);		 
		}
	
	})
	
	//target	
	// Make droppable	  
	$(".droppable").droppable({
		 // Event triggered when an accepted draggable(choice) is dropped on the droppable	
		 drop:function(event, ui){
			ui.draggable.css({top:"0px",left:"0px"});//lock in place
			// Return choice back to choices div if in current target (droppable)
			$(".choices").append($(this).find(".choice").css({left:"",top:""}).removeClass("selected"));//chuck out any choices that were already there and put back into top list
			// Add draggable html to droppable - overwrites what's in the target
			$(this).html(ui.draggable);//add to target
		 }
	}); 
	

	// If target is clicked (tapped)
	$(".targets div.mark").click(function(){
		// Is a choice selected from the choices at the top
		if($(".choices a.selected").length){
			// Is there already a choice in the target?
			$(".choices").append($(this).find(".choice").css({left:"",top:""}).removeClass("selected"));//chuck out
			// Add html of the 'selected' choice in the list at the top
			$(this).html($(".choices a.selected"));//append
		// If target is selected
		}
		else {
			$(".choices").append($(this).find(".choice").css({left:"",top:""}).removeClass("selected"));//chuck out
			// select first of the items from the choices
			$(this).html($(".choices a").eq(0));//append
		}
		$(".targets div.mark").removeClass("selected");
		$(this).addClass("selected");		
		$(this).find("a").focus();
	});
	// Add 'selected' to choice selected
	$(".choices a").click(function(){	
		if($(this).parents(".targets").length)return;
		if($(this).hasClass("selected")){
			$(".choices a").removeClass("selected");
		}else{
			$(".choices a").removeClass("selected");
			$(this).addClass("selected");
			$(this).focus();
		}
	});
 

  
$("#answer").hide();

$('a.check,#answer').click(function(event){
	$('#answer').show();
	event.stopPropagation();
	});
	
$("html").mousedown(function() {
	$("#answer").hide();
	$("#answer").empty();
	});	
  
$("html").click(function() {
	$("#answer").hide();
	$("#answer").empty();
	});	  
  
});

$(document).ready(function(){
	$("#check").click(function(){
		$(".targets div.selected").css("border","none");
		var countofcorrect=0;
		$(".droppable").each(function(){
			var choice=$(this).find(".choice").attr("id");
			if($(this).hasClass(choice)){
				countofcorrect++;
			}else{
				//chuck out
				$(".choices").append($(this).find(".choice"));
				$(".choices a.choice").removeClass("selected");
				if($.trim($(this).html()).length == 0){
					$(this).append("<a href=\"javascript:void(0)\"><img src=\"clear.gif\" border=\"0\"></img></a>");
				}
				
			}

		});

		
		switch(countofcorrect){
			case 0:
				$("#answer").append("None of your answers are correct.");
			break;
			case 1:
				$("#answer").append("One answer is correct.");
			break;
			case 2:
				$("#answer").append("Two answers are correct.");
			break;
			case 3:
				$("#answer").append("Three answers are correct.");
			break;
			case 4:
				$("#answer").append("Four answers are correct.");
			break;			
			case 5:
				$("#answer").append("Five answers are correct.");
			break;
			case 6:
				$("#answer").append("Six answers are correct.");
			break;
			case 7:
				$("#answer").append("Seven answers are correct.");
			break;			
			case 8:
				$("#answer").append("all your answers are correct.");
			break;
		}
		
	
	});
});

$(document).ready(function(){
	$("#reveal").click(function(){
		
			$(".choice").each(function(){
				var id=$(this).attr("id");
				$("."+id).html(this);
			});
	});
});			


$(document).ready(function(){
	$('#reset').click(function() {
    location.reload();
	});
});	
