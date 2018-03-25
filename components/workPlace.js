
class WorkPlace 
{
	constructor(opt)
	{
		this.target          = opt.target;
		this.clearBtn        = opt.clearBtn;
		this.lineEdgeBtn     = opt.lineEdgeBtn;
		this.pointBtn        = opt.pointBtn;
		this.fullEdgeBtn     = opt.fullEdgeBtn;
		this.outputField     = opt.outputField;
		this.copyTextBtn     = opt.copyTextBtn;
		this.config          = opt.config;
		this.pointMode       = false;
		this.selectBuffer    = [];
		this.selectContainer = null;
		this.graph           = null;
		this.parser          = null;
		this.objIndex        = 1;
		this._init();
	}

	_init()
	{
		this.graph = new Graph();
		this.parser = new GraphParser();
		this.selectContainer = new SelectBox({config:this.config,container:this.target.select(".selectBox")});

		var self = this;
		//select mode
		var move = false;
		function mMove(event)
		{
			move = true;
			var x = event.layerX - self.config.point.radius*2;
			var y = event.layerY;
			self.selectContainer.setSecPos(x,y);
		}

		this.target.mousedown(function(event)
		{
			move = false;
			if(self.pointMode){return false;}

			var x = event.layerX - self.config.point.radius*2;
			var y = event.layerY;
			self.selectContainer.setFirPos(x,y);
			self.selectContainer.setSecPos(x,y);
			self.selectContainer.show();
			self.target.mousemove(mMove);
		});

		self.target.mouseup(function(event)
		{
			if(self.pointMode){return false;}

			if(!move)
			{
				self._select(event);
			}

			if(move)
			{
				self.selectBuffer.forEach(function(item,i){
					item.active = false;
				});
				self.selectBuffer = [];
				var buffer = self.selectContainer.selectFromGraph(self.graph);
				buffer.forEach(function(item){
					item.active = true;
				});

				self.selectBuffer = buffer;
			}
			move = false;
			self.selectContainer.hide();
			self.target.unmousemove(mMove);
		});

		//add point 
		this.target.click(function(event){
			if(event.target.id == self.target.attr("id") && self.pointMode)
			{
					self._addPoint(event);
					self._output();
			}
		});

		//copy text log
		this.copyTextBtn.click(function(event){
			var field = self.outputField.node;
			field.select(); 
			 try {  
			    var successful = document.execCommand('copy');  
			    var msg = successful ? 'successful' : 'unsuccessful';  
			    field.value = 'Graph Copied!';
			} catch(err) {  
			    field.value = 'Oops, unable to copy you graph';  
			}

			setTimeout(function(){self._output();},1500);
			    
			window.getSelection().removeAllRanges();  
		});
		
		//clean
		this.clearBtn.click(function(event){
			self._clear(event);
			self._output();
		});

		//point mode
		this.pointBtn.click(function(event){
			self.pointBtn.node.classList.toggle("active");
			self.pointMode =! self.pointMode;
		});

		//linear graph
		this.lineEdgeBtn.click(function(event){
			self._buildLinearEdges(event);
			self._output();
		});

		//full graph
		this.fullEdgeBtn.click(function(event){
			self._buildFullEdges(event);
			self._output();
		});

		// delete
		window.onkeydown = function(event){
			
			if(event.keyCode == 46 )
			{
				self.selectBuffer.forEach(function(item,i){
					if(item instanceof Point)
					{
						self.graph.removePoint(item.id);
					}

					if(item instanceof Edge)
					{
						self.graph.removeEdge(item.id);
					}
					
				});

				self.selectBuffer  = [];
				self._output();
				self._disableAll();
			}
		};
	}

	_output()
	{
		this.outputField.node.value = this.parser.output(this.graph);
	}

	_addPoint(event)
	{
		var x = event.layerX - this.config.point.radius*2;
		var y = event.layerY;
		var gPoints = this.target.select(this.config.workPlace.gPoints);
		this.graph.addPoint(new Point({id:this.objIndex,config:this.config,container:gPoints,x,y}));
		this.objIndex++;
	}

	_select(event)
	{
		var parent = Snap(event.target).parent();

		if(!parent.attr("id")) {return false;}

		var id = +parent.attr("id").split('-')[1];

			var item = this._getGraphObjFromId(id);

			if(item && !item.active)//activetion
			{
				this.selectBuffer.push(item);
				item.active = true;
				return true;
			}

			if(item && item.active)//deactivation
			{
				item.active = false;
				this.selectBuffer = this.selectBuffer.filter(function(item,i)
				{
					if(item.id != id)
					{
						return true;
					}
					return false;
				});
			}
		
	}

	_buildFullEdges(event)
	{
		var self = this;
		var gEdges = this.target.select(this.config.workPlace.gEdges);
		var points = this._getObjsFromBuffer(Point);

		points.forEach(function(point,i)
		{
				for(var j = i+1; j<self.selectBuffer.length;j++)
				{
					if(points[j])
					{
						var edge = new Edge({id:self.objIndex,config:self.config,container:gEdges,firPoint:point,secPoint:points[j]});

						if(!self.graph.findEdge(edge))
						{
							self.graph.addEdge(edge);
							self.objIndex++;
						}else{
							edge.delete();
						}
					}
				}
		});


		self._disableAll();
	}

	_buildLinearEdges(event)
	{
		var self = this;
		var gEdges = this.target.select(this.config.workPlace.gEdges);
		var points = this._getObjsFromBuffer(Point);

		for(var j = 0;j<points.length;j++)
		{
			if(points[j+1])
			{
				var edge = new Edge({id:self.objIndex,config:self.config,container:gEdges,firPoint:points[j],secPoint:points[j+1]});
				if(!self.graph.findEdge(edge))
				{
					self.graph.addEdge(edge);
					self.objIndex++;
				}else{
					edge.delete();
				}
			}
		}
		this._disableAll();
	}

	_disableAll()
	{
		this.selectBuffer.forEach(function(item,i){
			item.active = false;
		});

		this.selectBuffer = [];

		if(!this.graph.points.length)
		{
			this.objIndex  = 1;
		}
	}

	_getObjsFromBuffer(objtype)
	{
		var result = [];
		this.selectBuffer.forEach(function(item,i){
			if(item instanceof objtype)
			{
				result.push(item);
			}
		});

		return result;
	}

	_getGraphObjFromId(id)
	{
		var result = false;
		var point  = this.graph.getPoint(id);
		var edge   = this.graph.getEdge(id);

		if(point){result = point;}
		if(edge){result  = edge;}
		return result;
	}

	_clear(event)
	{
		this.graph.delete();
		this.graph          = new Graph();
		this.objIndex       = 1;
		this.selectBuffer   = [];
	}

}