AFRAME.registerComponent('boundary', {
	schema: {
		width: {
			type: 'number',
			default: 10
		},
		depth: {
			type: 'number',
			default: 10
		},
		x0: {
			type: 'number',
			default: 0
		},
		z0: {
			type: 'number',
			default: 0
		}
	},

	tick: function () {
		let data = this.data;
		let thiswidth = data.width;
		let thisdepth = data.depth;
		let x0 = data.x0;
		let z0 = data.z0;
   
		this.minX = thiswidth / 2 + x0;
		this.maxX = (-1 * thiswidth / 2) + x0;

		this.minZ = thisdepth / 2 + z0;
		this.maxZ = (-1 * thisdepth / 2) + z0;

		let position = this.el.getAttribute('position');

		position.x = Math.min(this.minX, position.x);
		position.x = Math.max(this.maxX, position.x);

		position.z = Math.min(this.minZ, position.z);
		position.z = Math.max(this.maxZ, position.z);

		this.el.setAttribute('position', position);
	},
});
