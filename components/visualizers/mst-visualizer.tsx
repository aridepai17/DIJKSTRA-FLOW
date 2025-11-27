"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";

interface MSTVisualizerProps {
	algorithm: string;
	isPlaying: boolean;
	speed: number;
	onComplete: () => void;
	currentStep: number;
	setCurrentStep: (step: number) => void;
	setMaxSteps: (steps: number) => void;
}

interface Node {
	id: number;
	x: number;
	y: number;
}

interface Edge {
	from: number;
	to: number;
	weight: number;
	state: "default" | "considering" | "selected" | "rejected";
}

export function MSTVisualizer({
	algorithm,
	isPlaying,
	speed,
	onComplete,
	currentStep,
	setCurrentStep,
	setMaxSteps,
}: MSTVisualizerProps) {
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [totalCost, setTotalCost] = useState(0);
	const animationRef = useRef<NodeJS.Timeout | null>(null);
	const stepsRef = useRef<Array<{ edges: Edge[]; totalCost: number }>>([]);
	const initRef = useRef(false);
	const setMaxStepsRef = useRef(setMaxSteps);
	const setCurrentStepRef = useRef(setCurrentStep);
	const currentStepRef = useRef(currentStep);

	useEffect(() => {
		setMaxStepsRef.current = setMaxSteps;
		setCurrentStepRef.current = setCurrentStep;
		currentStepRef.current = currentStep;
	});

	useEffect(() => {
		initRef.current = false;
		const { nodes: newNodes, edges: newEdges } = generateRandomGraph();
		setNodes(newNodes);
		setEdges(newEdges);
		setTotalCost(0);

		stepsRef.current =
			algorithm === "Prim's Algorithm"
				? generatePrimSteps(newNodes, newEdges)
				: generateKruskalSteps(newNodes, newEdges);

		setMaxStepsRef.current(stepsRef.current.length - 1);
		setCurrentStepRef.current(0);
		initRef.current = true;
	}, [algorithm]);

	useEffect(() => {
		if (
			currentStep >= 0 &&
			currentStep < stepsRef.current.length &&
			initRef.current
		) {
			const step = stepsRef.current[currentStep];
			setEdges(step.edges);
			setTotalCost(step.totalCost);
		}
	}, [currentStep]);

	useEffect(() => {
		if (isPlaying && currentStepRef.current < stepsRef.current.length - 1) {
			const delay = Math.max(10, 500 - speed * 4.9);
			animationRef.current = setTimeout(() => {
				setCurrentStepRef.current(currentStepRef.current + 1);
			}, delay);
		} else if (
			currentStepRef.current >= stepsRef.current.length - 1 &&
			isPlaying
		) {
			onComplete();
		}

		return () => {
			if (animationRef.current) {
				clearTimeout(animationRef.current);
			}
		};
	}, [isPlaying, currentStep, speed, onComplete]);

	return (
		<div className="w-full space-y-4 sm:space-y-6">
			<div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
				<Badge
					variant="secondary"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					Edges Selected:{" "}
					{edges.filter((e) => e.state === "selected").length}
				</Badge>
				<Badge
					variant="default"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					Total Cost: {totalCost}
				</Badge>
			</div>

			<div className="relative h-64 sm:h-80 lg:h-96 bg-accent/20 rounded-lg overflow-hidden">
				<svg width="100%" height="100%" className="absolute inset-0">
					{edges.map((edge, idx) => {
						const fromNode = nodes.find((n) => n.id === edge.from)!;
						const toNode = nodes.find((n) => n.id === edge.to)!;
						return (
							<g key={idx}>
								<line
									x1={`${fromNode.x}%`}
									y1={`${fromNode.y}%`}
									x2={`${toNode.x}%`}
									y2={`${toNode.y}%`}
									stroke={
										edge.state === "selected"
											? "#10b981"
											: edge.state === "considering"
											? "#3b82f6"
											: edge.state === "rejected"
											? "#ef4444"
											: "#64748b"
									}
									strokeWidth={
										edge.state === "selected"
											? 4
											: edge.state === "considering"
											? 3
											: 2
									}
									opacity={
										edge.state === "rejected" ? 0.3 : 0.8
									}
								/>
								<text
									x={`${(fromNode.x + toNode.x) / 2}%`}
									y={`${(fromNode.y + toNode.y) / 2}%`}
									fill="currentColor"
									fontSize="12"
									className="font-semibold"
									textAnchor="middle"
								>
									{edge.weight}
								</text>
							</g>
						);
					})}
					{nodes.map((node) => (
						<g key={node.id}>
							<circle
								cx={`${node.x}%`}
								cy={`${node.y}%`}
								r="20"
								fill="#3b82f6"
								stroke="#fff"
								strokeWidth="2"
							/>
							<text
								x={`${node.x}%`}
								y={`${node.y}%`}
								fill="#fff"
								fontSize="14"
								fontWeight="bold"
								textAnchor="middle"
								dominantBaseline="middle"
							>
								{node.id}
							</text>
						</g>
					))}
				</svg>
			</div>

			<div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-[10px] sm:text-xs flex-wrap px-2">
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-8 h-0.5 sm:w-10 sm:h-1 rounded"
						style={{ backgroundColor: "#64748b" }}
					/>
					<span>Default</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-8 h-0.5 sm:w-10 sm:h-1 rounded"
						style={{ backgroundColor: "#3b82f6" }}
					/>
					<span>Considering</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-8 h-0.5 sm:w-10 sm:h-1 rounded"
						style={{ backgroundColor: "#10b981" }}
					/>
					<span>Selected</span>
				</div>
			</div>
		</div>
	);
}

function generateRandomGraph(): { nodes: Node[]; edges: Edge[] } {
	const numNodes = 6 + Math.floor(Math.random() * 3); // 6-8 nodes
	const nodes: Node[] = [];

	// Create nodes in a grid pattern with some randomness
	for (let i = 0; i < numNodes; i++) {
		const baseX = 15 + (i % 4) * 25;
		const baseY = 20 + Math.floor(i / 4) * 60;
		nodes.push({
			id: i,
			x: baseX + (Math.random() * 10 - 5), // Add randomness
			y: baseY + (Math.random() * 10 - 5),
		});
	}

	// Generate random edges
	const edges: Edge[] = [];
	const edgeProbability = 0.35 + Math.random() * 0.15; // 0.35-0.5

	for (let i = 0; i < numNodes; i++) {
		for (let j = i + 1; j < numNodes; j++) {
			if (Math.random() < edgeProbability) {
				edges.push({
					from: i,
					to: j,
					weight: Math.floor(Math.random() * 25) + 5, // weights 5-29
					state: "default",
				});
			}
		}
	}

	// Ensure graph is connected
	if (edges.length === 0) {
		for (let i = 0; i < numNodes - 1; i++) {
			edges.push({
				from: i,
				to: i + 1,
				weight: Math.floor(Math.random() * 15) + 5,
				state: "default",
			});
		}
	}

	return { nodes, edges };
}

function generatePrimSteps(
	nodes: Node[],
	initialEdges: Edge[]
): Array<{ edges: Edge[]; totalCost: number }> {
	const steps: Array<{ edges: Edge[]; totalCost: number }> = [];
	const edges = initialEdges.map((e) => ({ ...e }));
	const visited = new Set<number>([0]);
	let totalCost = 0;

	steps.push({ edges: edges.map((e) => ({ ...e })), totalCost });

	while (visited.size < nodes.length) {
		let minEdge: Edge | null = null;
		let minWeight = Number.POSITIVE_INFINITY;

		for (const edge of edges) {
			if (
				((visited.has(edge.from) && !visited.has(edge.to)) ||
					(visited.has(edge.to) && !visited.has(edge.from))) &&
				edge.weight < minWeight &&
				edge.state === "default"
			) {
				minEdge = edge;
				minWeight = edge.weight;
			}
		}

		if (minEdge) {
			minEdge.state = "considering";
			steps.push({ edges: edges.map((e) => ({ ...e })), totalCost });

			minEdge.state = "selected";
			visited.add(minEdge.from);
			visited.add(minEdge.to);
			totalCost += minEdge.weight;
			steps.push({ edges: edges.map((e) => ({ ...e })), totalCost });
		} else {
			break;
		}
	}

	return steps;
}

function generateKruskalSteps(
	nodes: Node[],
	initialEdges: Edge[]
): Array<{ edges: Edge[]; totalCost: number }> {
	const steps: Array<{ edges: Edge[]; totalCost: number }> = [];
	const edges = initialEdges
		.map((e) => ({ ...e }))
		.sort((a, b) => a.weight - b.weight);
	const parent = new Map<number, number>();
	let totalCost = 0;

	nodes.forEach((node) => parent.set(node.id, node.id));

	const find = (x: number): number => {
		if (parent.get(x) !== x) {
			parent.set(x, find(parent.get(x)!));
		}
		return parent.get(x)!;
	};

	const union = (x: number, y: number) => {
		const rootX = find(x);
		const rootY = find(y);
		if (rootX !== rootY) {
			parent.set(rootX, rootY);
		}
	};

	steps.push({ edges: edges.map((e) => ({ ...e })), totalCost });

	for (const edge of edges) {
		edge.state = "considering";
		steps.push({ edges: edges.map((e) => ({ ...e })), totalCost });

		if (find(edge.from) !== find(edge.to)) {
			edge.state = "selected";
			union(edge.from, edge.to);
			totalCost += edge.weight;
			steps.push({ edges: edges.map((e) => ({ ...e })), totalCost });
		} else {
			edge.state = "rejected";
			steps.push({ edges: edges.map((e) => ({ ...e })), totalCost });
		}
	}

	return steps;
}
