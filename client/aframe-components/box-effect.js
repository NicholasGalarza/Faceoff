AFRAME.registerComponent('scale-on-mouseenter', {
   schema: {
      to: { default: '10 2.5 2.5' }
   },
   init: function () {
      var data = this.data;
      this.el.addEventListener('mouseenter', function () {
         this.setAttribute('scale', data.to);
      });
   }
});