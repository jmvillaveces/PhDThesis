//public stuff
var pie = {};
var color = d3.scale.category20();

pie.init = function(data, width, height, d3){
    var radius = Math.min(width, height) / 2;
    
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.count; });
    
    var svg = d3.select('#pie')
        .attr('width', width)
        .attr('height', height)
        .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    var g = svg.selectAll('.arc')
        .data(pie(data))
        .enter().append('g')
        .attr('class', 'arc');
    
    g.append('path')
        .attr('d', arc)
        .style('fill', function(d) { return color(d.data.name); });

    g.append('text')
        .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
        .attr('dy', '.35em')
        .style('text-anchor', 'middle')
        .text(function(d) { return d.data.name; });
};

module.exports = pie;