""" This script turns relatively javascripty scripts into the weird format that
    our dear program can read more easily """

import os


def parse(data):
    finalData = []
    for block in data.split("~"):
        lineData = []
        for line in block.split("\n"):
            nonComment = line.split("//")[0]
            if (len(nonComment) == 0):
                continue
            lineData.append(nonComment)
        finalData.append("".join(lineData))
    return "\n".join(finalData)


packFile = open('release/scriptPack.json','w')
packFile.write('{"scripts":[')

addComma = False

path = 'scripts/'
listing = os.listdir(path)
for infilename in listing:
    infile = open('scripts/'+infilename,'r')
    parsedData = parse(infile.read())
    infile.close()

    noExtName = infilename.split('.')[0]

    if addComma: packFile.write(',')
    else: addComma = True

    packFile.write('{"type":"text","key":"'+noExtName+'","url":"scripts/'+noExtName+'.script"}')

    outfile = open('release/scripts/'+noExtName+'.script','w')
    outfile.write(parsedData)
    outfile.close()

packFile.write(']}')
packFile.close();\
