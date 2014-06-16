# ----------- OPEN THE QUESTIONNAIRE XML FILE AND GENERATE SAMPLE SCORES ---------- 
# For example, generate the scores that would be generated if the user selects the first radio button
# in every case. This can then be checked against doing the same selection in the real application
# IN THIS VERSION WILL MIMIC SELECTING ALL FIRST RADIO BUTTONS
# ---------------------------------------------------------------------------------

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
traitscores = { "Openness" : 0, "Conscientiousness" : 0, "Extroversion" : 0, "Agreeableness" : 0,  "Sensitivity" : 0 }
number_of_questions = 0



traits = doc.getElementsByTagName("trait");
for t in traits:
    trait = t.getAttribute("value")
    children = t.childNodes;
    for q in children:
        #if q.nodeName == "question" and trait == "Conscientiousness":
        if q.nodeName == "question":
            number_of_questions += 1
            num = q.getAttribute("number")
            questions[num] = q
            traitlookup[num] = trait
            score_string = q.getAttribute("scoring")
            
            score = score_string[8]
            traitscores[trait] += int(score)
            print score_string


print "-----------------------------------------------------------"

out_text = "Openness: " + str(traitscores["Openness"])
out_text += "\nConscientiousness: " + str(traitscores["Conscientiousness"])
out_text += "\nExtroversion: " + str(traitscores["Extroversion"])
out_text += "\nAgreeableness: " + str(traitscores["Agreeableness"])
out_text += "\nSensitivity: " + str(traitscores["Sensitivity"])


fp = open("scoring.txt", "w")
fp.write(out_text)
fp.close()

print out_text
print "\n\nFINISHED"



                         
                
                
