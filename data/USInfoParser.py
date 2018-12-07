import json
import csv

writer = open("schoolInfo.csv", "w")

zips = {}
with open('schoolInfo.json') as f:
    info = json.load(f);

with open('zip.txt') as zipFile:
    reader = csv.reader(zipFile, delimiter=',')
    for row in reader:
        zips[str(row[0])] = [row[1],row[2]]

for school in info:
    school["coordinate"] = zips[str(int(school["zip"]))]

writer.write("displayName,sat,act,state,lat,lng,rank,hsGPA,acceptRate,overall,business,engineer,tuition,enrollment,aidPercent,costWithAid,control\n")

for school in info:
    writer.write(school["displayName"]+","+str(school["sat-avg"])+","+str(school["act-avg"])+","+school["state"]+","+school["coordinate"][0]+","+school["coordinate"][1]+","+str(school["rankingSortRank"])+","+str(school["hs-gpa-avg"])+","+str(school["acceptance-rate"])+","+str(school["rankingDisplayScore"])+","+str(school["businessRepScore"])+","+str(school["engineeringRepScore"])+","+str(school["tuition"])+","+str(school["enrollment"])+","+str(school["percent-receiving-aid"])+","+str(school["cost-after-aid"])+","+school["institutionalControl"]+"\n")

writer.close()
