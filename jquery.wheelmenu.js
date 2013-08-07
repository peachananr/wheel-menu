/* ===========================================================
 * jquery-wheelmenu.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * A small jQuery plugin that adds a beautiful
 * Path-like menu button to your website
 * https://github.com/peachananr/wheel-menu
 *
 * ========================================================== */

!function($){
  
  var defaults = {
		trigger: "click",
		animation: "fade",
		angle: [0,360],
		animationSpeed: "medium"
	};
	
	$.fn.centerAround = function (button) {
    var offset = button.offset(),
        width = button.outerWidth(),
        height = button.outerHeight(),
        buttonX = (offset.left - $(document).scrollLeft() ) + width / 2,
        buttonY = (offset.top -  $(document).scrollTop() ) + height / 2,
        objectOffset = this.offset();
    this.css("position","fixed");
    this.css("top", buttonY  - (this.outerHeight() / 2)  + "px");
    this.css("left", buttonX - (this.outerWidth() / 2)   + "px");
    return this;
  }
  
  $.fn.flyIn = function (el, button, width, height, angle, step, radius, settings) {
    var d = 0;
    this.stop(true,true);
    this.each(function(index) {
      angle = (settings.angle[0] + (step * index)) * (Math.PI/180); 
      var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).find("a").outerWidth()/2),
          y = Math.round(height/2 + radius * Math.sin(angle) - $(this).find("a").outerHeight()/2);
      $(this).animateRotate(360).css({
          position: 'absolute',
          opacity: 0,
          left: "50%",
          top: "50%",
          marginLeft: "-" + $(this).outerWidth() / 2,
          marginTop: "-" + $(this).outerHeight() / 2
      }).delay(d).animate({
        opacity:1,
        left: x + 'px',
        top: y + 'px'
      }, settings.animationSpeed[1]);
      d += settings.animationSpeed[0];
    });
  }
  
  $.fn.flyOut = function (el, button) {
    var d = 0;
    this.stop(true,true);
    $(this.get().reverse()).each(function() {
	    $(this).animateRotate(-360).delay(d).animate({
	      opacity:0,
	      left: el.outerWidth() / 2 + "px",
        top: el.outerHeight() / 2 + "px"
	    }, 150);
      d += 15;
	  }).promise().done( function() {
      el.removeClass("active").css("visibility", "hidden").hide();
      button.removeClass("active")
    });
  }
  
  $.fn.fadeInIcon = function (el, button, width, height, angle, step, radius, settings) {
    var d = 0;
    this.stop(true,true);
    this.each(function(index) {
      angle = (settings.angle[0] + (step * index)) * (Math.PI/180); 
      var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).find("a").outerWidth()/2),
          y = Math.round(height/2 + radius * Math.sin(angle) - $(this).find("a").outerHeight()/2);
      $(this).css({
          position: 'absolute',
          left: x + 'px',
          top: y + 'px',
          opacity: 0
      }).delay(d).animate({opacity:1}, settings.animationSpeed[1]);
      
      d += settings.animationSpeed[0];
    });
  }
  
  $.fn.fadeOutIcon = function (el, button) {
    var d = 0;
    this.stop(true,true);
    
    $(this.get().reverse()).each(function() {
	    $(this).delay(d).animate({opacity:0}, 150);
      d += 15;
	  }).promise().done( function() {
      el.removeClass("active").css("visibility", "hidden").hide();
      button.removeClass("active")
    });
  }
	
	$.fn.hideIcon = function (button, settings) {
	  var fields = this.find(".item"),
	      el = this;
	  switch (settings.animation) { 
      case 'fade': 
        fields.fadeOutIcon(el, button)
        break; 
    
      case 'fly': 
        fields.flyOut(el, button)
        break; 
    }
	  
	}
	
	$.fn.showIcon = function (button, settings) {
	  var el = this,
	      zindex = '6';
	  if (settings.trigger == "hover") {
	    var zindex = '3';
    }
	  button.addClass("active").css({
      'z-index': zindex
    });
    
    
    
	  el.show().css({
        position: 'absolute',
        'z-index': '5',
        'padding': '30px' // add safe zone for mouseover
    }).centerAround(button); 
    el.addClass("wheel active").css("visibility", "visible").show();
	  
	  if (el.attr('data-angle')) {
      settings.angle = el.attr('data-angle')
    }
    
    settings = predefineAngle(settings);
	  var radius = el.width() / 2,
      fields = el.find(".item"),
      container = el,
      width = container.innerWidth(),
      height = container.innerHeight(),
      angle =  0,
      step = (settings.angle[1] - settings.angle[0]) / fields.length;
     
     
      switch (settings.animation) { 
        case 'fade': 
          fields.fadeInIcon(el, button, width, height, angle, step, radius, settings)
          break; 
          
        case 'fly': 
          fields.flyIn(el, button, width, height, angle, step, radius, settings)
          break; 
      }
    
	}
	
	$.fn.animateRotate = function(angle, duration, easing, complete) {
      return this.each(function() {
          var $elem = $(this);

          $({deg: 0}).animate({deg: angle}, {
              duration: duration,
              easing: easing,
              step: function(now) {
                  $elem.css({
                      transform: 'rotate(' + now + 'deg)'
                  });
              },
              complete: complete || $.noop
          });
      });
  };
  
	
	function predefineAngle (settings) {
	  var convert = false
	  if ($.type(settings.angle) == "string") {
	    try {
        if (eval(settings.angle).length > 1) convert = true
      }
      catch(err) {
        convert = false
      }
	    if (convert == true) {
	      settings.angle = JSON.parse(settings.angle);
	    } else {
	      switch (settings.angle) { 
          case 'N':
            settings.angle = [180,380]
            break;
          case 'NE':
            settings.angle = [270,380]
            break;
          case 'E':
            settings.angle = [270,470]
            break;
          case 'SE':
            settings.angle = [360,470]
            break;
          case 'S':
            settings.angle = [360,560]
            break;
          case 'SW':
            settings.angle = [90,200]
            break;
          case 'W':
            settings.angle = [90,290]
            break;
          case 'NW':
            settings.angle = [180,290]
            break;
          case 'all':
            settings.angle = [0,360]
            break;
        }
	    } 
    }
    return settings;
	}
	
	function predefineSpeed(settings) {
	  if ($.type(settings.animationSpeed) == "string") { 
      switch (settings.animationSpeed) { 
        case 'slow':
          settings.animationSpeed = [75,700]
          break;
        case 'medium':
          settings.animationSpeed = [50,500]
          break;
        case 'fast':
          settings.animationSpeed = [25,250]
          break;
        case 'instant':
          settings.animationSpeed = [0,0]
          break;
      }
    }
    return settings;
	}
  
  $.fn.wheelmenu = function(options){
    var settings = $.extend({}, defaults, options);
    
    settings = predefineSpeed(settings);
    
    return this.each(function(){
      var button = $(this)
      var el = $($(this).attr("href"));
      el.addClass("wheel");
      
      button.css("opacity", 0).animate({
        opacity: 1
      })
      if (settings.trigger == "hover") {

        button.bind({
          mouseenter: function() {
            el.showIcon(button, settings);
          }
        });
        
        el.bind({
          mouseleave: function() {
            el.hideIcon(button, settings);
          }
        });
        
      } else {
        button.click( function() {
          if (el.css('visibility') == "visible") {
            el.hideIcon(button, settings);
          } else {
            el.showIcon(button, settings);
          }
        });
      }
    });
  }
  
}(window.jQuery);


