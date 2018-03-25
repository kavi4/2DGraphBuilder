class ISelectContainer
{
	constructor(opt)
	{console.log(opt)
		this.firPos    = {x:0,y:0};
		this.secPos    = {x:0,y:0};
		this.config    = opt.config.selectContainer;
		this.container = opt.container;
		this.target    = null;
	}

	_init(){}

	render(){}

	setFirPos(x,y){}

	setSecPos(x,y){}

	hide(){}

	show(){}

	select(graph){}

}