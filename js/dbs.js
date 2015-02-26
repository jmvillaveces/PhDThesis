var db = function(data, width, height, d3){
    
    var numeral = require('numeral');
    
    var svg = d3.select('#db')
        .attr('width', width)
        .attr('height', height);

    var force = d3.layout.force()
        .size([width, height])
        .charge(-200)
        .on('tick', function(e) {
            svg.selectAll('.node').attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
        });

    var min = d3.min(data.servers, function(d){
        return d.count;
    });
    
    var max = d3.max(data.servers, function(d){
        return d.count;
    });
    
    var size = d3.scale.pow()
        .range([400,1000])
        .domain([min, max]);
    
    
    force.nodes(data.servers).start();
    
    var node = svg.selectAll('.node')
        .data(data.servers)   
        .enter().append('g')
          .attr('class', 'node')
          .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });

    node.append('title')
        .text(function(d) { return d.name; });

    node.append('path')
        .attr('d', d3.svg.symbol()
            .size(function(d) { return size(d.count); })
            .type(function(d) { return 'circle'; }))
        .style('fill', function(d) { return d.active ? '#2CA02C' : '#D62728'; })
        .attr('class', 'shape');

    node.append('text')
        .attr('y', 25)
        .style('font-size','18px')
        .text(function(d) { return d.name; });
    
    //legend
    var lsvg = d3.select('#dbl')
        .attr('width', 100)
        .attr('height', 50);

    var legend = lsvg.append('g')
            .attr('class', 'legend')
            .selectAll('.cat')
                .data([true, false])
                .enter().append('g')
                    .attr('class', 'cat');
    
    legend.append('rect')
        .attr('x', 0)
        .attr('y', function(d,i){ return (i*20);})
        .attr('width', 17)
        .attr('height', 17)
        .style('fill', function(d) { console.log(d); return d ? '#2CA02C' : '#D62728'; })
        .attr('class', 'shape');
    
    legend.append('text')
        .attr('x', 40)
        .attr('y', function(d,i){ return (i*20 + 13);})
        .style('font-size','14px')
        .text(function(d) { return d ?  'Online' : 'Offline'; });
    
    //par
    var info = d3.select('#dbinfo').style('font-size','18px');
    info.html('<p><span class="blue">'+data.servers.length+'</span> Databases</p><p><span class="blue"> > '+numeral(/*data.count*/30000000).format('0,0')+'</span> Interactions</p>');
};
module.exports = db;