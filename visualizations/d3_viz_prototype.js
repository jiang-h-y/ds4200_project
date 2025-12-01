// load data
const dataPromise = d3.csv("data/d3Merged.csv")

dataPromise.then(function(data) {
    // convert diversity_artists scores into numbers
    data.forEach(function(d) {
        d.diversity_artists = +d.diversity_artists
    })

    // define the dimensions and create the SVG container
    let width = 600;
    let height = 400;

    let margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
    };

    let svg = d3.select("#vis")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "white");

    // define and add the scales
    let yScale = d3.scaleLinear()
    .domain([0.9, 1])
    .range([height - margin.bottom, margin.top]);

    let xScale = d3.scaleBand()
    .domain(data.map(d => d.openness))
    .range([margin.left, width - margin.right])
    .padding(0.5);

    let yAxis = svg.append("g")
    .call(d3.axisLeft().scale(yScale))
    .attr("transform", `translate(${margin.left}, 0)`);

    let xAxis = svg.append("g")
    .call(d3.axisBottom().scale(xScale))
    .attr("transform", `translate(0, ${height - margin.bottom})`);

    // barplot title and axes labels
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", 25)
    .text("Artist Diversity in Playlists based on Openness")
    .style("text-anchor", "middle")
    .style("font-size", 18);

    svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 15)
    .attr("text-anchor", "middle")
    .text("Openness");

    svg.append("text")
    .attr("x", - height / 2)
    .attr("y", 17)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Median Artist Diversity");

    // draw bars
    let bar = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.openness))
    .attr("y", d => yScale(d.diversity_artists))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScale(d.diversity_artists))
    .attr("fill", "#134046")

})