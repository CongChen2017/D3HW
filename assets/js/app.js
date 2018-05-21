// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

var svgWidth = 600;
var svgHeight = 400;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
//and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var globaldata;

// Retrieve data from the CSV file
d3.csv("data/data.csv", function (err, data) {
	if (err) throw err;
	
	console.log(data);
	globaldata = data;

	// parse data
  	data.forEach(function (data) {
	    data.poverty = +data.poverty;
	    data.copd = +data.copd;
	});

  	var xLinearScale = d3.scaleLinear()
	    .domain([d3.min(data, d => d.poverty) * 0.8,
	      d3.max(data, d => d.poverty) * 1.2
	    ])
	    .range([0, width])

	var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.copd)])
    .range([height, 0]);

    // Create initial axis functions
	var bottomAxis = d3.axisBottom(xLinearScale);
  	var leftAxis = d3.axisLeft(yLinearScale);

  	// append x axis
	var xAxis = chartGroup.append("g")
	    .classed("x-axis", true)
	    .attr("transform", `translate(0, ${height})`)
	    .call(bottomAxis)

	// append y axis
	chartGroup.append("g")
	    .call(leftAxis)

	// append initial circles
	var circlesGroup = chartGroup.selectAll("circle")
	    .data(data)
	    .enter()
	    .append("circle")
	    .attr("cx", d => xLinearScale(d.poverty))
	    .attr("cy", d => yLinearScale(d.copd))
	    .attr("r", 15)
	    .attr("fill", "pink")
	    .attr("opacity", ".5")

	console.log(circlesGroup);

	var text = chartGroup.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.attr("x", d => xLinearScale(d.poverty-0.53))
	    .attr("y", d => yLinearScale(d.copd))
	    .attr("dx", 12)
	    .attr("dy", ".35em")
		.text(function (d) {
			return d.abbr
		});

	console.log(text);

	// Create axes labels
	chartGroup.append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 0 - margin.left + 40)
	    .attr("x", 0 - (height / 2))
	    .attr("dy", "1em")
	    .classed("axis-text", true)
	    .text("COPD Patients %");

	

	chartGroup.append("text")
	    .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
	    .attr("class", "axisText")
	    .text("In Poverty %");


});

