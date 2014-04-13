window.onload = function() {

	var canvas = document.getElementById('canvas');

	// get mouse position
	var mouse  = utils.captureMouse(canvas);

	// get first touch position
	var touch = utils.captureTouch(canvas);
	
	canvas.addEventListener('mousedown',function() {
		console.log("x: " + mouse.x + ", y: " + mouse.y);
	},false);

	//canvas.addEventListener('touchmove',function(){ 
		if(touch.isPressed) {
			console.log("touch.x: " + touch.x + ",touch.y: " + touch.y);
		}
	//},false);
	
};