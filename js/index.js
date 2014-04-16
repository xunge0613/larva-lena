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
	var reverseRGBButton = document.getElementById('reverseRGB');
	reverseRGBButton.addEventListener('mousedown',function() {
		var imageData = context.getImageData(0,0,canvas.width,canvas.height);
		var pixels    = imageData.data;
		utils.reverseRGB(pixels);
		context.putImageData(imageData,0,0);
	});

	// v 0.0.3.1 
	// Grayscale 
	var grayscaleBtn = document.getElementById('grayscaleBtn');
	grayscaleBtn.addEventListener('mousedown',function() {
		var imageData = context.getImageData(0,0,canvas.width,canvas.height);
		var pixels    = imageData.data;
		utils.grayScale(pixels);
		context.putImageData(imageData,0,0);
	})		

};