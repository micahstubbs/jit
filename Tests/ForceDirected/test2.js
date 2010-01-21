function init(){
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    //init data
    //If a node in this JSON structure
    //has the "$type" or "$dim" parameters
    //defined it will override the "type" and
    //"dim" parameters globally defined in the
    //RGraph constructor.
    var json = [{
        "id": "node0",
        "name": "node0 name",
        "data": {
            "$dim": 16.759175934208628,
            "some other key": "some other value"
        },
        "adjacencies": [{
            "nodeTo": "node1",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node2",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node3",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node4",
            "data": {
                "$type":"arrow",
                "$color":"#dd99dd",
                "$dim":25,
                "weight": 1
            }
        }, {
            "nodeTo": "node5",
            "data": {
                "weight": 1
            }
        }]
    }, {
        "id": "node1",
        "name": "node1 name",
        "data": {
            "$dim": 13.077119090372014,
            "$type": "square",
            "some other key": "some other value"
        },
        "adjacencies": [{
            "nodeTo": "node0",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node2",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "node3",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node4",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "node5",
            "data": {
                "weight": 1
            }
        }]
    }, {
        "id": "node2",
        "name": "node2 name",
        "data": {
            "$dim": 24.937383149648717,
            "$type": "triangle",
            "some other key": "some other value"
        },
        "adjacencies": [{
            "nodeTo": "node0",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node1",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "node3",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node4",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node5",
            "data": {
                "weight": 1
            }
        }]
    }, {
        "id": "node3",
        "name": "node3 name",
        "data": {
            "$dim": 10.53272740718869,
            "some other key": "some other value"
        },
        "adjacencies": [{
            "nodeTo": "node0",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node1",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node2",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node4",
            "data": {
                "$type":"arrow",
                "$direction": ["node4", "node3"],
                "$dim":25,
                "$color":"#dd99dd",
                "weight": 1
            }
        }, {
            "nodeTo": "node5",
            "data": {
                "weight": 3
            }
        }]
    }, {
        "id": "node4",
        "name": "node4 name",
        "data": {
            "$dim": 5.3754347037767345,
            "$type":"triangle",
            "some other key": "some other value"
        },
        "adjacencies": [{
            "nodeTo": "node0",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "node1",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "node2",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node3",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "node5",
            "data": {
                "weight": 3
            }
        }]
    }, {
        "id": "node5",
        "name": "node5 name",
        "data": {
            "$dim": 32.26403873194912,
            "$type": "star",
            "some other key": "some other value"
        },
        "adjacencies": [{
            "nodeTo": "node0",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "node1",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "node2",
            "data": {
                "weight": 1
            }
        }, {
            "nodeTo": "node3",
            "data": {
                "weight": 3
            }
        }, {
            "nodeTo": "node4",
            "data": {
                "weight": 3
            }
        }]
    }];
    //end
    //init ForceDirected
    var fd = new ForceDirected({
        Canvas: {
          'injectInto': 'infovis',
          'width': w,
          'height': h
        },
        //Nodes and Edges parameters
        //can be overriden if defined in 
        //the JSON input data.

        //This way we can define different node
        //types individually.

        Node: {
            'overridable': true,
             'color': '#cc0000'

        },
        Edge: {
            'overridable': true,
            'color': '#cccc00'
        },

        //Change the transition effect from linear
        //to elastic.
        transition: Trans.Elastic.easeOut,
        //Change other animation parameters.
        duration:3500,
        fps: 30,
        //Change father-child distance.
        levelDistance: 300,
        //number of iterations of the algorithm
        //more is more expensive but better
        iterations: 300,
        
        //This method is called right before plotting
        //an edge. This method is useful to change edge styles
        //individually.
        onBeforePlotLine: function(adj){
            //Add some random lineWidth to each edge.
            if (!adj.data.$lineWidth) 
                adj.data.$lineWidth = Math.random() * 5 + 1;
        },
        
        onBeforeCompute: function(node){
            Log.write("centering " + node.name + "...");
            
            //Make right column relations list.
            var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
            html += "<ul>";
            Graph.Util.eachAdjacency(node, function(adj){
                var child = adj.nodeTo;
                html += "<li>" + child.name + "</li>";
            });
            html += "</ul>";
            document.getElementById('inner-details').innerHTML = html;
        },
        
        //Add node click handler and some styles.
        //This method is called only once for each node/label crated.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            var style = domElement.style;
            style.cursor = 'pointer';
            style.fontSize = "0.8em";
            style.color = "#fff";
        },
        //This method is called when rendering/moving a label.
        //This is method is useful to make some last minute changes
        //to node labels like adding some position offset.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        },
        
        onAfterCompute: function(){
            Log.write("done");
        }
        
    });
    //load graph.
    fd.loadJSON(json, 1);
    //compute positions and plot
    fd.compute();
    fd.animate();
    //end
}
