// The code for the chart is wrapped inside a function that
// automatically resizes the chart  
function makeResponsive() {

  var svgWidth = 960;
  var svgHeight = 500;

  var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  var svg = d3
    .select("#scatter")
    .append("#svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append an SVG group
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read CSV
  d3.csv("assets/data/data.csv").then(function(demoData) {

    // parse data
    demoData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    // Initial Params
    var chosenXAxis = "poverty";
    var chosenYAxis = "healthcare";

    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([8.5, d3.max(demoData, d => d.[chosenXAxis]),
      .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
      .domain([3.5, d3.max(demoData, d => d.[chosenYAxis]),
      .range([height, 0]);

  // function used for updating xAxis var upon click on axis label
    var xAxis = d3.axisBottom(xLinearScale);

  // function used for updating YAxis var upon click on axis label
    var yAxis = d3.axisLeft(yLinearScale);

  //Append axis to the chartGroup
  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

  chartGroup.append("g")
  .call(yAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(demoData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", "lightblue")
    .attr("opacity", ".5");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("class", "axisText")
    .text("Lack of Healthcare (%)");

  // append x axis
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
    .attr("class", "axisText")
    .text("Impoverished (%)");
  });
}

makeResponsive();