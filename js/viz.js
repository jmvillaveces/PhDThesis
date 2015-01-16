var viz = function(data, width, height, d3){
    
     var numeral = require('numeral');
    
    // Returns a random number between min (inclusive) and max (exclusive)
    function randBtw(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    var dat = [];
    for(var i=0; i<data.length; i++)
        dat.push({name : data[i], value : randBtw(-1,1)});
    
    console.log(dat);
    
    var svg = d3.select('#viz')
        .attr('width', width)
        .attr('height', height);
    
    var g = svg.selectAll('g')
        .data(dat)   
        .enter().append('g')
          .attr('transform', function(d, i) { return 'translate(' + 50 + ',' + (i+1)*30 + ')'; });
    
    g.append('text')
        .style('font-size','14px')
        .text(function(d) { return d.name; });
    
    g.append('text')
        .attr('x',50)
        .style('font-size','14px')
        .text(function(d) { return numeral(d.value).format('0.00'); });
    
    
    
};
module.exports = viz;