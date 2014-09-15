function mergingStack() {
	var that = {};
	var v = [0, 0, 0, 0];
	var head = 0;
	var merged = false;

	that.push = function(value) {
		// console.log("pushing value " + value);
		if (head < 4 && value !== 0) {
			if (v[head] === 0) {
				v[head] = value;
			} else if (v[head] === value && merged === false) {
				v[head] *= 2;
				merged = true;
			} else {
				head += 1;
				v[head] = value;
				merged = false;
			}
		}
		// console.log("head = " + head + ", stack = " + v);
	};

	that.toVector = function() {
		return v;
	};

	// that.pop = function() {
	// 	var value = v[head];
	// 	head -= 1;
	// 	return value;
	// }

	that.get = function(index) {
		return v[index];
	};

	return that;
};