var d3 = require('d3');

var color = d3.scale.category20();
var height = document.body.clientHeight;
var width = document.body.clientWidth;

var data = {};
data.donut = [{ name:'Unified', value:25 },{ name:'Non Redundant', value:25 },{ name:'Quality Assessment', value:25 },{ name:'Visualization', value:25 }];

var viz = require('./js/viz.js');

// Init date 
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

d3.selectAll('#date').html('<span class="blue">'+day + '</span> / <span class="blue">' + month + '</span> / <span class="blue">' + year +'</span>');

d3.xml('https://cors-anywhere.herokuapp.com/http://www.ebi.ac.uk/Tools/webservices/psicquic/registry/registry?action=STATUS&format=xml', function(xml) {
    var intcount = 0, servers = [];
    d3.select(xml).selectAll('service').each(function() {
        var el = d3.select(this);
        
        var server = {
            name : el.select('name').text(),
            count : +el.select('count').text(),
            active : el.select('active').text() === 'true' ? true : false
        };
        servers.push(server);
        intcount += server.count;
    });
    data.psi = {servers: servers, count : intcount};
});

Reveal.addEventListener( 'dbs', function() {
    require('./js/dbs.js')(data.psi, width, height, d3);
}, false);

Reveal.addEventListener( 'viz', function() {
    viz.init(['A','B','C','D','E','F','G','H','I','J','K','L','M','N'], 500, 500, d3);
}, false);

Reveal.addEventListener( 'fragmentshown', function( event ) {
    var val = d3.select(event.fragment).text();
    
    if(val === '1'){
        viz.bkg(40);
    }else if(val === '2'){
        viz.bkg(0);
        viz.sort();
        viz.bar();
    }
});

Reveal.addEventListener( 'fragmenthidden', function( event ) {
    var val = d3.select(event.fragment).text();
    
    if(val === '1'){
        viz.bkg(0);
    }else if(val === '2'){
        viz.sort('randPos');
        viz.bkg(40);
        viz.bar(0);
    }
});

Reveal.addEventListener( 'pie', function() {
    require('./js/pie.js').init(data.psi.servers, width, height, d3);
}, false);

Reveal.addEventListener( 'part', function() {
    
        var i = 0;
        
        var width = Math.max(960, innerWidth),
        height = Math.max(500, innerHeight);
        
        
        var svg = d3.select("#particles").append("svg")
        .attr("width", width)
        .attr("height", height);
        
        
        function particle() {
          svg.insert("circle", "rect")
              .attr("cx", Math.floor(Math.random() * width))
              .attr("cy", Math.floor(Math.random() * height))
              .attr("r", 1e-6)
              .attr("fill-opacity", 0)
              .style("stroke", d3.hsl((i = (i + 1) % 360), 1, 0.5))
              .style("stroke-opacity", 1)
              .style("stroke-width", 5)
            .transition()
              .duration(2000)
              .ease(Math.sqrt)
              .attr("r", 100)
              .style("stroke-opacity", 1e-6)
              .remove();
        }
        
        window.setInterval(particle, 600);
    
    
}, false);