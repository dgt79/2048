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
	insertNewRandomValue(grid);
		
	// second random cell
	insertNewRandomValue(grid);

	that.move = function(direction) {
		// console.log("moving " + direction);
		var stack = {};
		var previousGridState = "" + grid;

		switch (direction) {
			case "RIGHT":
				for (var j = 0; j < 4; j++) {
					stack = mergingStack();
					for (var i = 3; i >= 0; i--) {
						stack.push(grid[i][j]);
					}

					var v = stack.toVector().reverse();
					for (var i = 0; i < 4; i++) {
						grid[i][j] = v[i];
					}
				};
				break;
			case "LEFT":
				for (var j = 0; j < 4; j++) {
					stack = mergingStack();
					for (var i = 0; i < 4; i++) {
						stack.push(grid[i][j]);
					}

					var v = stack.toVector();
					for (var i = 0; i < 4; i++) {
						grid[i][j] = v[i];
					}
				};
				break;
			case "UP":
				for (var i = 0; i < 4; i++) {
					stack = mergingStack();
					for (var j = 0; j < 4; j++) {
						stack.push(grid[i][j]);
					}
					grid[i] = stack.toVector();
				}
				break;
			case "DOWN":
				for (var i = 0; i < 4; i++) {
					stack = mergingStack();
					for (var j = 3; j >= 0; j--) {
						stack.push(grid[i][j]);
					}
					grid[i] = stack.toVector().reverse();
				}
				break;
		}

		if (isFull(grid)) {
			console.log("GAME OVER!");
			document.getElementById("game_status").textContent = "GAME OVER!!!";
			return;
		} 

		if (previousGridState !== ("" + grid)) {
			insertNewRandomValue(grid);	
		} else {
			console.log("force user move");
		}
		
	};

	that.render = function() {
		for (i = 0; i < 4; i++) {
			for (j = 0; j < 4; j++) {
				var cell_id = "cell_" + i + "_" + j;				
				var cell = document.getElementById(cell_id);
				// console.log(cell_id + " = " + grid[i][j]);
				if (grid[i][j] !== 0) {
					cell.textContent = grid[i][j];	
				} else {
					cell.textContent = '';
				}
			}
		}
	};

	return that;
};