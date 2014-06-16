# textfunctions.py

def getQuestionTypeFromText(lines):

	for line in lines:
		line = line.strip()
		if "Question Type" in line:
			qt = line.split("=")[1].strip()
			return qt
	
	return "CAN'T FIND QUESTION TYPE"
	
def addQuotes(s):
	newstring = ""
	# takes a comma separated list like:  a,b,c,d
	# and turns it into: "a", "b", "c", "d"
	items = s.split(",")
	
	counter = 0
	for item in items:
		counter += 1
		newstring += "\"" + item.strip() + "\""
		if counter < len(items):
			newstring += ","
		
		
	return newstring



