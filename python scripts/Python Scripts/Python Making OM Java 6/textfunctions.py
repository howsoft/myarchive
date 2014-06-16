# textfunctions.py

def getQuestionTypeFromText(lines):

	for line in lines:
		line = line.strip()
		if "Question Type" in line:
			qt = line.split("=")[1].strip()
			return qt
	
	return "CAN'T FIND QUESTION TYPE"



