AFRAME.registerComponent('generate-asteroids', {
  schema: {
    mixin: { default: '' },
    num: { default: 8 }
  },

  init: function () {
    let data = this.data;
    // red, green, blue, yellow brown
    const colors = ['#872720', '#284905', '#293963', '#60660c', '#514734']

    for (let i = 0; i < data.num; i++) {
      let asteroid = document.createElement('a-entity'),
        random = Math.floor(Math.random() * colors.length)

      asteroid.setAttribute('mixin', data.mixin)
      asteroid.setAttribute('material', 'color', `${colors[random]}`)
      asteroid.setAttribute('class', `asteroid`)
      console.log(`asteroid${i}`, asteroid)
      // can set color classes to utilize emotion bullet logic. 
      this.el.appendChild(asteroid)
    }
  },

  tick: function () {
    let asteroids = document.querySelectorAll('.asteroid')
    if (asteroids.length === 0) {
      this.init()
    }
  }
})


   // const colorsMap = {
        //     'red' : "#872720", 
        //     'green' : "#284905", 
        //     'blue' : "#293963", 
        //     'yellow' : "#60660c", 
        //     'brown' : "#514734"
        // }