
import os

pathtofiles = "C:\\how_eclipse\\omqstns\\src\\b203\\temp\\"

program = os.path.join("C:\\Program Files\\Notepad++\\", "notepad++")

arguments = []

for i in range(1,21):
    s = ""
    if i < 10:
        s += "0"
    s += str(i)
    arguments.append(pathtofiles + "question" + s + "\\question.xml")

os.execvp(program, (program,) +  tuple(arguments))

exit
