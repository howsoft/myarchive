import os
import urllib, urlparse
import xml.dom.minidom

def cleanUp(s):
	newstring = s.lower().replace("<br>", "")
	newstring = s.lower().replace("<br/>", "")
	newstring = s.lower().replace("<br />", "")

def breakUp(s):
	newstring = s.lower().replace("<br>", "<break/>")
	newstring = newstring.replace("<br/>", "<break/>")
	newstring = newstring.replace("<br />", "<break/>")
	# print newstring
	
	return newstring
	

def getQuestionType(lines):
	counter = 0
	for line in lines:
		if(line.strip() == ""):
			continue
		if("Question Type" in line):
			return line.split("=")[1].strip()
	return "COULDN'T FIND QUESTION TYPE"
			
def getPackageRoot(classString):
	return classString.split(".")[0].strip()

def getQuestionXML(sourceTree, packageName):
	return """
	<questiondefinition>
	<sourcetree>%s</sourcetree>
	<package>%s</package>
	</questiondefinition>
	""" % (sourceTree, packageName)

def getXMLDocument(filepath):
	f = urllib.urlopen(filepath)
	return xml.dom.minidom.parse(f)
	
def getPackageName(doc):
	temp = doc.documentElement.getAttribute("class")
	dirs = temp.split(".")[:-1]
	packageName = ""
	for directory in dirs:
		packageName += directory + "."
		
	packageName = packageName[:-1]	
	
	return  packageName
	
def getPackageDirs(doc):
	temp = doc.documentElement.getAttribute("class")
	return temp.split(".")[:-1]
	
def getJavaClass(doc):
	temp = doc.documentElement.getAttribute("class")
	return temp.split(".")[-1]

# //////////////////////////////// start of deleteAll() /////////////////////////////// #

def deleteAll(directoryRoot):
	def deleteFiles(junk, dirpath, namelist):
		for name in namelist:
			fullPath = os.path.join(dirpath, name)
			if os.path.isfile(fullPath):
				try:	
					print "deleting: " + fullPath
					os.remove(fullPath)
				except:
					print "********************************************************"
					print "CANNOT CONTINUE - UNABLE TO DELETE: " + fullPath
					print "********************************************************"
					sys.exit()
				
	def deleteDirectories(junk, dirpath, namelist):
		for name in namelist:
			fullPath = os.path.join(dirpath, name)
			if os.path.isdir(fullPath):
				try:
					os.rmdir(fullPath)
					print "deleting: " + fullPath
				except:
					print "couldn't delete " + fullPath + " Will try again ... "
					
				
	os.path.walk(directoryRoot, deleteFiles, None)
	
	safety = 0
	
	while os.path.isdir(directoryRoot) and safety < 10:
		os.path.walk(directoryRoot, deleteDirectories, None)
		try:
			os.rmdir(directoryRoot)
			print "deleting: " + directoryRoot
		except:
			print "couldn't delete " + directoryRoot + " Will try again."
			
		safety += 1
		
# //////////////////////////////// end of deleteAll /////////////////////////////// #	