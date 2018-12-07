/* global d3 */
            // basic parameters
            let lianDongpadding = 25;
            let lianDongDataset = [];  // all data stored here
            let lianDongsampleSize = 30;
            let lianDongsampleData = [];
            


            d3.csv("./schoolInfo_copy.csv", function (row) {
                return {
                    Name: row.displayName,
                    Score: +row.overall,
                    Control: row.control,
                    Tuition: +row.tuition,
                    AcceptRate: +row.acceptRate,
                    Enrollment: + row.enrollment,
                    Aid: +row.aidPercent,
                    SAT: +row.sat,
                    key: 1
                };
            }).then(rows => {
                // console.log(rows);
                rows = rows.sort(function (a, b) {
                    return a.Tuition - b.Tuition;
                });

                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    // get rid of those rows that have NaN tuition or NaN score
                    if (!isNaN(row.Score) && !isNaN(row.Tuition) && !isNaN(row.Aid) && !isNaN(row.Enrollment) && !isNaN(row.AcceptRate) && !isNaN(row.SAT)) {
                        lianDongDataset.push(row);
                    }
                }
                
                getNewSample()
                console.log(lianDongDataset.length)
                makeChart();
            }).catch(error => {
                console.log(error)
            });
               
            // Set the dimensions of the canvas / graph
            let margin = {top: 50, right: 50, bottom: 50, left: 50},
                width = 365 - margin.left - margin.right,
                height = 365 - margin.top - margin.bottom;
            
            let x = d3.scaleLinear()
                    .range([lianDongpadding, width - lianDongpadding]);  
            let scoreY = d3.scaleLinear()
                    .range([height - lianDongpadding, lianDongpadding]);
            let enrollmentY = d3.scaleLinear()
                    .range([height - lianDongpadding, lianDongpadding]);
            let aidY = d3.scaleLinear()
                    .range([height - lianDongpadding, lianDongpadding]);
            let satY = d3.scaleLinear()
                    .range([height - lianDongpadding, lianDongpadding]);

            let valueline = d3.line()
                                .x(function(d) { return x(d.Tuition); })
                                .y(function(d) { return scoreY(d.Score); });

            // Define the axes
            let xAxis = d3.axisBottom().scale(x).ticks(5);
            let scoreYAxis = d3.axisLeft().scale(scoreY).ticks(5);
            let enrollmentYAxis = d3.axisLeft().scale(enrollmentY).ticks(5);
            let satYAxis = d3.axisLeft().scale(satY).ticks(5);
            let aidYAxis = d3.axisLeft().scale(aidY).ticks(5);
            // Score
            let scoreSvg = d3.select(".tui_score")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");
            
            // Enrollment
            let enrollmentSvg = d3.select(".tui_enrollment")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");
            
            // Aid
            let aidSvg = d3.select(".tui_aid")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

            let satSvg = d3.select(".tui_sat")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

            function makeChart() {
                // Scale the range of the data
                x.domain([0, 60000]);
                scoreY.domain([20, 100]);
                enrollmentY.domain([0,60000])
                aidY.domain([0,100])
                satY.domain([800, 1600])

                // Score
                scoreSvg.append("g")
                    .attr("class", "lianDongxaxis")
                    .attr("transform", "translate(0," + (height - 25) + ")")
                    .call(xAxis);

                scoreSvg.append("g")
                    .attr("class", "lianDongyaxis")
                    .attr("transform", "translate(" + margin.left/2 + ", 0)")
                    .call(scoreYAxis);

                // Enrollment
                enrollmentSvg.append("g")
                    .attr("class", "lianDongxaxis")
                    .attr("transform", "translate(0," + (height - 25) + ")")
                    .call(xAxis);

                enrollmentSvg.append("g")
                    .attr("class", "lianDongyaxis")
                    .attr("transform", "translate(" + margin.left/2 + ", 0)")
                    .call(enrollmentYAxis);
                
                // Aid

                aidSvg.append("g")
                    .attr("class", "lianDongxaxis")
                    .attr("transform", "translate(0," + (height - 25) + ")")
                    .call(xAxis);

                aidSvg.append("g")
                    .attr("class", "lianDongyaxis")
                    .attr("transform", "translate(" + margin.left/2 + ", 0)")
                    .call(aidYAxis);

                // SAT

                satSvg.append("g")
                    .attr("class", "lianDongxaxis")
                    .attr("transform", "translate(0," + (height - 25) + ")")
                    .call(xAxis);

                satSvg.append("g")
                    .attr("class", "lianDongyaxis")
                    .attr("transform", "translate(" + margin.left/2 + ", 0)")
                    .call(satYAxis);
                // scoreSvg.append("path")
                //     .attr("fill", "none")
                //     .attr("stroke", "orange")
                //     .attr("stroke-width", 1.5)
                //     .attr("d", valueline(lianDongsampleData));
                update()
            }

            function update() {
                // Add the scatterplot
                let scores = scoreSvg.selectAll(".lianDongscores")
                                .data(lianDongsampleData)
                // .append("g");
                                
                // Score
                let scoreEnter = scores.enter().append("circle")
                    .attr("class", "lianDongscores")
                    .attr("r", 5)
                    .attr("cx", function(d) { return x(d.Tuition); })
                    .attr("cy", function(d) { return scoreY(d.Score); })
                    .attr("fill", function(d) {
                    if(d.Control == "public") {
                        return "rgb(168, 192, 202)";
                    }else{
                        return "rgb(255, 119, 1)";
                    }
                });
                
                scores.append("svg:title")
                    .text(function(d) {
                        return d.Name +  "\nScore: " + d.Score + "\nTuition: " + d.Tuition;
                    });

                scoreEnter.merge(scores).transition().duration(300)
                    .attr("r", 5)
                    .attr("cx", function(d) { return x(d.Tuition); })
                    .attr("cy", function(d) { return scoreY(d.Score); })
                    .attr("fill", function(d) {
                    if(d.Control == "public") {
                        return "rgb(168, 192, 202)";
                    }else{
                        return "rgb(255, 119, 1)";
                    }
                });
                
                scores.exit().transition().duration(300).remove();
                // Enrollment
                let enrolls = enrollmentSvg.selectAll(".lianDongenrolls")
                                .data(lianDongsampleData);
                
                let enrollmentEnter = enrolls.enter().append("circle")
                    .attr("class", "lianDongenrolls")
                    .attr("r", 5)
                    .attr("cx", function(d) { return x(d.Tuition); })
                    .attr("cy", function(d) { return enrollmentY(d.Enrollment); })
                    .attr("fill", function(d) {
                    if(d.Control == "public") {
                        return "rgb(168, 192, 202)";
                    }else{
                        return "rgb(255, 119, 1)";
                    }
                });
                
                enrolls.append("svg:title")
                    .text(function(d) {
                        return d.Name +  "\nEnrollment: " + d.Enrollment + "\nTuition: " + d.Tuition;
                    });

                enrollmentEnter.merge(enrolls).transition().duration(300)
                    .attr("r", 5)
                    .attr("cx", function(d) { return x(d.Tuition); })
                    .attr("cy", function(d) { return enrollmentY(d.Enrollment); })
                    .attr("fill", function(d) {
                    if(d.Control == "public") {
                        return "rgb(168, 192, 202)";
                    }else{
                        return "rgb(255, 119, 1)";
                    }
                });

                enrolls.exit().transition().duration(300).remove();
                
                let aids = aidSvg.selectAll(".lianDongaids")
                            .data(lianDongsampleData);
                
                let aidEnter = aids.enter().append("circle")
                    .attr("class", "lianDongaids")
                    .attr("r", 5)
                    .attr("cx", function(d) { return x(d.Tuition); })
                    .attr("cy", function(d) { return aidY(d.Aid); })
                    .attr("fill", function(d) {
                    if(d.Control == "public") {
                        return "rgb(168, 192, 202)";
                    }else{
                        return "rgb(255, 119, 1)";
                    }
                });
                
                aidEnter.merge(aids).transition().duration(300)
                    .attr("r", 5)
                    .attr("cx", function(d) { return x(d.Tuition); })
                    .attr("cy", function(d) { return aidY(d.Aid); })
                    .attr("fill", function(d) {
                    if(d.Control == "public") {
                        return "rgb(168, 192, 202)";
                    }else{
                        return "rgb(255, 119, 1)";
                    }
                });

                aids.exit().transition().duration(300).remove();


                let sats = satSvg.selectAll(".lianDongsats")
                            .data(lianDongsampleData);
                
                let satEnter = sats.enter().append("circle")
                    .attr("class", "lianDongsats")
                    .attr("r", 5)
                    .attr("cx", function(d) { return x(d.Tuition); })
                    .attr("cy", function(d) { return satY(d.SAT); })
                    .attr("fill", function(d) {
                    if(d.Control == "public") {
                        return "rgb(168, 192, 202)";
                    }else{
                        return "rgb(255, 119, 1)";
                    }
                });
                
                satEnter.merge(sats).transition().duration(300)
                    .attr("r", 5)
                    .attr("cx", function(d) { return x(d.Tuition); })
                    .attr("cy", function(d) { return satY(d.SAT); })
                    .attr("fill", function(d) {
                    if(d.Control == "public") {
                        return "rgb(168, 192, 202)";
                    }else{
                        return "rgb(255, 119, 1)";
                    }
                });
                
                sats.exit().transition().duration(300).remove();
            }

            function getNewSample() {
                shuffle(lianDongDataset)
                lianDongsampleData = [];
                for(var i = 1; i <= lianDongsampleSize; i++) {
                    lianDongsampleData.push(lianDongDataset[i]);
                }
                lianDongsampleData.sort(function(a,b) {
                    return b.Tuition - a.Tuition
                })
                update()
            }

            function shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                    a[i].key = i;
                    a[j].key = j;
                }
                return a;
            }

            function getKey(d) {
                return d.key;
            }