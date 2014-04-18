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
	context.fillRect(0,0,315,315);	

	var imageData = context.getImageData(0,0,canvas.width,canvas.height);
	var pixels    = imageData.data;

	var reverseRGBButton = document.getElementById('reverseRGB');
	reverseRGBButton.addEventListener('mousedown',function() {		
		utils.reverseRGB(pixels);
		context.putImageData(imageData,0,0);
	});

	// v 0.0.3.1 
	// Grayscale 
	var grayscaleBtn = document.getElementById('grayscaleBtn');
	grayscaleBtn.addEventListener('mousedown',function() {	
		utils.grayScale(pixels);
		context.putImageData(imageData,0,0);
	})		

	// v 0.0.3.2 
	// FillColor	
	var fillColorBtn = document.getElementById('fillColorBtn');	
	var colorInput   = document.getElementById('colorInput');
	fillColorBtn.addEventListener('mousedown',function() {
		var color = utils.parseColor(colorInput.value);
		context.fillStyle=color;
		context.fillRect(0,0,315,315);
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
		image.crossOrigin = 'anonymous';		
		image.src = drawImageInput.value;	
		image.onload = function() {			
			context.drawImage(image,0,0);	
			/* v 0.0.3.5 apply simply filter on LOCAL canvas image */
			imageData = context.getImageData(0,0,canvas.width,canvas.height); 
			pixels    = imageData.data;
		}		
	});
	
};