"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";

interface DPVisualizerProps {
	algorithm: string;
	isPlaying: boolean;
	speed: number;
	onComplete: () => void;
	currentStep: number;
	setCurrentStep: (step: number) => void;
	setMaxSteps: (steps: number) => void;
}

interface Cell {
	value: number | string;
	state: "default" | "computing" | "computed" | "optimal";
}

interface KnapsackItem {
	weight: number;
	value: number;
}

export function DPVisualizer({
	algorithm,
	isPlaying,
	speed,
	onComplete,
	currentStep,
	setCurrentStep,
	setMaxSteps,
}: DPVisualizerProps) {
	const [table, setTable] = useState<Cell[][]>([]);
	const [result, setResult] = useState<number>(0);
	const [computations, setComputations] = useState(0);
	const [items, setItems] = useState<KnapsackItem[]>([]);
	const [capacity, setCapacity] = useState(0);
	const [fibN, setFibN] = useState(0);
	const animationRef = useRef<NodeJS.Timeout | null>(null);
	const stepsRef = useRef<
		Array<{ table: Cell[][]; result: number; computations: number }>
	>([]);
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

		if (algorithm === "0/1 Knapsack") {
			const numItems = 3 + Math.floor(Math.random() * 3); // 3-5 items
			const randomCapacity = 8 + Math.floor(Math.random() * 8); // 8-15 capacity
			const randomItems: KnapsackItem[] = [];

			for (let i = 0; i < numItems; i++) {
				randomItems.push({
					weight: 1 + Math.floor(Math.random() * 5), // weight 1-5
					value: 2 + Math.floor(Math.random() * 10), // value 2-11
				});
			}

			setItems(randomItems);
			setCapacity(randomCapacity);

			const initialTable = generateKnapsackTable(
				numItems,
				randomCapacity
			);
			setTable(initialTable);
			stepsRef.current = generateKnapsackSteps(
				initialTable,
				randomItems,
				randomCapacity
			);
		} else {
			const n = 8 + Math.floor(Math.random() * 8); // 8-15
			setFibN(n);

			const initialTable = generateFibonacciTable(n);
			setTable(initialTable);
			stepsRef.current = generateFibonacciSteps(initialTable, n);
		}

		setResult(0);
		setComputations(0);
		setMaxStepsRef.current(stepsRef.current.length - 1);
		setCurrentStepRef.current(0);
		initRef.current = true;
	}, [algorithm]); // Removed setMaxSteps, setCurrentStep from deps

	useEffect(() => {
		if (
			currentStep >= 0 &&
			currentStep < stepsRef.current.length &&
			initRef.current
		) {
			const step = stepsRef.current[currentStep];
			setTable(step.table);
			setResult(step.result);
			setComputations(step.computations);
		}
	}, [currentStep]);

	useEffect(() => {
		if (isPlaying && currentStepRef.current < stepsRef.current.length - 1) {
			const delay = Math.max(20, 350 - speed * 3.3);
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
					Computations: {computations}
				</Badge>
				<Badge
					variant="default"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					{algorithm === "0/1 Knapsack"
						? `Max Value: ${result}`
						: `F(${fibN}) = ${result}`}
				</Badge>
			</div>

			{algorithm === "0/1 Knapsack" && items.length > 0 && (
				<div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
					{items.map((item, idx) => (
						<div
							key={idx}
							className="px-2 py-1 sm:px-3 sm:py-1.5 bg-muted rounded-lg text-xs sm:text-sm"
						>
							<span className="font-semibold">
								Item {idx + 1}:
							</span>{" "}
							<span className="text-blue-500">
								W={item.weight}
							</span>
							,{" "}
							<span className="text-green-500">
								V={item.value}
							</span>
						</div>
					))}
					<div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-primary/10 rounded-lg text-xs sm:text-sm">
						<span className="font-semibold">Capacity:</span>{" "}
						{capacity}
					</div>
				</div>
			)}

			{algorithm === "Fibonacci Sequence" && (
				<div className="flex justify-center">
					<div className="px-3 py-1.5 bg-muted rounded-lg text-sm">
						Computing{" "}
						<span className="font-bold text-primary">
							F({fibN})
						</span>{" "}
						using Dynamic Programming
					</div>
				</div>
			)}

			<div className="flex justify-center overflow-x-auto px-2">
				<div className="inline-block">
					{algorithm === "0/1 Knapsack" && (
						<div className="flex gap-[2px] sm:gap-1 mb-1">
							<div className="w-10 h-6 sm:w-12 sm:h-7 flex items-center justify-center text-[10px] sm:text-xs font-medium text-muted-foreground">
								w→
							</div>
							{table[0]?.map((_, colIndex) => (
								<div
									key={colIndex}
									className="w-10 h-6 sm:w-12 sm:h-7 flex items-center justify-center text-[10px] sm:text-xs font-medium text-muted-foreground"
								>
									{colIndex}
								</div>
							))}
						</div>
					)}

					{algorithm === "Fibonacci Sequence" && (
						<div className="flex gap-[2px] sm:gap-1 mb-1">
							{table[0]?.map((_, colIndex) => (
								<div
									key={colIndex}
									className="w-10 h-6 sm:w-12 sm:h-7 flex items-center justify-center text-[10px] sm:text-xs font-medium text-muted-foreground"
								>
									F({colIndex})
								</div>
							))}
						</div>
					)}

					<div className="inline-grid gap-[2px] sm:gap-1 bg-border p-1 sm:p-2 rounded-lg">
						{table.map((row, rowIndex) => (
							<div
								key={rowIndex}
								className="flex gap-[2px] sm:gap-1 items-center"
							>
								{algorithm === "0/1 Knapsack" && (
									<div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[10px] sm:text-xs font-medium text-muted-foreground pr-1">
										{rowIndex === 0 ? "0" : `i${rowIndex}`}
									</div>
								)}
								{row.map((cell, colIndex) => (
									<div
										key={`${rowIndex}-${colIndex}`}
										className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center text-xs sm:text-sm font-semibold rounded transition-all duration-150"
										style={{
											backgroundColor:
												cell.state === "computing"
													? "#3b82f6"
													: cell.state === "computed"
													? "#10b981"
													: cell.state === "optimal"
													? "#f59e0b"
													: "#f1f5f9",
											color:
												cell.state === "default"
													? "#94a3b8"
													: "#fff",
											transform:
												cell.state === "computing"
													? "scale(1.05)"
													: "scale(1)",
											boxShadow:
												cell.state === "computing"
													? "0 0 8px rgba(59, 130, 246, 0.5)"
													: "none",
										}}
									>
										{cell.value}
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-[10px] sm:text-xs flex-wrap px-2">
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#f1f5f9" }}
					/>
					<span>Not Computed</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#3b82f6" }}
					/>
					<span>Computing</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#10b981" }}
					/>
					<span>Computed</span>
				</div>
				{algorithm === "0/1 Knapsack" && (
					<div className="flex items-center gap-1.5 sm:gap-2">
						<div
							className="w-3 h-3 sm:w-4 sm:h-4 rounded"
							style={{ backgroundColor: "#f59e0b" }}
						/>
						<span>Optimal Path</span>
					</div>
				)}
			</div>
		</div>
	);
}

function generateKnapsackTable(numItems: number, capacity: number): Cell[][] {
	const table: Cell[][] = [];
	for (let i = 0; i <= numItems; i++) {
		table[i] = [];
		for (let j = 0; j <= capacity; j++) {
			table[i][j] = { value: 0, state: "default" };
		}
	}
	return table;
}

function generateFibonacciTable(n: number): Cell[][] {
	const table: Cell[][] = [[]];
	for (let i = 0; i <= n; i++) {
		table[0][i] = { value: "-", state: "default" };
	}
	return table;
}

function generateKnapsackSteps(
	initialTable: Cell[][],
	items: KnapsackItem[],
	capacity: number
): Array<{ table: Cell[][]; result: number; computations: number }> {
	const steps: Array<{
		table: Cell[][];
		result: number;
		computations: number;
	}> = [];
	const table = initialTable.map((row) => row.map((cell) => ({ ...cell })));
	let computations = 0;

	steps.push({
		table: table.map((row) => row.map((cell) => ({ ...cell }))),
		result: 0,
		computations,
	});

	// Fill the DP table
	for (let i = 1; i <= items.length; i++) {
		for (let w = 0; w <= capacity; w++) {
			computations++;
			table[i][w].state = "computing";
			steps.push({
				table: table.map((row) => row.map((cell) => ({ ...cell }))),
				result: 0,
				computations,
			});

			const item = items[i - 1];
			if (item.weight <= w) {
				const includeItem =
					item.value + Number(table[i - 1][w - item.weight].value);
				const excludeItem = Number(table[i - 1][w].value);
				table[i][w].value = Math.max(includeItem, excludeItem);
			} else {
				table[i][w].value = table[i - 1][w].value;
			}

			table[i][w].state = "computed";
			steps.push({
				table: table.map((row) => row.map((cell) => ({ ...cell }))),
				result: Number(table[i][w].value),
				computations,
			});
		}
	}

	let w = capacity;
	for (let i = items.length; i > 0 && w > 0; i--) {
		if (table[i][w].value !== table[i - 1][w].value) {
			table[i][w].state = "optimal";
			w -= items[i - 1].weight;
		}
	}

	const finalResult = Number(table[items.length][capacity].value);
	steps.push({
		table: table.map((row) => row.map((cell) => ({ ...cell }))),
		result: finalResult,
		computations,
	});

	return steps;
}

function generateFibonacciSteps(
	initialTable: Cell[][],
	n: number
): Array<{ table: Cell[][]; result: number; computations: number }> {
	const steps: Array<{
		table: Cell[][];
		result: number;
		computations: number;
	}> = [];
	const table = initialTable.map((row) => row.map((cell) => ({ ...cell })));
	let computations = 0;

	// Base cases
	table[0][0].value = 0;
	table[0][0].state = "computing";
	steps.push({
		table: table.map((row) => row.map((cell) => ({ ...cell }))),
		result: 0,
		computations,
	});

	table[0][0].state = "computed";
	steps.push({
		table: table.map((row) => row.map((cell) => ({ ...cell }))),
		result: 0,
		computations,
	});

	if (n >= 1) {
		table[0][1].value = 1;
		table[0][1].state = "computing";
		steps.push({
			table: table.map((row) => row.map((cell) => ({ ...cell }))),
			result: 1,
			computations,
		});

		table[0][1].state = "computed";
		steps.push({
			table: table.map((row) => row.map((cell) => ({ ...cell }))),
			result: 1,
			computations,
		});
	}

	for (let i = 2; i <= n; i++) {
		computations++;
		table[0][i].state = "computing";
		steps.push({
			table: table.map((row) => row.map((cell) => ({ ...cell }))),
			result: 0,
			computations,
		});

		table[0][i].value =
			Number(table[0][i - 1].value) + Number(table[0][i - 2].value);
		table[0][i].state = "computed";
		steps.push({
			table: table.map((row) => row.map((cell) => ({ ...cell }))),
			result: Number(table[0][i].value),
			computations,
		});
	}

	return steps;
}
