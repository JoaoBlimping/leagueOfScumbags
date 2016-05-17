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


path = 'scripts/'
listing = os.listdir(path)
for infilename in listing:
    infile = open('scripts/'+infilename,'r')
    parsedData = parse(infile.read())
    infile.close()

    outfile = open('release/scripts/'+infilename.split('.')[0]+'.script','w')
    outfile.write(parsedData)
    outfile.close()
