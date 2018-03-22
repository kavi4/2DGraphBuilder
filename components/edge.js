class Edge
{
	get active(){return this._active}
	set active(val)
	{
		if(val)
		{
			this.target.select("line").attr({stroke:this.config.selectColor});
			this._active = true;
		}
		else
		{
			this.target.select("line").attr({stroke:this.config.color});
			this._active = false;
		}
	}

	constructor(opt)
	{
		this.id        = opt.id;
		this.config    = opt.config.edge;
		this._active   = false;
		this.target    = null;
		this.container = opt.container;
		this.firPoint  = opt.firPoint;
		this.secPoint  = opt.secPoint;
		this._render();
	}

	delete()
	{
		this.target.remove();
	}

	_render()
	{
		var g = this.container.g().attr({id:this.config.prefix + this.id});
		g.line(this.firPoint.x,this.firPoint.y,this.secPoint.x,this.secPoint.y).attr({
			strokeWidth:this.config.strokeWidth,
			stroke:this.config.color,
		});
		this.target = g;

	}

	reset()
	{
		var line = this.target.select("line").attr({
			x1:this.firPoint.x,
			y1:this.firPoint.y,
			x2:this.secPoint.x,
			y2:this.secPoint.y
		});
	}
}