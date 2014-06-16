import pyodbc

images = []

class Image(object):
    pass

cnxn = pyodbc.connect('DSN=kudusqlodbc')
cursor = cnxn.cursor()
cursor.execute("select * from photoshare_tblImages where owner = 'tee23' and presentation = '13j'")
rows = cursor.fetchall()

new_imageid = 200000

for row in rows:
    new_imageid += 1
    image = Image()
    image.old_imageid = row.imageid
    image.new_imageid = new_imageid
    image.filename = row.filename
    image.dateuploaded = row.dateuploaded
    image.lastmodified = row.lastmodified
    image.title = row.title
    image.description = row.description      
    images.append(image)

for image in images:   
    cursor.execute("""select * from photoshare_tblTags where imageid = %s """ % (image.old_imageid) )
    rows = cursor.fetchall()

    tags = []
    
    for row in rows:
        tags.append(row.tag)

    image.tags = tags

for image in images:
    
    cursor.execute("""
    insert into photoshare_tblImages
    (imageid, filename, owner, dateuploaded, lastmodified, title, description, presentation)
    values (?, ?, ?, ?, ?, ?, ?, ?)""", image.new_imageid, image.filename, 'tee23', image.dateuploaded, image.lastmodified,
    image.title, image.description, '14b')
    cnxn.commit()

    for tag in image.tags:
        cursor.execute("""insert into photoshare_tblTags (tag, imageid) values (?, ?)""", tag, image.new_imageid)
        cnxn.commit()

        
