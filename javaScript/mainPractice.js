/*
 *ADD YOUR DIMENSIONS IN THIS AREA
 *FOR EXAMPLE WIDTH, HEIGHT, MARGINS ETCETRA
 */
var svgWidth = 750;
var svgHeight = 400;
var margin = {
	top: 50,
	bottom: 90,
	right: 50,
	left: 70
};
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

/*
 *ADD YOUR DATA HERE IF ANY
 */
var donuts = [{
	key: "Glazed",
	value: 123
}, {
	key: "Jelly",
	value: 71
}, {
	key: "Holes",
	value: 337
}, {
	key: "Sprinkles",
	value: 45
}, {
	key: "Crumb",
	value: 78
}, {
	key: "Chocolate",
	value: 100
}, {
	key: "Coconut",
	value: 350
}, {
	key: "Cream",
	value: 90
}, {
	key: "Cruller",
	value: 143
}, {
	key: "Eclair",
	value: 42
}, {
	key: "Fritter",
	value: 67
}, {
	key: "BearClaw",
	value: 84
}, ];
/*
 *DECLARE ANY PREDEFINED CONTROL OR DOM OBJECT 
 *FOR THE CHART HERE
 */
var svg = d3.select("body")
	.append("svg")
	.attr('id', "chart")
	.attr('width', svgWidth)
	.attr('height', svgHeight);
var group = svg.append("g")
	.classed("display", true)
	.attr('transform', "translate(" + margin.left + "," + margin.top + ")");
var controls = d3.select("body")
	.append("div")
	.attr('id', "controls");
var sort_btn = controls.append("button")
	.html("Sort Data: Ascending")
	.attr('state', 0);
/*
 *DEFINE SCALES AXIS AND OTHER THINGS HERE
 */
var xScale = d3.scale.ordinal().domain(donuts.map(function(entry) {
	return entry.key;
})).rangeBands([0, chartWidth]);
var yScale = d3.scale.linear().domain([0, d3.max(donuts, function(entry) {
	return entry.value;
})]).range([chartHeight, 0]);
var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxis = d3.svg.axis().scale(yScale).orient("left");
var color = d3.scale.category20();
var yGridLine = d3.svg.axis()
	.scale(yScale)
	.tickSize(-chartWidth, 0, 0)
	.tickFormat("").orient("left");
/*
 *FLOW OF THE CODE WILL BE HERE
 *ALL FUNCTION CALLS WILL BE WRITTEN IN THIS BLOCK
 *DARE YOU WRITE ANYWHERE ELSE
 */
sort_btn.on("click", function() {
	var self = d3.select(this);
	var state = +self.attr('state');
	var ascending = function(a, b) {
		return a.value - b.value;
	};
	var descending = function(a, b) {
		return b.value - a.value;
	};
	var txt = "Sort Data: ";
	if (state === 0) {
		donuts.sort(ascending);
		state = 1;
		txt += "Descending";
	} else if (state === 1) {
		donuts.sort(descending);
		state = 0;
		txt += "Ascending";
	}
	xScale.domain(donuts.map(function(entry) {
		return entry.key;
	}));
	yScale.domain([0, d3.max(donuts, function(entry) {
		return entry.value;
	})]);
	plot.call(group, {
		data: donuts,
		xAxis: xAxis,
		yAxis: yAxis,
		gridline: yGridLine,
		xScale: xScale,
		yScale: yScale,
		intialize: false
	});
	self.attr('state', state)
	self.html(txt);
});

plot.call(group, {
	data: donuts,
	xAxis: xAxis,
	yAxis: yAxis,
	gridline: yGridLine,
	xScale: xScale,
	yScale: yScale,
	intialize: true
});
/*
 *FUNCTIONS FOR THE RENDERING OF THE CHART
 */
function drawAxis(parameter) {
	if (parameter.intialize == true) {
		/*
		 *THIS ADDS THE GRID LINE TO THE BAR CHART
		 */
		this.append("g")
			.call(parameter.gridline)
			.classed("gridline", true);
		/*
		 *THIS FOR THE X - AXIS AND Y - AXIS
		 */
		this.append("g")
			.classed("x axis", true)
			.call(parameter.xAxis)
			.attr('transform', 'translate(' + 0 + ',' + chartHeight + ')')
			.selectAll("text")
			.classed("x-axis-label", true)
			.style('text-anchor', 'end')
			.attr('dx', -8)
			.attr('dy', 8)
			.attr('transform', 'translate(' + 0 + ',' + 0 + ') rotate(-45)');;
		this.append("g")
			.classed("y axis", true)
			.call(parameter.yAxis)
		this.select(".y.axis")
			.append("text")
			.attr('x', 0)
			.attr('y', 0)
			.style("text-anchor", "middle")
			.attr('transform', 'translate(-' + 50 + ',' + chartHeight / 2 + ') rotate(-90)')
			.text("Values Sold");
		this.select(".x.axis")
			.append("text")
			.attr('x', 0)
			.attr('y', 0)
			.style("text-anchor", "middle")
			.attr('transform', 'translate(' + chartWidth / 2 + ',' + 70 + ')')
			.text("Donut Type");
	} else {
		this.selectAll(".x.axis")
			.transition()
			.duration(500)
			.delay(500)
			.call(parameter.xAxis);
		this.selectAll(".x-axis-label")
			.style('text-anchor', 'end')
			.attr('dx', -8)
			.attr('dy', 8)
			.attr('transform', 'translate(' + 0 + ',' + 0 + ') rotate(-45)');
		this.selectAll(".y.Axis")
			.transition()
			.duration(500)
			.delay(500)
			.call(parameter.yAxis);
	}
}

function plot(parameter) {
	/*
	 *DRAW UP THE AXIS FOR THE CHART
	 */
	drawAxis.call(this, parameter);

	/*
	 *ENTER PHASE OF DATA DRIVEN DOCUMNET BAR CHART
	 */
	this.selectAll(".bar")
		.data(parameter.data)
		.enter()
		.append("rect")
		.classed("bar", true);
	this.selectAll(".bar-label")
		.data(parameter.data)
		.enter()
		.append("text")
		.classed("bar-label", true);
	/*
	 *UPDATE PHASE OF DATA DRIVEN DOCUMENT BAR CHART
	 */
	this.selectAll(".bar")
		.transition().attr('x', function(d, i) {
			return parameter.xScale(d.key);
		})
		.attr('y', function(d, i) {
			return parameter.yScale(d.value);
		})
		.attr('width', function(d, i) {
			return parameter.xScale.rangeBand() - 1;
		})
		.attr('height', function(d, i) {
			return chartHeight - parameter.yScale(d.value);
		})
		.style('fill', function(d, i) {
			return "purple";
		});
	this.selectAll(".bar-label")
		.transition()
		.attr('x', function(d, i) {
			return parameter.xScale(d.key);
		})
		.attr('dx', function(d, i) {
			return parameter.xScale.rangeBand() / 2;
		})
		.attr('y', function(d, i) {
			return parameter.yScale(d.value);
		})
		.text(function(d, i) {
			return d.value;
		});
	/*
	 *EXIT PHASE OF DATA DRIVEN DOCUMENT BAR CHART
	 */
	this.selectAll(".bar")
		.data(parameter.data)
		.exit()
		.remove();
	this.selectAll(".bar-label")
		.data(parameter.data)
		.exit()
		.remove();



}