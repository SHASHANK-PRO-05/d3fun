/*
 *SVG BOUNDARIES ARE TO WRITTEN BELLOW
 */
var svgHeight = 400;
var svgWidth = 700;
var svgMargin = {
	top: 20,
	bottom: 20,
	right: 20,
	left: 20
}
var chartwidth = svgWidth - svgMargin.left - svgMargin.right;
var chartHeight = svgHeight - svgMargin.top - svgMargin.bottom;

/*
 * ADD DOM OBJECTS BELOW
 */
var svg = d3.select("body")
	.append("svg")
	.attr('id', "chart")
	.attr('width', svgWidth)
	.attr('height', svgHeight);
var scaleGroup = svg.append("g")
	.classed("display", true)
	.attr('transform', 'translate(' + svgMargin.left + ',' + svgMargin.top + ')');

/*
 *HAVE DATA. ADD HERE
 */
var max = 10,
	data = [];
for (i = 1; i <= max; i++)
	data.push(i);

/*
 *PUT SCALES AND AXIS HERE
 */
var linear = d3.scale.linear().domain([1, max]).range([1, max]);
var linearCapped = d3.scale.linear().domain([1, max]).range([1, 20]);
var pow = d3.scale.pow().exponent(2);
var powCapped = d3.scale.pow().exponent(2).domain([1, max]).range([1, 10]);
var log = d3.scale.log();
var log = d3.scale.log().domain([1, max]).range([1, 10]);

/*
 *PUT ALL THE FUNCTIONS BELOW
 */
function renderScales(parameters) {

}
/*
 *FLOW OF THE CODE SHOULD BE HERE
 *DARE PUT ANYWHERE ELSE
 */
 renderScales.call(scaleGroup,{
 	data:data,
 	typeScale:linear,
 	
 })