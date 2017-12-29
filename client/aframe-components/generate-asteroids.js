AFRAME.registerComponent('generate-asteroids', {
  schema: {
    mixin: { default: '' },
    num: { default: 10 }
  },

  init: function () {
    let data = this.data;
    const colors = ['#872720', '#284905', '#293963', '#60660c', '#514734'],
      //colorTone = ['red', 'green', 'blue', 'yellow', 'brown']
      emotionMap = ['angry', 'happy', 'sad', 'surprised', 'normal']

    // Create entities with supplied mixin.
    for (let i = 0; i < data.num; i++) {
      let entity = document.createElement('a-entity'),
        random = Math.floor(Math.random() * colors.length)

      entity.setAttribute('mixin', data.mixin);
      entity.setAttribute('class', `${emotionMap[random]}-asteroid`)
      entity.setAttribute('material', 'color', `${colors[random]}`)
      this.el.appendChild(entity);
    }
  },

  tick: function () {
    let asteroids = document.querySelectorAll('[class$=asteroid]');

    if (asteroids.length === 1) {
      this.init()
    }
  }
});


