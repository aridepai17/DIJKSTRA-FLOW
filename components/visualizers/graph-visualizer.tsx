"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VisualizerProps } from "@/lib/types";
import { RotateCcw } from "lucide-react";

// =========================================
// TYPES: SHARED & SPECIFIC
// =========================================

// --- Graph (Node-Link) Types ---
interface GraphNode {
	id: number;
	x: number;
	y: number;
	state: "default" | "current" | "visited" | "path" | "start" | "end";
	distance: number;
	previous?: number;
}

interface GraphEdge {
	from: number;
	to: number;
	weight: number;
	state: "default" | "current" | "path";
}

interface GraphStep {
	type: "graph";
	nodes: GraphNode[];
	edges: GraphEdge[];
	computations: number;
	queueSize: number;
}

// --- Maze (Grid) Types ---
interface Cell {
	row: number;
	col: number;
	isWall: boolean;
	state: "default" | "start" | "end" | "visiting" | "visited" | "path";
	distance?: number;
}

interface MazeStep {
	type: "maze";
	grid: Cell[][];
	visitedCount: number;
	pathLength: number | null;
}

type VisualizationStep = GraphStep | MazeStep;

export function GraphVisualizer({
	algorithm,
	isPlaying,
	speed,
	onComplete,
	currentStep,
	setCurrentStep,
	setMaxSteps,
	customData,
}: VisualizerProps) {
	// --- State for Graph Mode ---
	const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
	const [graphEdges, setGraphEdges] = useState<GraphEdge[]>([]);
	const [computations, setComputations] = useState(0);
	const [queueSize, setQueueSize] = useState(0);

	// --- State for Maze Mode ---
	const [grid, setGrid] = useState<Cell[][]>([]);
	const [visitedCount, setVisitedCount] = useState(0);
	const [pathLength, setPathLength] = useState<number | null>(null);

	// --- Shared State ---
	const [resetKey, setResetKey] = useState(0);
	const stepsRef = useRef<VisualizationStep[]>([]);
	const animationRef = useRef<NodeJS.Timeout | null>(null);
	const currentStepRef = useRef(currentStep);
	const setMaxStepsRef = useRef(setMaxSteps);
	const setCurrentStepRef = useRef(setCurrentStep);

	// Determine Mode
	const isMazeMode = algorithm.includes("DFS") || algorithm.includes("BFS");

	useEffect(() => {
		currentStepRef.current = currentStep;
		setMaxStepsRef.current = setMaxSteps;
		setCurrentStepRef.current = setCurrentStep;
	}, [currentStep, setMaxSteps, setCurrentStep]);

	useEffect(() => {
		const initialize = () => {
			if (isMazeMode) {
				// Initialize Maze
				const { grid: newGrid, start, end } = generateMaze();
				stepsRef.current = generateMazeSteps(
					newGrid,
					start,
					end,
					algorithm
				);

				if (stepsRef.current.length > 0) {
					const firstStep = stepsRef.current[0] as MazeStep;
					setGrid(firstStep.grid);
					setVisitedCount(firstStep.visitedCount);
					setPathLength(firstStep.pathLength);
				}
			} else {
				// Initialize Graph
				const numNodes = 12;
				const isWeighted = true; // All non-maze algos here (Dijkstra/A*/UCS) are weighted

				const defaultGraph = generateRandomGraph(numNodes, isWeighted);
				const initialNodes = initializeNodes(
					defaultGraph.nodes,
					isWeighted
				);

				stepsRef.current = generateGraphSteps(
					initialNodes,
					defaultGraph.edges,
					algorithm
				);

				if (stepsRef.current.length > 0) {
					const firstStep = stepsRef.current[0] as GraphStep;
					setGraphNodes(firstStep.nodes);
					setGraphEdges(firstStep.edges);
					setComputations(firstStep.computations);
					setQueueSize(firstStep.queueSize);
				}
			}

			setCurrentStep(0);
			setMaxSteps(Math.max(0, stepsRef.current.length - 1));
		};
		initialize();
	}, [algorithm, customData, resetKey, isMazeMode]);

	useEffect(() => {
		if (isPlaying && currentStepRef.current < stepsRef.current.length - 1) {
			const delay = isMazeMode
				? Math.max(10, 200 - speed * 1.9) // Faster for maze
				: Math.max(50, 400 - speed * 3.5); // Slower for graph

			animationRef.current = setTimeout(() => {
				setCurrentStepRef.current(currentStepRef.current + 1);
			}, delay);
		} else if (
			isPlaying &&
			currentStepRef.current >= stepsRef.current.length - 1
		) {
			onComplete();
		}

		return () => {
			if (animationRef.current) clearTimeout(animationRef.current);
		};
	}, [isPlaying, currentStep, speed, onComplete, isMazeMode]);

	useEffect(() => {
		if (currentStep >= 0 && currentStep < stepsRef.current.length) {
			const step = stepsRef.current[currentStep];
			if (step.type === "maze") {
				setGrid(step.grid);
				setVisitedCount(step.visitedCount);
				setPathLength(step.pathLength);
			} else {
				setGraphNodes(step.nodes);
				setGraphEdges(step.edges);
				setComputations(step.computations);
				setQueueSize(step.queueSize);
			}
		}
	}, [currentStep]);

	const handleReset = () => {
		setResetKey((prev) => prev + 1);
	};

	// --- RENDER: MAZE MODE ---
	if (isMazeMode) {
		return (
			<div className="w-full space-y-4 sm:space-y-6">
				<div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 flex-wrap px-2">
					<Badge variant="secondary">
						Cells Visited: {visitedCount}
					</Badge>
					{pathLength !== null && (
						<Badge variant="default">
							Path Length: {pathLength}
						</Badge>
					)}
					<Button
						onClick={handleReset}
						variant="outline"
						size="sm"
						disabled={isPlaying}
					>
						<RotateCcw className="w-4 h-4 mr-2" /> New Maze
					</Button>
				</div>

				<div className="flex justify-center overflow-x-auto px-2">
					<div className="inline-grid gap-px bg-border p-1 rounded-lg">
						{grid.map((row, rowIndex) => (
							<div key={rowIndex} className="flex gap-px">
								{row.map((cell, colIndex) => (
									<div
										key={`${rowIndex}-${colIndex}`}
										className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-all duration-100 rounded-sm"
										style={{
											backgroundColor: cell.isWall
												? "#1e293b"
												: cell.state === "start"
												? "#10b981"
												: cell.state === "end"
												? "#ef4444"
												: cell.state === "path"
												? "#fbbf24"
												: cell.state === "visited"
												? "#60a5fa"
												: cell.state === "visiting"
												? "#3b82f6"
												: "#f1f5f9",
											transform:
												cell.state === "visiting"
													? "scale(1.15)"
													: "scale(1)",
										}}
										title={`(${rowIndex}, ${colIndex})`}
									/>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	// --- RENDER: GRAPH MODE ---
	const endNode = graphNodes.find(
		(n) =>
			n.state === "end" ||
			(n.state === "path" && n.id === graphNodes.length - 1)
	);
	const displayDist =
		endNode?.distance === Number.MAX_SAFE_INTEGER ? "∞" : endNode?.distance;
	
	// Calculate total cost of the path (sum of edge weights in path)
	const totalCost = graphEdges
		.filter((edge) => edge.state === "path")
		.reduce((sum, edge) => sum + edge.weight, 0);
	const displayTotalCost = totalCost > 0 ? totalCost : "—";

	return (
		<div className="w-full h-full flex flex-col items-center justify-center space-y-6">
			<div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
				<Badge variant="secondary">Computations: {computations}</Badge>
				<Badge variant="secondary">Queue Size: {queueSize}</Badge>
				<Badge variant="default">Distance: {displayDist}</Badge>
				<Badge variant="default">Total Cost: {displayTotalCost}</Badge>
				<Button
					onClick={handleReset}
					variant="outline"
					size="sm"
					disabled={isPlaying}
				>
					<RotateCcw className="w-4 h-4 mr-2" /> Randomize
				</Button>
			</div>

			<div className="relative w-full h-[500px] border border-border rounded-xl bg-card overflow-hidden shadow-inner">
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 800 500"
					preserveAspectRatio="xMidYMid meet"
				>
					<defs>
						{/* Marker for directed graphs if needed, keeping for potential future use */}
						<marker
							id="arrowhead"
							markerWidth="10"
							markerHeight="7"
							refX="28"
							refY="3.5"
							orient="auto"
						>
							<polygon
								points="0 0, 10 3.5, 0 7"
								fill="var(--color-muted-foreground)"
							/>
						</marker>
					</defs>

					{/* Edges */}
					{graphEdges.map((edge, index) => {
						const fromNode = graphNodes.find(
							(n) => n.id === edge.from
						);
						const toNode = graphNodes.find((n) => n.id === edge.to);
						if (!fromNode || !toNode) return null;

						const color =
							edge.state === "path"
								? "var(--color-chart-3)"
								: edge.state === "current"
								? "var(--color-primary)"
								: "var(--color-muted-foreground)";
						const strokeWidth =
							edge.state === "current" || edge.state === "path"
								? 4
								: 2;
						const opacity = edge.state === "default" ? 0.3 : 1; // Lower opacity for non-active edges to reduce visual noise

						// Calculate midpoint for text label
						const midX = (fromNode.x + toNode.x) / 2;
						const midY = (fromNode.y + toNode.y) / 2;

						return (
							<g key={index}>
								<line
									x1={fromNode.x}
									y1={fromNode.y}
									x2={toNode.x}
									y2={toNode.y}
									stroke={color}
									strokeWidth={strokeWidth}
									opacity={opacity}
									className="transition-all duration-300"
								/>
								{/* Weight Label Background (Pill) */}
								{edge.weight > 1 && (
									<rect
										x={midX - 10}
										y={midY - 8}
										width="20"
										height="16"
										rx="4"
										fill="var(--color-card)"
										stroke="var(--color-border)"
										strokeWidth="1"
										className="transition-all duration-300"
									/>
								)}
								{/* Weight Label Text */}
								{edge.weight > 1 && (
									<text
										x={midX}
										y={midY + 4} // Slight vertical adjust for centering
										fill="var(--color-foreground)"
										fontSize="11"
										textAnchor="middle"
										fontWeight="bold"
										className="transition-all duration-300 select-none pointer-events-none"
									>
										{edge.weight}
									</text>
								)}
							</g>
						);
					})}

					{/* Nodes */}
					{graphNodes.map((node) => {
						const color =
							node.state === "path"
								? "var(--color-chart-3)"
								: node.state === "current"
								? "var(--color-primary)"
								: node.state === "visited"
								? "var(--color-accent)"
								: node.state === "start"
								? "var(--color-chart-1)"
								: node.state === "end"
								? "var(--color-destructive)"
								: "var(--color-secondary)";

						const strokeColor =
							node.state === "current"
								? "var(--color-primary)"
								: "var(--color-background)";
						const radius = node.state === "current" ? 22 : 18;

						return (
							<g
								key={node.id}
								className="transition-all duration-300"
							>
								{/* Node Circle */}
								<circle
									cx={node.x}
									cy={node.y}
									r={radius}
									fill={color}
									stroke={strokeColor}
									strokeWidth={3}
									className="transition-all duration-300 shadow-lg"
								/>
								{/* Node ID */}
								<text
									x={node.x}
									y={node.y + 5}
									fill="white"
									textAnchor="middle"
									fontWeight="bold"
									fontSize="14"
									className="select-none pointer-events-none"
								>
									{node.id}
								</text>

								{/* Distance Label (Floating below node) */}
								{(algorithm.includes("Dijkstra") ||
									algorithm.includes("A*") ||
									algorithm.includes("Uniform")) && (
									<g>
										<rect
											x={node.x - 16}
											y={node.y + 26}
											width="32"
											height="16"
											rx="4"
											fill="var(--color-card)"
											stroke="var(--color-border)"
											strokeWidth="1"
											opacity="0.9"
										/>
										<text
											x={node.x}
											y={node.y + 38}
											fill="var(--color-muted-foreground)"
											fontSize="10"
											textAnchor="middle"
											fontWeight="bold"
											className="select-none pointer-events-none"
										>
											{node.distance ===
											Number.MAX_SAFE_INTEGER
												? "∞"
												: node.distance}
										</text>
									</g>
								)}
							</g>
						);
					})}
				</svg>
			</div>
		</div>
	);
}

// =========================================
// MAZE GENERATION LOGIC (DFS/BFS)
// =========================================

function generateMaze(): {
	grid: Cell[][];
	start: { row: number; col: number };
	end: { row: number; col: number };
} {
	const rows = 15;
	const cols = 25;
	const grid: Cell[][] = [];

	for (let row = 0; row < rows; row++) {
		grid[row] = [];
		for (let col = 0; col < cols; col++) {
			const isWall = Math.random() < 0.3;
			grid[row][col] = {
				row,
				col,
				isWall,
				state: "default",
			};
		}
	}

	const startRow = Math.floor(Math.random() * rows);
	const startCol = 0;
	grid[startRow][startCol] = {
		row: startRow,
		col: startCol,
		isWall: false,
		state: "start",
	};

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
): MazeStep[] {
	const steps: MazeStep[] = [];
	const grid = initialGrid.map((row) => row.map((cell) => ({ ...cell })));
	let visitedCount = 0;

	const addStep = (visited = false, pathLength: number | null = null) => {
		if (visited) visitedCount++;
		steps.push({
			type: "maze",
			grid: grid.map((row) => row.map((cell) => ({ ...cell }))),
			visitedCount,
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

	const getNeighbors = (row: number, col: number) => {
		const neighbors = [];
		const directions = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		];
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

	const reconstructMazePath = (
		parentMap: Map<string, { row: number; col: number } | null>
	) => {
		let curr: { row: number; col: number } | null | undefined = end;
		let pathLen = 0;
		while (curr) {
			const key = `${curr.row},${curr.col}`;
			const cell = grid[curr.row][curr.col];
			// Allow start and end to be colored as path
			cell.state = "path";
			pathLen++;
			curr = parentMap.get(key);
			// Break if we reach the start node (which is now marked as path)
			if (curr && curr.row === start.row && curr.col === start.col) {
				grid[start.row][start.col].state = "path";
				break;
			}
		}
		addStep(false, pathLen);
	};

	if (algorithm.includes("DFS")) {
		const visited = new Set<string>();
		const parent = new Map<string, { row: number; col: number } | null>();

		const dfs = (row: number, col: number): boolean => {
			const key = `${row},${col}`;
			if (visited.has(key)) return false;
			visited.add(key);

			const cell = grid[row][col];
			if (cell.state !== "start" && cell.state !== "end") {
				resetStates();
				cell.state = "visiting";
				addStep();
				cell.state = "visited";
				addStep(true);
			}

			if (row === end.row && col === end.col) return true;

			for (const n of getNeighbors(row, col)) {
				if (!visited.has(`${n.row},${n.col}`)) {
					parent.set(`${n.row},${n.col}`, { row, col });
					if (dfs(n.row, n.col)) return true;
				}
			}
			return false;
		};
		if (dfs(start.row, start.col)) reconstructMazePath(parent);
	} else {
		// BFS
		const queue = [start];
		const visited = new Set<string>([`${start.row},${start.col}`]);
		const parent = new Map<string, { row: number; col: number } | null>();
		parent.set(`${start.row},${start.col}`, null);

		while (queue.length > 0) {
			const { row, col } = queue.shift()!;
			const cell = grid[row][col];

			if (cell.state !== "start" && cell.state !== "end") {
				resetStates();
				cell.state = "visiting";
				addStep();
				cell.state = "visited";
				addStep(true);
			}

			if (row === end.row && col === end.col) {
				reconstructMazePath(parent);
				break;
			}

			for (const n of getNeighbors(row, col)) {
				const key = `${n.row},${n.col}`;
				if (!visited.has(key)) {
					visited.add(key);
					parent.set(key, { row, col });
					queue.push(n);
					if (
						grid[n.row][n.col].state !== "start" &&
						grid[n.row][n.col].state !== "end"
					) {
						grid[n.row][n.col].state = "visiting";
					}
				}
			}
		}
	}

	return steps;
}

// =========================================
// GRAPH GENERATION LOGIC (Dijkstra/A*/UCS)
// =========================================

function initializeNodes(nodeIds: number[], isWeighted: boolean): GraphNode[] {
	const nodes: GraphNode[] = [];
	// Use strict grid positioning to avoid messy overlaps
	const cols = 4;
	const xSpacing = 180;
	const ySpacing = 120;
	const startX = 120;
	const startY = 80;

	nodeIds.forEach((id) => {
		const col = id % cols;
		const row = Math.floor(id / cols);

		nodes.push({
			id,
			x: startX + col * xSpacing,
			y: startY + row * ySpacing,
			state:
				id === 0
					? "start"
					: id === nodeIds.length - 1
					? "end"
					: "default",
			distance: id === 0 ? 0 : Number.MAX_SAFE_INTEGER,
			previous: undefined,
		});
	});
	return nodes;
}

function generateRandomGraph(numNodes: number, isWeighted: boolean) {
	const nodes = Array.from({ length: numNodes }, (_, i) => i);
	const edges: GraphEdge[] = [];
	const addedEdges = new Set<string>();

	const addEdge = (u: number, v: number, w: number) => {
		if (u === v) return;
		const key = u < v ? `${u}-${v}` : `${v}-${u}`;
		if (addedEdges.has(key)) return;

		addedEdges.add(key);
		edges.push({ from: u, to: v, weight: w, state: "default" });
	};

	// Build a clean grid-like connectivity first
	for (let i = 0; i < numNodes; i++) {
		// Horizontal neighbor (i -> i+1) if not at row end
		if ((i + 1) % 4 !== 0 && i + 1 < numNodes) {
			addEdge(
				i,
				i + 1,
				isWeighted ? Math.floor(Math.random() * 10) + 1 : 1
			);
		}
		// Vertical neighbor (i -> i+4)
		if (i + 4 < numNodes) {
			addEdge(
				i,
				i + 4,
				isWeighted ? Math.floor(Math.random() * 10) + 1 : 1
			);
		}
	}

	// Add just a few diagonal shortcuts for interest, but not too many
	const shortcuts = [
		{ u: 0, v: 5 },
		{ u: 1, v: 6 },
		{ u: 2, v: 7 },
		{ u: 5, v: 8 },
		{ u: 6, v: 11 },
		{ u: 4, v: 9 },
	];

	shortcuts.forEach(({ u, v }) => {
		// 40% chance of a shortcut existing
		if (Math.random() > 0.6 && u < numNodes && v < numNodes) {
			addEdge(u, v, isWeighted ? Math.floor(Math.random() * 15) + 1 : 1);
		}
	});

	return { nodes, edges };
}

function generateGraphSteps(
	initialNodes: GraphNode[],
	initialEdges: GraphEdge[],
	algorithm: string
): GraphStep[] {
	const steps: GraphStep[] = [];
	let nodes = initialNodes.map((n) => ({ ...n }));
	let edges = initialEdges.map((e) => ({ ...e }));
	let computations = 0;

	const recordStep = (queueSize = 0) => {
		steps.push({
			type: "graph",
			nodes: nodes.map((n) => ({ ...n })),
			edges: edges.map((e) => ({ ...e })),
			computations: computations,
			queueSize: queueSize,
		});
	};
	recordStep();

	const startNode = nodes[0];
	const endNode = nodes[nodes.length - 1];

	// Helper for reconstruction
	const reconstructGraphPath = (currNode: GraphNode | undefined) => {
		if (!currNode) return;
		let curr: GraphNode | undefined = currNode;
		while (curr && curr.previous !== undefined) {
			const prevId: number = curr.previous;
			const prev = nodes.find((n) => n.id === prevId);

			// Mark edge
			const edge = edges.find(
				(e) =>
					(e.from === curr!.id && e.to === prevId) ||
					(e.from === prevId && e.to === curr!.id)
			);
			if (edge) edge.state = "path";

			// Change: Mark nodes as path, including start/end during traversal if needed
			curr.state = "path";
			curr = prev;
		}
		// Change: Explicitly mark the start node as path
		if (curr) curr.state = "path";
	};

	if (
		algorithm.includes("Dijkstra") ||
		algorithm.includes("A*") ||
		algorithm.includes("Uniform")
	) {
		const unvisited = new Set(nodes.map((n) => n.id));

		const heuristic = (node: GraphNode) => {
			if (!algorithm.includes("A*")) return 0;
			// Simple distance heuristic for A*
			return Math.sqrt(
				Math.pow(node.x - endNode.x, 2) +
					Math.pow(node.y - endNode.y, 2)
			);
		};

		while (unvisited.size > 0) {
			computations++;

			let current: GraphNode | null = null;
			let minScore = Number.MAX_SAFE_INTEGER;

			nodes.forEach((node) => {
				if (unvisited.has(node.id)) {
					const score = node.distance + heuristic(node);
					if (score < minScore) {
						minScore = score;
						current = node;
					}
				}
			});

			if (!current) break;
			
			// TypeScript now knows current is non-null, assign to non-nullable variable
			const currentNode: GraphNode = current;
			
			if (currentNode.distance === Number.MAX_SAFE_INTEGER) break;
			if (currentNode.id === endNode.id) break;
			unvisited.delete(currentNode.id);
			if (currentNode.id !== startNode.id) currentNode.state = "visited";

			const neighborEdges = edges.filter(
				(e) => e.from === currentNode.id || e.to === currentNode.id
			);

			for (const edge of neighborEdges) {
				const neighborId =
					edge.from === currentNode.id ? edge.to : edge.from;
				if (!unvisited.has(neighborId)) continue;

				const neighbor = nodes.find((n) => n.id === neighborId)!;
				const newDist = currentNode.distance + edge.weight;

				if (newDist < neighbor.distance) {
					neighbor.distance = newDist;
					neighbor.previous = currentNode.id;
					neighbor.state = "current";
					edge.state = "current";
				}
			}
			recordStep(unvisited.size);
		}
		reconstructGraphPath(nodes.find((n) => n.id === endNode.id));
	}

	// Final Step
	recordStep(0);
	return steps;
}