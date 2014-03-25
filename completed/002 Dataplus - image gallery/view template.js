CSS
===
.thumbnail {
    float: left;
    margin-left: 2em;
    margin-bottom: 1em;
    border: solid 1px gray;
}

.thumbnail img {
    width: 100px;
}

.caption_div {
    /*
       width + (padding * 2) should equal the
       width of the thumbnail
    */
    font-size: 0.8em;
    word-wrap:break-word;
    width: 90px;
    height: 40px;
    padding: 5px;
    line-height: 110%;
    background-color: #efefef;
 }

#dp_content {
    width: 80%;
    min-width: 40%;
   
}

.category {
    font-weight: bold;
    color: #666699;
}

Header
======
<script type="text/javascript">
  var temprecords = new Array();
  var records = new Array();
  var content_node = null;
  var parameters = null;
</script>

<h2>Image Gallery</h2>

<div class="dataplus_record_navigation">##Record navigation##</div>
<div class="dataplus_record_count">##Record count##</div>

Record
======
<script type="text/javascript">
temprecords.push([
'[[image]]',
'[[category]]',
'**more**',
'[[caption]]',
'[[reference]]',
'##Creator##',
'##Record number##',
'##id##'
]);
</script>

Footer
======
<div id="dp_content"></div>
<script type="text/javascript">

var SHORT_CAPTION_LENGTH = 30;

var parameters = getUrlVars();

// utility function for trimming strings
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/, '');
};

function striphtml(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

//// FUNCTIONS THAT DEFINE A RECORD //////
function Record(image, category, more, caption, reference, creator, record_number, the_id){

	if(image.indexOf("<img") == -1){
		this.image = "<img src='/includes/headers-footers/oulogo-56.jpg' />";
	}else{
		this.image = image;
	}
	this.category = category;
	this.more = more;
	this.caption = caption;
	this.reference = reference;
	this.creator = creator;
	this.record_number = record_number;
	this.the_id = the_id; // this is the id used by Dataplus to identify the record - NOT contiguous, since records may be deleted
	this.caption_trimmed = false;
	this.short_caption = striphtml(this.caption);
	
	if(this.short_caption.length > SHORT_CAPTION_LENGTH){
		this.short_caption = this.short_caption.slice(0,SHORT_CAPTION_LENGTH);
		this.short_caption += " ... ";
		this.caption_trimmed = true;
	}
	
	this.yahooref = null; // a reference to the div which stores the image - is set in the startDisplay function when the page loads
  	this.html = record_html; // html is a 'method' that will return the HTML for the record
	this.show_delete_l
  
}

function record_html(){

	var link = "view.php?mode=single&ri=" + this.the_id + "&id=" + parameters["id"] ;
	
	return "<div class='thumbnail' id='record_"  + this.record_number +  "'><a href='" + link + "'>" + this.image + "</a><div class='caption_div'>" + this.short_caption + "</div></div>";

}
//// end FUNCTIONS THAT DEFINE A RECORD ///

function show_defaultview(){
	var current_category = "";
	for(var i=0; i<records.length; i++) {
		var record = records[i];
		var record_html = record.html();
		if(record_html == "") continue;
		var cat_text = record.category.trim() == "" ? "none specified" : record.category;
		if(record.category != current_category){
			content_node.append("<hr style='clear: both;' /><p class='category'>" + cat_text + "</p>");
			current_category = record.category;
		}
		content_node.append(record_html);
	}
}

function getUrlVars() { 
  var map = {}; 
  var parts = window.location.search.replace(/[?&]+([^=&]+)(=[^&]*)?/gi, function(m,key,value) { map[key] = (value === undefined) ? true : value.substring(1); });
  return map; 
}

function setVars(y_content_node){
	content_node = y_content_node;
}

////////// execution starts here ///////////

// temprecords was filled by the code in the 
// record template in dataplus. Now make 
// each record into an object which is stored
// in the array 'records' defined in the header
// section.
for(var i=0; i<temprecords.length; i++){

	//alert(temprecords[i][1]);

  records.push(
    new Record(
      temprecords[i][0],
      temprecords[i][1],
      temprecords[i][2],
      temprecords[i][3],
	  temprecords[i][4],
	  temprecords[i][5],
	  temprecords[i][6],
	  temprecords[i][7]
    )
  );
}

temprecords = null; // maybe save a bit of memory

// assumes that a parameters variable has been declared
// in the header section:
parameters = getUrlVars(); 

YUI().use('node', function(Y){
	
	var y_content_node = Y.one("#dp_content");
	Y.on("available", startDisplay, "body", Y);
		
		function startDisplay(e){
			setVars(y_content_node);
			
			show_defaultview();
			
			for(var j=0; j<records.length; j++){
			
				var theid = "#record_" +  records[j].record_number;
				records[j].yahooref = Y.one(theid);
			}
		}
});

</script>
