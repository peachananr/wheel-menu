#Wheel Menu by Pete R.
Wheel Menu is a small jQuery plugin that will add a fully customisable Path-like wheel menu button to your website
Created by [Pete R.](http://www.thepetedesign.com), Founder of [BucketListly](http://www.bucketlistly.com)

License: [Attribution-ShareAlike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/deed.en_US)

[![Wheel Menu](http://www.thepetedesign.com/images/wheelmenu_image.png "Wheel Menu")](http://www.thepetedesign.com/demos/jquery_wheelmenu_demo.html)

## Demo
[View demo](http://thepetedesign.com/demos/jquery_wheelmenu_demo.html)

## Usage
To add this on your website, simply include the latest jQuery library found here together with `jquery.wheelmenu.js` and `wheelmenu.css` into your document's `<head>`, follow by the html markup and a function call as follows:
  
````html
<a href="#wheel2" class="wheel-button ne">
 <span>+</span>
</a>
<ul id="wheel2" class="wheel">
  <li class="item"><a href="#home">A</a></li>
  <li class="item"><a href="#home">B</a></li>
  ...
</ul>
````
Make sure the `href` matches the `id` of the `ul`

````javascript
$(".wheel-button").wheelmenu({
  trigger: "hover", // Can be "click" or "hover". Default: "click"
  animation: "fly", // Entrance animation. Can be "fade" or "fly". Default: "fade"
  animationSpeed: "fast", // Entrance animation speed. Can be "instant", "fast", "medium", or "slow". Default: "medium"
  angle: "all", // Angle which the menu will appear. Can be "all", "N", "NE", "E", "SE", "S", "SW", "W", "NW", or even array [0, 360]. Default: "all" or [0, 360]
});
````

## Further Customization
With `jquery.wheelmenu.js`, you can apply each individual elements with different angle by simply adding a `data-angle` to the `ul` in your document as follows:

````html
<a href="#wheel2" class="wheel-button ne">
 <span>+</span>
</a>
<ul id="wheel2" data-angle="NE" class="wheel">
  <li class="item"><a href="#home">A</a></li>
  <li class="item"><a href="#home">B</a></li>
  ...
</ul>
````
You can also use array as angle to represent the starting and end point of where the menu will appear. For example, to use array to make the menu appear 360 degrees, you can use `[0, 360]` as an angle. Feel free to play with the numbers to get the best outcome. 

Don't forget to remove the angle from the global options as seen here:

````javascript
$(".wheel-button").wheelmenu({
  trigger: "hover",
  animation: "fly", 
  animationSpeed: "fast"
});
````

Now, each individual element will have its own effect without you calling the function multiple times.

## Other Resources
- Tutorial (Coming Soon)
