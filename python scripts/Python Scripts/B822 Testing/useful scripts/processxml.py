import os, xml.dom.minidom
f = open("../questionnaire.xml", "r")
doc = None

def getText(nodelist):
    rc = ""
    for node in nodelist:
        if node.nodeType == node.TEXT_NODE:
            rc = rc + node.data
            return rc

try:
    doc = xml.dom.minidom.parse(f)
except:
    print "BAD XML"
    exit

if not doc:
    print "Problem with XML"
    exit


f.close()

html = """<?php
include "check_user.php";
?>
<html>
<head>
<title>%s</title>
<link rel="stylesheet" type="text/css" href="accessible.css" />
<script type="text/javascript">
var NUMBER_OF_BLANKS_ALLOWED = %s;
</script>
<script type="text/javascript" src="accessible.js">
</script>
</head>
<body>
<div class="bigBox">
<?php
include "get_key.php";
?>
<form method="post" action="accessible_save_to_database.php" onsubmit="return validate_form(this);">
<div id="container">
<table border="0"cellpadding="0" cellspacing="1">
<tr class="toprow">
    <td colspan="2" align="center">&nbsp;</td>
    <td align="center">SD</td>
   <td align="center">D</td>
    <td align="center">N</td>
    <td align="center">A</td>
    <td align="center">SA</td>
</tr>
""" % (   getText(doc.getElementsByTagName("questionnaire_name")[0].childNodes), doc.getElementsByTagName("blanks_allowed")[0].getAttribute("number"))
    
questions = {}
traitlookup = {}
number_of_questions = 0

traits = doc.getElementsByTagName("trait");
for t in traits:
    trait = t.getAttribute("value")
    children = t.childNodes;
    for q in children:
        if q.nodeName == "question":
            number_of_questions += 1
            num = q.getAttribute("number")
            questions[num] = q
            traitlookup[num] = trait

 
for num in range(1,number_of_questions + 1):  # UNCOMMENT WHEN MAKING LIVE
#for num in range(1,12):
    question = questions[str(num)]
    name = question.getAttribute("number")
    text = getText(question.childNodes)
    
    if int(name)% 2 == 0:
        theclass = "even"
    else:
        theclass = "odd"

    html += """
    <tr class="%s">
        <td class="number" align="right"><b>%s</b></td>
        <td>%s</td>
        <td><input type="radio" name="%s" value="0" /></td>
        <td><input type="radio" name="%s" value="1" /></td>
        <td><input type="radio" name="%s" value="2" /></td>
        <td><input type="radio" name="%s" value="3" /></td>
        <td><input type="radio" name="%s" value="4" /></td>
    </tr>
    """ % (theclass, str(num), text, name, name, name, name, name)
    
html += """
</table><br>
<div id="buttondiv">
<input id="submit_button" type="submit" value="Save my Answers" />
</div>
</div>
</form>
</div>
</body>
</html>
"""
#print html

fh = open("questionnaire.php", "w")
fh.write(html)
fh.close()
print "\n\nFINISHED"



                         
                
                
