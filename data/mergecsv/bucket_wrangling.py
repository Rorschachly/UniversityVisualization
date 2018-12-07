def convertLines(lines):
    head = lines[0]
    del lines[0]
    infoDict = {}
    for line in lines: 
        k = line.split(",")[0]
        value = list(line.split(",")[1:])
        value[len(value)-1] = value[len(value)-1].replace('\n', "")
        if k in infoDict:
            infoDict[k].append(value)
        else:
            infoDict[k] = value
    # print(str(infoDict))
    return infoDict


def print_result(mydict):
    result  = ""
    for key, val in mydict.iteritems():
        range1 = key * 10 + 1
        range2 = (key + 1) * 10
        str_val = ''
        for k, v in val.iteritems():
            if k == 'public':
                str_val  += 'male' + ":" + str(v) + ", "
            else:
                str_val  += 'female' + ":" + str(v) + ", "
        str_val = str_val[:(len(str_val) - 2)]
        now_str = "{group: '" + str(range1) +  "-" + str(range2) + "', " + " " + str_val + "},\n"
        result = now_str + result
    print(result)
    print("male->public; female->private")


def read_file(filename):
    thefile = open(filename, 'r')
    lines = []
    for i in thefile:
        lines.append(i)
    thefile.close()
    return lines


def get_group(dict):
    infoDict = {}
    pri_count = 0
    pub_count = 0
    pri_tui = 0
    pub_tui = 0
    for k, v in dict.iteritems():
        if int(v[5]) > 0 and int(v[5]) < 201:
            group = (int(v[5]) - 1)/10
            if group not in infoDict:
                infoDict[group] = {}
                infoDict[group]['private'] = 0
                infoDict[group]['public'] = 0
            control = v[len(v) - 1]
            if control == "private":
                infoDict[group]['private'] += 1
                pri_count += 1
                pri_tui += int(v[len(v) - 5])
            elif control == "public":
                infoDict[group]['public'] += 1
                pub_count += 1
                pub_tui += int(v[len(v) - 5])
    print("avg private tuition: "  + str(pri_tui / pri_count)  + "; avg public tuition: " + str(pub_tui / pub_count))
    return pri_count, pub_count, pri_tui, pub_tui, infoDict


def main():
    mydict = convertLines(read_file('./schoolInfo.csv'))
    pricnt, pubcnt, pritui, pubtui, result_dict = get_group(mydict)
    print_result(result_dict)
    

if __name__ == '__main__':
    main()