var margin = {top: 1, right: 1, bottom: 6, left: 1},
    width = 1280 - margin.left - margin.right,
    height = 720 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),
    format = function(d) { return "Transaction amount: $" + formatNumber(d); },
    color = d3.scale.category20();

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

var path = sankey.link();

d3.json("energy.json", function(energy) {

  sankey
      .nodes(energy.nodes)
      .links(energy.links)
      .layout(32);
	  
  var current = "saUrDZ";

  var link = svg.append("g").selectAll(".link")
      .data(energy.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
	  .style("stroke", function(d) {
		if (d.source.name === current) {
		  return d3.rgb(172,78,78);
		} else if (d.target.name === current) {
		  return d3.rgb(55,192,120);
		} else {
		  return d3.rgb(190,190,190);
		}
	  })
      .sort(function(a, b) { return b.dy - a.dy; });

  link.append("title")
      .text(function(d) { return d.source.name + " ? " + d.target.name + "\n" + format(d.value); });

  var node = svg.append("g").selectAll(".node")
      .data(energy.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
	    this.parentNode.appendChild(this);
		d3.event.sourceEvent.stopPropagation(); })
      .on("drag", dragmove)
	  .on("click", openNewAddress));

  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { return d.name + "\n" + format(d.value); });

  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
	.filter(function(d) { return (d.x < width / 2); })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

  function dragmove(d) {
    d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
  
  function openNewAddress(d) {
    console.log("open new address");
  }
});