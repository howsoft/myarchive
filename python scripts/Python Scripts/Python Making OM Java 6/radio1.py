import functions
import os
import shutil

resources = ["tick.gif"]

# -------- START OF makeXmlFromText() -------------------- #

def makeXmlFromText(lines):
	questionType = ""
	startingOrder = ""
	correctOrder = ""
	questionClass = ""
	scoring = 0
	height = ""
	prompt = ""
	labels = []
	questionLetters = []

	# get Question Type
	for line in lines:
		if line.strip() == "":         # a blank line, so skip
			continue
		if line.strip()[0] == "*":   # a comment, so skip
			print "found a comment"
			continue
		if "Question Type =" in line:
			questionType = line.split("=")[1].strip()
			continue
		if "Starting Order =" in line:
			startingOrder = line.split("=")[1].strip()
			continue
		if "Correct Order =" in line:
			correctOrder = line.split("=")[1].strip()
			continue
		if "Class =" in line:
			questionClass = line.split("=")[1].strip()
			continue
		if "Height =" in line:
			height = line.split("=")[1].strip()
			continue
		if "Prompt =" in line:
			prompt = line.split("=")[1].strip()
			continue
		if "=" not in line:
			labels.append(line.strip())
			
	scoring = (len(startingOrder) + 1) / 2
	questionLetters = startingOrder.split(",")	
	
	
	xml = """<!--
Question Type = %s
Starting Order = %s
Correct Order = %s
-->
<question class="%s">
	<scoring>
		<marks>%s</marks>
	</scoring>
	<layout>
		<row height="%s" />
		<column width="446" />
		<column width="146" />
	</layout>
	<box gridx="0" gridy="0" background="input" id="inputbox">
	<gap/>
	%s
  <gap/>
  <table cols="2" rows="%s" left="1">
""" % (questionType, startingOrder, correctOrder, questionClass, scoring, height, prompt, scoring)

	listcounter = 0
	for letter in questionLetters:
	
	
		xml += """
<row>
<t>
	<dragbox id="%s1">%s</dragbox>
</t>
<t>
	<dropbox id="%s"/>
	<image filePath="tick.gif" alt="ticked as correct" id="%s_cb" display="no"/>
</t>
</row>""" % (letter, labels[listcounter], letter, letter)
		listcounter += 1

	xml += """</table>
<gap/>
	<button action="actionSubmit" label="Check"/>
	<button action="actionGiveUp" label="Skip this Question"/>
</box>
<box gridx="1" gridy="0" background="answer" id="answerbox" display="no">
	<t id="wrong">Your answer is <t id="still">still</t> incorrect.</t>
	<t id="right">Your answer is correct.</t>
	<t id="pass">You passed on this question.</t>
	<gap/>
	<t id="feedback"/>
	<gap/>
	<t id="answer"></t>
	<button id="ok" action="actionOK" label="OK"/>
	<button id="next" action="actionOK" label="Next" display="no"/>
</box>
</question>
"""
	
	return xml
	
# -------- END OF makeXmlFromText() -------------------- #

def getMetaData(filepath):
	result = {}

	fh = open(filepath, "r")
	lines = fh.readlines()
	fh.close()
	
	counter = 0
	
	for line in lines:
		if line.strip() == "":
			continue
		counter += 1
		if counter == 2:
			result["questionType"] = line.split("=")[1].strip()
		if counter == 3:
			result["startOrder"] = line.split("=")[1].strip()
		if counter == 4:
			result["correctOrder"] = line.split("=")[1].strip()
			
	return result

def getXML(filepath):
	fh = open(filepath, "r")
	content = fh.read()
	fh.close()
	return content

def process(filepath):
	metaData = getMetaData(filepath)
	# print metaData["questionType"]
	doc = functions.getXMLDocument(filepath)
	packageName = functions.getPackageName(doc)
	
	javaCode = "package " + packageName + """;
	
import om.OmDeveloperException;
import om.OmException;
import om.helper.SimpleQuestion1;
import om.question.Results;
import om.stdcomponent.*;

public class Test extends SimpleQuestion1 {
		
	int score = 0;
		
	String [ ] startOrder = { 
		"""
		
	items = metaData["startOrder"].split(",")
			
	for item in items:
		javaCode += "\"" + item + "\""
		if item != items[-1]:
			javaCode += ","
		
	javaCode += """
	};
		
		String [ ] correctOrder = {
		"""
	print
	
	items = metaData["correctOrder"].split(",")
			
	for item in items:
		javaCode += "\"" + item + "\""
		if item != items[-1]:
			javaCode += ","
				
	javaCode += """
	};
		
	protected void setScore(boolean bRight, boolean bPass, int iAttempt) throws OmDeveloperException {
		getResults().setScore(this.score, iAttempt);
			
		if(bPass) {
			getResults().setScore(0, Results.ATTEMPTS_PASS);
		}
		else {
			getResults().setScore(Math.max(0, (this.score + 1) - iAttempt),iAttempt);
		}
		
	}
			
	protected boolean isRight(int iAttempt) throws OmDeveloperException
	{	
		/*
		 *  reset all checkboxes to hidden
		 */
		for(int i=0; i<startOrder.length; i++) {
			String checkbox = startOrder[i] + "_cb";
			getComponent(checkbox).setDisplay(false);
		}
			
		int numberCorrect = 0;
		int numberAttempted = 0;
			
		for(int i=0; i<startOrder.length; i++) {
			DropBoxComponent dbc = getDropBox(startOrder[i]);
			String dropped = dbc.getValue();
			if(!dropped.equals("")) {
				numberAttempted++;
				if(dropped.equals(correctOrder[i] + "1")) { // ids for the draggables are like a1, b1 etc.
					String checkbox = startOrder[i] + "_cb";
					getComponent(checkbox).setDisplay(true);
					numberCorrect++;
				}
				
			}
				
		}
			
		this.score = numberCorrect;
			
		String message = "You attempted " + numberAttempted + " part(s) of the question out of " + startOrder.length + "." +
		" " + numberCorrect + (numberCorrect == 1 ? " is" : " are") + " correct.";
			
		if(iAttempt < 3 && numberCorrect > 0) {
			message += " When you click OK, your correct answer(s) will remain in position. Any incorrect ones will return to their starting positions.";
		}
			
		getText("feedback").setText(message);
		setFeedbackID("feedback");
				
		if(numberCorrect == startOrder.length) {
			return true;
		}
			
		return false;
	}
	
	public void actionOK() throws OmException {
	// in here I want to put code to restore wrongly guessed dragged items
	// to their starting positions after the OK button in the feedback is clicked
	// calling the clear() method of the DropBoxComponent seems to achieve 
	// this.
		for(int i=0; i<startOrder.length; i++) {
			DropBoxComponent dbc = getDropBox(startOrder[i]);
			String dropped = dbc.getValue();
			if(!dropped.equals("")) {
				if(!dropped.equals(correctOrder[i] + "1")) { // ids for the draggables are like a1, b1 etc.
					dbc.clear();			
				}
				
			}
				
		}
					
		super.actionOK();
	} // end of actionOK() method
		
	} // end of class
	"""
	packageDirs = functions.getPackageDirs(doc)
	javaClass = functions.getJavaClass(doc)
	
	fullpath = ""
	for directory in packageDirs:
		fullpath = os.path.join(fullpath, directory)
		if not os.path.exists(fullpath):
			os.mkdir(fullpath)
			
	# write copy of xml file to question.xml file in the package directory
	newXmlPath = os.path.join(fullpath, "question.xml")
	fh = open(newXmlPath, "w")
	fh.write(getXML(filepath))
	fh.close()
			
	# write java file
	javaFilePath = os.path.join(fullpath, javaClass + ".java")
	fh = open(javaFilePath, "w")
	fh.write(javaCode);
	fh.close()
	
	# copy resources
	for resource in resources:
		resourceFilePath = os.path.join(fullpath, resource)
		sourcePath = os.path.join("resources", resource)
		shutil.copy(sourcePath, resourceFilePath)
		
	
	
	
	
	
	