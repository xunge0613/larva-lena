// Toolkit Functions

var utils = {};

/*
	Return current relative Mouse Position When On target DOM Element
	@param: 	target DOM Element
	@return: 	mouse(x,y)
*/
utils.captureMouse = function(element) {
	var mouse = {x:0, y:0};

	element.addEventListener('mousemove',function (event) {
		var x, y;
		
		if(event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop  + document.documentElement.scrollTop ;
		}

		x -= element.offsetLeft;
		y -= element.offsetTop;

		mouse.x = x;
		mouse.y = y;		
	},false);

	return mouse;
};

/*
	Return first Touch Event Position On target DOM Element, and whether it has touched or not
	@param: 	target DOM Element
	@return: 	touch(x,y,isPressed)
*/

utils.captureTouch = function(element) {

	var touch = {x: null, y:null, isPressed:false};

	element.addEventListener('touchstart',function(event) {
		touch.isPressed = true;
		console.log('touch start');
	},false);

	element.addEventListener('touchend',function(event) {
		touch.isPressed = false;
		touch.x 		= null;
		touch.y 		= null;	
		console.log('touch end');	
	},false);

	element.addEventListener('touchmove',function(event) {
		var x,y;
		var touch_event = event.touches[0];	// first touch

		if(touch_event.pageX || touch_event.pageY) {
			x = touch_event.pageX;
			y = touch_event.pageY;
		} else {
			x = touch_event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = touch_event.clientY + document.body.scrollTop  + document.documentElement.scrollTop	;
		}

		x -= element.offsetLeft;
		y -= element.offsetTop ;

		touch.x = x;
		touch.y = y;
	},false);

	return touch;
};