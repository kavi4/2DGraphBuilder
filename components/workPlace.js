
class WorkPlace 
{
	constructor(opt)
	{
		this.target         = opt.target;
		this.clearBtn       = opt.clearBtn;
		this.lineEdgeBtn    = opt.lineEdgeBtn;
		this.pointBtn       = opt.pointBtn;
		this.fullEdgeBtn    = opt.fullEdgeBtn;
		this.config         = opt.config;
		this.pointMode      = false;
		this.selectedPoints = [];
		this.selectedEdges  = [];
		this.graph          = null;
		this.pointIndex = 1;
		this.edgeIndex = 1;
		this._init();
	}

	_init()
	{
		this.graph = new Graph();

		var self = this;
		this.target.click(function(event){
				self._addPoint(event);
				self._select(event);
			});

		this.clearBtn.click(function(event){
			self.clear(event);
		});

		this.pointBtn.click(function(event){
			self.pointBtn.node.classList.toggle("active");
			self.pointMode =! self.pointMode;
		});

		this.lineEdgeBtn.click(function(event){
			self._buildLinearEdges(event);
		});

		this.fullEdgeBtn.click(function(event){
			self._buildFullEdges(event);
		});
	}

	_addPoint(event)
	{
		if(event.target.id == this.target.attr("id") && this.pointMode)
		{
			var x = event.layerX - this.config.point.radius*2;
			var y = event.layerY;

			var gPoints = this.target.select(this.config.workPlace.gPoints);

			this.graph.addPoint(new Point({id:this.pointIndex,config:this.config,container:gPoints,x,y}));
			this.pointIndex++;
		}
	}

	_select(event)
	{
		if(!this.pointMode)
		{
			var parent = Snap(event.target).parent();
			if(!parent.attr("id")) {return false;}

			var id = +parent.attr("id").split('-')[1];

			if(new RegExp(this.config.point.prefix).exec(parent.attr("id")))
			{
				var point = this.graph.getPoint(id);

				if(point && !point.active)
				{
					this.selectedPoints.push(point);
					point.active = true;
					return true;
				}

				if(point && point.active)
				{
					point.active = false;
					this.selectedPoints = this.selectedPoints.filter(function(point,i)
					{
						if(point.id != id)
						{
							return true;
						}
						return false;
					});
				}
			}


			if(new RegExp(this.config.edge.prefix).exec(parent.attr("id")))
			{
				var edge = this.graph.getEdge(id);

				if(edge && !edge.active)
				{
					this.selectedEdges.push(edge);
					edge.active = true;
					return true;
				}

				if(edge && edge.active)
				{
					edge.active = false;
					this.selectedEdges = this.selectedEdges.filter(function(edge,i)
					{
						if(edge.id != id)
						{
							return true;
						}
						return false;
					});
				}
			}

		}
	}

	_buildFullEdges(event)
	{
		var self = this;
		var gEdges = this.target.select(this.config.workPlace.gEdges);

		self.selectedPoints.forEach(function(point,i){
			for(var j = i+1; j<self.selectedPoints.length;j++)
			{
				self.graph.addEdge(new Edge({id:self.edgeIndex,config:self.config,container:gEdges,firPoint:point,secPoint:self.selectedPoints[j]}));
				self.edgeIndex++;
			}
		});

		self._disableAll();
	}

	_buildLinearEdges(event)
	{
		var self = this;
		var gEdges = this.target.select(this.config.workPlace.gEdges);

		for(var j = 0;j<self.selectedPoints.length;j++)
		{
			if(self.selectedPoints[j+1])
			{
				self.graph.addEdge(new Edge({id:self.edgeIndex,config:self.config,container:gEdges,firPoint:self.selectedPoints[j],secPoint:self.selectedPoints[j+1]}));
				self.edgeIndex++;
			}
		}
		this._disableAll();
	}

	_disableAll()
	{
		this.selectedPoints.forEach(function(point,i){
			point.active = false;
		});

		this.selectedEdges.forEach(function(edge,i){
			edge.active = false;
		});

		this.selectedPoints = [];
		this.selectedEdges  = [];
	}

	clear(event)
	{
		this.graph.delete();
		this.graph          = new Graph();
		this.pointIndex     = 1;
		this.edgeIndex      = 1;
		this.selectedEdges  = [];
		this.selectedPoints = [];
	}

}