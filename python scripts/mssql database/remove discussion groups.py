import pyodbc

groups = []

class Group(object):
    pass

cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER=chimp;DATABASE=open_design_studio_y033_13j;UID=open_design_studio_y033_13j_app;PWD=plOKM987654uhb$')
cursor = cnxn.cursor()

cursor.execute("select groupid from photoshare_tblGroups where presentation = '14b'")
rows = cursor.fetchall()

for row in rows:
    group = Group()
    group.groupid = row.groupid
    groups.append(group)

for group in groups:
    cursor.execute("select distinct username from photoshare_tblGroupMembers where groupid = ?", group.groupid)
    users = []
    rows = cursor.fetchall()
    for row in rows:

        if "_" in row.username:
            users.append(row.username)
            
    group.users = users
    
for group in groups:
    print "removing: ", group.groupid, len(group.users), " user -> ", group.users[0]

    #cursor.execute("delete from photoshare_tblGroupMembers where groupid = ? and username = ?", group.groupid, group.users[0])
    #cnxn.commit()


print "finished"

    
