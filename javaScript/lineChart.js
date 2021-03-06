/*
 *SVG RELATED INFORMATION
 */

//THESE ARE WIDTH AND HEIGHT OF THE SVG ELEMENT THAT WILL BE SET IN DOM
var svgWidth = 700;
var svgHeight = 400;
//MARGINS OF SVG ELEMENTS.
//ALWAYS CREATE CHART WITH MARGINS FOR GOOD FINISH
var svgMargin = {
		top: 50,
		right: 50,
		left: 50,
		bottom: 50
	}
	//CHART WIDTH AND HEIGHT WITH MARGINS
var chartWidth = svgWidth - svgMargin.left - svgMargin.right;
var chartHeight = svgHeight - svgMargin.top - svgMargin.bottom;

/*
 *ADD ANY DOM OBJECTS HERE
 */
var svg = d3.select("body").append("svg")
	.attr('id', "chart")
	.attr('width', svgWidth)
	.attr('height', svgHeight);
var group = svg.append('g')
	.classed("display", true)
	.attr('transform', 'translate(' + svgMargin.left + ',' + svgMargin.top + ')');
var dateParser = d3.time.format("%Y/%m/%d").parse;

/*
 *HAVE DATA, ADD HERE
 */
var data = [{
	key: "Jelly",
	value: 60,
	date: "2014/01/01"
}, {
	key: "Jelly",
	value: 58,
	date: "2014/01/02"
}, {
	key: "Jelly",
	value: 59,
	date: "2014/01/03"
}, {
	key: "Jelly",
	value: 56,
	date: "2014/01/04"
}, {
	key: "Jelly",
	value: 57,
	date: "2014/01/05"
}, {
	key: "Jelly",
	value: 55,
	date: "2014/01/06"
}, {
	key: "Jelly",
	value: 56,
	date: "2014/01/07"
}, {
	key: "Jelly",
	value: 52,
	date: "2014/01/08"
}, {
	key: "Jelly",
	value: 54,
	date: "2014/01/09"
}, {
	key: "Jelly",
	value: 57,
	date: "2014/01/10"
}, {
	key: "Jelly",
	value: 56,
	date: "2014/01/11"
}, {
	key: "Jelly",
	value: 59,
	date: "2014/01/12"
}, {
	key: "Jelly",
	value: 56,
	date: "2014/01/13"
}, {
	key: "Jelly",
	value: 52,
	date: "2014/01/14"
}, {
	key: "Jelly",
	value: 48,
	date: "2014/01/15"
}, {
	key: "Jelly",
	value: 47,
	date: "2014/01/16"
}, {
	key: "Jelly",
	value: 48,
	date: "2014/01/17"
}, {
	key: "Jelly",
	value: 45,
	date: "2014/01/18"
}, {
	key: "Jelly",
	value: 43,
	date: "2014/01/19"
}, {
	key: "Jelly",
	value: 41,
	date: "2014/01/20"
}, {
	key: "Jelly",
	value: 37,
	date: "2014/01/21"
}, {
	key: "Jelly",
	value: 36,
	date: "2014/01/22"
}, {
	key: "Jelly",
	value: 39,
	date: "2014/01/23"
}, {
	key: "Jelly",
	value: 41,
	date: "2014/01/24"
}, {
	key: "Jelly",
	value: 42,
	date: "2014/01/25"
}, {
	key: "Jelly",
	value: 40,
	date: "2014/01/26"
}, {
	key: "Jelly",
	value: 43,
	date: "2014/01/27"
}, {
	key: "Jelly",
	value: 41,
	date: "2014/01/28"
}, {
	key: "Jelly",
	value: 39,
	date: "2014/01/29"
}, {
	key: "Jelly",
	value: 40,
	date: "2014/01/30"
}, {
	key: "Jelly",
	value: 39,
	date: "2014/01/31"
}];
/*
 *GOT SCALES AND AXIS, ADD HERE
 */
var yScale = d3.scale.linear().domain([0, d3.max(data, function(d) {
	return d.value;
})]).range([chartHeight, 0]);
var xScale = d3.time.scale().domain(d3.extent(data, function(d) {
	return dateParser(d.date);
})).range([0, chartWidth]);
var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.ticks(d3.time.days, 7)
	.tickFormat(d3.time.format("%m/%d"));
var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.ticks(5);

var svgLine = d3.svg.line()
	.x(function(d) {
		return xScale(dateParser(d.date));
	})
	.y(function(d) {
		return yScale(d.value);
	})
	.interpolate("cardinal");
var svgArea = d3.svg.area()
	.x(function(d) {
		return xScale(dateParser(d.date));
	})
	.y0(chartHeight)
	.y1(function(d) {
		return yScale(d.value);
	})
	.interpolate("cardinal");

/*
 *ADD THE FUNCTIONALITY HERE
 *DARE PUT ANYWHERE ELSE
 */
function render(parameters) {
	//CALLING THE AXIS
	this.append("g")
		.classed("x axis", true)
		.attr('transform', 'translate(' + 0 + ',' + chartHeight + ')')
		.call(parameters.xAxis);
	this.append('g')
		.classed("y axis", true)
		.call(parameters.yAxis);
	//ENTER PHASE OF THE CHART
	this.selectAll(".trendarea")
		.data([parameters.data])
		.enter()
		.append("path")
		.classed("trendarea", true);

	this.selectAll(".trendline")
		.data([parameters.data])
		.enter()
		.append("path")
		.classed("trendline", true);

	this.selectAll(".point")
		.data(parameters.data)
		.enter()
		.append("circle")
		.classed("point", true)
		.attr('r', 2);
	//UPDATE PHASE OF THE CHART
	this.selectAll(".trendarea")
		.attr('d', function(d) {
			return svgArea(d);
		});

	this.selectAll(".trendline")
		.attr('d', function(d) {
			return svgLine(d);
		});
	this.selectAll(".point")
		.attr('cx', function(d, i) {
			return parameters.xScale(parameters.dateParser(d.date));
		})
		.attr('cy', function(d, i) {
			return parameters.yScale(d.value);
		});
	//EXIT PHASE OF THE CHART
	this.selectAll(".trendarea")
		.data([parameters.data])
		.exit()
		.remove()
	this.selectAll(".trendline")
		.data([parameters.data])
		.exit()
		.remove()
	this.selectAll(".point")
		.data(parameters.data)
		.exit()
		.remove();
}

/*
 *MAKE CALLS TO THE FUNCTION HERE
 *DARE PUT ANYWHERE ELSE
 */
render.call(group, {
	data: data,
	xScale: xScale,
	yScale: yScale,
	dateParser: dateParser,
	xAxis: xAxis,
	yAxis: yAxis
});