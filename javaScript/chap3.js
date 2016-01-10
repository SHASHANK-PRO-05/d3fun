/*
 *PUT ALL SVG RELATED INFORMATION HERE
 */
var svgWidth = 700;
var svgHeight = 400;
var svgMargin = {
	top: 20,
	bottom: 20,
	left: 50,
	right: 20
};
var chartWidth = svgWidth - svgMargin.left - svgMargin.right;
var chartHeight = svgHeight - svgMargin.top - svgMargin.bottom;
/*
 *ADD ALL YOUR DATA(IF ANY) HERE
 */
/*
 *BINDING ARRAY AS DATA
 */
var data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];

/*
 *NOT DOING BINDING OBJECT AS DATA BECAUSE IT IS 
 *ALMOST SAME AS ARRAY
 */

/*
 *BINDING FUNCTION AS A DATA
 *THIS NOT ACTUALY BINDING FUNCTION AS A DATA
 *BUT IS A FUN WAY TO CREATE RANDOM DATA
 *AND SOME WHAT SIMILAR TO WHAT THE GIST IS
 */
var nextRandom = function(x) {
	return Math.round(Math.random() * 80 * x / 11);
}
var tempData = [nextRandom(1), nextRandom(2), nextRandom(3), nextRandom(4), nextRandom(5), nextRandom(6), nextRandom(7), nextRandom(8), nextRandom(9), nextRandom(10), nextRandom(11)];


/*
 * PUT SCALES AND AXIS BELOW THIS
 */
var xScale = d3.scale.linear().domain([0, d3.max(data)]).range([0, chartWidth]);
var yScale = d3.scale.linear().domain([0, data.length]).range([0, chartHeight]);
var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxis = d3.svg.axis().scale(yScale).orient("left");


/*
 *PUT HTML DOM OBJECTS HERE
 */
var svg = d3.select("body").append("svg")
	.attr('height', svgHeight)
	.attr('width', svgWidth)
	.attr('id', "chart");
var barGroup = svg.append("g")
	.classed("display", true)
	.attr('transform', 'translate(' + svgMargin.left + ',' + svgMargin.top + ')');
/*
 *PUT ANY FUNCTIONS YOU HAVE HERE
 */
function render(parameters) {
	/*
	 *CREATING DATA IF FUNCTION AS A DATA IS BINDED
	 */
	/*
	 *SETTING UP AXIS IN RENDER
	 */

	if (parameters.initialize === true) {
		this.append("g")
			.classed("x axis", true)
			.call(parameters.xAxis)
			.attr('transform', 'translate(' + 0 + ',' + chartHeight + ')');
		this.append("g")
			.classed("y axis", true)
			.call(parameters.yAxis);
	}
	/*
	 *ENTER PHASE OF THE CHART
	 */
	this.selectAll(".bars")
		.data(parameters.tempData)
		.enter()
		.append("rect")
		.classed("bars", true);
	this.selectAll(".bar-labels")
		.data(parameters.tempData)
		.enter()
		.append("text")
		.classed("bar-labels", true);
	/*
	 *UPDATE PHASE OF THE CHART
	 */
	this.selectAll(".bars")
		.transition()
		.attr('x', 0)
		.attr('y', function(d, i) {
			return parameters.yScale(i);
		})
		.attr('width', function(d, i) {
			return parameters.xScale(d);
		})
		.attr('height', function(d, i) {
			return parameters.yScale(1) - 1;
		})
		.attr('rx', 5)
		.attr('ry', 5);
	this.selectAll(".bar-labels")
		.transition()
		.attr('x', function(d, i) {
			return xScale(d);
		})
		.attr('dy', function(d, i) {
			return parameters.yScale(1) / 2 + 5;
		})
		.attr('y', function(d, i) {
			return parameters.yScale(i);
		})
		.attr('width', function(d, i) {
			return parameters.xScale(d);
		})
		.attr('height', function(d, i) {
			return parameters.yScale(1) - 1;
		})
		.text(function(d) {
			return d
		});
	/*
	 *EXIT PHASE OF THE CHART
	 */
	this.selectAll(".bars")
		.data(parameters.tempData)
		.exit()
		.remove();
	this.selectAll(".bar-labels")
		.data(parameters.tempData)
		.exit()
		.remove();
}

/*
 *SOME MATHEMATICAL OPERATIONS IN DATA DRIVEN DOCUMENT
 */

var min = d3.select("body").append("div")
	.classed("maths", true)
	.attr('id', "min").append("p")
	.text("Min value in array is: " + d3.min(tempData));
var max = d3.select("body").append("div")
	.classed("maths", true)
	.attr('id', "max")
	.append("p")
	.text("Max value in array is: " + d3.max(tempData));
var extent = d3.select("body").append("div")
	.classed("maths", true)
	.attr('id', "extent")
	.append("p")
	.text("Extent in array is: " + d3.extent(tempData));
var sum = d3.select("body").append("div")
	.classed("maths", true)
	.attr('id', "sum")
	.append("p")
	.text("Sum of array is: " + d3.sum(tempData));

/*
 *FUNCTION CALLS SHOULD BE HERE
 *DARE PUT IT ANYWHERE ELSE
 */
render.call(barGroup, {
	data: data,
	xScale: xScale,
	yScale: yScale,
	xAxis: xAxis,
	yAxis: yAxis,
	tempData: tempData,
	initialize: true
});
setInterval(function() {
	data.shift();
	data.push(Math.round(Math.random() * 80));
	tempData.shift();
	tempData.push(nextRandom(Math.round(Math.random() * 11)));
	min.transition().duration(1000).text("Min value in array is: " + d3.min(tempData));
	max.transition().duration(1000).text("Max value in array is: " + d3.max(tempData));
	extent.transition().duration(1000).text("Extent in array is: " + d3.extent(tempData));
	sum.transition().duration(1000).text("Sum of array is: " + d3.sum(tempData));
	//console.log(data);
	render.call(barGroup, {
		data: data,
		xScale: xScale,
		yScale: yScale,
		xAxis: xAxis,
		yAxis: yAxis,
		tempData: tempData,
		initialize: false
	});
}, 1500);