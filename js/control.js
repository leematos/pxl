control = {

  windowResize: null,
  
  init: function() {
    //  Set the tiles across size, directly because I'm a hack
    aesthetic.tilesAcross = 20;
    //  Whenever the use resized the window we need to redraw the canvas because we
    //  can't just simply set it at 100% and be done with it. *But* don't do it
    //  each time we resize only when the user has probably stopped
    //$(window).resize(function() {
    //  control.windowResize = setTimeout( function() { aesthetic.renderTiles(); }, 500);
    //});
    aesthetic.loadimage();
    //$(document).bind('touchstart', function(e) {e.preventDefault();});
  },
};
