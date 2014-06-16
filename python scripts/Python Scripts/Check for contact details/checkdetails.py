
# Python script for checking for <supportcontacts> tag
# Files modified after the date set below will be checked

year = 2009
month = 1
day = 1

safetyvalve = 2000 # to bale out in case we inadvertantly start an endless loop

testdir = "\\\\kestrel\\om-tn\\testbank"

import os, xml.dom.minidom, stat, time, datetime

checkdate = datetime.date(year, month, day)

checkdateTickCount = time.mktime(checkdate.timetuple())

files = os.listdir(testdir)

print "\nReading deploy files:\n\n"

safety = 0
for file in files:

             
        if safety > 0 and safety % 500 == 0:
                print "\n\n", safety, "files processed\n\n",
        if safety > safetyvalve:
                break
        safety += 1
        
        if "deploy.xml" in file:
                fullfile = os.path.join(testdir, file)

                if not os.stat(fullfile)[stat.ST_MTIME] > checkdateTickCount:
                        continue
                
                f = open(fullfile, "r")
                doc = None
                try:
                        doc = xml.dom.minidom.parse(f)
                except:
                        print "problem with xml in: ", file
                        
                f.close()

                if doc:
                        qs = doc.getElementsByTagName("supportcontacts");
                        if len(qs) == 0:
                                print file
                                # print "Last modified: ", time.ctime(os.stat(fullfile)[stat.ST_MTIME])
                                # print
                               
                                       
print "\n\nFINISHED"



                         
                
                
