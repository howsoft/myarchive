
import os

pathtofiles = "C:\\Documents and Settings\\hgd4\\Desktop\\newlinetest\\"

files = os.listdir(pathtofiles)

for file in files:

    newtext = ""
    
    fh = open(os.path.join(pathtofiles, file), "r")
    lines = fh.readlines()
    for line in lines:
        line = line.replace("\n", "")
        if line.strip() == "":
            line = "<p>&nbsp;</p>"
        else:
            line = "<p>" + line + "</p>"

        line = line + "\n"
            
        newtext += line

    fh.close()
    newfile = file.replace(".txt", ".htm")
    fh = open(os.path.join(pathtofiles, newfile), "w")
    fh.write(newtext)
    fh.close()
    
    


