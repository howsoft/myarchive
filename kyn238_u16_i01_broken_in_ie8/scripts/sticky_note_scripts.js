
var OU_pinboard = {

    /*
       Constants: Pinboard Offsets
       XOFFSET - X offset of the pinboard.
       YOFFSET - Y offset of the pinboard.
    */
    id: "pb_01",
    XOFFSET : 120,
    YOFFSET : 0,
    PIN_BOARD_WIDTH:0,
    PIN_BOARD_HEIGHT:0,
    
    COLOUR_PICKER_FOCUS:0,
    PINBOARD_FOCUS:1,
    
    KEY_MOVE_PX: 6,
    
    data : {},
    colourRange : [],

    domObj : null,
    bDragged : false,

    pstartX:0,
    pstartY:0,
    strStore:"",
    stickynote_height: 100,
    idCount : 0,
    zIndexCount : 0,
    selectedColour : 0,
    fileIndex: "",
    SaveIdx:"",
    listOfIndexes:[],
    listOfTitles:[],
    
    max_notes:9999,
    
    isIE : false,

    oldTabDomId: "",


/*
   Function: onloadInit

   Checks to see if IE is the browser
   Adds Mobile Safari touchevent listener
   Call the Load Notes function, which loads from local storage any existing notes

   See Also:

      <loadNotes>
*/
onloadInit: function (data)
{
  var self=this;
  this.data = data;
  
  this.leftNotes = this.rightNotes = 0;
  
  this.isIE = OULib.isIE8;
  this.colourRange = data.colourRange || ["#FFF7C6","#A2D7DB","#F8C7DC","#B8DAB7"];
  this.id = data.id || "pb101";
  this.fileIndex = this.id + "Idx";
  this.PIN_BOARD_WIDTH = data.pinboard_width-data.stickynote_width || 500;
  this.PIN_BOARD_HEIGHT = data.pinboard_height-data.stickynote_height || 600;
  this.XOFFSET = data.sidebar_width || 120;
  this.stickynote_height = data.stickynote_height || 100;
  this.stickynote_width  = data.stickynote_width  || 100;
  
  document.getElementById("mainDiv").style.width  = (data.activity_width)+"px" || 800+"px";
  document.getElementById("mainDiv").style.height = (data.activity_height)+"px" || 600+"px";
    
  document.getElementById("testDivId").style.width = ( this.stickynote_width)+"px" || 100+"px";

  document.getElementById("pinboardId").style.width  = data.pinboard_width+"px" || 500+"px";
  document.getElementById("pinboardId").style.height = data.pinboard_height+"px" || 600+"px";
  
  document.getElementById("theTitleId").style.width = data.pinboard_width+"px" || 500+"px";
  
  /*if (!!this.data.img["pinboardBg"]){
      document.getElementById("pinboardId").style.backgroundImage  = 'url("'+this.data.img["pinboardBg"]+'")';
  }*/
  
  if (!!this.data.note_colours){
       document.getElementById("setNoteBGColour0Id").style.backgroundColor = this.data.note_colours[0];
       document.getElementById("setNoteBGColour1Id").style.backgroundColor = this.data.note_colours[1];
       document.getElementById("setNoteBGColour2Id").style.backgroundColor = this.data.note_colours[2];
       document.getElementById("setNoteBGColour3Id").style.backgroundColor = this.data.note_colours[3];
       
       document.getElementById("setNoteBGColour0Id").tabIndex = 1;
       document.getElementById("setNoteBGColour1Id").tabIndex = 1;
       document.getElementById("setNoteBGColour2Id").tabIndex = 1;
       document.getElementById("setNoteBGColour3Id").tabIndex = 1;       
  }
  
  document.getElementById("popupFileWinId").style.zIndex  = this.max_notes;
    
  OULib.utils.addEvent(document.getElementById("pinboardId"),"touchmove",function(event){self.touchMoveDiv(event);});
  OULib.utils.addEvent(document.getElementById("pinboardId"),"mousemove",function(event){self.mouseMoveDiv(event);});
  OULib.utils.addEvent(document.getElementById("root"),"mousemove",function(event){self.mouseExit(event);});
  
  if (this.data.fileMenu === true){
     OULib.utils.addEvent(document.getElementById("fileNotesId"),"click",function(){self.showFileMenu();});
     OULib.utils.addEvent(document.getElementById("loadFileId"),"change",function(){self.fileLoadPinBoard(true);});
     OULib.utils.addEvent(document.getElementById("fileCancelButtonId"),"click",function(){self.closeFilePopup(true);});
     OULib.utils.addEvent(document.getElementById("fileNewButtonId"),"click",function(){self.createNewPinBoard(true);});
  }else{
     document.getElementById("fileNotesId").style.visibility = "hidden";
     document.getElementById("theTitleId").style.visibility = "hidden";
  }

  if (this.data.exportToRTF === true && (typeof OURTF !== "undefined")){
    OULib.utils.addEvent(document.getElementById("exportNotesId"),"click",function(){self.exportNotes();});
  }

  OULib.utils.addEvent(document.getElementById("printNotesId"),"click",function(){self.printNotes();});
  OULib.utils.addEvent(document.getElementById("deleteAllId"),"click",function(){self.deleteAll();self.saveNotes();});
  OULib.utils.addEvent(document.getElementById("deleteCurrentId"),"click",function(){self.deleteCurrent();});
  OULib.utils.addEvent(document.getElementById("addDivToPinBoardId"),"click",function(){self.addDivToPinBoard();});
  
  
  OULib.utils.addEvent(document.getElementById("updateSelectedDivId"),"click",function(){self.updateSelectedDiv();});
  OULib.utils.addEvent(document.getElementById("textStringId"),"keyup",function(){self.checksize();});
  OULib.utils.addEvent(document.getElementById("textStringId"),"keydown",function(){self.checksize();});
  
  
  OULib.utils.addEvent(document.getElementById("setNoteBGColour0Id"),"click",function(){self.setNoteBGColour(0);});
  OULib.utils.addEvent(document.getElementById("setNoteBGColour1Id"),"click",function(){self.setNoteBGColour(1);});
  OULib.utils.addEvent(document.getElementById("setNoteBGColour2Id"),"click",function(){self.setNoteBGColour(2);});
  OULib.utils.addEvent(document.getElementById("setNoteBGColour3Id"),"click",function(){self.setNoteBGColour(3);});
  
  OULib.utils.addEvent(document.getElementById("setNoteBGColour0Id"),"keydown",function(event){self.hidController(event,{"index":0,"elm":self.COLOUR_PICKER_FOCUS});});
  OULib.utils.addEvent(document.getElementById("setNoteBGColour1Id"),"keydown",function(event){self.hidController(event,{"index":1,"elm":self.COLOUR_PICKER_FOCUS});});
  OULib.utils.addEvent(document.getElementById("setNoteBGColour2Id"),"keydown",function(event){self.hidController(event,{"index":2,"elm":self.COLOUR_PICKER_FOCUS});});
  OULib.utils.addEvent(document.getElementById("setNoteBGColour3Id"),"keydown",function(event){self.hidController(event,{"index":3,"elm":self.COLOUR_PICKER_FOCUS});});
  
  OULib.startLoader({"activity_width":data.activity_width,
                     "activity_height":data.activity_height,
                     "img":this.data.img,
                     "cbf":function(){self.startDataLoad();}});
 
},

startActivity : function(){
        
    document.getElementById("mainDiv").style.visibility = "visible";
},

startDataLoad : function (){
    var self = this;
    
    this.startActivity();
    
    if (this.data.fileMenu===true){
        
        OULib.loadData(self.fileIndex,true,function(data){self.loadFileMenu(data);});
                
    }else{
        OULib.loadData(self.id,true,function(data){self.loadNotes(data);});
    }
   
},

animate: function() {
	//this.leftNotes = this.rightNotes = 0;
	return;
},

/*
   Function: addPostItNote

   Adds a note to the DOM 

   Parameters:

      id - unique id for the note
      str - String to be displayed on the note
      colour - notes colour
      zIndex - z index of the note
      x - x position of the note
      y - y position of the note
      create_button - true or false, signifies if method's called by the create note button
      
    See Also:
    <addDivToPinBoard>

*/
addPostItNote: function (id, str, colour, zIndex, x, y, create_button) {
	var el;
	var text = str.replace(/(\r\n|\n|\r)/gm, "<br/>");
    var self = this,
        create_button = create_button || false;
               
	el = document.createElement('div');

	el.innerHTML =  text;
	el.className = "postItNote shadow ponText noSelectText";
	el.id = id;
	el.text = str;
	el.style.zIndex = zIndex;
	el.style.backgroundColor = colour;
	el.x = x;
	el.y = y;
	el.style.left = x+"px";
	el.style.top = y+"px";
    el.tabIndex = "1";
    el.style.width =  this.stickynote_width+"px";
    el.style.height =  this.stickynote_height+"px";

    OULib.trace(el.id + " added");
	
	document.getElementById('pinboardId').appendChild(el);
      
    OULib.utils.addEvent(document.getElementById(el.id),"touchstart",function(event){self.touchDownNote(event);});
    OULib.utils.addEvent(document.getElementById(el.id),"touchend",function(){self.mouseUpNote();});
    
    OULib.utils.addEvent(document.getElementById(el.id),"mousedown",function(event){self.mouseDownNote(event);});
    OULib.utils.addEvent(document.getElementById(el.id),"mouseup",function(){self.mouseUpNote();});
            
    OULib.utils.addEvent(document.getElementById(el.id),"keyup",function(event){self.hidController(event,{"elm":self.PINBOARD_FOCUS,"keyUp":true});});
    OULib.utils.addEvent(document.getElementById(el.id),"keydown",function(event){self.hidController(event,{"elm":self.PINBOARD_FOCUS,"keyUp":false});});
    
    if (create_button === true) {
        self.tabSelectNoteOnCreate(el.id);    	
    }
},

/*
   Function: addDivToPinBoard

   Adds a note to the pinboard by calling addPostItNote
   This functions also increments the note id and z order and setSeconds
   the correct colour
       
    See Also:
    <addPostItNote>

*/
addDivToPinBoard: function () {
	var txt = document.getElementById("textStringId").value;
        var colour = this.colourRange[this.selectedColour];
        
        if (this.zIndexCount<this.max_notes){
        
            this.unHighlightBorder();

            this.addPostItNote(("noteId_" + this.idCount), txt, colour, this.zIndexCount, 0, 0, true);
            this.zIndexCount++;
            this.idCount++;

            OULib.trace("addDivToPinBoard zIndexCount:" + this.zIndexCount);

            this.saveNotes();
        }
},

/*
   Function: updateSelectedDiv

   Update the current div with the users changes
   This function uses regular expression replace to add the <br> tag
   instead of the carridge return characters, so that the text is formatted 
   correctly on the note
     
*/
updateSelectedDiv : function (){

	var txt = document.getElementById("textStringId").value;
	var colour = this.colourRange[this.selectedColour];
  
  
	var str = txt.replace(/(\r\n|\n|\r)/gm, "<br/>");

    if (this.domObj !== null) {
    	this.domObj.text = txt;
    	this.domObj.innerHTML = str;
    	this.domObj.style.backgroundColor = colour;
    	this.saveNotes();
    	this.domObj.focus();
    } else {
    	alert("Select a note first, before pressing 'Update Note'");
    }
},

/*
   Function: startDragCommon

   Set up vars and DOM ready for dragging the currently select note

   Parameters:

      x - x position where the mouse is or the screen has been touched
      y - y position where the mouse is or the screen has been touched
      
    See Also:
    <mouseDownNote>
    <touchDownNote>

*/
startDragCommon: function (x, y) {
	
    this.bDragged = true;
	x = x - this.XOFFSET;
	y = y - this.YOFFSET;
	this.pstartX = x - this.domObj.x;
	this.pstartY = y - this.domObj.y;
	this.zIndexCount++;

  //Update note's z index so it appears on top of all the other notes
	this.domObj.style.zIndex = this.zIndexCount;
  
  //Update the text in the entry box based on the note's text
        this.selectedColour = this.getColourId(this.domObj.style.backgroundColor);
	document.getElementById("textStringId").style.backgroundColor = this.domObj.style.backgroundColor;
	document.getElementById("textStringId").value = this.domObj.text;
  
	OULib.trace("domObj.style.zIndex: " + this.domObj.style.zIndex + " zIndexCount:" + this.zIndexCount);
},

getColourId: function (hashColour){
  
    var idx = 0;
    OULib.trace(hashColour);
    for (var count=0;count<this.colourRange.length;count++){
        document.getElementById("testDivId").style.backgroundColor = this.colourRange[count];
        if (hashColour === document.getElementById("testDivId").style.backgroundColor){
            
            idx=count;
            break;
        }
    }
    
    return idx;
},

tabSelectNote: function(event){
   
    var id = OULib.getTargetId(event);
    
    if (id!==this.oldTabDomId){
        this.unHighlightBorder();
        this.domObj = document.getElementById(id);
        this.highlightBorder();
        this.startDragCommon(this.domObj.x,this.domObj.y);

        this.bDragged = false;
        this.oldTabDomId = this.domObj.id;
    }else{
        
        this.unHighlightBorder();
        this.domObj = null;
        this.oldTabDomId = "";
    }
},

tabSelectNoteOnCreate: function(id) {    
    if (id!==this.oldTabDomId){
        this.unHighlightBorder();
        this.domObj = document.getElementById(id);
        this.highlightBorder();
        this.startDragCommon(this.domObj.x,this.domObj.y);
        this.domObj.focus();

        this.bDragged = false;
        this.oldTabDomId = this.domObj.id;
    }else{
        
        this.unHighlightBorder();
        this.domObj = null;
        this.oldTabDomId = "";
    }
},

/*
   Function: mouseDownNote

   Get the X and Y values where the mouse is on the pinboard
   Sets the variable domObj to current note object in the DOM
   Calls the function <startDragCommon>

   Parameters:

      event - event object of the mouse
     
    See Also:
    <startDragCommon>

*/
mouseDownNote : function (event) {

        var id = OULib.getTargetId(event);
        var x=0, y=0;
        
        this.unHighlightBorder();
        OULib.trace(id);
        OULib.trace(event);
       
	if(this.isIE) {
		x = window.event.clientX + document.documentElement.scrollLeft +
                        document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop  + 
                        document.body.scrollTop;
	} else {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	this.domObj = document.getElementById(id);
        this.highlightBorder();
	this.startDragCommon(x, y);
},

/*
   Function: touchDownNote

   Get the X and Y values where the user touches the pinboard
   Stops the screen moving whilst moving a note
   Sets the variable domObj to current note object in the DOM
   Calls the function <startDragCommon>
   Used by the iOS touch devices

   Parameters:

      event - touch event object
     
    See Also:
    <startDragCommon>

*/
touchDownNote : function (event) {
	var x=0, y=0;
        var id = OULib.getTargetId(event);

        this.unHighlightBorder();

	if(event.touches.length >= 1) {
		var touch = event.touches[0];
		x = touch.pageX;
		y = touch.pageY;
		this.domObj = document.getElementById(id);
                this.highlightBorder();
		this.startDragCommon(x, y);
	}
},

/*
   Function: mouseUpNote

   Release the drag when the mouse button is released or the user is no longer touching the screen
   
*/
mouseUpNote : function () {
	/*if(this.domObj){
        if (this.domObj.x > 231 && this.domObj.x < 320) {
			this.setDivXY(231, this.domObj.y);
		}
		
		if (this.domObj.x > 319 && this.domObj.x < 371) {
			this.setDivXY(371, this.domObj.y);
		}
	}*/
        if (this.bDragged===true){
            this.saveNotes();
        }
		
	this.bDragged = false;
        
},



/*
   Function: highlightBorder

   Highlights the current sticky by making the border red and wider
      
*/
highlightBorder : function(){
    if (this.domObj){
        
        this.domObj.style.borderWidth = "2px";
        this.domObj.style.borderColor = "blue";
       
    }
},
 
/*
   Function: unHighlightBorder

   Removes the highlights the current sticky 
      
*/
unHighlightBorder : function(){
    if (this.domObj){
        
        this.domObj.style.borderWidth = "2px";
        this.domObj.style.borderColor = "transparent";
    }
},        


/*
   Function: updateXY

   Update the note's dom object whilstthe note is being dragged
   Also checks to see it the note is being dragged within the pinboard

   Parameters:

      x - x position
      y - y position
      
   See Also:
    <mouseMoveDiv>
    <touchMoveDiv>
      
*/
updateXY : function (x, y) {
	x = x - this.XOFFSET;
	y = y - this.YOFFSET;

	if( this.bDragged === true) {
		this.setDivXY( (x - this.pstartX) , (y - this.pstartY));
	}

},
        

setDivXY: function (x,y){
    
  if (x<0){x=0;}
  else if (x>this.PIN_BOARD_WIDTH)  {x=this.PIN_BOARD_WIDTH;}
  
  if (y<0){y=0;}
  else if (y>this.PIN_BOARD_HEIGHT)  {y=this.PIN_BOARD_HEIGHT;}
  
  this.domObj.x = x;
  this.domObj.y = y;

  this.domObj.style.top = this.domObj.y + "px";
  this.domObj.style.left = this.domObj.x + "px";

},

/*
   Function: mouseMoveDiv

   Checks the mouse move event and then passes the x and y values to <updateXY>
   to update the note's current position

   Parameters:

      event - mouse event object
      
   See Also:
    <updateXY>
 
*/
mouseMoveDiv : function (event) {
	var x, y;

	if(this.isIE) {
		x = window.event.clientX + document.documentElement.scrollLeft +
                        document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop + 
                        document.body.scrollTop;
	} else {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
        
	this.updateXY(x, y);
        
       

},

mouseExit : function (event){
  
    var x, y;

	if(this.isIE) {
		x = window.event.clientX + document.documentElement.scrollLeft +
                        document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop + 
                        document.body.scrollTop;
	} else {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
        
         if (x<this.sidebarWidth || x>this.data.activity_width  || y <0 || y>this.data.activity_height){
            
            this.mouseUpNote();
        }
    
},
/*
   Function: touchMoveDiv

   Checks the touch event and then passes the x and y values to <updateXY>
   to update the note's current position

   Parameters:

      event - touch event object
   
   See Also:
    <updateXY>
 
*/
touchMoveDiv : function (event) {
	var x, y;

        event.preventDefault();

	// Only track one finger
	if(event.touches.length >= 1) {
		var touch = event.touches[0];
		x = touch.pageX;
		y = touch.pageY;

		this.updateXY(x, y);

	}

},

/*
   Function: setNoteBGColour

   Checks the touch event and then passes the x and y values to <updateXY>
   to update the note's current position

   Parameters:

      colour - the select colour
 
*/
setNoteBGColour : function (colour) {
	this.selectedColour = colour;
	document.getElementById("textStringId").style.backgroundColor = this.colourRange[this.selectedColour];
},

/*
   Function: deleteCurrent

    Deletes the currently selected note from the pinboard and the DOM

*/
deleteCurrent : function () {
	var actionOk = true; // confirm("Delete Note.\nAre you sure?");

	if(actionOk) {
		if(this.domObj !== null) {
			document.getElementById("pinboardId").removeChild(this.domObj);
			this.domObj = null;
                        this.saveNotes();
		} else {
			alert("Select a note first, before pressing 'Delete'");
		}
                
	}
        
},

/*
   Function: deleteAll

    Deletes all the notes from the pinboard and the DOM

*/
deleteAll : function () {

	var pbObj = document.getElementById("pinboardId").childNodes;
	var i = 0;

	var actionOk = true;//confirm("Delete All Notes.\nAre you sure?");

	if(actionOk) {
		while(pbObj.length > 0) {
			OULib.trace("Checking  [" + i + "] : " + pbObj[i].id);
			if(pbObj[i]) {
				if(pbObj[i].id !== "undefined") {
					OULib.trace("Removing [" + i + "] : " + pbObj[i].id);
					document.getElementById("pinboardId").removeChild(pbObj[i]);
				}
			}
		}
		this.domObj = null;
		this.zIndexCount = 0;
		this.idCount = 0;
	}
        
},

/*
   Function: copyNotesText

    Displays the prompt dialog populates with the current note's text, so that the user
    can copy the text to their clipboard

*/
copyNotesText : function () {
	var txt = "";

	OULib.trace(txt);

	if(this.domObj) {
		txt = domObj.text.replace(/(\r\n|\n|\r)/gm, " ");
		txt = domObj.text.replace(/(\r\n|\n|\r)/gm, " ");
		prompt("Use Ctrl+C and then enter to copy the text", txt);
	} else {
		alert("Select a note first, before pressing copy");
	}
},


/*
   Function: checksize

    This function stops the user entering too much text, as the note can only handle so many characters.
    The check is based on the avaliable area and use a hidden div to achive this.

*/
checksize : function () {
	var testDiv = document.getElementById("testDivId");
	var text = document.getElementById("textStringId").value;
	testDiv.innerHTML = text.replace(/(\r\n|\n|\r)/gm, "<br/>");
	var testHeight = testDiv.offsetHeight;

	OULib.trace("ST" + document.getElementById("textStringId").scrollTop);
	if( testHeight > this.stickynote_height) {
		document.getElementById("textStringId").value = this.strStore;
		OULib.trace("TextNotOK;");
	} else {
		this.strStore = text;
		OULib.trace("TextOK;");
	}
},
//document.getElementById("textStringId").scrollTop > 0 ||
/*
   Function: printNotes

    Open the print dialog. There is print CSS use to format the ouput

*/
printNotes : function () {
	window.print();
},

/*
   Function: loadNotes

    Loads any existing notes 
   ToDo:
    Add suppoort for cookies

*/
loadNotes : function(arrayOfDivs) {
	
	var i = 0,
	    j = 0,
            zIndex = 0;
	this.leftNotes = 0;
	this.rightNotes = 0;
        // Retrieve the object from storage

        this.zIndexCount = 0;
        this.idCount = 0;
        
        if (arrayOfDivs !== null) {
            for( i = 0; i < arrayOfDivs.length; i++) {
                    
                    zIndex = arrayOfDivs[i].zIndex || this.zIndexCount;
                
                    OULib.trace("Accessing div [" + i + "]" + " x:"+arrayOfDivs[i].x+" y:"+arrayOfDivs[i].y);
                    if (arrayOfDivs[i].x < this.data.pinboard_width/2)
						this.leftNotes++;
					else
						this.rightNotes++;
                    this.addPostItNote("noteId_" + this.idCount, arrayOfDivs[i].text, arrayOfDivs[i].bgColour, zIndex, arrayOfDivs[i].x, arrayOfDivs[i].y);

                    if(this.zIndexCount < arrayOfDivs[i].zIndex) {
                            this.zIndexCount = arrayOfDivs[i].zIndex;
                    }
                    this.zIndexCount++;
                    this.idCount++;
            }
        } else if (Object.prototype.toString.call(this.data.preloaded_notes) === '[object Array]' &&
        		this.data.fileMenu !== true) { 
            for (i = 0; i < this.data.preloaded_notes.length; i++) {
            	//for (j = 0; j < this.data.preloaded_notes[i].length; j++) {
                    
                    if (this.data.preloaded_notes[i]['x'] < this.data.pinboard_width/2)
						this.leftNotes++;
					else
						this.rightNotes++;
                                            
	            	this.addPostItNote("noteId_" + this.idCount, this.data.preloaded_notes[i]['text'], this.data.preloaded_notes[i]['bgColour'], this.zIndexCount, this.data.preloaded_notes[i]['x'], this.data.preloaded_notes[i]['y']);
	                this.zIndexCount++;
	                this.idCount++;
            }     	
        }
      if (this.SaveIdx!=="" && this.listOfTitles.length >0 ){
       document.getElementById("titleTextId").innerHTML= this.listOfTitles[this.SaveIdx] ;
      }
	  this.animate();
},

/*
   Function: saveNotes

    Saves all the current notes to the users local storage
   
   ToDo:
    Add suppoort for cookies

*/
saveNotes: function () {
	var divObject = {};
	var arrayOfDivs = [];
	var pbObj = document.getElementById("pinboardId").childNodes;
	var i = 0;
	var divCount = 0;
	this.leftNotes = 0;
	this.rightNotes = 0;
        var id = this.id+this.SaveIdx;
        

        for( i = 0; i < pbObj.length; i++) {
            if(pbObj[i]) {
                if(pbObj[i].id !== undefined) {
                       
                        divObject = {};
                        divObject.text = pbObj[i].text;
                        divObject.bgColour = pbObj[i].style.backgroundColor;
                        divObject.x = pbObj[i].x;
                        divObject.y = pbObj[i].y;
                        divObject.zIndex = pbObj[i].style.zIndex;

                        arrayOfDivs.push(divObject);
                        divCount++;
						if (divObject.x < this.data.pinboard_width/2)
							this.leftNotes++;
						else
							this.rightNotes++;
                }
            }
        }

        OULib.saveData(id,true,arrayOfDivs);
	this.animate();

},


exportNotes: function (){
    
    var txt = ["","",""];
    
    var pbObj = document.getElementById("pinboardId").childNodes;
    var i = 0;


    for( i = 0; i < pbObj.length; i++) {
        if(pbObj[i]) {
            if(pbObj[i].id !== undefined) {


                   var idx = this.getColourId(pbObj[i].style.backgroundColor);
                    if (!isNaN(idx)){
                        txt[idx]+= pbObj[i].description+" %br "+ pbObj[i].text + " %br %br ";
                        
                    }

            }
        }
    }
    
  
     OURTF.exportRtf({
                    "template":"unit5/b718_u5_sn01.rtf",
                    "url":"http://students.open.ac.uk/fbl/seacole/common/generic_rtf.1.php",
                    "filename":"artifacts.rtf",
                    "message":"Press the button to download the rtf",
	            "buttonName":"download",
                    "data":{
                        "txtAreaId1":txt[0],
                        "txtAreaId2":txt[1],
                        "txtAreaId3":txt[2]
                    }
                });
    
    
    
},
        
hidController: function (e,args){
    
   var keyCode = OULib.getKeyCode(e),
       is_a_save_notes_key = false
       the_text_area = document.getElementById('textStringId');
                 
   OULib.trace("keyCode:"+keyCode);
    
//console.trace(the_text_area.selectionStart);
    
    switch(args.elm){
        
        case this.COLOUR_PICKER_FOCUS:{
                if (keyCode===OULib.KEY_ENTER){
                    this.setNoteBGColour(args.index);
                }
           break;
        }
        case this.PINBOARD_FOCUS:{
                if (keyCode === OULib.KEY_TAB){
                    this.tabSelectNote(e);
                }
                
                if (OULib.isKeyCode('a',keyCode)){
                    this.setDivXY(this.domObj.x-this.KEY_MOVE_PX, this.domObj.y);
                    is_a_save_notes_key = true;                   
                }
                if (OULib.isKeyCode('d',keyCode)){
                    this.setDivXY(this.domObj.x+this.KEY_MOVE_PX, this.domObj.y);
                    is_a_save_notes_key = true;                  
                }
                
                if (OULib.isKeyCode('w',keyCode)){
                    this.setDivXY(this.domObj.x, this.domObj.y-this.KEY_MOVE_PX);
                    is_a_save_notes_key = true;                   
                }
                if (OULib.isKeyCode('s',keyCode)){
                    this.setDivXY(this.domObj.x, this.domObj.y+this.KEY_MOVE_PX);
                    is_a_save_notes_key = true;                  
                }
                if (OULib.isKeyCode('e',keyCode) || OULib.isKeyCode('E',keyCode)){
                    if (the_text_area !== null) {
                    	the_text_area.selectionStart = 0;
                    	the_text_area.selectionEnd = 0;
                    	the_text_area.focus();
                    	e.preventDefault();
                    }                
                }                
                if (args.keyUp === true && is_a_save_notes_key){
					/*if (this.domObj.x > 231 && this.domObj.x < 320) {
						this.setDivXY(231, this.domObj.y);
					}
					
					if (this.domObj.x > 319 && this.domObj.x < 371) {
						this.setDivXY(371, this.domObj.y);
					}*/

                    this.saveNotes();
                }                
                break;
        }
        
    }
},
        
/**
 * 
 * @param {type} data
 */        
 
 loadFileMenu : function(data){
  
  if (data===null){
      this.showFileMenu();      
  }else{
      this.populateFileIndex(data);
  }
    
},
        

 /**
  *  Populate the local array which contains a list of exisiting poinboards.
  *  This function is called after loading the data from the storage device.
  *  
  *  @param {object} values - array of values
  */
populateFileIndex : function(values) {
      
    var self = this;
    
    this.SaveIdx="";
    
   
    
    for (var count=0;count<values.indexs.length;count++){
        this.listOfIndexes[count] = values.indexs[count];
       
    }
    for (var count=0;count<values.title.length;count++){
        this.listOfTitles[count] = values.title[count];
     
    }
    
   
      
    this.SaveIdx = values.defaultFF;
    
    OULib.loadData(self.id+self.SaveIdx,true,function(data){self.loadNotes(data);});
    
 },
        
        
    /**
  * Hides the relevant divs
  * 
  * @memberof ou_forcefield
  */
 closeFilePopup :  function(){
   
    var divId = document.getElementById("popupFileWinId"); 
    
    divId.style.visibility = "hidden";
    
    document.getElementById("loadingAreaId").style.visibility = "hidden";
    document.getElementById("loadHrId").style.visibility = "hidden";
     
 },   
         
 /**
  * Show the file menu popup dialog.
  * 
  * the exisitng pinboard drop down will only display
  * if more than 1 pinboard exisits
  * 

  */
showFileMenu:  function(){
   
    var divId = document.getElementById("popupFileWinId"), count=0; 

    while(document.getElementById("loadFileId").options.length)
    {
        document.getElementById("loadFileId").remove(0);
    }


    for (count=0;count<this.listOfIndexes.length; count++){
        var opt = document.createElement('option');
        opt.value = this.listOfIndexes[count];
        opt.innerHTML = this.listOfTitles[count];
        document.getElementById("loadFileId").appendChild(opt);

        if(parseInt(this.SaveIdx) === parseInt(this.listOfIndexes[count])){
            document.getElementById("loadFileId").selectedIndex = count;
        }

    }
    if( count<=1){
        document.getElementById("loadingAreaId").style.visibility = "hidden";
        document.getElementById("loadHrId").style.visibility = "hidden";
    }else{
        document.getElementById("loadingAreaId").style.visibility = "visible";
        document.getElementById("loadHrId").style.visibility = "visible";
    }
    divId.style.visibility = "visible";
    document.getElementById("titleFileId").value = "";
    document.getElementById("titleFileId").focus();
        
  
     
 },       
   
 saveFileIndex : function(){
   
   var obj = {"indexs":this.listOfIndexes,"title":this.listOfTitles,"defaultFF":this.SaveIdx};
   
   OULib.saveData(this.fileIndex,true,obj);
     
 },
         
 /**
  *  function to load an exisiting pinboard. The file index is saved so that 
  *  the currently selected pinboard is remembered on reload
  **/
  fileLoadPinBoard: function(){
     
      var elm = document.getElementById("loadFileId");
      var self = this;
      var id = "";
      
      this.deleteAll();
      
      this.SaveIdx= elm.options[elm.selectedIndex].value;
      
      id = this.id+this.SaveIdx;
      
      
      this.saveFileIndex(); // saves so that the currecnt pinboard is saved
      
      this.closeFilePopup(); //close the popup
      
      OULib.loadData(id,true,function(data){self.loadNotes(data);});
      
 
      
  },
          
          
          
  /**
  *  Create a new pinboard. Check that the unqiue id doesn't exist.
  *  Save the file index
  *  Delete all the existing notes
  * 
  **/
 createNewPinBoard: function(){
   
   var id =0, count=0, title="";
   
   title = document.getElementById("titleFileId").value;
      
   if (this.listOfIndexes.length > 0 ){
    for (count=0;count<this.listOfIndexes.length; count++){
        if (this.listOfIndexes[count] === id){
            count=0;
            id++;
        }
    }
   }
   
   this.listOfIndexes[count]=id;
   this.listOfTitles[count]=title;
   this.SaveIdx = id;
      
   this.saveFileIndex();
   
   document.getElementById("titleTextId").innerHTML= title;
   
   this.deleteAll();
   
   this.closeFilePopup();
   
 }
 

};

OU_pinboard.onloadInit(pinboard_data);