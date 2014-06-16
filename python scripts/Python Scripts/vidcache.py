
chrome_dir = "C:\Documents and Settings\hgd4\Local Settings\Application Data\Google\Chrome\User Data\Default\Cache"
iterations = 30
pause = 2

changed_files = []

file_info1 = {}

file_info2 = {}

import time, os

def check_dir(param1):
    files = os.listdir(chrome_dir)
    print
    for f in files:
        full = os.path.join(chrome_dir, f)
        if os.path.isfile(full):
            if param1 == "initial":
                file_info1[f] = os.stat(full).st_size
            else:
                file_info2[f] = os.stat(full).st_size
                
    print "----------------------------------"

check_dir("initial")    

for i in range(iterations):
    time.sleep(pause)
    check_dir("subsequent")
    for c in initial_file_info:
        if file_info1[c] != file_info2[c]:
            print "file changed!", c
        
