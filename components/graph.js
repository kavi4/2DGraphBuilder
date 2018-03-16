class Graph 
{
	constructor(opt)
	{
		this.points = [];
		this.edges  = [];
	}

	delete()
	{
		this.points.map(function(point,i){
			point.delete();
		});
		this.edges.map(function(edge,i){
			edge.delete();
		});
	}

	getPoint(id)
	{
		var result = false;
		this.points.forEach(function(point,i){
			if(point.id == id)
			{
				result = point;
			}
		});
		return result;
	}

	addPoint(point)
	{
		this.points.push(point);
	}

	removePoint(id)
	{
		var self = this;
		this.points.filter(function(point,i)
			{
				if(point.id == id)
				{
					self._removeEdges(point);
					point.delete();
					return false;
				}

				return true;
			});
	}

	addEdge(edge)
	{
		this.edges.push(edge);
	}

	removeEdge(id)
	{
		this.edges.filter(function(edge,i)
			{
				if(edge.id == id)
				{
					edge.delete();
					return false;
				}

				return true;
			});
	}

	_removeEdges(point)
	{
		this.edges.filter(function(edge,i){
			if(edge.firPoint.id == point.id || edge.secPoint.id == point.id)
			{
				edge.delete();
				return false;
			}
			return true;
		});
	}
}