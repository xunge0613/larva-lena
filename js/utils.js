//	 Global

var utils = {
	Math: {},	// Math Functions
	filters: {}	// DIP Filters
};

/*
	Array Toolkit
*/
Array.prototype.str2num = function(options) {
	for (var i = this.length - 1; i >= 0; i--) {
		this[i] = parseInt(this[i]);
	};
	return this;
}

// Compatibility
// ----------------------------------------------

/*
	if browser doesn't support requestAnmationFrame
*/
if( !window.requestAnimationFrame) {
	window.requestAnimationFrame = (
		window.webkitRequestAnimationFrame 	|| 
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function (callback) {
			return window.setTimeout(callback, 1000 / 60);
		}
	)
}

//	Math Functions
//	---------------------------------------------
utils.Math.SUM = function(_array) {
	var sum = 0;
	for (var i = _array.length - 1; i >= 0; i--) {
		sum += _array[i];
	};
	return sum;
}


// 	Toolkit Functions
// 	---------------------------------------------

//	X = utils.xquery
//	X.bind()

/*
	Bind
	@param: 	target DOM Element , event	
*/
utils.bind = function(element,event,_function) {	
	element.addEventListener(event,_function);
}

/*
	trigger Mouse Event ONLY
*/
utils.trigger = function(element,event) {
	var _event = new MouseEvent(event,
			{
				'view': window,
				'bubbles': true,
				'cancelable': true
			}
		);
	element.dispatchEvent(_event);
}
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


// 	DIP Functions
//	------------------------------------------------

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



//	DIP Filters
//	-------------------------------------------

/*
	Grayscale 
	@param: 	pixels
	@return: 	grayscaled

	@algorithm:
		x = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)
		r = g = b = x
*/
utils.filters.grayScale = function(pixels) {
	for (var offset = 0, len = pixels.length; offset < len; offset+= 4) {
		var r = pixels[offset],
			g = pixels[offset + 1],
			b = pixels[offset + 2];

		var y = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);		// luminance

		pixels[offset] = pixels[offset +1] = pixels[offset + 2] = y;
	}
	return pixels;
}

/*
	Reverse R|G|B
	@param: 	pixels
	@return: 	255 - R|G|B

	@algorithm:
		x = 255 -x;		( x = r,g,b )
*/
utils.filters.reverseRGB = function(pixels) {	
	for (var offset = 0, len = pixels.length; offset < len; offset+= 4) {
		pixels[offset]		= 	255 - pixels[offset];			//	red
		pixels[offset + 1]	=	255 - pixels[offset + 1];		// 	green
		pixels[offset + 2]	=	255 - pixels[offset + 2];		//	blue
	  //pixels[offset + 3]	=	255 - pixels[offset + 3];		// alpha
	}	
}

/*
	Ajusting Brightness
	@param: pixels, brightness

	@algorithm:
		x += brightness;	( x=r,g,b )
*/
utils.filters.brightness = function(pixels,brightness) {
	for (var offset = 0 , len = pixels.length; offset < len; offset+= 4) {
		pixels[offset]		+= brightness;
		pixels[offset + 1]	+= brightness;
		pixels[offset + 2]	+= brightness;
	}
	return pixels;
}

/*
	01Threshold Filter
	@param: pixels, threshold

	@algorithm:
		Given threshold,
		grayScale > threshold : 255 ? 0
*/
utils.filters.threshold_0_1 = function(pixels,threshold) {
	for (var offset = 0, len = pixels.length; offset < len; offset+= 4) {
		var r = pixels[offset],
			g = pixels[offset + 1],
			b = pixels[offset + 2];

		var v = ( (0.2126 * r) + (0.7152 * g) + (0.0722 * b) ) >= threshold ? 255 : 0;

		pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = v;

	}

}

/*
	Convolution Filters
	@param: imageData,[weights,...]
	
	@notes: 2D data change , so here we need imageData , not pixels for 1D
*/
utils.filters.convolute = function(imageData,weights) {
	var side = Math.round(Math.sqrt(weights.length));	// mask width
	var halfSide = Math.floor(side/2);					// half mask width
	var pixels	= imageData.data;		// src pixels
	var sw		= imageData.width;	// src width
	var sh 		= imageData.height; // src height
	// pad output by the convolution matrix
	var w 		= sw;
	var h 		= sh;
	
	// Σ(weight) = 1 , to keep brightness
	var weights_length 	= weights.length;
	var weights_sum 	= utils.Math.SUM(weights);

	for (var i = weights.length - 1; i >= 0; i--) {
		weights[i] /= weights_sum;
	};
	
	var dst = new Uint8ClampedArray(pixels);	// 深copy

	// go through the image pixels
	for(var y=0; y<h; y++) {
		for(var x=0; x<w; x++) {
			var sy = y;		// side y
			var sx = x;
			var dstOffset = (y*w+x)*4;		// output
			//
			var r = 0, g = 0, b = 0;
			for (var cy=0;cy<side;cy++) {		// mask metrix
				for(var cx=0; cx<side; cx++) {
					var scy = sy + cy - halfSide;
					var scx = sx + cx - halfSide;
					if(scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
						var offset 	= (scy * sw + scx) * 4;
						var wt 		= weights[cy*side + cx]; 
						r += pixels[offset] 	* wt;
						g += pixels[offset + 1]	* wt;
						b += pixels[offset + 2]	* wt;
					}
				}
			}
			dst[dstOffset]		= r;
			dst[dstOffset + 1]  = g;
			dst[dstOffset + 2]  = b;
		}
	}
	pixels.set(dst);	// update dataImage.data 
	return pixels;
}