
testdir = "\\\\kestrel\\om-tn\\testbank"
questiondir = "\\\\kestrel\\om-tn\\questionbank"

import os, xml.dom.minidom

files = os.listdir(testdir)

print "\nReading deploy files and making list of questions:\n\n"

questionrefs = []
questions = []
trimmedquestions = []
badxml = []
orphans = []

safetyvalve = 8000

safety = 0
for file in files:
        
        if safety > 0 and safety % 500 == 0:
                print "\n", safety, "files processed",
        if safety > safetyvalve:
                break
        safety += 1
        
        if "test.xml" in file:
                fullfile = testdir + "\\" + file
                f = open(fullfile, "r")
                doc = None
                try:
                        doc = xml.dom.minidom.parse(f)
                except:
                        badxml.append(file)
                        
                f.close()

                if doc:
                        qs = doc.getElementsByTagName("question");

                        for q in qs:
                                questionrefs.append(q.getAttribute("id"))
                       
print "\n\nGetting list of files:"

questions = os.listdir(questiondir)

print "\nAdjusting filenames:\n\n"

for q in questions:
        if ".jar" in q:
                trimmedquestions.append(q[:-8])

questions = None

safety = 0

for t in trimmedquestions:
        if safety > 0 and safety % 500 == 0:
                print safety, "filenames checked"
        if safety > safetyvalve:
                break
        safety += 1
        
        if not t in questionrefs:
                orphans.append(t)


winnowed_orphans = []

for orphan in orphans:
    if orphan not in winnowed_orphans:
        winnowed_orphans.append(orphan)

orphans = winnowed_orphans

print "\n", len(orphans), " orphaned files found.\n\n"

orphans.sort()

for orphan in orphans:
        print orphan

print "\n\nBad XML Files"
print "-------------"
for bxf in badxml:
        print bxf

print "\n\nFINISHED"



                         
                
                
