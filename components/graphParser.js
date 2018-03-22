
class GraphParser
{
	constructor(opt)
	{
		
	}

	input(text)
	{
		var result = new Graph();
		text = text.replace(['(',')'],'');
		var edges = text.match(/(\[[0-9]+,[0-9]+\])/g);
		var points = text.replace(/(\[[0-9]+,[0-9]+\])/g,'').match(/([0-9]+,[0-9]+)+/g);
		for(var i =0;i<edges.length;i+=2)
		{
			var firarr = edges[i]  .replace(/[ \[\] ]/g,'').split(',');
			var secarr = edges[i+1].replace(/[ \[\] ]/g,'').split(',');



		}
	}

	output(graph)
	{
		var result = "";

		if(graph.points.length || graph.edges.length)
		{
			result += "(";

			if(graph.points.length)
			{
				result+="{";
				graph.points.forEach(function(point,i)
				{
					result += point.x+","+point.y;

					if(i!= graph.points.length-1)
					{
						result+=" ; ";
					}else{
						result+="}";
					}
				});
			}


			if(graph.edges.length)
			{
				result+= ",{";
				graph.edges.forEach(function(edge,i)
				{
					result+="["+edge.firPoint.x+","+edge.firPoint.y+"],["+edge.secPoint.x+","+edge.secPoint.y+"]";
					if(i!=graph.edges.length-1)
					{
						result+=" ; ";
					}else{
						result+="}";
					}
				});
			}

			result+=")";
		}

		return result;
	}

}