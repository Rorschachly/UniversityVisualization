def convertLines(lines, cwur=False):
    head = lines[0]
    del lines[0]
    infoDict = {}
    for line in lines: 
        if cwur:
            key = parseName(line.split(',')[0])
            value1 = list(line.split(',')[1:])
            value2 = selectAttrs(value1)
            if 'USA' == value1[0]:
                if key in infoDict:
                    infoDict[key].append(tuple(value2))
                else:
                    infoDict[key] = [tuple(value2)]
        else:
            k = line.split(",")[0]
            value = list(line.split(",")[1:])
            value[len(value)-1] = value[len(value)-1].replace('\n', "")
            if k in infoDict:
                infoDict[k].append(value)
            else:
                infoDict[k] = value
    return infoDict


def parseName(name):
    return name.replace('"', '').replace(' at ', '--').replace(', ', '--').replace(' - ', "--")


def selectAttrs(lst):
    result = []
    length = len(lst)
    for i in range(length):
        if i >= length - 3:
            result.append(lst[i])
    return result


def read_file(filename):
    thefile = open(filename, 'r')
    lines = []
    for i in thefile:
        lines.append(i)
    thefile.close()
    return lines


def findCommonSchools(dict1, dict2):
    result = {}
    index = 0
    for k, v in dict1.iteritems():
        if k in dict2:
            values = dict2[k]
            for val in values:
                result_value = [k] + v + (list(val))
                result[index] = result_value
                index += 1
    return result


def main():
    mydict1 = convertLines(read_file('./schoolInfo.csv'))
    mydict2 = convertLines(read_file('./cwurData.csv'), True)
    result_dict = findCommonSchools(mydict1, mydict2)
    result = "UniversityName,sat,act,state,lat,lng,rank,hsGPA,acceptRate,overall,business,engineer,tuition,enrollment,aidPercent,costWithAid,control,patent,score,year\n"
    for _, v in result_dict.iteritems():
        res = ','.join(v)
        result += res

    with open('merged_school_data.csv','wb') as file:
        lines = result.split("\n")
        for line in lines:
            file.write(line)
            file.write('\n')
    

if __name__ == '__main__':
    main()