AFRAME.registerComponent('generate-asteroids', {
  schema: {
    mixin: { default: '' },
    num: { default: 10 }
  },

  init: function () {
    let data = this.data;
    const colors = ['#872720', '#284905', '#293963', '#60660c', '#514734']
    // Create entities with supplied mixin.

    for (let i = 0; i < data.num; i++) {
      let entity = document.createElement('a-entity'),
        random = Math.floor(Math.random() * colors.length)

      entity.setAttribute('mixin', data.mixin);
      entity.setAttribute('class', 'asteroid')
      entity.setAttribute('material', 'color', `${colors[random]}`)
      this.el.appendChild(entity);
      console.log(entity)
    }
  },
  tick: function () {
    let enemies = document.querySelectorAll('.asteroid');

    if (enemies.length === 1) {
      this.init()
    }
  }
});

// const colorsMap = {
//   'red' : "#872720",
//   'green' : "#284905", 
//   'blue' : "#293963", 
//   'yellow' : "#60660c", 
//   'brown' : "#514734"
// }
