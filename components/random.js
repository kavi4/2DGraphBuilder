class Random 
{
	static getRandomStringColor()
	{
		return("rgb("+Random._getRandomArbitrary(0,255)+","+Random._getRandomArbitrary(0,255)+","+Random._getRandomArbitrary(0,255)+")");
	}

	static _getRandomArbitrary(min, max)
	{
  		return Math.random() * (max - min) + min;
	}
}