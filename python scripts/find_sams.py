
#dir_path = "\\\\userdata\\documents4\\hgd4\\Desktop\\GitHub"

dir_path = "\\\\palmcreeper\\hsc-y033\\ods\\14b"

import os

counter = 0
safety = 100

def print_tree(tree_root_dir):

        global counter, safety
       
        def printall(junk, dirpath, namelist):
                
                print ".",

                global counter, safety
                
                counter += 1
                if counter > safety:
                        exit()

                print dirpath
               
                for name in namelist:
                        
                        if 'sams' in name:
                                print os.path.join(dirpath, name)
                        

        os.path.walk(tree_root_dir, printall, None)
        

print_tree(dir_path)
