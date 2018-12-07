
import csv

def nameParser(s):
    res = "";
    addSpace = False;
    for char in s:
        if char.isalpha():
            addSpace = True;
            res += char;
        elif addSpace and char != '\'':
            res += ' '
            addSpace = False;
    return res;        


writer = open("schoolByYear.csv", "w");

ratios = {};
salary = {};
schools = [];

with open('timesData.csv') as dFile:
    reader = csv.reader(dFile, delimiter=',')
    for row in reader:
        processedName = nameParser(row[1]);
        try:
            ratios[processedName] = float(row[10]);
        except :
            continue;

with open('merged_school_data.csv') as schoolFile:
    reader = csv.reader(schoolFile, delimiter=',')
    for row in reader:
        try:
            name = nameParser(row[0]);
            if name in ratios:
                print(ratios[name]);
                ratio = float(ratios[name]);
                rank = row[6];
                tuition = row[12];
                control = row[16];
                patent = row[17];
                score = row[18];
                year = row[19];
                schools.append({"name":name, "rank":rank, "score":score,
                                "control":control, "tuition": tuition, 
                                "patent":patent, "year":year, "ratio":ratio});
        except:
            continue;

# for school in info:
#     school["coordinate"] = zips[str(int(school["zip"]))]

writer.write("name,rank,score,control,tuition,patent,year,ratio\n")

for school in schools:
    writer.write(school["name"]+","+str(school["rank"])+","+str(school["score"])+","
    +school["control"]+","+str(school["tuition"])+","+str(school["patent"])+","
    +str(school["year"])+","+str(school["ratio"])+"\n");

writer.close()

