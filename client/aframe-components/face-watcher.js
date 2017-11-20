AFRAME.registerComponent('face-watcher', {
  schema: {
    empty: { default: true }
  },
  init: function () {
    var el = this.el;
    window.addEventListener('keyup', function (event) {
      const key = String.fromCharCode(event.keyCode).toLowerCase()
      if (key === 'e') {
        console.log('[bullet attribute]', window.bulletAttribute)
        el.emit('keyup', null, false);
      }
    })
  }
});