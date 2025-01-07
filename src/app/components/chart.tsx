// "use client";
// import React, { useEffect, useRef } from "react";
// import { Chart } from "chart.js/auto";

// const ComboChart = () => {
// 	const chartRef = useRef(null); // Reference to the canvas element

// 	useEffect(() => {
// 		const ctx = chartRef.current.getContext("2d"); // Get canvas context

// 		// Create a Chart.js instance
// 		const comboChart = new Chart(ctx, {
// 			type: "bar", // Default type for the chart
// 			data: {
// 				labels: ["Exploration", "Scouting", "Engagement", "Planning", "Piloting", "Assessment"], // X-axis labels
// 				datasets: [
// 					{
// 						type: "bar", // Bar dataset
// 						label: "Bar Dataset",
// 						data: [65, 59, 80, 81, 56, 55],
// 						backgroundColor: "rgba(75, 192, 192, 0.5)", // Bar color
// 						borderColor: "rgba(75, 192, 192, 1)", // Border color
// 						borderWidth: 1,
// 					},
// 					{
// 						type: "line", // Line dataset
// 						label: "Line Dataset",
// 						data: [35, 49, 60, 71, 46, 75],
// 						borderColor: "rgba(255, 99, 132, 1)", // Line color
// 						backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill under the line
// 						borderWidth: 2,
// 						tension: 0.4, // Smooth line
// 					},
// 				],
// 			},
// 			options: {
// 				responsive: true,
// 				plugins: {
// 					legend: {
// 						position: "top", // Legend position
// 					},
// 					title: {
// 						display: true,
// 						text: "Technologies & Pilots Overview", // Chart title
// 					},
// 				},
// 				scales: {
// 					y: {
// 						beginAtZero: true, // Start Y-axis from 0
// 					},
// 				},
// 			},
// 		});

// 		return () => {
// 			comboChart.destroy();
// 		};
// 	}, []);

// 	return (
// 		<div className="h-[275px]">
// 			<canvas ref={chartRef} />
// 		</div>
// 	); // Render the canvas element
// };

// export default ComboChart;

import React from "react";

function ComboChart() {
	return <div>chart</div>;
}

export default ComboChart;
