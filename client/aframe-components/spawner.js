AFRAME.registerComponent("spawner", {
  schema: {
    on: { default: "click" },
    mixin: { default: "" },
    emote: { default: "" }
  },

  /**
   * Update event listener.
   */
  update: function (oldData) {
    this.el.addEventListener(this.data.on, this.spawn.bind(this))
  },

  /**
   * Spawn new entity at entity's current position.
   */
  spawn: function () {
    let el = this.el
    let entity = document.createElement("a-entity")
    let entityRotation
    let matrixWorld = el.object3D.matrixWorld
    let position = new THREE.Vector3()
    let rotation = this.el.getAttribute("rotation")
    const emotionMap = {
      'angry': '#872720',
      'happy': '#284905',
      'sad': '#293963',
      'surprised': '#60660c',
      'normal': '#514734'
    }

    position.setFromMatrixPosition(matrixWorld)
    entity.setAttribute("position", position)
    entity.setAttribute("mixin", this.data.mixin)
    entity.setAttribute('material', 'color', `${emotionMap[this.data.emote]}`)
    entity.addEventListener("loaded", function () {
      entityRotation = entity.getAttribute("rotation")
      entity.setAttribute("rotation", {
        x: entityRotation.x + rotation.x,
        y: entityRotation.y + rotation.y,
        z: entityRotation.z + rotation.z
      });
    });
    el.sceneEl.appendChild(entity)
    entity.play()
  }
});