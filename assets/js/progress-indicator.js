$(document).ready(function () {
  var $w = $(window);
  var $prog = $('.progress-indicator');
  var wh = $w.height();
  var h = $('body').height();
  var sHeight = h - wh;
  $w.on('scroll', function() {
    window.requestAnimationFrame(function(){
      var perc = Math.max(0, Math.min(1, $w.scrollTop() / sHeight));
      $prog.css({width: perc * 100 + '%'});
    });
  });
});