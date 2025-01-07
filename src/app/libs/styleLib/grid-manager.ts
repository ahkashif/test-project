class GridManager {
	grid() {
		const grid = {
			large: {
				type: "grid",
				column: 12,
				padding: "40px",
				margin: "80px",
				minViewport: "1024px",
				maxViewport: "1499px",
			},
			"x-large": {
				type: "grid",
				column: 12,
				padding: "40px",
				margin: "0px",
				minViewport: "1500px",
			},
			medium: {
				type: "grid",
				column: 12,
				padding: "30px",
				margin: "40px",
				minViewport: "768px",
				maxViewport: "1023px",
			},
			small: {
				type: "grid",
				column: 2,
				padding: "20px",
				margin: "20px",
				minViewport: "320px",
				maxViewport: "767px",
			},
		};

		return grid;
	}
}

export const grid = new GridManager().grid();
