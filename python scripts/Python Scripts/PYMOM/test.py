# Script for generating OM xml and java 

className = "B825Question"
packageName = "b825saqs"

xmlDirectory = "xml"
textDirectory = "Question Text Files"
questionsDirectory = "C:\\Program Files\\Apache Software Foundation\\Tomcat 5.5\\webapps\\om\\questions"
sourceTree = "C:\Documents and Settings\hgd4\Desktop\PYMOM"

import os, re
import random
import sys
import xml.dom.minidom
import urllib, urlparse
import webbrowser

sys.path.append(sourceTree + "\utility_modules")
sys.path.append(sourceTree + "\modules")

import functions
import textfunctions

# specific modules for different types of question:
import drag1
import radio1

# delete xml files in the questions directory
questionXmlFiles = os.listdir(questionsDirectory)
for q in questionXmlFiles:
	if ".xml" in q:
		full_q = os.path.join(questionsDirectory, q)
		os.remove(full_q)

# delete old xml (which was created from the text files)
functions.deleteAll(xmlDirectory)

# recreate empty XML directory
os.mkdir(xmlDirectory)

# get text files
textfiles = os.listdir(textDirectory)
xmlFromText = ""

for t in textfiles:

	questionName = t[:-4]
	fullClassName = packageName + "." + questionName + "." + className

	fh = open(os.path.join(textDirectory, t))
	tempLines = fh.readlines()
	fh.close()
	
	textAsLines = []
	
	# ///////////////////////////// REPLACEMENTS ///////////////////////////////////// #
	for t_line in tempLines:
		
		t_line = t_line.replace("<", "&lt;")
		t_line = t_line.replace(">", "&gt;")
		t_line = t_line.replace("**", "<break/>")
		
		textAsLines.append(t_line)
	# /////////////////////// END OF REPLACEMENTS /////////////////////////// #	
	
	qType = textfunctions.getQuestionTypeFromText(textAsLines)
	
	if qType == "CAN'T FIND QUESTION TYPE":
		raw_input("Problem with finding Question Type. Press Enter to quit.")
		sys.exit()
		
	xmlFromText = ""
		
	if qType == "drag1":
		xmlFromText = drag1.makeXmlFromText(textAsLines, fullClassName)
				
	if qType == "radio1":
		xmlFromText = radio1.makeXmlFromText(textAsLines, fullClassName)
		
	xmlOutputPath = os.path.join(xmlDirectory, t[:-3] + "xml")
	fh = open(xmlOutputPath, "w")
	fh.write(xmlFromText)
	fh.close()
	xmlFromText = ""

# get working xml files
xmlfiles = os.listdir(xmlDirectory)

firstRun = True
packageRoot = ""

for xmlfile in xmlfiles:
	questionType = ""

	if ".xml" in xmlfile:
		filepath = os.path.join(xmlDirectory, xmlfile)
				
		# Get Question Type
		fh = open(filepath, "r")
		datalines = fh.readlines()
		fh.close()
		questionType = functions.getQuestionType(datalines)
						
		# if this is first iteration delete directory to start afresh
		# Get package root directory
		if firstRun:
			theXML = urllib.urlopen(filepath)
			doc = xml.dom.minidom.parse(theXML)
			packageRoot = functions.getPackageRoot(doc.documentElement.getAttribute("class"))
		
			if os.path.exists(packageRoot): # if the package root directory exists
				functions.deleteAll(packageRoot)
		
			firstRun = False
		
		if questionType == "drag1":
			drag1.process(filepath)
						
		if questionType == "radio1":
			radio1.process(filepath)
	
		# Write xml file to OM questions directory
		thisDoc = functions.getXMLDocument(filepath)
		thisPackageName = functions.getPackageName(thisDoc) 
		questionsXmlPath = os.path.join(questionsDirectory, thisPackageName + ".xml")
		
		qXml = functions.getQuestionXML(sourceTree, thisPackageName)
		fh = open(questionsXmlPath, "w")
		fh.write(qXml)
		fh.close()
		
		
		

			
# uncomment the next line if running from a batch file
# raw_input("PRESS ENTER TO CLOSE THIS WINDOW AND START THE 'OM' SITE IN YOUR BROWSER")
		
# have next line uncommented if you want to start the browser
webbrowser.open("http://localhost:8080/om/?refresh=" + str(random.random()))	
# could go to the build for a particular question by using a different url

sys.exit()