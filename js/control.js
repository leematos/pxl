control = {

  radioQueue: [],
  pageSize: 10,
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

    //$(document).bind('touchstart', function(e) {e.preventDefault();});

    //  Go get the lates headline from the Guardian
    control.getLatestHeadline();
  },

  getLatestHeadline: function() {

    $.getJSON("http://content.guardianapis.com/search?page-size=" + control.pageSize + "&format=json&show-fields=trailText%2Cheadline%2Cthumbnail&callback=?",
      function(json) {
        if ('response' in json && 'results' in json.response && json.response.results.length > 0) {
          var thisStory = null;
          for (var i in json.response.results) {
            thisStory = json.response.results[i];
            if ('fields' in thisStory && 'thumbnail' in thisStory.fields) {
              var newStory = {
                'thumbnail': thisStory.fields.thumbnail.replace('http://static.guim.co.uk/sys-images/', ''),
                'imageLoaded': false,
              };
              control.radioQueue.push(newStory);
              break;
            }
          }
        }
	aesthetic.loadimage();
      }
    );
  }
};
