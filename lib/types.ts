export type AlgorithmCategory =
	| "Sorting Algorithms"
	| "Searching Algorithms"
	| "Graph Algorithms"
	| "Minimum Spanning Tree"
	| "Dynamic Programming"
	| "Backtracking";

export interface Algorithm {
	id: string;
	name: string;
	category: AlgorithmCategory;
	description: string;
}

export interface VisualizerProps {
	algorithm: string;
	isPlaying: boolean;
	speed: number;
	onComplete: () => void;
	currentStep: number;
	setCurrentStep: (step: number) => void;
	setMaxSteps: (steps: number) => void;
	customData?: any; // Allow custom data to be passed (arrays, graphs, etc.)
}
