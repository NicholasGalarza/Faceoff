AFRAME.registerComponent("spawner", {
  schema: {
    on: { default: "click" },
    mixin: { default: "" }
  },

  /**
   * Update event listener.
   */
  update: function (oldData) {
    this.el.addEventListener(this.data.on, this.spawn.bind(this));
  },

  /**
   * Spawn new entity at entity's current position.
   */
  spawn: function () {
    let el = this.el;
    let entity = document.createElement("a-entity");
    let entityRotation;
    let matrixWorld = el.object3D.matrixWorld;
    let position = new THREE.Vector3();
    let rotation = this.el.getAttribute("rotation");

    position.setFromMatrixPosition(matrixWorld);
    entity.setAttribute("position", position);
    entity.setAttribute("mixin", this.data.mixin);
    entity.addEventListener("loaded", function () {
      entityRotation = entity.getAttribute("rotation");
      entity.setAttribute("rotation", {
        x: entityRotation.x + rotation.x,
        y: entityRotation.y + rotation.y,
        z: entityRotation.z + rotation.z
      });
    });
    el.sceneEl.appendChild(entity);
    entity.play();
  }
});