var GRID = function(spec) {
	var that = {};
	var grid = [
			[0, 0, 0, 0], 
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];

// random will be used to init the starting two cells
	var random = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	var isFull = function(matrix) {
		for (i = 0; i < 4; i++) {
			for (j = 0; j < 4; j++) {
				if (matrix[i][j] === 0) {
					return false;	
				}
			}
		}
		return true;
	};

	var insertNewRandomValue = function (matrix) {		
		console.log("inserting new random value...");

		if (isFull(matrix)) {
			console.log("cannot insert new random value as matrix is already full");
			return;
		}

		var x = random(0, 3);
		var y = random(0, 3);
// 		make sure random cell is empty
		if(matrix[x][y] !== 0) {
			insertNewRandomValue(matrix);

		} else {
			matrix[x][y] = random(0, 1) === 0 ? 2 : 4;		
		}
	}

	// first random cell
	//insertNewRandomValue();
		
	// second random cell
	//insertNewRandomValue();

	that.move = function(direction) {
		console.log("moving " + direction);
		insertNewRandomValue(grid);
	};

	that.render = function() {
		for (i = 0; i < 4; i++) {
			for (j = 0; j < 4; j++) {
				var cell_id = "cell_" + i + "_" + j;				
				var cell = document.getElementById(cell_id);
				// console.log(cell_id + " = " + grid[i][j]);
				if (grid[i][j] !== 0) {
					cell.textContent = grid[i][j];	
				}
			}
		}
	};

	return that;
};

var GAME = function(spec) {
	var that = {};
	var directions = {	87: "UP", 68: "RIGHT", 83: "DOWN", 65: "LEFT",
						38: "UP", 39: "RIGHT", 40: "DOWN", 37: "LEFT"};

	that.new = function() {
		var grid = GRID();
		grid.render();
		
		document.addEventListener("keydown", function(event) {
			console.log("ev" + event.which);
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