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


/*
	Change #fff520 into rgb(255,245,32)
	@param: 	color  [,alpha]
	@return: 	rgb(r,g,b) | rgba(r,g,b,a)
*/
utils.colorToRGB = function(color, alpha) {
	// if string format , convert to numer
	if(typeof color === 'string' && color[0] === '#') {
		color = window.parseInt(color.slice(1),16);
	}	
	alpha = (alpha === undefined) ? 1 : alpha;

	// extract component value
	var r = color >> 16 & 0xFF,
		g = color >>  8 & 0xFF,
		b = color 		& 0xFF,
		a = (alpha < 0) ? 0 : ((alpha > 1) ? 1: alpha);		// check range

	// use 'rgba' if needed
	if( a === 1) {
		return "rgb("+ r + "," + g + "," +b + ")";
	} else {
		return "rgba("+ r + "," + g + "," +b + ","+ a +")";
	}
}

/*
	Parse 0xFFF520 to #fff520
	@param: 	0xFFF520 [, bool toNumber]
	@return: 	#fff520 [toNumber == true -> 16774432]
*/
utils.parseColor = function(color, toNumber) {
	if (toNumber === true) {
		if(typeof color === 'number') {
			return (color | 0);		// chop off decimal
		} 

		if(typeof color === 'string' && color[0] === '#') {
			color = color.slice(1);
		}
		return window.parseInt(color, 16);
	} else {
		if(typeof color === 'number') {
			// make sure our hexadecimal number is padded out 
			color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
		}
		return color;
	}
}

/*
	Reverse R|G|B
	@param: 	context,x,y,width,height
	@return: 	255 - R|G|B
*/
utils.reverseRGB = function(context,x,y,width,height) {

	var imageData = context.getImageData(x,y,width,height);
	var pixels    = imageData.data;

	for (var offset = 0, len = pixels.length; offset < len; offset+= 4) {
		pixels[offset]		= 	255 - pixels[offset];			//	red
		pixels[offset + 1]	=	255 - pixels[offset + 1];		// 	green
		pixels[offset + 2]	=	255 - pixels[offset + 2];		//	blue
	  //pixels[offset + 3]	=	255 - pixels[offset + 3];		// alpha
	}

	context.putImageData(imageData,0,0);
}
