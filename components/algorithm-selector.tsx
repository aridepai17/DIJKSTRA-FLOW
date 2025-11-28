"use client";

import { Card } from "@/components/ui/card";
import {
	ArrowRight,
	Search,
	ArrowDown,
	GitBranch,
	Network,
	Brain,
	Boxes,
} from "lucide-react";

// Centralized definition of all algorithm categories and data (data kept for context)
const algorithmCategories = [
	{
		title: "Sorting Algorithms",
		key: "Sorting Algorithms",
		icon: ArrowDown,
		color: "text-chart-1",
		bgColor: "bg-chart-1/10",
		algorithms: [
			"Bubble Sort",
			"Selection Sort",
			"Insertion Sort",
			"Merge Sort",
			"Quick Sort",
			"Heap Sort",
			"Shell Sort",
			"Tree Sort",
			"Tim Sort",
			"Cocktail Shaker Sort",
			"Counting Sort",
			"Radix Sort",
		],
	},
	{
		title: "Searching Algorithms",
		key: "Searching Algorithms",
		icon: Search,
		color: "text-chart-2",
		bgColor: "bg-chart-2/10",
		algorithms: [
			"Linear Search",
			"Binary Search",
			"Jump Search",
			"Interpolation Search",
			"Exponential Search",
			"Fibonacci Search",
		],
	},
	{
		title: "Graph Algorithms",
		key: "Graph Algorithms",
		icon: GitBranch,
		color: "text-chart-3",
		bgColor: "bg-chart-3/10",
		algorithms: [
			"Depth First Search (DFS)",
			"Breadth First Search (BFS)",
			"Dijkstra's Algorithm",
			"A* Search",
			"Uniform Cost Search",
		],
	},
	{
		title: "Minimum Spanning Tree",
		key: "Minimum Spanning Tree",
		icon: Network,
		color: "text-chart-4",
		bgColor: "bg-chart-4/10",
		algorithms: ["Prim's Algorithm", "Kruskal's Algorithm"],
	},
	{
		title: "Dynamic Programming",
		key: "Dynamic Programming",
		icon: Brain,
		color: "text-purple-500",
		bgColor: "bg-purple-500/10",
		algorithms: ["0/1 Knapsack Problem", "Fibonacci Sequence"],
	},
	{
		title: "Backtracking",
		key: "Backtracking",
		icon: Boxes,
		color: "text-chart-5",
		bgColor: "bg-chart-5/10",
		algorithms: ["N-Queens Problem", "Sudoku Solver"],
	},
];

interface AlgorithmSelectorProps {
	onSelect: (algorithm: { category: string; name: string }) => void;
}

// Helper component for the card
const CategoryCard = ({
	category,
	onSelect,
}: {
	category: (typeof algorithmCategories)[0];
	onSelect: (algorithm: { category: string; name: string }) => void;
}) => (
	<Card
		key={category.title}
		className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow h-fit break-inside-avoid mb-6"
	>
		<div
			className={`${category.bgColor} border-b border-border/50 p-4 sm:p-5 lg:p-6`}
		>
			<div className="flex items-center gap-2 sm:gap-3 mb-2">
				<div className={`${category.bgColor} rounded-lg p-2`}>
					<category.icon
						className={`h-5 w-5 sm:h-6 sm:w-6 ${category.color}`}
					/>
				</div>
				<h3 className="text-lg sm:text-xl font-black text-foreground">
					{category.title}
				</h3>
			</div>
			<p className="text-xs sm:text-sm text-muted-foreground">
				{category.algorithms.length} algorithms
			</p>
		</div>
		<div className="p-3 sm:p-4">
			<div className="space-y-1.5 sm:space-y-2">
				{category.algorithms.map((algorithm) => (
					<button
						key={algorithm}
						onClick={() =>
							onSelect({
								category: category.title,
								name: algorithm,
							})
						}
						className="flex w-full items-center justify-between rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm transition-colors hover:bg-accent active:bg-accent/80 group touch-manipulation"
					>
						<span className="font-black">{algorithm}</span>
						<ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 ml-2" />
					</button>
				))}
			</div>
		</div>
	</Card>
);

export function AlgorithmSelector({ onSelect }: AlgorithmSelectorProps) {
	const allCategories = [
		algorithmCategories.find((c) => c.key === "Sorting Algorithms"),
		algorithmCategories.find((c) => c.key === "Searching Algorithms"),
		algorithmCategories.find((c) => c.key === "Graph Algorithms"),
		algorithmCategories.find((c) => c.key === "Minimum Spanning Tree"),
		algorithmCategories.find((c) => c.key === "Dynamic Programming"),
		algorithmCategories.find((c) => c.key === "Backtracking"),
	].filter((c) => c !== undefined) as (typeof algorithmCategories)[0][];

	return (
		<div
			className="w-full gap-6 md:gap-8 columns-1 sm:columns-2 lg:columns-3"
			style={{ columnGap: "2rem" }} 
		>
			{allCategories.map((category) => (
				<CategoryCard
					key={category.title}
					category={category}
					onSelect={onSelect}
				/>
			))}
		</div>
	);
}
