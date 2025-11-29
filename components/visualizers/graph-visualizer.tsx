"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface GraphVisualizerProps {
	algorithm: string;
	isPlaying: boolean;
	speed: number;
	onComplete: () => void;
}

interface Cell {
	row: number;
	col: number;
	isWall: boolean;
	state: "default" | "start" | "end" | "visiting" | "visited" | "path";
	distance?: number;
}

export function GraphVisualizer({
	algorithm,
	isPlaying,
	speed,
	onComplete,
}: GraphVisualizerProps) {
	const [grid, setGrid] = useState<Cell[][]>([]);
	const [startPos, setStartPos] = useState<{ row: number; col: number }>({
		row: 0,
		col: 0,
	});
	const [endPos, setEndPos] = useState<{ row: number; col: number }>({
		row: 0,
		col: 0,
	});
	const [visitedCount, setVisitedCount] = useState(0);
	const [pathLength, setPathLength] = useState<number | null>(null);
	const [refreshKey, setRefreshKey] = useState(0);
	const animationRef = useRef<NodeJS.Timeout | null>(null);
	const stepsRef = useRef<
		Array<{ grid: Cell[][]; visited?: boolean; pathLength?: number }>
	>([]);
	const currentStepRef = useRef(0);

	useEffect(() => {
		const { grid: newGrid, start, end } = generateMaze();
		setGrid(newGrid);
		setStartPos(start);
		setEndPos(end);
		setVisitedCount(0);
		setPathLength(null);
		currentStepRef.current = 0;

		// Generate steps based on algorithm
		stepsRef.current = generateMazeSteps(newGrid, start, end, algorithm);
	}, [algorithm, refreshKey]);

	// Animation loop
	useEffect(() => {
		if (isPlaying && currentStepRef.current < stepsRef.current.length) {
			// Speed 1 = 200ms delay, Speed 100 = 10ms delay
			const delay = Math.max(10, 200 - speed * 1.9);

			animationRef.current = setInterval(() => {
				const step = stepsRef.current[currentStepRef.current];
				setGrid(step.grid);

				if (step.visited) {
					setVisitedCount((prev) => prev + 1);
				}
				if (step.pathLength !== undefined) {
					setPathLength(step.pathLength);
				}

				currentStepRef.current++;

				if (currentStepRef.current >= stepsRef.current.length) {
					if (animationRef.current) {
						clearInterval(animationRef.current);
					}
					onComplete();
				}
			}, delay);
		} else {
			if (animationRef.current) {
				clearInterval(animationRef.current);
			}
		}

		return () => {
			if (animationRef.current) {
				clearInterval(animationRef.current);
			}
		};
	}, [isPlaying, onComplete, speed]);

	const handleRefresh = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<div className="w-full space-y-4 sm:space-y-6">
			<div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 flex-wrap px-2">
				<Badge
					variant="secondary"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					Cells Visited: {visitedCount}
				</Badge>
				{pathLength !== null && (
					<Badge
						variant="default"
						className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
					>
						Path Length: {pathLength}
					</Badge>
				)}
				<Button
					variant="outline"
					size="sm"
					onClick={handleRefresh}
					className="gap-1.5 sm:gap-2 bg-transparent text-xs sm:text-sm h-8 sm:h-9 touch-manipulation"
				>
					<RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
					New Maze
				</Button>
			</div>

			<div className="flex justify-center overflow-x-auto px-2">
				<div className="inline-grid gap-[px] sm:gap-[2px] bg-border p-1 rounded-lg">
					{grid.map((row, rowIndex) => (
						<div
							key={rowIndex}
							className="flex gap-[px] sm:gap-[2px]"
						>
							{row.map((cell, colIndex) => (
								<div
									key={`${rowIndex}-${colIndex}`}
									className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-all duration-200 rounded-sm"
									style={{
										backgroundColor: cell.isWall
											? "#1e293b" // Professional dark slate for walls
											: cell.state === "start"
											? "#10b981" // Professional green for start
											: cell.state === "end"
											? "#ef4444" // Professional red for end
											: cell.state === "visiting"
											? "#3b82f6" // Professional blue for visiting
											: cell.state === "visited"
											? "#60a5fa" // Professional light blue for visited
											: cell.state === "path"
											? "#fbbf24" // Professional yellow for path
											: "#f1f5f9", // Professional light gray for empty
										transform:
											cell.state === "visiting"
												? "scale(1.15)"
												: "scale(1)",
										boxShadow:
											cell.state === "start" ||
											cell.state === "end"
												? "0 0 12px rgba(0,0,0,0.3)"
												: cell.state === "path"
												? "0 0 8px rgba(251, 191, 36, 0.5)"
												: "none",
									}}
									title={`(${rowIndex}, ${colIndex})`}
								/>
							))}
						</div>
					))}
				</div>
			</div>

			<div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-[10px] sm:text-xs flex-wrap px-2">
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#10b981" }}
					/>
					<span>Start</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#ef4444" }}
					/>
					<span>Destination</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#1e293b" }}
					/>
					<span>Wall</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#3b82f6" }}
					/>
					<span>Visiting</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#60a5fa" }}
					/>
					<span>Visited</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#fbbf24" }}
					/>
					<span>Path</span>
				</div>
			</div>
		</div>
	);
}

function generateMaze(): {
	grid: Cell[][];
	start: { row: number; col: number };
	end: { row: number; col: number };
} {
	const rows = 15;
	const cols = 25;
	const grid: Cell[][] = [];

	// Initialize grid
	for (let row = 0; row < rows; row++) {
		grid[row] = [];
		for (let col = 0; col < cols; col++) {
			// Create random walls (30% chance)
			const isWall = Math.random() < 0.3;
			grid[row][col] = {
				row,
				col,
				isWall,
				state: "default",
			};
		}
	}

	// Set random start position (left side)
	const startRow = Math.floor(Math.random() * rows);
	const startCol = 0;
	grid[startRow][startCol] = {
		row: startRow,
		col: startCol,
		isWall: false,
		state: "start",
	};

	// Set random end position (right side)
	const endRow = Math.floor(Math.random() * rows);
	const endCol = cols - 1;
	grid[endRow][endCol] = {
		row: endRow,
		col: endCol,
		isWall: false,
		state: "end",
	};

	return {
		grid,
		start: { row: startRow, col: startCol },
		end: { row: endRow, col: endCol },
	};
}

function generateMazeSteps(
	initialGrid: Cell[][],
	start: { row: number; col: number },
	end: { row: number; col: number },
	algorithm: string
): Array<{ grid: Cell[][]; visited?: boolean; pathLength?: number }> {
	const steps: Array<{
		grid: Cell[][];
		visited?: boolean;
		pathLength?: number;
	}> = [];
	const grid = initialGrid.map((row) => row.map((cell) => ({ ...cell })));

	const addStep = (visited = false, pathLength?: number) => {
		steps.push({
			grid: grid.map((row) => row.map((cell) => ({ ...cell }))),
			visited,
			pathLength,
		});
	};

	const resetStates = () => {
		grid.forEach((row) => {
			row.forEach((cell) => {
				if (
					cell.state !== "start" &&
					cell.state !== "end" &&
					cell.state !== "visited" &&
					cell.state !== "path"
				) {
					cell.state = "default";
				}
			});
		});
	};

	const directions = [
		[-1, 0], // up
		[1, 0], // down
		[0, -1], // left
		[0, 1], // right
	];

	const getNeighbors = (
		row: number,
		col: number
	): Array<{ row: number; col: number }> => {
		const neighbors: Array<{ row: number; col: number }> = [];
		for (const [dr, dc] of directions) {
			const newRow = row + dr;
			const newCol = col + dc;
			if (
				newRow >= 0 &&
				newRow < grid.length &&
				newCol >= 0 &&
				newCol < grid[0].length &&
				!grid[newRow][newCol].isWall
			) {
				neighbors.push({ row: newRow, col: newCol });
			}
		}
		return neighbors;
	};

	switch (algorithm) {
		case "Depth First Search (DFS)":
			mazeDFS(grid, start, end, getNeighbors, addStep, resetStates);
			break;
		case "Breadth First Search (BFS)":
			mazeBFS(grid, start, end, getNeighbors, addStep, resetStates);
			break;
		case "Dijkstra's Algorithm":
		case "A* Search":
		case "Uniform Cost Search":
			mazeDijkstra(grid, start, end, getNeighbors, addStep, resetStates);
			break;
	}

	return steps;
}

// DFS for maze
function mazeDFS(
	grid: Cell[][],
	start: { row: number; col: number },
	end: { row: number; col: number },
	getNeighbors: (
		row: number,
		col: number
	) => Array<{ row: number; col: number }>,
	addStep: (visited?: boolean, pathLength?: number) => void,
	resetStates: () => void
) {
	const visited = new Set<string>();
	const parent = new Map<string, { row: number; col: number } | null>();
	let found = false;

	function dfsVisit(row: number, col: number): boolean {
		const key = `${row},${col}`;
		if (visited.has(key)) return false;

		visited.add(key);
		const cell = grid[row][col];

		if (cell.state !== "start" && cell.state !== "end") {
			resetStates();
			cell.state = "visiting";
			addStep(true);

			cell.state = "visited";
			addStep();
		}

		if (row === end.row && col === end.col) {
			return true;
		}

		for (const neighbor of getNeighbors(row, col)) {
			const neighborKey = `${neighbor.row},${neighbor.col}`;
			if (!visited.has(neighborKey)) {
				parent.set(neighborKey, { row, col });
				if (dfsVisit(neighbor.row, neighbor.col)) {
					return true;
				}
			}
		}

		return false;
	}

	found = dfsVisit(start.row, start.col);

	if (found) {
		reconstructPath(grid, start, end, parent, addStep);
	}
}

// BFS for maze
function mazeBFS(
	grid: Cell[][],
	start: { row: number; col: number },
	end: { row: number; col: number },
	getNeighbors: (
		row: number,
		col: number
	) => Array<{ row: number; col: number }>,
	addStep: (visited?: boolean, pathLength?: number) => void,
	resetStates: () => void
) {
	const visited = new Set<string>();
	const parent = new Map<string, { row: number; col: number } | null>();
	const queue: Array<{ row: number; col: number }> = [start];
	visited.add(`${start.row},${start.col}`);
	parent.set(`${start.row},${start.col}`, null);

	while (queue.length > 0) {
		const { row, col } = queue.shift()!;
		const cell = grid[row][col];

		if (cell.state !== "start" && cell.state !== "end") {
			resetStates();
			cell.state = "visiting";
			addStep(true);

			cell.state = "visited";
			addStep();
		}

		if (row === end.row && col === end.col) {
			reconstructPath(grid, start, end, parent, addStep);
			return;
		}

		for (const neighbor of getNeighbors(row, col)) {
			const neighborKey = `${neighbor.row},${neighbor.col}`;
			if (!visited.has(neighborKey)) {
				visited.add(neighborKey);
				parent.set(neighborKey, { row, col });
				queue.push(neighbor);

				const neighborCell = grid[neighbor.row][neighbor.col];
				if (
					neighborCell.state !== "start" &&
					neighborCell.state !== "end"
				) {
					neighborCell.state = "visiting";
				}
			}
		}
	}
}

// Dijkstra for maze
function mazeDijkstra(
	grid: Cell[][],
	start: { row: number; col: number },
	end: { row: number; col: number },
	getNeighbors: (
		row: number,
		col: number
	) => Array<{ row: number; col: number }>,
	addStep: (visited?: boolean, pathLength?: number) => void,
	resetStates: () => void
) {
	const distances = new Map<string, number>();
	const parent = new Map<string, { row: number; col: number } | null>();
	const visited = new Set<string>();
	const pq: Array<{ row: number; col: number; distance: number }> = [];

	// Initialize
	grid.forEach((row) => {
		row.forEach((cell) => {
			distances.set(`${cell.row},${cell.col}`, Number.POSITIVE_INFINITY);
		});
	});

	const startKey = `${start.row},${start.col}`;
	distances.set(startKey, 0);
	parent.set(startKey, null);
	pq.push({ row: start.row, col: start.col, distance: 0 });

	while (pq.length > 0) {
		pq.sort((a, b) => a.distance - b.distance);
		const { row, col, distance } = pq.shift()!;
		const key = `${row},${col}`;

		if (visited.has(key)) continue;
		visited.add(key);

		const cell = grid[row][col];
		if (cell.state !== "start" && cell.state !== "end") {
			resetStates();
			cell.state = "visiting";
			addStep(true);

			cell.state = "visited";
			addStep();
		}

		if (row === end.row && col === end.col) {
			reconstructPath(grid, start, end, parent, addStep);
			return;
		}

		for (const neighbor of getNeighbors(row, col)) {
			const neighborKey = `${neighbor.row},${neighbor.col}`;
			const newDistance = distance + 1;

			if (
				newDistance <
				(distances.get(neighborKey) || Number.POSITIVE_INFINITY)
			) {
				distances.set(neighborKey, newDistance);
				parent.set(neighborKey, { row, col });
				pq.push({
					row: neighbor.row,
					col: neighbor.col,
					distance: newDistance,
				});
			}
		}
	}
}

// Reconstruct path
function reconstructPath(
	grid: Cell[][],
	start: { row: number; col: number },
	end: { row: number; col: number },
	parent: Map<string, { row: number; col: number } | null>,
	addStep: (visited?: boolean, pathLength?: number) => void
) {
	const path: Array<{ row: number; col: number }> = [];
	let current: { row: number; col: number } | null = end;

	while (current) {
		path.unshift(current);
		const key = `${current.row},${current.col}`;
		current = parent.get(key) || null;
	}

	// Highlight path
	for (const pos of path) {
		const cell = grid[pos.row][pos.col];
		if (cell.state !== "start" && cell.state !== "end") {
			cell.state = "path";
		}
	}

	addStep(false, path.length - 1);
}