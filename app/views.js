var ROFLView = Backbone.View.extend({
  main_listing: _.template($("#mainListingTemplate").html()),
  default_listing: _.template($("#defaultListingTemplate").html()),
  menu_item: _.template($("#menuItemTemplate").html()),
  menu_header: _.template("<li class='nav-header'><%=title%></li>\n"),

  initialize: function(data){
    that = this;
    // load the session data
    this.schedule = data;
    this.createSideBar();
  },

  showDefault: function() {
    $("#mainListing").html(this.default_listing());
    $('#actions').addClass('disabled');
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
    $('#actions').removeClass("disabled");
  },

  followURL: function(e){
    alert("hat");
  },

  createSideBar: function(){
    that = this;
    var htmlBuffer = "";
    for (var day in that.schedule) {
        htmlBuffer += that.menu_header({"title":day});
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

