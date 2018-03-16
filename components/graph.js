class Graph 
{
	constructor(opt)
	{
		this.points = [];
		this.edges  = [];
	}

	addPoint(point)
	{
		this.points.push(point);
	}

	removePoint(id)
	{
		var that = this;
		this.points.map(function(point,i)
			{
				if(point.id == id)
				{
					that._removeEdges(point);
					point.delete();
					return false;
				}

				return point;
			});
	}

	addEdge(edge)
	{
		this.edges.push(edge);
	}

	removeEdge(id)
	{
		this.edges.map(function(edge,i)
			{
				if(edge.id == id)
				{
					edge.delete();
					return false;
				}

				return edge;
			});
	}

	_removeEdges(point)
	{
		this.edges.map(function(edge,i){
			if(edge.firPoint.id == point.id || edge.secPoint.id == point.id)
			{
				edge.delete();
				return false;
			}
			return true;
		});
	}
}