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
    
    image.old_imageid = row.imageid
    image.title = row.title

    images.append(image)

for image in images:   
    cursor.execute("""select * from photoshare_tblTags where imageid = %s """ % (image.old_imageid) )
    rows = cursor.fetchall()

    tags = []
    
    for row in rows:
        tags.append(row.tag)

    image.tags = tags

cnxn.close()

cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER=chimp;DATABASE=open_design_studio_y033_13j;UID=open_design_studio_y033_13j_app;PWD=plOKM987654uhb$')
cursor = cnxn.cursor()

for image in images:   
    cursor.execute("select * from photoshare_tblImages where owner = 'tee23' and presentation = '14b' and title = ?", image.title )
    rows = cursor.fetchall()

    image.new_imageid = rows[0].imageid

for image in images:
    for tag in image.tags:
        cursor.execute("""insert into photoshare_tblTags (tag, imageid) values (?, ?)""", tag, image.new_imageid)
        cnxn.commit()
    print image.new_imageid
    print image.tags
    print "---------------------------------"



        
