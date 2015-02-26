//Require the app
    var biojsvispsicquic = require('biojs-vis-psicquic');
    
    // Intercept elements before rendering in order to set property type based on intTypes
        var intercept = function(elements){
            for (i = 0, len = elements.edges.length; i < len; i++) { 
                elements.edges[i].data.type = elements.edges[i].data.intTypes[0].value;
            }
            return elements;
        };

        var style = cytoscape.stylesheet()
            .selector('node')
              .css({
                'height': 80,
                'width': 80,
                'content': 'data(id)',
                'text-valign': 'center',
                'color': 'white',
                'border-color': '#000',
                'border-width': 3,
                'border-opacity': 0.5
              })
            .selector('edge')
              .css({
                'curve-style': 'haystack',
                'opacity': 0.6,
                'width': 'mapData(normalized_max_weight, 0, 0.01, 5, 10)'
              })
            .selector('edge[type = "association"]')
                .css({
                    'line-color': '#D0B7D3'
                })
            .selector('edge[type = "physical association"]')
                .css({
                    'line-color': '#9BD8DD'
                })
            .selector('edge[type = "direct interaction"]').css({'line-color': '#A0B3D8'})
            .selector('edge[type = "atpase reaction"]').css({'line-color': '#EAA2A3'});
        
        var yourDiv = document.getElementById('graph');
            yourDiv.style.left = 0;
            yourDiv.style.top = 0;
            yourDiv.style.width = "100%";
            yourDiv.style.height = "100%";
            yourDiv.style.position = "fixed";

        var cyopts = {
            container: yourDiv,
            ready: function(){ 
                console.log('rendering finished.');
            },
            headless: false,
            renderer: {
                name: 'canvas'
            },
          style: style,
        
        layout: {
            name: 'concentric',
            concentric: function(){
                return this.data('weight');
            },
            levelWidth: function(nodes){
                return 0.5;
            },
            padding: 10
          }
        };
        
        // IntAct REST url
        var url = 'http://www.ebi.ac.uk/Tools/webservices/psicquic/intact/webservices/current/search';
        
        // User heroku proxy
        var proxy = function(url){
            return 'https://cors-anywhere.herokuapp.com/'+url;
        };
        
        //Init the app
        biojsvispsicquic.url(url)
            .query('species:human&id:(BRCA1 OR BRCA2)')
            .proxy(proxy)
            .cyopts(cyopts)
            .intercept(intercept)
            .selector('#graph')
            .update();