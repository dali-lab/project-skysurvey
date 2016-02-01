VirtualSky.prototype.drawGalaxy = function(colour){
	if(!this.galaxy || !this.showgalaxy) return this;
	if(!colour) colour = this.col.galaxy;
	this.ctx.beginPath();
	this.ctx.strokeStyle = colour;
	this.ctx.fillStyle = colour;
	this.ctx.lineWidth = 3;
	if(typeof this.boundaries!=="object") return this;
	var p, pa, pb, i, c, old, maxl;
	maxl = this.maxLine(5);

	for(c = 0; c < this.galaxy.length; c++){
		// We will convert all the galaxy outline coordinates to radians
		// ignoring index 0, 1 as those are strings
		if (!this.galaxyprocessed) for(i = 2; i < this.galaxy[c].length; i++) this.galaxy[c][i] *= this.d2r;
		
		//set colors here
		this.ctx.strokeStyle = this.galaxy[c][1];
		this.ctx.fillStyle = this.galaxy[c][1];
		
// 		console.log(this.galaxy[c]);

		// Get a copy of the current shape
		p = this.galaxy[c].slice(1);

		// Get the colour (first element)
		p.shift();
		// Set the initial point to null
		pa = null;

		// Now loop over joining the points
		for(i = 0; i < p.length; i+=2){
			pb = this.radec2xy(p[i], p[i+1]);
			if(pa){
				// Basic error checking: if the line is very long we need to normalize to other side of sky
				if(Math.abs(pa.x-pb.x) < maxl && Math.abs(pa.y-pb.y) < maxl){
					this.ctx.moveTo(pa.x,pa.y);
					this.ctx.lineTo(pb.x,pb.y);
				}
			}
			pa = pb;
		}
	}
	
	// We've converted the galaxy to radians
	this.galaxyprocessed = true;
	this.ctx.stroke();
	return this;
}