import os, xml.dom.minidom
f = open("questionnaire.xml", "r")
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

out_text = ""
 
for num in range(1,number_of_questions + 1): 
    question = questions[str(num)]
    name = question.getAttribute("scoring")
    out_text += "\n" + str(num) + " : " + name + " : " + traitlookup[str(num)]
    
print "-----------------------------------------------------------"

fp = open("scoring.txt", "w")
fp.write(out_text)
fp.close()

print out_text
print "\n\nFINISHED"



                         
                
                
