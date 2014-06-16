
renameDirectory = "c:\\Documents and Settings\\hgd4\\Desktop\\jars to go\\"
version = ".1.1"
prefix_length = 11  # length of filename to come before .jar

import os

jarFiles = os.listdir(renameDirectory)
for q in jarFiles:
	newname = ""
	if ".jar" in q:
		full_q = os.path.join(renameDirectory, q)
		
		prefix = q[:prefix_length]
		
		newname = os.path.join(renameDirectory, prefix + version + ".jar")
		
		# print newname
		
		os.rename(full_q, newname.lower())
		
		
		
print "FINISHED"
