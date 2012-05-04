var ROFLView = Backbone.View.extend({
  main_listing: _.template($("#mainListingTemplate").html()),
  default_listing: _.template($("#defaultListingTemplate").html()),
  menu_item: _.template($("#menuItemTemplate").html()),
  menu_header: _.template("<li class='nav-header'><%=title%></li>\n"),

  initialize: function(data){
    _.bindAll(this, 'selectItem');
    that = this;
    // load the session data
    this.schedule = data;
    this.createSideBar();
  },

  showDefault: function() {
    $("#mainListing").html(this.default_listing());
  },

  populateMainListing: function(day, index) {
    var listing = this.schedule[day][index];
    $("#mainListing").html(this.main_listing({
        title: listing.title,
        time: listing.time,
        desc: listing.desc
    }));
    $('#linkhound').attr('href', listing.url);
    $('#sweeper').attr('href', listing.url);
    $('#read').attr('href', listing.url);
  },

  followURL: function(e){
    alert("hat");
  },

  selectItem: function(e){
    that = this;
    $.each($('#roflbar li'), function(index, value){
      value.removeClass('active')
    });
    $(e.target).addClass('active');
  },

  createSideBar: function(){
    that = this;
    var htmlBuffer = "";
    for (var day in that.schedule) {
        htmlBuffer += that.menu_header({"title":"Friday"});
        $.each(that.schedule[day], function(index, value){
          htmlBuffer +=that.menu_item({
              index: index,
              day: day,
              time: value.time,
              title: value.title
          });
        });
    }
    $('#roflbar').html(htmlBuffer);
  },

  selectSession: function(e){
    this.cleanEvent(e);   
  },

  cleanEvent: function(e){
    e.stopPropagation()
    e.preventDefault()
  }

});

jQuery.getJSON("data/schedule.json", function(data){
    var roflView = new ROFLView(data);
    var ROFLRouter = Backbone.Router.extend({
        routes: {
            ":day/:index": 'showPanel',
            "": 'showDefault'
        },
        showPanel: function(day, index) {
            roflView.populateMainListing(day, parseInt(index));
        },
        showDefault: function() {
            roflView.showDefault();
        }

    });
    var router = new ROFLRouter();
    Backbone.history.start({pushState: false, root: "/"})
});

