_XX_GLOBAL = {};

window.onload = function() {

	var canvas = document.getElementById('canvas');

	// get mouse position
	var mouse  = utils.captureMouse(canvas);

	canvas.addEventListener('mousedown',function() {
		console.log("x: " + mouse.x + ", y: " + mouse.y);
	},false);

	//	v 0.0.2
	// test color utils
	var color = "#fff520";
	var color16 = 0xFFF520;

	//console.log(utils.parseColor(color));			// #fff520 
	//console.log(utils.parseColor(color,true));		// 16774432
	//console.log(utils.colorToRGB(color)) ;			// rgb(255,245,32) 

	//console.log(utils.parseColor(color16));			// #fff520 
	//console.log(utils.parseColor(color16,true));	// 16774432
	//console.log(utils.colorToRGB(color16)) ;		// rgb(255,245,32) 

	//	v 0.0.3
	//	test revserse RGB
	var context = canvas.getContext('2d');
	context.fillStyle="#fff520";
	context.fillRect(0,0,canvas.width,canvas.height);	

	var imageData = context.getImageData(0,0,canvas.width,canvas.height);
	var pixels    = imageData.data;

	var reverseRGBButton = document.getElementById('reverseRGB');
	reverseRGBButton.addEventListener('mousedown',function() {		
		utils.filters.reverseRGB(pixels);
		context.putImageData(imageData,0,0);
	});

	// v 0.0.3.1 
	// Grayscale 
	var grayscaleBtn = document.getElementById('grayscaleBtn');
	grayscaleBtn.addEventListener('mousedown',function() {	
		utils.filters.grayScale(pixels);
		context.putImageData(imageData,0,0);
	})		

	// v 0.0.3.2 
	// FillColor	
	var fillColorBtn = document.getElementById('fillColorBtn');	
	var colorInput   = document.getElementById('colorInput');
	fillColorBtn.addEventListener('mousedown',function() {
		var color = utils.parseColor(colorInput.value);
		context.fillStyle=color;
		context.fillRect(0,0,canvas.width,canvas.height);
	});

	/* v 0.0.3.3 flash */
	_XX_GLOBAL.enableGaoNeng = window.confirm("前方高能！是否继续?");
	var disableGaoNeng = document.getElementById("disableGaoNeng");
	disableGaoNeng.addEventListener('mousedown',function() {
		_XX_GLOBAL.enableGaoNeng = false;
	})

	var drawFrame ;	// in order to avoid Window Error #issue is it ok?
	(function drawFrame() {
		if(_XX_GLOBAL.enableGaoNeng === true)
		{
			window.requestAnimationFrame(drawFrame,canvas);	
		}

		// draw some stripes: red,green and blue
		for (var i = 0; i < canvas.width; i += 10) {
			for (var j = 0; j< canvas.height; j+= 10) {
				context.fillStyle = (i % 20 === 0) ? "#f00" : ( (i % 30 === 0) ? "#0f0" : "00f");
				context.fillRect(i,j,10,10);
			}
		}
	
		// pixels iteration
		for (var y = 0; y < imageData.height; y += 1) {
			for (var x = 0; x < imageData.width; x += 1) {

				var dx 		= x - mouse.x;
					dy 		= y - mouse.y;
					dist 	= Math.sqrt( dx * dx+ dy * dy),
					offset	= (x + y * imageData.width) * 4,
					r 		= pixels[offset],
					g 		= pixels[offset + 1],
					b 		= pixels[offset + 2];

				pixels[offset] 		= Math.cos(r * dist * 0.001) 	* 256;
				pixels[offset + 1]	= Math.sin(g * dist * 0.001) 	* 256;
				pixels[offset + 2]	= Math.cos(b * dist * 0.0005) 	* 256;

			}
		}
		context.putImageData(imageData,0,0);
	}());

	/* v 0.0.3.4 draw image using canvas */
	var image = new Image();
	var drawImageBtn 	= document.getElementById("drawImageBtn");
	var drawImageInput 	= document.getElementById('drawImageInput');
	utils.bind(drawImageBtn,'mousedown',function() {		
		image.crossOrigin = 'Anonymous';		
			
		image.onload = function() {			
			context.drawImage(image,0,0,canvas.width,canvas.height);
			/* 	v 0.0.3.6 CORS Image #ISSUE#
				CORS_Enabled_Image 
				https://developer.mozilla.org/en-US/docs/HTML/CORS_Enabled_Image	
			*/	
			localStorage.setItem( "savedImageData", canvas.toDataURL("image/png") );
			/* v 0.0.3.5 apply simply filter on LOCAL canvas image */
			imageData = context.getImageData(0,0,canvas.width,canvas.height); 
			pixels    = imageData.data;
		}

		image.src = drawImageInput.value;
		
		// make sure the load event fires for cached images too
		if ( image.complete || image.complete === undefined ) {
		    image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		    image.src = drawImageInput.value;
		}	
	});

	// load local image
	var loadLocalImageBtn = document.getElementById('loadLocalImageBtn');
	utils.bind(loadLocalImageBtn,'mousedown',function() {
		// Load local image
		drawImageInput.value = 'images/xiaobai.jpg';
		// trigger mousedown on drawImageInput
		utils.trigger(drawImageBtn,'mousedown');
	});
	
	// load Lenna image
	var loadLennaImageBtn = document.getElementById('loadLennaImageBtn') ;
	utils.bind(loadLennaImageBtn,'mousedown',function() {
		// Load local image
		drawImageInput.value = 'images/Lenna.png';
		// trigger mousedown on drawImageInput
		utils.trigger(drawImageBtn,'mousedown');
	});

	/*
		v 0.0.4 More Filter Functions
	*/

	// Ajusting Brightness
	var filter_brightnessBtn 	= document.getElementById('filter_brightnessBtn');
	var filter_brightnessInput 	= document.getElementById('filter_brightnessInput');
	utils.bind(filter_brightnessBtn,'mousedown',function() {
		var brightness = window.parseInt(filter_brightnessInput.value);
		utils.filters.brightness(pixels,brightness);
		context.putImageData(imageData,0,0);
	});

	// Grayscale Threshold Filter
	var filter_threshold_0_1Btn		= document.getElementById('filter_threshold_0_1Btn');
	var filter_threshold_0_1Input 	= document.getElementById('filter_threshold_0_1Input');
	utils.bind(filter_threshold_0_1Btn,'mousedown',function() {
		var threshold = window.parseInt(filter_threshold_0_1Input.value);
		utils.filters.threshold_0_1(pixels,threshold);
		context.putImageData(imageData,0,0);
	});

	/*
		v 0.0.4.1 	Convolving Filtering
	*/
	var filter_convolvingFilterBtn 		= document.getElementById('filter_convolvingFilterBtn');
	var filter_convolvingFilterInput	= document.getElementById('filter_convolvingFilterInput');
	utils.bind(filter_convolvingFilterBtn,'mousedown',function() {
		// to maintain the brightness of the image , the sum of the matrix values should be one		
		//var weights = [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9];		// soften
		var weights = filter_convolvingFilterInput.value.split(',').str2num();
		utils.filters.convolute(imageData,weights);
		context.putImageData(imageData,0,0);
	});

	var filter_convolvingSharpenBtn 	= document.getElementById('filter_convolvingSharpenBtn');
	utils.bind(filter_convolvingSharpenBtn,'mousedown',function() {
		var weights = [0,-1,0,-1,5,-1,0,-1,0];		// sharpen
		filter_convolvingFilterInput.value = weights;
		utils.filters.convolute(imageData,weights);
		context.putImageData(imageData,0,0);
	})

	var filter_convolvingBlurBtn 		= document.getElementById('filter_convolvingBlurBtn');
	utils.bind(filter_convolvingBlurBtn,'mousedown',function() {
		var weights = [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9];		// soften
		filter_convolvingFilterInput.value = weights;
		utils.filters.convolute(imageData,weights);
		context.putImageData(imageData,0,0);
	})

	/*
		v 0.0.5	Frequency Filter

		@Source: 	http://nklein.com/2009/09/fourier-transforms-in-javascript/
		@note: 		the Canvas Width & Height must be Power of 2
	*/

	var fftData;
	// FFT
	var FFTBtn = document.getElementById('FFTBtn');
	utils.bind( FFTBtn, 'mousedown', function() {
		fftData = FFT('canvas');
	});

	// IFFT
	var IFFTBtn = document.getElementById('IFFTBtn');
	utils.bind( IFFTBtn, 'mousedown', function() {
		IFFT( fftData,'canvas');
	});
};