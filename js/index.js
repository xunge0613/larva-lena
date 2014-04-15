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
	//	test clear RGB
	var context = canvas.getContext('2d');
	var clearRGBButton = document.getElementById('clearRGB');
	clearRGBButton.addEventListener('mousedown',function() {
		utils.clearRGB(context,0,0,canvas.width,canvas.height);
	})	

};