AFRAME.registerComponent('boundary', {
  schema: {
    width: {
      type: 'number',
      default: 50
    },
    depth: {
      type: 'number',
      default: 50
    }
  },

  tick: function () {
    const { width, depth } = this.data

    var minX = (width / 2),
      maxX = (-1 * width / 2),
      minZ = (depth / 2),
      maxZ = (-1 * depth / 2)

    let position = this.el.getAttribute('position');

    position.x = Math.min(minX, position.x);
    position.x = Math.max(maxX, position.x);

    position.z = Math.min(minZ, position.z);
    position.z = Math.max(maxZ, position.z);

    this.el.setAttribute('position', position);
  },
});
