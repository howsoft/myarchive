import functions
import textfunctions

import os
import shutil

resources = ["matrix.png"]

# -------- START OF makeXmlFromText() -------------------- #
def makeXmlFromText(lines, questionClass):
	questionType = ""
	answerOrder = ""
	height = ""
	paragraphs = []
	labels = []
	
	def outputParagraphs():
		newstring = ""
		for para in paragraphs:
			newstring += "<t>" +  para + "</t><gap/>"
		print newstring
		return newstring
	

	for line in lines:
		if line.strip() == "":         # a blank line, so skip
			continue
		if line.strip()[0] == "*":   # a comment, so skip
			print "found a comment"
			continue
		if "Question Type =" in line:
			questionType = line.split("=")[1].strip()
			continue
		if "Answer Order =" in line:
			answerOrder = line.split("=")[1].strip()
			continue
		if "Height =" in line:
			height = line.split("=")[1].strip()
			continue
		if "Paragraph =" in line:
			paragraphs.append(line.split("=")[1].strip())
			continue
		if "=" not in line:
			labels.append(line.strip())
			
	xml = """<!---
Question Type = %s
Answer Order = %s
-->
	
<question class="%s">
<scoring><marks>3</marks></scoring>

 	<layout>
  		<row height="500"/>
  		<column width="592"/>
   	</layout>
 
 	<!-- Defines the left-hand question box -->
 	<box gridx="0" gridy="0" id="inputbox" background="input">
			<image id="pyramid" display="yes" filePath="matrix.png" alt="matrix">
			
			<!-- //////// drag boxes ////////////// -->
			<iplace left="10" top="40" label="%s">
				<dragbox id="aa">%s</dragbox>
			</iplace>
			
			<iplace left="10" top="100" label="%s">
				<dragbox id="bb">%s</dragbox>
			</iplace>
			
			<iplace left="10" top="160" label="%s">
				<dragbox id="cc">%s</dragbox>
			</iplace>
			
			<iplace left="10" top="220" label="%s">
				<dragbox id="dd">%s</dragbox>
			</iplace>
			
			<!-- //////// drop boxes ////////////// -->
			<iplace left="340" top="70" label="">
		  		<dropbox id="a"/>
			</iplace>
			
			<iplace left="460" top="70" label="">
		  		<dropbox id="b"/>
			</iplace>
			
			<iplace left="340" top="170" label="">
		  		<dropbox id="c"/>
			</iplace>
			
			<iplace left="460" top="170" label="">
		  		<dropbox id="d"/>
			</iplace>
			
			</image>
	<gap/>			
		<t id="instructions">
			%s
	  	</t>
	  	<t id="showanswer" display="no">
	  	FOR INFORMATION ONLY (Click the Next button when you have finished.)
	  	</t>
	  	<gap/>
	 	<button id="submitButton" action="actionSubmit" label="Check"/>
		<button id="skipButton" action="actionGiveUp" label="Skip this Question"/>
		<button id="continueButton" action="actionOK" label="Next" display="no"/>
 	</box>

<box gridx="0" gridy="0" background="answer" id="answerbox" display="no">
  	<t id="wrong">Your answer is <t id="still">still</t> not correct.</t>
	<t id="right">Your answer is correct.</t>
	<t id="pass">You passed on this question.
	<gap/>
	You can click on the Answer button if you would like to see the correct answer.
	Or click Next to continue.</t>	
	
	<gap/>
	
	<t id="feedback">
		<t id="first_try">
		Have another go.<gap/>
		When you click OK, your correct answer(s) will remain in position. Any incorrect ones will return to their starting positions.
		</t>
		<t id="second_try">
		One more try left.<gap/>
		When you click OK, your correct answer(s) will remain in position. Any incorrect ones will return to their starting positions.
		</t>
	</t>	
	 
	<t id="got_it_right" display="no">
	You can click the Answer button if you want to see the correct answer again. Or click Next to continue.
	</t>
	<t id="always_wrong" display="no">
	You can click the Answer button if you want to see the correct answer. Or click Next to continue.
	</t>
   	<gap/>
   	
 	<t id="answer">
  	<gap/>
  	<button id="answerbutton" action="showAnswer" label="Answer" />
 	</t>
		
	<button id="ok" action="actionOK" label="OK"/>
	<button id="next" action="actionOK" label="Next" display="no"/>
  </box>
 
</question>
""" % (questionType,answerOrder, questionClass, 
functions.cleanUp(labels[0]), functions.breakUp(labels[0]), 
functions.cleanUp(labels[1]), functions.breakUp(labels[1]), 
functions.cleanUp(labels[2]), functions.breakUp(labels[2]),
functions.cleanUp(labels[3]), functions.breakUp(labels[3]), outputParagraphs() )
	
	return xml
	
# -------- END OF makeXmlFromText() -------------------- #

def getMetaData(filepath):
	result = {}
	
	fh = open(filepath, "r")
	lines = fh.readlines()
	fh.close()
	
	for line in lines:
		if line.strip() == "":
			continue
		if "Question Type =" in line:
			result["questionType"] = line.split("=")[1].strip()
			continue
		if "Answer Order =" in line:
			result["answerOrder"] = line.split("=")[1].strip()
			continue
		
	return result

def getXML(filepath):
	fh = open(filepath, "r")
	content = fh.read()
	fh.close()
	return content

def process(filepath):
	metaData = getMetaData(filepath)
	# metaData["questionType"]
	doc = functions.getXMLDocument(filepath)
	packageName = functions.getPackageName(doc)
	
	javaCode = "package " + packageName + """;
	
import om.OmDeveloperException;
import om.OmException;
import om.helper.SimpleQuestion1;
import om.stdcomponent.DropBoxComponent;


public class B825Question extends SimpleQuestion1 {
	
	/*
	 *  Assume that the draggable items are numbered from the top as a,b,c,d
	 *  The "answers" array is then the letters of each dragbox as laid
	 *  in their correct destinations.
	 *  For example, the dragboxes might start as:
	 *  A
	 *  B
	 *  C
	 *  D
	 *  and end up (in the dropboxes) as:
	 *  BD
	 *  CA
	 *  which would be represented in the "answers" array, similar to below:
	 */
	
	String [ ] answers = { 
			%s
	};
	
	protected void doAdditionalAnswerProcessing(boolean bRight, boolean bWrong, boolean bPass, int iAttempt) throws OmDeveloperException {
		if(bRight) {
			getComponent("got_it_right").setDisplay(true);
		}
		if(bWrong && iAttempt == 3) {
			getComponent("always_wrong").setDisplay(true);
		}
	}
	
	public void showAnswer() throws OmException {
		
		for(int i=0; i<answers.length; i++) {
			String dropboxID = "" + ((char) (i + 97)); // adding 97 converts 0 to a, 1 to b etc.
			DropBoxComponent dbc = getDropBox(dropboxID);
			String dragboxID = answers[i] + answers[i];
			dbc.setValue(dragboxID);
			dbc.setEnabled(false);
		}
		
		getComponent("answerbox").setDisplay(false);	
		getComponent("inputbox").setDisplay(true);
		getComponent("inputbox").setEnabled(true);
		getComponent("continueButton").setDisplay(true);
		getComponent("submitButton").setDisplay(false);
		getComponent("skipButton").setDisplay(false);
		getComponent("instructions").setDisplay(false);
		getComponent("showanswer").setDisplay(true);
		
	}
	
	public void actionSubmit() throws OmException {
		getComponent("inputbox").setDisplay(false);
		getComponent("answerbox").setDisplay(true);
		super.actionSubmit();
	}
	
	public void actionGiveUp() throws OmDeveloperException {
		getComponent("inputbox").setDisplay(false);
		super.actionGiveUp();
	}
	
	protected boolean isRight(int iAttempt) throws OmDeveloperException
	{	
		int numberCorrect = 0;
		
		for(int i=0; i<answers.length; i++) {
			String dropboxID = "" + ((char) (i + 97)); // adding 97 converts 0 to a, 1 to b etc.
						
			String draggedID = getDropBox(dropboxID).getValue();
			if(!draggedID.equals("")) {
					if(draggedID.equals(answers[i] + answers[i])) { // dragged items have IDs like aa, bb, cc
						numberCorrect++;
					}
			}
			
		}
		
		switch(iAttempt) {
				case 1:
				setFeedbackID("first_try");
				break;
		
				case 2:
				setFeedbackID("second_try");
				break;
		}
		
		if(numberCorrect == answers.length) {
			return true;
		}
		
		return false;
	}
	
	public void actionOK() throws OmException {
		getComponent("answerbox").setDisplay(false);
		getComponent("inputbox").setDisplay(true);
		
		for(int i=0; i<answers.length; i++) {
			String dropBoxID = "" + ((char) (i + 97)); // adding 97 converts 0 to a, 1 to b etc.
			DropBoxComponent dbc = getDropBox(dropBoxID);
			String dropped = dbc.getValue();
			if(!dropped.equals("")) {
				if(!dropped.equals(answers[i] + answers[i])) {
					dbc.clear();
				}
			}
		}
	
		super.actionOK();
	}

	
} // end of class
""" % (textfunctions.addQuotes(metaData["answerOrder"]))

	packageDirs = functions.getPackageDirs(doc)
	# print packageDirs
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
		
	
	
	
	
	
	