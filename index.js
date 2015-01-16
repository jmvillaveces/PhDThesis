var d3 = require('d3');

var color = d3.scale.category20();
var height = document.body.clientHeight;
var width = document.body.clientWidth;

var data = {};

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
}, false );

Reveal.addEventListener( 'viz', function() {
    require('./js/viz.js')(['A','B','C','D','E','F','G','H','I','J','K','L','M','N'], width, height, d3);
}, false );