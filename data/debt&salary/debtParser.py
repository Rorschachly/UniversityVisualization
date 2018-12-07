
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


writer = open("debtAndSalary.csv", "w");

debt = {};
salary = {};
schools = [];

with open('debt.csv') as dFile:
    reader = csv.reader(dFile, delimiter=',')
    for row in reader:
        processedName = nameParser(row[0]);
        debt[processedName] = row[1];

with open('salaryTop600.csv') as sFile:
    reader = csv.reader(sFile, delimiter=',')
    for row in reader:
        processedName = nameParser(row[0]);
        salary[processedName] = row[1];

with open('schoolDebt.csv') as schoolFile:
    reader = csv.reader(schoolFile, delimiter=',')
    for row in reader:
        name = nameParser(row[0]);
        if (name in salary) and (name in debt):
            stuSalary = int(salary[name]);
            stuDebt = int(debt[name]);
            monthToPay = stuDebt * 4 / stuSalary * 12;
            rank = row[1];
            score = row[2];
            business = row[3];
            engineering = row[4];
            tuition = row[5];
            enrollment = row[6];
            aidPercent = row[7];
            costWithAid = row[8];
            control = row[9];
            schools.append({"name":name, "rank":rank, "score":score,
                            "business":business, "engineering":engineering, "tuition":tuition,
                            "enrollment":enrollment, "aidPercent":aidPercent, "costWithAid":costWithAid,
                            "control":control, "salary": stuSalary, "debt":stuDebt, "month":monthToPay});

# for school in info:
#     school["coordinate"] = zips[str(int(school["zip"]))]

writer.write("displayName,rank,overall,business,engineer,tuition,enrollment,aidPercent,costWithAid,control,debt,salary,monthToPay\n")

for school in schools:
    writer.write(school["name"]+","+str(school["rank"])+","+str(school["score"])+","+str(school["business"])+","
    +str(school["engineering"])+","+str(school["tuition"])+","+str(school["enrollment"])+","
    +str(school["aidPercent"])+","+str(school["costWithAid"])+","+school["control"]+","
    +str(school["debt"])+","
                 +str(school["salary"])+","
                 +str(school["month"])+"\n");

writer.close()

