import functions
import os
import shutil

resources = ["tick.gif"]

# -------- START OF makeXmlFromText() -------------------- #

def makeXmlFromText(lines, questionClass):
	
	questionType = ""
	answer = ""
	paragraphs = []
	labels = []
	height = "480"
	
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
		if "Answer =" in line: 
			answer = line.split("=")[1].strip()
		if "Paragraph =" in line:
			paragraphs.append(line.split("=")[1].strip())
			continue
		if "Height =" in line:
			height = line.split("=")[1].strip()
			continue
		if "=" not in line:
			labels.append(line.strip())
			
	paragraphText = ""
	for p in paragraphs:
		paragraphText += "<t>%s</t><gap/>" % p
			
	xml = """<!--
Question Type = %s
Answer = %s
-->
<question class="%s">

 <scoring><marks>3</marks></scoring>

 <layout>
  <row height="%s"/>
  <column width="350"/>  
 </layout>
 
 <!-- Defines the left-hand question box -->
 <box gridx="0" gridy="0" id="inputbox" background="input">
 

<t>
%s
</t>
  	
	<gap/>
	
	<table cols="2" rows="%s">
""" % (questionType, answer, questionClass, height, paragraphText,  len(labels))

	count = 0
	for label in labels:
		xml += """<row>
<t><radiobox id="box%s" group="g1"></radiobox></t>
<t>%s</t>
</row>""" % (chr(97+count), label)
		count += 1

	xml += """
</table>
	 
<gap/> 
  <centre>
   <button action="actionSubmit" label="Submit"/>
   <button action="actionGiveUp" label="Skip"/>
  </centre>  
  
 </box>

 <!-- Defines the right-hand answer box, which is initially hidden  -->
 <box gridx="0" gridy="0" id="answerbox" display="no" background="answer">
   
	<t id="wrong">Your answer is <t id="still">still</t> not correct.</t>
	<t id="right">Your answer is correct.</t>
	<t id="pass">You passed on this question. The correct answer was:</t>	
	<gap/>
	
	<t id="feedback">
		<t id="first_try">
		Have another go.
		<gap/>
		</t>
		<t id="second_try">
		One more try left.
		<gap/>
		</t>
		<t id="last_try">
		The answer was:
		<gap/>
		</t>
		
		
	</t>	 
   
  <t id="answer">
  %s
  </t>
  <gap/>
		
	<centre>
	 <button action="actionOK" label="OK"/>
	</centre>  
   
 </box>
 
</question>""" % (labels[ord(answer) - 97])
	
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
		if "Question Type =" in line:
			result["questionType"] = line.split("=")[1].strip()
			continue
		if "Answer =" in line:
			result["answer"] =  line.split("=")[1].strip()
			continue
					
	return result

def getXML(filepath):
	fh = open(filepath, "r")
	content = fh.read()
	fh.close()
	return content

def process(filepath):
	metaData = getMetaData(filepath)
	doc = functions.getXMLDocument(filepath)
	packageName = functions.getPackageName(doc)
	
	javaCode = "package " + packageName + """;
	
import om.*;
import om.helper.SimpleQuestion1;

public class B825Question extends SimpleQuestion1
{ 
	private char correctAnswer = '%s';
	
	protected boolean isRight(int iAttempt) throws OmDeveloperException {
    	
		switch(iAttempt) {
			case 1:
			setFeedbackID("first_try");
			break;
			
			case 2:
			setFeedbackID("second_try");
			break;
			
			case 3:
			setFeedbackID("last_try");
			break;
		}
	
		
  		if(getRadioBox("box"+ correctAnswer).isChecked()) {
  			return true;
  		}
  		
  		
  		
  		return false;
	}
  
  public void actionOK() throws OmException {
		
		getComponent("answerbox").setDisplay(false);
		getComponent("inputbox").setDisplay(true);
		
		super.actionOK();
	} // end of actionOK() method
  
  public void actionSubmit() throws OmException {
		getComponent("inputbox").setDisplay(false);
		getComponent("answerbox").setDisplay(true);
		super.actionSubmit();
	}
  
  public void actionGiveUp() throws OmDeveloperException {
	  	getComponent("inputbox").setDisplay(false);
		super.actionGiveUp();
	}
  
} // end of class
""" % (metaData["answer"])

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
		
	
	
	
	
	
	