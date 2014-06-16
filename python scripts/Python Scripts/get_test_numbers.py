
sourcedir = "\\\\kestrel\\om-tn\\testbank"

import os

files = os.listdir(sourcedir)

numbers = []

print "Processing files and building list:"

safety = 0
for file in files:
        print ".",
        if safety > 0 and safety % 500 == 0:
                print safety, "files processed",
        if safety > 3000:
                break
        safety += 1
        
        if "deploy.xml" in file:
                
                fullfile = sourcedir + "\\" + file
                f = open(fullfile, "r")
                lines = f.readlines()

                for line in lines:
                        if "<batch>" in line:
                                shortline = line.strip()[7:]
                                shortline = shortline[:-8]
                                
                                numbers.append(int(shortline))

print "\n\nOutputting ordered list: \n\n"

numbers.sort()                               
		
for number in numbers:
        print number,
