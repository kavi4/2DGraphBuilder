class Point
{
	get active(){return this._active}
	set active(val)
	{
		if(val)
		{
			this.target.select("circle").attr({stroke:this.config.selectColor});
			this._active = true;
		}
		else
		{
			this.target.select("circle").attr({stroke:"null"});
			this._active = false;
		}
	}

	constructor(opt)
	{
		this.id        = opt.id;
		this.config    = opt.config.point;
		this.container = opt.container;
		this._active   = false;
		this.target    = null;
		this.x         = opt.x;
		this.y         = opt.y;
		this._render();
	}

	delete()
	{
		this.target.remove();
	}

	_render()
	{
		var g = this.container.g().attr({id:this.config.prefix + this.id});

		g.circle(this.x,this.y,this.config.radius)
		.attr({fill:Random.getRandomStringColor()});

		g.text(this.x,this.y,this.id)
		.attr({
			alignmentBaseline:"middle",
			textAnchor:"middle",
			fontSize:this.config.fontSize,
			fill:this.config.color,
		});

		this.target = g;
	}

	reset(x,y)
	{
		if(!x,!y){return false;}

		this.x = x;
		this.y = y;
		this._setPosition();
	}

	_setPosition ()
	{
		this.target.select("circle").attr({cx:this.x,cy:this.y});
		this.target.select("text").attr({x:this.x,y:this.y});
	}
}