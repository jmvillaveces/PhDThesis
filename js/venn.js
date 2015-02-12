//public stuff
var venn = {};

venn.init = function(data, width, height, d3){
    
    var svg = d3.select('#venn')
        .attr('width', width)
        .attr('height', height);
 
    var g = svg.append('group')
        .attr('transform', 'translate('+width/2+','+height/2+')');
    
    g.append('circle')
        .attr('cx', 350)
        .attr('cy', 200)
        .attr('r', 200)
        .style('fill', 'orange')
        .style('fill-opacity', '.5');

    g.append('circle')
        .attr('cx', 550)
        .attr('cy', 200)
        .attr('r', 200)
        .style('fill', 'steelblue')
        .style('fill-opacity', '.5');

    g.append('circle')
        .attr('cx', 450)
        .attr('cy', 300)
        .attr('r', 200)
        .style('fill', 'green')
        .style('fill-opacity', '.5');
};

module.exports = venn;