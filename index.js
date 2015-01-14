var d3 = require('d3');

var color = d3.scale.category20();
var height = document.body.clientHeight;
var width = document.body.clientWidth;

var svg = d3.select('#db')
    .attr('width', width)
    .attr('height', height);

var force = d3.layout.force()
    .size([width, height])
    .charge(-200)
    .on('tick', function(e) {
        svg.selectAll("g").attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });

var size = d3.scale.pow()
    .range([400,1000]);

d3.xml('https://cors-anywhere.herokuapp.com/http://www.ebi.ac.uk/Tools/webservices/psicquic/registry/registry?action=STATUS&format=xml', function(xml) {
    var servers = [], min = 0, max = 0;
    d3.select(xml).selectAll('service').each(function() {
        var el = d3.select(this);
        
        var server = {
            name : el.select('name').text(),
            count : +el.select('count').text(),
            active : el.select('active').text() === 'true' ? true : false
        };
        servers.push(server);
    });
    
    min = d3.min(servers, function(d){
        return d.count;
    });
    
    max = d3.max(servers, function(d){
        return d.count;
    });
    
    size.domain([min, max]);
    
    force.nodes(servers).start();
    
    var node = svg.selectAll(".node")
        .data(servers)   
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.name; });

    node.append("path")
        .attr("d", d3.svg.symbol()
            .size(function(d) { return size(d.count); })
            .type(function(d) { return 'circle'; }))
        .style("fill", function(d) { return d.active ? 'rgb(44, 160, 44)' : 'rgb(214, 39, 40)'; })
        .style("stroke", "white")
        .style("stroke-width", "1px");

    node.append("text")
        .attr('y', 25)
        .style("font-size","18px")
        .style("fill", "#fff")
        .style("text-anchor", "middle")
        .style("font-family", "'Source Sans Pro', Helvetica, sans-serif")
        .text(function(d) { return d.name; });
    
});
