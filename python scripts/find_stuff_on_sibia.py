
dir_path = "\\\\sibia\\hsc-y033\\ods\\13j"

import os

counter = 0
safety = 100

def print_tree(tree_root_dir):

        global counter, safety
       
        def printall(junk, dirpath, namelist):
                
                global counter, safety
                
                counter += 1
                if counter > safety:
                        print "exceeded allowed iterations - exiting"
                        exit()

                
               
                for name in namelist:
                        
                        if 'sams' in name:
                                print os.path.join(dirpath, name)
                        

        os.path.walk(tree_root_dir, printall, None)
        

print_tree(dir_path)
