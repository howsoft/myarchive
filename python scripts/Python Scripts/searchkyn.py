
testdir = "c:\\Documents and Settings\\hgd4\\Desktop\\cdr1117\\RiskAssessment"

import os

files = os.listdir(testdir)

print "\nReading files:\n\n"

foundfiles = []

counter = 0

for file in files:
    if ".html" in file:
        fullfile = os.path.join(testdir, file)
        f = open(fullfile, "r")

        lines = f.readlines()
        
        for line in lines:
            line = line.lower()
            if "drug" in line:
                counter += 1
                foundfiles.append(file)
                

         
        f.close()

print counter, " file(s) found"

for ff in foundfiles:
    print ff
    
                                       
print "\n\nFINISHED"



                         
                
                
