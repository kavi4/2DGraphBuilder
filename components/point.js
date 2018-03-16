class Point
{
	constructor(opt)
	{
		this.id        = opt.id,
		this.graph 	   = opt.graph,
		this.config    = opt.config,
		this.container = opt.container,
		this.target    = null,
		this.x         = opt.x,
		this.y         = opt.y,
		this._render();
	}

	_render()
	{
		var g = this.container.g().attr({id:this.config.point.prefix + this.id});

		g.circle(this.x,this.y,this.config.point.radius)
		.attr({fill:Random.getRandomStringColor()});

		g.text(this.x,this.y,this.id)
		.attr({
			alignmentBaseline:"middle",
			textAnchor:"middle",
			fontSize:this.config.point.fontSize,
			fill:this.config.point.color,
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