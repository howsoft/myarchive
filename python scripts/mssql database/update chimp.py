import pyodbc

cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER=chimp;DATABASE=open_design_studio_y033_13j;UID=open_design_studio_y033_13j_app;PWD=plOKM987654uhb$')
cursor = cnxn.cursor()

cursor.execute("update photoshare_tblUsers set name = 'Y033 module team' where oucu = 'tee23'")
    
cnxn.commit()

print "finished"

    
