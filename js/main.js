var GAME = function(spec) {
	var that = {};
	var directions = {	87: "UP", 68: "RIGHT", 83: "DOWN", 65: "LEFT",
						38: "UP", 39: "RIGHT", 40: "DOWN", 37: "LEFT"};

	that.new = function() {
		var grid = GRID();
		grid.render();
		
		document.addEventListener("keydown", function(event) {
			// console.log("ev" + event.which);
			var direction = directions[event.which];
			if (direction !== undefined) {
				grid.move(direction);
				grid.render();	
			}
		});
	};



	return that;
};


GAME().new();
//window.requestAnimationFrame(draw);