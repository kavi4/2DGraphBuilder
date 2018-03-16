var workplaceTarget = Snap("#workPlace");
var gPoints = workplaceTarget.select(".points");
var gEdges = workplaceTarget.select(".edges");

var point = new Point({id:1,config:mainConfig,container:gPoints,x:50,y:50});
var point2 = new Point({id:2,config:mainConfig,container:gPoints,x:100,y:100});

var edge = new Edge({id:1,config:mainConfig,container:gEdges,firPoint:point,secPoint:point2});

var graph = new Graph();

graph.addPoint(point);
graph.addPoint(point2);
graph.addEdge(edge);


