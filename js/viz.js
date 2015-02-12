var numeral = require('numeral');
var svg, g;

// Returns a random number between min (inclusive) and max (exclusive)
function randBtw(min, max) {
    return Math.random() * (max - min) + min;
}

var colorscale = d3.scale.linear().range(['#1b91ff', '#ff2c2d']);
var wscale = d3.scale.linear().range([0,100]);
var oscale = d3.scale.linear().range([0.3,1]);

//public stuff
var viz = {};

viz.init = function(data, width, height, d3){
    var dat = [];
    for(var i=0; i<data.length; i++)
        dat.push({name : data[i], value : randBtw(-1,1), randPos: i});
    
    //Sort desc
    dat.sort(function(x,y){
        return y.value - x.value;
    });
    
    var max = d3.max(dat, function(d){
        return Math.abs(d.value);
    });
    
    colorscale.domain([dat[0].value, dat[dat.length-1].value]);
    wscale.domain([0, max]);
    oscale.domain([0, max]);
    
    svg = d3.select('#viz')
        .attr('width', width)
        .attr('height', height);
    
    g = svg.selectAll('g')
        .data(dat)   
        .enter().append('g')
          .attr('transform', function(d) { return 'translate(' + 50 + ',' + (d.randPos+2)*30 + ')'; });
    
    g.append('text')
        .style('font-size','18px')
        .text(function(d) { return d.name; });
    
    //background
     g.append('rect')
        .attr('y',-15)
        .attr('x',100)
        .attr('class', 'bkg')
        .attr('width', 0)
        .attr('height', 20)
        .attr('fill', function(d){
            return d.value <=0 ? '#ff2c2d' : '#17ff2e';
        });
    
    g.append('text')
        .attr('x',120)
        .attr('class', '.val')
        .style('font-size','18px')
        .text(function(d) { return numeral(d.value).format('0.00'); });
    
    //bar
     g.append('rect')
        .attr('y',-17)
        .attr('x', 140)
        .attr('class', 'bar')
        .attr('width', 0)
        .attr('height', 20)
        .attr('fill', function(d){
            return colorscale(d.value);
        })
        .attr('fill-opacity', function(d){
            return oscale(Math.abs(d.value));
        });
    
    //titles
    var titles = svg.append('g')
        .attr('transform', function(d) { return 'translate(' + 50 + ',' + 30 + ')'; });
    
    titles.append('text')
        .style('font-size','18px')
        .text('Gene Name');
    
    titles.append('text')
        .style('font-size','18px')
        .attr('x',120)
        .text('Expression');
    
    titles.append('line')
        .attr('x1',60)
        .attr('y1',-20)
        .attr('x2',60)
        .attr('y2',width)
        .attr('stroke', 'gray') 
        .attr('stroke-width', 2);
    
    titles.append('line')
        .attr('x1',-51)
        .attr('y1',5)
        .attr('x2',200)
        .attr('y2',5)
        .attr('stroke', 'gray') 
        .attr('stroke-width', 2);
        
};

viz.bkg = function(w){
    svg.selectAll('.bkg').attr('width', w);
};
    
viz.sort = function(){
    var tmp = arguments.length ? arguments[0] : null;
    g.transition().attr('transform', function(d,i) { 
        var val = tmp !== null ? d[tmp] : i;
        return 'translate(' + 50 + ',' + (val+2)*30 + ')';
    });
};

viz.bar = function(){
    
    var tmp = arguments.length ? arguments[0] : null;
    svg.selectAll('.bar').transition().attr('width', function(d){
        var val = tmp !== null ? tmp : wscale(Math.abs(d.value));
        return val;
    });
};
module.exports = viz;