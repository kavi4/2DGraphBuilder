class SelectBox extends ISelectContainer
{
	constructor(opt)
	{
		super(opt);
		this._init();
	}

	_init()
	{
		this.target = this.container.path();
		this.render();
	}

	render()
	{
		this.target.attr({d:this._getPoints()});
	}

	setFirPos(x,y)
	{
		this.firPos.x=x;
		this.firPos.y=y;
		this.render();
	}

	setSecPos(x,y)
	{
		this.secPos.x=x;
		this.secPos.y=y;
		this.render();
	}

	hide()
	{
		this.target.attr({fill:'none',stroke:'transparent'});
		this.firPos = {x:0,y:0};
		this.setSecPos(0,0);
	}

	show()
	{
		this.target.attr({stroke:this.config.strokeColor,fill:this.config.fill});
	}

	selectFromGraph(graph)
	{
		var buffer = [];
		var max = this._getMaxPos();
		var min = this._getMinPos();
		var self = this;

		graph.points.forEach(function(point,i){
			var point = self._selctPoint(point);
			point?buffer.push(point):false;
		});

		graph.edges.forEach(function(edge,i){
			buffer.forEach(function(item,i){
				if(item instanceof Point)
				{
					if(edge.firPoint.id == item.id || edge.secPoint.id == item.id)
					{
						buffer.push(edge);
					}
				}
			});
		});

		return buffer;
	}

	_selctPoint(point)
	{
		var x = false;
		var y = false;
		if(this.firPos.x > this.secPos.x)
		{
			if(point.x > this.secPos.x &&  point.x < this.firPos.x)
			{
				x = true;
			}
		}else{
			if(point.x < this.secPos.x &&  point.x > this.firPos.x)
			{
				x = true;
			}
		}

		if(this.firPos.y > this.secPos.y)
		{
			if(point.y< this.firPos.y && point.y > this.secPos.y){
				y = true;
			}
		}else{
			if(point.y> this.firPos.y && point.y < this.secPos.y){
				y = true;
			}
		}
		if(x&& y){return point;}
	}

	_getMinPos()
	{
		if(this.firPos.x<this.secPos.x)
		{
			return this.firPos;
		}else{
			return this.secPos;
		}
	}

	_getMaxPos()
	{
		if(this.firPos.x>this.secPos.x)
		{
			return this.firPos;
		}else{
			return this.secPos;
		}
	}

	_getPoints()
	{
		return "M "+this.firPos.x+","+this.firPos.y+" L "+this.secPos.x+","+this.firPos.y+" L "+this.secPos.x+","+this.secPos.y+" L "+ this.firPos.x+","+this.secPos.y+" z";
	}
}