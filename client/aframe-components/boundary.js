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
		let { width, depth, x0, z0 } = this.data

		var minX = width / 2 + x0;
		var maxX = (-1 * width / 2) + x0;

		var minZ = depth / 2 + z0;
		var maxZ = (-1 * depth / 2) + z0;

		let position = this.el.getAttribute('position');

		position.x = Math.min(this.minX, position.x);
		position.x = Math.max(this.maxX, position.x);

		position.z = Math.min(this.minZ, position.z);
		position.z = Math.max(this.maxZ, position.z);

		this.el.setAttribute('position', position);
	},
});
