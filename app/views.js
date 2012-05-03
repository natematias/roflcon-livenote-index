var ROFLView = Backbone.View.extend({


  initialize: function(){
    that = this;
    // load the menu item template

    $.ajax({url:"templates/menu_item.template",
              type: "GET",
              dataType: "text",
              success: function(data){
                that.menu_item = _.template(data);
              }
    });

    // load the main listing template
    $.ajax({url:"templates/main_listing.template",
              type: "GET",
              dataType: "text",
              success: function(data){
                that.main_listing = _.template(data);
              }
    });

    // load the session data
    jQuery.getJSON("data/schedule.json", function(data){
      that.schedule = data;
      that.createSideBar();
    });

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
  },

});

var roflView = new ROFLView;
