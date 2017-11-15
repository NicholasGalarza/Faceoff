AFRAME.registerComponent('event-handler', {
  init: function () {
    var el = this.el;
    window.addEventListener('keydown', function (event) {
      const key = String.fromCharCode(event.keyCode).toLowerCase()
      if (key === 'e') {
        console.log('[context]', )
        el.emit('keydown', null, false);
      }     
    });
  }
});