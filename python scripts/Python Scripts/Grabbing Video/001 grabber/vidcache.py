# assumes that chrome is set as the default browser

import time, os, webbrowser

os.system("taskkill /F /IM chrome.exe")# fails without problem if chrome not open
time.sleep(2)   # wait a couple of seconds to let the browser close
                # before deleting files

urls = [
    "http://www.youtube.com/watch?v=wsnSBhWEyK4&feature=related"
]
chrome_dir = "C:\Documents and Settings\hgd4\Local Settings\Application Data\Google\Chrome\User Data\Default\Cache"
iterations = 6
pause = 1

file_info1 = {}

file_info2 = {}

def check_dir(param1):
    global file_info1, file_info2

    #print_fileinfo(file_info1)
    #print_fileinfo(file_info2)
    
    files = os.listdir(chrome_dir)
 
    for f in files:
        full = os.path.join(chrome_dir, f)
        if os.path.isfile(full):
            if param1 == "initial":
                file_info1[f] = os.stat(full).st_size
            else:
                file_info2[f] = os.stat(full).st_size
 
def print_fileinfo(v):
    keys = v.keys()
    for key in keys:
        print key, " : ", v[key]
 
def compare_dirs():
    global file_info1, file_info2
    
    for c in file_info2:
        if not(file_info1.has_key(c)):
            print "NEW FILE"
        else:
            # print "comparing: ", file_info1[c], " with: ", file_info2[c]
            if file_info1[c] != file_info2[c]:
                print "file changed!", c
                #print_fileinfo(file_info2)

# clear out cache
files = os.listdir(chrome_dir)
for file in files:
    fullpath = os.path.join(chrome_dir, file)
    os.remove(fullpath)

os.system("explorer " + chrome_dir)

webbrowser.open(urls[0])
time.sleep(pause)

check_dir("initial") # put file sizes into file_info1

for i in range(iterations):
    print "iteration: ", i
    time.sleep(pause)

    print "before check_dir: "
    print_fileinfo(file_info2)
    
    check_dir("subsequent") # put file sizes into file_info2

    print "after check_dir: "
    print_fileinfo(file_info2)

    compare_dirs()
    
    if file_info2.has_key("f_000006"):
        print file_info2["f_000006"],
    if file_info1.has_key("f_000006"):
        print file_info1["f_000006"]

    file_info1 = file_info2
    
    #print "**"
    #print_fileinfo(file_info1)
    #file_info1 = file_info2
        
