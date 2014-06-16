
chrome_dir = "C:\Documents and Settings\hgd4\Local Settings\Application Data\Google\Chrome\User Data\Default\Cache"
iterations = 30
pause = 2

changed_files = []

initial_file_info = {}

temp_file_info = {}

import time, os

def check_dir(param1):
    files = os.listdir(chrome_dir)
    print
    for f in files:
        full = os.path.join(chrome_dir, f)
        if os.path.isfile(full):
            if param1 == "initial":
                initial_file_info[f] = os.stat(full).st_size
            else:
                temp_file_info[f] = os.stat(full).st_size
                
    print "----------------------------------"

check_dir("initial")    

for i in range(iterations):
    time.sleep(pause)
    check_dir("subsequent")
    for c in initial_file_info:
        if initial_file_info[c] != temp_file_info[c]:
            print "file changed!", c
        
