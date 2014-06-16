import pyodbc

images = []

class Image(object):
    pass

cnxn = pyodbc.connect('DSN=kudusqlodbc')
cursor = cnxn.cursor()
cursor.execute("select * from photoshare_tblImages where owner = 'tee23' and presentation = '13j'")
rows = cursor.fetchall()

for row in rows:
    
    image = Image()
    
    image.imageid = row.imageid
    image.filename = row.filename
    image.dateuploaded = row.dateuploaded
    image.lastmodified = row.lastmodified
    image.title = row.title
    image.description = row.description
    
    images.append(image)

cnxn.close()

for image in images:
    print image.title

cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER=chimp;DATABASE=open_design_studio_y033_13j;UID=open_design_studio_y033_13j_app;PWD=plOKM987654uhb$')
cursor = cnxn.cursor()

for image in images:
    print ".",
    
    cursor.execute("""
    insert into photoshare_tblImages
    (filename, owner, dateuploaded, lastmodified, title, description, presentation)
    values (?, ?, ?, ?, ?, ?, ?)""", image.filename, 'tee23', image.dateuploaded, image.lastmodified,
    image.title, image.description, '14b')
    
    cnxn.commit()

    
