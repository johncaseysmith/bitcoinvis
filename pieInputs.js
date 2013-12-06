data = [{"source":1,"target":1,"value":200}];
	
	d3.json("json/1ARrjUXpovmocFwBjatYovy2EonwxWhzRR.json", function(energy) {
	
	data = [];
	
	for (var i = 0; i<energy.links.length; i++){
		if (energy.links[i].target == 6){
			data.push(energy.links[i]);
		}
	}
	
	//data = energy;
	
	
	w = 300,
    h = 300,                            //height
    r = 100,                            //radius
    color = d3.scale.category20c();     //builtin range of colors

//My Code - Casey Tisdel

	var dataSum = 0;

	
for(var i = 0; i<data.length-1; i++){
	dataSum+= data[i].value;
}

    //Their code
    var vis = d3.select("body")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius
 
    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);
 
    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
 
    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice")    //allow us to style things in the slices (like text)
                .on("mouseover", mouseover)
				.on("mousemove", mousemove)
				.on("mouseout", mouseout);
 
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
			
			
			
		var div = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 1e-6);
	
	//My Code
	function mouseover(d,i) {
	
	var percentFormat = d3.format('3%');
    var percent = percentFormat(data[i].value/dataSum);
	
	var valueFormat = d3.format('.05f');
    var valueF = valueFormat(data[i].value);
	
	div.transition()
		.text("Source: " + data[i].source + ", Target: " + data[i].target + ", Value: " + valueF + ", Percentage: " + percent)
		.duration(350)
		.style("opacity", 1);
	}
	
	//Their code
	function mousemove() {
	
	div
		.style("left", (d3.event.pageX +10) + "px")
		.style("top", (d3.event.pageY -10) + "px");
	}

	function mouseout() {
		div.transition()
		.duration(500)
		.style("opacity", 1e-6);
	}
	
 }); 