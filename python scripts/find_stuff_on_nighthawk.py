
dir_path = "\\\\nighthawk\\hsc-y033\\ods\\14b"

searchtext = """var_dump"""

searchtext2 = """header"""

import os

counter = 0
safety = 200

found_items = []

def print_tree(tree_root_dir):

        global counter, safety, found_items
       
        def printall(junk, dirpath, namelist):

                if "current" in dirpath:
                        return
                
                global counter, safety, found_items
                
                counter += 1
                if counter > safety:
                        print "exceeded allowed iterations - exiting"
                        exit()
               
                for name in namelist:
                        print '.',
                        if name == '.':
                                continue
                        if name == '..':
                                continue
                        if ".php." in name:
                                continue
                        if ".php" in name:

                                fullpath = os.path.join(dirpath, name)
                                
                                fp = open(fullpath)
                                
                                lines = fp.readlines()
                                fp.close()

                                linecount = 0
                                for line in lines:
                                        linecount += 1
                                        #if (searchtext in line.lower()) and (searchtext2 in line.lower()):
                                        if (searchtext in line.lower()):
                                        #if (searchtext2 in line.lower()):
                                                found_items.append('line: ' + str(linecount) + ' -> ' + fullpath)
                                                break
                                                                                                                      

        os.path.walk(tree_root_dir, printall, None)
        
print
print 'Searching for: ', searchtext
print
print_tree(dir_path)
print

for item in found_items:
        print item

if len(found_items) == 0:
        print
        print 'no files contained: ', searchtext

print
