/*
javascript
==========
*/
none

/*
header
======
*/
<script type="text/javascript">
  var temprecords = new Array();
  var records = new Array();
  var current_user_oucu = "";
  var current_user_index = 999;
  var allscores = {};

 var content_node = null;

 var texts = {

  '1' : '1. When talking to others in a noisy room, you can hear when someone mentions your name …',

  '2' : '2. You work harder when you know that someone is interested in your work …',

  '3' : '3. When you are feeling anxious, it can be hard to remember details of what someone else is saying to you …',

  '4' : '4. You do things that you do not want to do because others persuade you to do so.',

  '5' : '5. You are more likely to repeat an activity when you are rewarded for doing it.',

  '6' : '6. You are more likely to follow advice given by someone you consider to be an expert in their field …'

};


function get_oucu() {

  var el = document.getElementById('dp_username');
  return el.value;
}


</script>

<input id='dp_username' style='display: none;' type='text' value='--username--' />

/*
record
======
*/
<script type="text/javascript">

if(typeof temprecords !== "undefined") {
temprecords.push([
'[[1]]',
'[[2]]',
'[[3]]',
'[[4]]',
'[[5]]',
'[[6]]',
'[[7]]',
'[[8]]',
'[[9]]',
'[[10]]',
'[[11]]',
'[[12]]',
'**more**',
'##Creator##',
'##Creator id##',
'##Record number##',
'##id##',
'**delete**',
'**edit**',
'[[oucu]]'
]);

} // end of if

</script>


/*
footer
======
*/
<div id="dp_content"></div>

<script type="text/javascript">

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/, '');
};

function striphtml(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function getUrlVars() { 
  var map = {}; 
  var parts = window.location.search.replace(/[?&]+([^=&]+)(=[^&]*)?/gi, function(m,key,value) { map[key] = (value === undefined) ? true : value.substring(1); });
  return map; 
}

function setVars(y_content_node){
	content_node = y_content_node;
}

////////// RECORD CONSTRUCTOR /////////////////////////////////////
function Record(a, b, c, d, e, f, g, h, i, j, k, l, more, creator, creatorid, record_number, the_id, deletecode, editcode, oucu) {

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    this.g = g;
    this.h = h;
    this.i = i;
    this.j = j;
    this.k = k;
    this.l = l;
    this.more = more;
    this.creator = creator;
    this.creatorid = creatorid;
    this.record_number = record_number;
    this.the_id = the_id; // dataplus own id
    this.deletecode = deletecode;
    this.editcode = editcode;

    this.oucu = oucu;

    this.yahooref = null;
    this.html = record_html;
    this.set_scores = set_scores;
    this.score1 = 0;
    this.score2 = 0;

 }
////////// end of RECORD CONSTRUCTOR ////////////////////////

function set_scores() {
  /* score is number of true (out of six) */
  var score1 = 0, score2 = 0;

    if(this.a === "true") {
      score1 += 1;
      allscores.a += 1;
    }
    if(this.b === "true") {
      score1 += 1;
    }
    if(this.c === "true") {
      score1 += 1;
    }
    if(this.d === "true") {
      score1 += 1;
    }
    if(this.e === "true") {
      score1 += 1;
    }
    if(this.f === "true") {
      score1 += 1;
    }       
    if(this.g === "true") {
      score2 += 1;
    }
    if(this.h === "true") {
      score2 += 1;
    }
    if(this.i === "true") {
      score2 += 1;
    }
    if(this.j === "true") {
       score2 += 1;
    }
    if(this.k === "true") {
      score2 += 1;
    }
    if(this.l === "true") {
      score2 += 1;
    }
    
    this.score1 = score1;
    this.score2 = score2;

 
} // end of set_scores()


function record_html() {

  var s = "";
  
  s += "<span class='partlabel'>Part 1</span>";

  s += "<div class='barcontainer'>";
  for(var i=1; i<=6; i++) {
    if(i <= this.score1) {   
      s += "<div class='true'>T</div>";
    } else {
      s += "<div class='false'>F</div>";
    }
  }
  s += "</div>";

  s += "<span class='partlabel'>Part 2</part>";

  s += "<div class='barcontainer'>";
  for(var i=1; i<=6; i++) {
    if(i <= this.score2) {   
      s += "<div class='true'>T</div>";
    } else {
      s += "<div class='false'>F</div>";
    }
  }
  s += "</div>";

  s += "<span class='namespan'>" + this.creator + " </span>";
  s += this.editcode;
  s += this.deletecode;
  
  s += "<hr/>";

  return s;
}



function show_defaultview(){

  var s = "";

  current_user_oucu = get_oucu();

  for(var i=0; i<records.length; i++) {
	
    var record = records[i];
    record.set_scores();
    
    if(current_user_oucu === record.oucu) {
      current_user_index = i;
    }

    if(record.text === "") {
      continue;
    }

  } // end of loop

s += "<i>Percentage of people who thought that other people's behaviour would be the same as their own for each statement (i.e. who answered the same for themselves and for other people)</i><br/>";

s += "<table>";

s += "<tr><td>" + texts["1"];
s += "</td><td>" + output_percent_bar( get_percent_where_part1_same_as_part2("a") ) ;
s += "</td></tr>";

s += "<tr><td>" + texts["2"];
s += "</td><td>" + output_percent_bar( get_percent_where_part1_same_as_part2("b") );
s += "</td></tr>";

s += "<tr><td>" + texts["3"];
s += "</td><td>" + output_percent_bar( get_percent_where_part1_same_as_part2("c") );
s += "</td></tr>";

s += "<tr><td>" + texts["4"];
s += "</td><td>" + output_percent_bar( get_percent_where_part1_same_as_part2("d") );
s += "</td></tr>";

s += "<tr><td>" + texts["5"];
s += "</td><td>" + output_percent_bar( get_percent_where_part1_same_as_part2("e") );
s += "</td></tr>";

s += "<tr><td>" + texts["6"];
s += "</td><td>" + output_percent_bar( get_percent_where_part1_same_as_part2("f") );
s += "</td></tr>";

s += "</table>";

s += "<br/><i>Percentage of people who answered true for themselves (first bar, in grey) and for other people (second bar, in purple)</i><br/>";

s += "<table>";

s += "<tr><td>" + texts["1"];
s += "</td><td>" + output_percent_bar(percent_true("a")) + output_percent_bar(percent_true("g"), true);

s += "</td></tr>";

s += "<tr><td>" + texts["2"];
s += "</td><td>" +  output_percent_bar(percent_true("b")) + output_percent_bar(percent_true("h"), true);

s += "</td></tr>";

s += "<tr><td>" + texts["3"];
s += "</td><td>" + output_percent_bar(percent_true("c")) + output_percent_bar(percent_true("i"), true);

s += "</td></tr>";

s += "<tr><td>" + texts["4"];
s += "</td><td>" + output_percent_bar(percent_true("d")) + output_percent_bar(percent_true("j"), true);

s += "</td></tr>";

s += "<tr><td>" + texts["5"];
s += "</td><td>" + output_percent_bar(percent_true("e")) + output_percent_bar(percent_true("k"), true);

s += "</td></tr>";

s += "<tr><td>" + texts["6"];
s += "</td><td>" + output_percent_bar(percent_true("f")) + output_percent_bar(percent_true("l"), true);

s += "</td></tr>";

s += "</table><br/>";

content_node.append(s);
content_node.append(get_table_html());
  
}

function get_percent_where_part1_same_as_part2(letter) {

var count = 0, percent = 0;
var letter2 = String.fromCharCode(letter.charCodeAt(0) + 6);
 
  for(var i=0; i<records.length; i++) {
    
    if(records[i] [letter] === records[i] [letter2]) {
      count++;
    }
  } // end of loop

  if(count == 0) {
    return 0;
  }

  percent = Math.round( (count/records.length) * 100 );

  return percent;

}

function get_table_html() {

  var s = "<i>Comparison of your individual results with other people's</i><br/><br/>For each statement:<ol><li>Did most people answer the same as you, or differently?<li>Did you predict correctly what other people would say?</ol>";
   
  if(current_user_index === 999) {
    s += "you haven't added a record yet";
    return s;
  }

  s += "<table id='summary_table'>";
  s += "<tr><td> </td><td>TRUE for me?</td><td>% respondents who thought it was true/false for themselves</td><td>Did you think it was TRUE/FALSE for other people?</td></tr>";
  
  s += output_row("a");
  s += output_row("b");
  s += output_row("c");
  s += output_row("d");
  s += output_row("e");
  s += output_row("f");

  s += "</table>";
 
  return s;
  
}

function output_row(letter) {

  var s = "", percent_t = 0, percent_f = 0;
  var percent_true_string = "", percent_false_string = "";
  var record = records[current_user_index];
 
  var s = "";

  var index = letter.charCodeAt(0) - 96;
  /*  so a ->1 etc. */

  var letter2 = String.fromCharCode(letter.charCodeAt(0) + 6);
  /* if index is a, letter2 is g etc. */

  s += "<tr>";
  s += "<td>" + texts[index] + "</td>";
  s += "<td>";

  if(record[letter] === "true") {
    s += "<span class='true'> T </span>";
  } else {
    s += "<span class='false'> F </span>";
  }
  s += "</td>";
  
  percent_t = percent_true(letter);
  percent_f = 100 - percent_t;

  percent_true_string = "<span class='true'>" + percent_t + "%</span>";
  percent_false_string = "<span class='false'>" + percent_f + "%</span>";
  s += "<td>" + percent_true_string + " / " + percent_false_string + "</td>";

  s += "<td>";

  if(  record[letter2] === "true"  ) {
    s += "<span class='true'> T </span>";
  } else {
    s += "<span class='false'> F </span>";
  }

  s += "</td>";

  s += "</tr>";

  return s;

} // end of output_row()



function percent_true(q) {
  
  var yesses = 0, percent = 0;

  for(var i=0; i<records.length; i++) {
    if(records[i][q] === "true") {
     yesses += 1; 
    }
  }

  if(yesses === 0) {
    return 0;
  }
 
 percent = Math.round ( (yesses/records.length) * 100 );

 return percent;

}

function output_percent_bar(percent, diff_color) {
 
  var s = "<div class='barcontainer'>", class_string = "";

  if(diff_color) {
    class_string = "true_b";
  } else {
    class_string = "true";
  }

   s += "<div style='width: " + percent + "%;' class='" + class_string + "'>" + percent + "%</div>";

  s += "</div></br>"; // end of barcontainer

  return s;
  
}

/* /////// EXECUTION STARTS HERE /////////// */

if( typeof temprecords !== "undefined") {

for(var i=0; i<temprecords.length; i++){

  records.push(
    new Record(
      temprecords[i][0],
      temprecords[i][1],
      temprecords[i][2],
      temprecords[i][3],
      temprecords[i][4],
      temprecords[i][5],
      temprecords[i][6],
      temprecords[i][7],
      temprecords[i][8],
      temprecords[i][9],
      temprecords[i][10],
      temprecords[i][11],
      temprecords[i][12],
      temprecords[i][13],
      temprecords[i][14],
      temprecords[i][15],
      temprecords[i][16],
      temprecords[i][17],
      temprecords[i][18],
      temprecords[i][19]
    
    )
  );
}

temprecords = null; // maybe save a bit of memory

} // end of if(temprecords)

YUI().use('node', function(Y){
	
	var y_content_node = Y.one("#dp_content");
	Y.on("available", startDisplay, "body", Y);
		
		function startDisplay(e){

			setVars(y_content_node);	
			show_defaultview();						
		}
});
 
</script>