var ROFLView = Backbone.View.extend({
  main_listing: _.template($("#mainListing")).html(),
  menu_item: _.template($("#menuItem")).html(),

  initialize: function(){
    that = this;
    // load the session data
    jQuery.getJSON("data/schedule.json", function(data){
      that.schedule = data;
      that.createSideBar();
    });

  },

  populateMainListing: function(day, index) {
    var listing = this.schedule[day][index];
    $("#mainListing").html(this.main_listing({
        title: listing.title,
        time: listing.time
    }));
  },

  createSideBar: function(){
    that = this;
    this.menu_header = _.template("<li class='nav-header'><%=title%></li>\n");
    var htmlBuffer = this.menu_header({"title":"Friday"});
    $.each(this.schedule["Friday"], function(index, value){
      htmlBuffer +=that.menu_item(value);
    });

    htmlBuffer += this.menu_header({"title":"Saturday"});
    $.each(this.schedule["Saturday"], function(index, value){
      htmlBuffer +=that.menu_item(value);
    });
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

var roflView = new ROFLView;
var ROFLRouter = Backbone.Router.extend({
    routes: {
        ":day/:index": roflView.populateMainListing
        "": "showDefault"
    },
    showDefault: function() {

    }
});


