import os

#start_place = "\\\\tees\\oubs_dev\\B822Inventory"
start_place = "\\\\tees\\oubs_live\\B822Inventory"

sams1 = """AUTHID 00000008,B82209E,BZT8229E,BZX8229E,INTRASVR
FETCH_SAMS_USER_AUTHIDS"""

sams2 = """AUTHID 00000008,B822,B82209E,BZT8229E,BZX8229E,INTRASVR
FETCH_SAMS_USER_AUTHIDS"""

sams3 = """AUTHID B822,B82209E,BZT8229E,BZX822,BZX8229E,INTRASVR
FETCH_SAMS_USER_AUTHIDS"""

sams4 = """AUTHID 00000008,INTRASVR
FETCH_SAMS_USER_AUTHIDS"""

sams5 = "The cat sat on the mat" # will give server error


text_to_write = sams3

                         
for path, subdirs, files in os.walk(start_place):
    for file in files:
        if file == ".sams":
            print path

            fullfile = os.path.join(path, file)
            fp = open(fullfile, "w")
            fp.write(text_to_write)
            fp.close()
     
         
