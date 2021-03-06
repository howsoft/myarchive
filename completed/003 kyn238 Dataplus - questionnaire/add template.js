/*
javascript
==========
*/
var theform = null;
var baseurl = "https://learn2.open.ac.uk/mod/dataplus/view.php?";
var params = getUrlVars();

function getUrlVars() { 
  var map = {}; 
  var parts = window.location.search.replace(/[?&]+([^=&]+)(=[^&]*)?/gi, function(m,key,value) { map[key] = (value === undefined) ? true : value.substring(1); });
  return map; 
}

function process_form(e) {

  if(typeof skipClientValidation !== "undefined") {
    /* cancel was clicked */
    return true;
  }

  if (e.preventDefault) e.preventDefault();

  var inputs = document.getElementsByTagName('input');
  var s = "", count = 0;

  for(var i=0; i<inputs.length; i++) {
    if(inputs[i].type === "radio") {
      if(inputs[i].checked === true) {
        count += 1;
      }
    }
}

  if(count < 1) {
    alert("Please make sure that you have selected one of the radio buttons for each question.");
    return false;
  } else {

  var oucu_field = document.getElementById('id_oucu');
  var username_field = document.getElementById('dp_username');

    oucu_field.value = username_field.value;

    theform.submit();
    return true;
  }
}

function init() {

  if(document.referrer.indexOf("mode=insert") != -1) {
  /* if we just saved a record, return to view page */

    var viewpage_url =  baseurl + "id=" + params.id + "&mode=view";
    location = viewpage_url;

  }

  theform = document.forms[0];
  theform.onsubmit = process_form;

}

/*
javascript 'to run'
===================
*/
init

/*
record
======
*/
<h1 class="stepheading">Step 1</h1>

<p>
1. When talking to others in a noisy room, you are able to hear when someone mentions your name, even if you are a long way away from the speaker and have not heard anything else that has been said in the conversation.
</p>
[[1]]
<br/>
<hr/>

<p>
2. You work harder when you know that someone is interested in your work than if you are left alone to get on with your work with little attention or interest from others.
</p>
[[2]]
<br/>
<hr/>

<p>
3. When you are feeling anxious, it can be hard to remember details of what someone else is saying to you than when you are feeling more relaxed. 
</p>
[[3]]
<br/>
<hr/>

<p>
4. You do things that you do not want to do because others persuade you to do so.
</p>
[[4]]
<br/>
<hr/>

<p>
5. You are more likely to repeat an activity when you are rewarded for doing it.
</p>
[[5]]
<br/>
<hr/>

<p>
6. You are more likely to follow advice given by someone you consider is an expert in their field than advice given by a lay person.
</p>
[[6]]
<br/>
<hr class="separator"  />

<h1 class="stepheading">Step 2</h1>

<p>
1. When talking to others in a noisy room, people are able to hear when someone mentions their name, even if they are a long way away from the speaker and have not heard anything else that has been said in the conversation.
</p>
[[7]]
<br/>
<hr/>

<p>
2. People work harder when they know that someone else is interested in their work than if they are left alone to get on with their work with little attention or interest from others.
</p>
[[8]]
<br/>
<hr/>

<p>
3. When a person is feeling anxious, it is hard to remember details of what someone else is saying to them than when they are feeling more relaxed.
</p>
[[9]]
<br/>
<hr/>

<p>
4. People do things that they do not want to do because others persuade them to do so.
</p>
[[10]]
<br/>
<hr/>

<p>
5. People are more likely to repeat an activity when they are rewarded for doing it.
</p>
[[11]]
<br/>
<hr/>

<p>
6. People are more likely to follow advice given by someone they consider is an expert in their field than advice given by a lay person.
</p>
[[12]]
<br/>
<hr/>

<div style='display: none;'>
<input type='text' id='dp_username' value='--username--' />
[[oucu]]
</div>



**save****cancel**

