"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";

interface SortingVisualizerProps {
	algorithm: string;
	isPlaying: boolean;
	speed: number;
	onComplete: () => void;
}

interface ArrayBar {
	value: number;
	state: "default" | "comparing" | "swapping" | "sorted" | "pivot";
}

export function SortingVisualizer({
	algorithm,
	isPlaying,
	speed,
	onComplete,
}: SortingVisualizerProps) {
	const [array, setArray] = useState<ArrayBar[]>([]);
	const [comparisons, setComparisons] = useState(0);
	const [swaps, setSwaps] = useState(0);
	const animationRef = useRef<NodeJS.Timeout | null>(null);
	const stepsRef = useRef<
		Array<{ array: ArrayBar[]; comparison?: boolean; swap?: boolean }>
	>([]);
	const currentStepRef = useRef(0);

	// Initialize array
	useEffect(() => {
		const newArray = Array.from({ length: 30 }, () => ({
			value: Math.floor(Math.random() * 100) + 10,
			state: "default" as const,
		}));
		setArray(newArray);
		setComparisons(0);
		setSwaps(0);
		currentStepRef.current = 0;

		// Generate steps based on algorithm
		stepsRef.current = generateSortingSteps(newArray, algorithm);
	}, [algorithm]);

	// Animation loop
	useEffect(() => {
		if (isPlaying && currentStepRef.current < stepsRef.current.length) {
			// Speed 1 = 500ms delay, Speed 100 = 5ms delay
			const delay = Math.max(5, 500 - speed * 4.95);

			animationRef.current = setInterval(() => {
				const step = stepsRef.current[currentStepRef.current];
				setArray(step.array);

				if (step.comparison) {
					setComparisons((prev) => prev + 1);
				}
				if (step.swap) {
					setSwaps((prev) => prev + 1);
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

	const maxValue = Math.max(...array.map((item) => item.value));

	return (
		<div className="w-full space-y-4 sm:space-y-6">
			<div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
				<Badge
					variant="secondary"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					Comparisons: {comparisons}
				</Badge>
				<Badge
					variant="secondary"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					Swaps: {swaps}
				</Badge>
			</div>

			<div className="flex items-end justify-center gap-[2px] sm:gap-1 h-64 sm:h-80 lg:h-96 px-2 sm:px-4 overflow-x-auto">
				{array.map((item, index) => (
					<div
						key={index}
						className="flex-1 flex flex-col items-center gap-0.5 sm:gap-1 min-w-[15px] sm:min-w-[20px] max-w-[40px]"
					>
						{/* Value label on top */}
						<div className="text-[8px] sm:text-[10px] font-medium text-foreground/70 h-3 sm:h-4">
							{item.value}
						</div>
						{/* Histogram bar */}
						<div
							className="w-full transition-all duration-100 rounded-t relative"
							style={{
								height: `${
									(item.value / maxValue) *
									(window.innerWidth < 640 ? 200 : 280)
								}px`,
								backgroundColor:
									item.state === "comparing"
										? "#3b82f6"
										: item.state === "swapping"
										? "#f59e0b"
										: item.state === "sorted"
										? "#10b981"
										: item.state === "pivot"
										? "#8b5cf6"
										: "#64748b",
								boxShadow:
									item.state !== "default"
										? "0 2px 8px rgba(0,0,0,0.2)"
										: "none",
							}}
						/>
						{/* Index label at bottom */}
						<div className="text-[7px] sm:text-[9px] font-semibold text-muted-foreground h-3 sm:h-4">
							{index}
						</div>
					</div>
				))}
			</div>

			<div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-[10px] sm:text-xs flex-wrap px-2">
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#64748b" }}
					/>
					<span>Default</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#3b82f6" }}
					/>
					<span>Comparing</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#f59e0b" }}
					/>
					<span>Swapping</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#8b5cf6" }}
					/>
					<span>Pivot</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#10b981" }}
					/>
					<span>Sorted</span>
				</div>
			</div>
		</div>
	);
}

// Helper functions to generate sorting steps
function generateSortingSteps(
	initialArray: ArrayBar[],
	algorithm: string
): Array<{ array: ArrayBar[]; comparison?: boolean; swap?: boolean }> {
	const steps: Array<{
		array: ArrayBar[];
		comparison?: boolean;
		swap?: boolean;
	}> = [];
	const arr = initialArray.map((item) => ({ ...item }));

	const addStep = (comparison = false, swap = false) => {
		steps.push({
			array: arr.map((item) => ({ ...item })),
			comparison,
			swap,
		});
	};

	const resetStates = () => {
		arr.forEach((item) => {
			if (item.state !== "sorted") item.state = "default";
		});
	};

	switch (algorithm) {
		case "Bubble Sort":
			bubbleSort(arr, addStep, resetStates);
			break;
		case "Selection Sort":
			selectionSort(arr, addStep, resetStates);
			break;
		case "Insertion Sort":
			insertionSort(arr, addStep, resetStates);
			break;
		case "Merge Sort":
			mergeSort(arr, 0, arr.length - 1, addStep, resetStates);
			break;
		case "Quick Sort":
			quickSort(arr, 0, arr.length - 1, addStep, resetStates);
			break;
		case "Heap Sort":
			heapSort(arr, addStep, resetStates);
			break;
		case "Shell Sort":
			shellSort(arr, addStep, resetStates);
			break;
		case "Tree Sort":
			treeSort(arr, addStep, resetStates);
			break;
		case "Tim Sort":
			timSort(arr, addStep, resetStates);
			break;
		case "Cocktail Shaker Sort":
			cocktailShakerSort(arr, addStep, resetStates);
			break;
		case "Counting Sort":
			countingSort(arr, addStep, resetStates);
			break;
		case "Radix Sort":
			radixSort(arr, addStep, resetStates);
			break;
	}

	// Mark all as sorted at the end
	arr.forEach((item) => (item.state = "sorted"));
	addStep();

	return steps;
}

// Sorting Algorithm implementation
// Sorting algorithm implementations
function bubbleSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	const n = arr.length;
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			resetStates();
			arr[j].state = "comparing";
			arr[j + 1].state = "comparing";
			addStep(true);

			if (arr[j].value > arr[j + 1].value) {
				arr[j].state = "swapping";
				arr[j + 1].state = "swapping";
				addStep(false, true);
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
		arr[n - i - 1].state = "sorted";
		addStep();
	}
	arr[0].state = "sorted";
}

function selectionSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	const n = arr.length;
	for (let i = 0; i < n - 1; i++) {
		let minIdx = i;
		for (let j = i + 1; j < n; j++) {
			resetStates();
			arr[minIdx].state = "comparing";
			arr[j].state = "comparing";
			addStep(true);

			if (arr[j].value < arr[minIdx].value) {
				minIdx = j;
			}
		}

		if (minIdx !== i) {
			resetStates();
			arr[i].state = "swapping";
			arr[minIdx].state = "swapping";
			addStep(false, true);
			[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
		}
		arr[i].state = "sorted";
		addStep();
	}
	arr[n - 1].state = "sorted";
}

function insertionSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	const n = arr.length;
	for (let i = 1; i < n; i++) {
		const key = arr[i];
		let j = i - 1;

		while (j >= 0) {
			resetStates();
			arr[j].state = "comparing";
			arr[j + 1].state = "comparing";
			addStep(true);

			if (arr[j].value > key.value) {
				arr[j + 1] = arr[j];
				arr[j + 1].state = "swapping";
				addStep(false, true);
				j--;
			} else {
				break;
			}
		}

		arr[j + 1] = key;
	}
}

function mergeSort(
	arr: ArrayBar[],
	left: number,
	right: number,
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	if (left < right) {
		const mid = Math.floor((left + right) / 2);
		mergeSort(arr, left, mid, addStep, resetStates);
		mergeSort(arr, mid + 1, right, addStep, resetStates);
		merge(arr, left, mid, right, addStep, resetStates);
	}
}

function merge(
	arr: ArrayBar[],
	left: number,
	mid: number,
	right: number,
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	const leftArr = arr.slice(left, mid + 1);
	const rightArr = arr.slice(mid + 1, right + 1);

	let i = 0,
		j = 0,
		k = left;

	while (i < leftArr.length && j < rightArr.length) {
		resetStates();
		addStep(true);

		if (leftArr[i].value <= rightArr[j].value) {
			arr[k] = { ...leftArr[i], state: "swapping" };
			addStep(false, true);
			i++;
		} else {
			arr[k] = { ...rightArr[j], state: "swapping" };
			addStep(false, true);
			j++;
		}
		k++;
	}

	while (i < leftArr.length) {
		arr[k] = { ...leftArr[i], state: "swapping" };
		addStep(false, true);
		i++;
		k++;
	}

	while (j < rightArr.length) {
		arr[k] = { ...rightArr[j], state: "swapping" };
		addStep(false, true);
		j++;
		k++;
	}
}

function quickSort(
	arr: ArrayBar[],
	low: number,
	high: number,
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	if (low < high) {
		const pi = partition(arr, low, high, addStep, resetStates);
		quickSort(arr, low, pi - 1, addStep, resetStates);
		quickSort(arr, pi + 1, high, addStep, resetStates);
	}
}

function partition(
	arr: ArrayBar[],
	low: number,
	high: number,
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
): number {
	const pivot = arr[high];
	arr[high].state = "pivot";
	addStep();

	let i = low - 1;

	for (let j = low; j < high; j++) {
		resetStates();
		arr[high].state = "pivot";
		arr[j].state = "comparing";
		addStep(true);

		if (arr[j].value < pivot.value) {
			i++;
			if (i !== j) {
				arr[i].state = "swapping";
				arr[j].state = "swapping";
				addStep(false, true);
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
		}
	}

	resetStates();
	arr[i + 1].state = "swapping";
	arr[high].state = "swapping";
	addStep(false, true);
	[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

	return i + 1;
}

function heapSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	const n = arr.length;

	// Build heap
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapify(arr, n, i, addStep, resetStates);
	}

	// Extract elements from heap
	for (let i = n - 1; i > 0; i--) {
		resetStates();
		arr[0].state = "swapping";
		arr[i].state = "swapping";
		addStep(false, true);
		[arr[0], arr[i]] = [arr[i], arr[0]];

		arr[i].state = "sorted";
		heapify(arr, i, 0, addStep, resetStates);
	}
}

function heapify(
	arr: ArrayBar[],
	n: number,
	i: number,
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	let largest = i;
	const left = 2 * i + 1;
	const right = 2 * i + 2;

	if (left < n) {
		resetStates();
		arr[left].state = "comparing";
		arr[largest].state = "comparing";
		addStep(true);
		if (arr[left].value > arr[largest].value) {
			largest = left;
		}
	}

	if (right < n) {
		resetStates();
		arr[right].state = "comparing";
		arr[largest].state = "comparing";
		addStep(true);
		if (arr[right].value > arr[largest].value) {
			largest = right;
		}
	}

	if (largest !== i) {
		resetStates();
		arr[i].state = "swapping";
		arr[largest].state = "swapping";
		addStep(false, true);
		[arr[i], arr[largest]] = [arr[largest], arr[i]];
		heapify(arr, n, largest, addStep, resetStates);
	}
}

function shellSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	const n = arr.length;
	let gap = Math.floor(n / 2);

	while (gap > 0) {
		for (let i = gap; i < n; i++) {
			const temp = arr[i];
			let j = i;

			while (j >= gap) {
				resetStates();
				arr[j].state = "comparing";
				arr[j - gap].state = "comparing";
				addStep(true);

				if (arr[j - gap].value > temp.value) {
					arr[j] = arr[j - gap];
					arr[j].state = "swapping";
					addStep(false, true);
					j -= gap;
				} else {
					break;
				}
			}

			arr[j] = temp;
		}
		gap = Math.floor(gap / 2);
	}
}

function treeSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	// For visualization, we'll use insertion sort as a simplified tree sort
	insertionSort(arr, addStep, resetStates);
}

function timSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	const MIN_MERGE = 8;
	const n = arr.length;

	// Sort individual subarrays using insertion sort
	for (let i = 0; i < n; i += MIN_MERGE) {
		const end = Math.min(i + MIN_MERGE - 1, n - 1);
		insertionSortRange(arr, i, end, addStep, resetStates);
	}

	// Merge subarrays
	let size = MIN_MERGE;
	while (size < n) {
		for (let start = 0; start < n; start += 2 * size) {
			const mid = start + size - 1;
			const end = Math.min(start + 2 * size - 1, n - 1);

			if (mid < end) {
				merge(arr, start, mid, end, addStep, resetStates);
			}
		}
		size *= 2;
	}
}

function insertionSortRange(
	arr: ArrayBar[],
	left: number,
	right: number,
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	for (let i = left + 1; i <= right; i++) {
		const key = arr[i];
		let j = i - 1;

		while (j >= left) {
			resetStates();
			arr[j].state = "comparing";
			arr[j + 1].state = "comparing";
			addStep(true);

			if (arr[j].value > key.value) {
				arr[j + 1] = arr[j];
				arr[j + 1].state = "swapping";
				addStep(false, true);
				j--;
			} else {
				break;
			}
		}

		arr[j + 1] = key;
	}
}

function cocktailShakerSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	let swapped = true;
	let start = 0;
	let end = arr.length - 1;

	while (swapped) {
		swapped = false;

		// Forward pass
		for (let i = start; i < end; i++) {
			resetStates();
			arr[i].state = "comparing";
			arr[i + 1].state = "comparing";
			addStep(true);

			if (arr[i].value > arr[i + 1].value) {
				arr[i].state = "swapping";
				arr[i + 1].state = "swapping";
				addStep(false, true);
				[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
				swapped = true;
			}
		}

		if (!swapped) break;

		swapped = false;
		end--;

		// Backward pass
		for (let i = end; i > start; i--) {
			resetStates();
			arr[i].state = "comparing";
			arr[i - 1].state = "comparing";
			addStep(true);

			if (arr[i].value < arr[i - 1].value) {
				arr[i].state = "swapping";
				arr[i - 1].state = "swapping";
				addStep(false, true);
				[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
				swapped = true;
			}
		}

		start++;
	}
}

function countingSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	// For visualization simplicity, use a comparison-based sort
	// Real counting sort doesn't do comparisons
	const max = Math.max(...arr.map((item) => item.value));
	const min = Math.min(...arr.map((item) => item.value));
	const range = max - min + 1;
	const count = new Array(range).fill(0);

	// Count occurrences
	for (let i = 0; i < arr.length; i++) {
		resetStates();
		arr[i].state = "comparing";
		addStep(true);
		count[arr[i].value - min]++;
	}

	// Reconstruct array
	let idx = 0;
	for (let i = 0; i < range; i++) {
		while (count[i] > 0) {
			resetStates();
			arr[idx].state = "swapping";
			addStep(false, true);
			arr[idx] = { value: i + min, state: "default" };
			idx++;
			count[i]--;
		}
	}
}

function radixSort(
	arr: ArrayBar[],
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	const max = Math.max(...arr.map((item) => item.value));

	for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
		countingSortByDigit(arr, exp, addStep, resetStates);
	}
}

function countingSortByDigit(
	arr: ArrayBar[],
	exp: number,
	addStep: (comparison?: boolean, swap?: boolean) => void,
	resetStates: () => void
) {
	const n = arr.length;
	const output = new Array(n);
	const count = new Array(10).fill(0);

	for (let i = 0; i < n; i++) {
		const digit = Math.floor(arr[i].value / exp) % 10;
		count[digit]++;
		resetStates();
		arr[i].state = "comparing";
		addStep(true);
	}

	for (let i = 1; i < 10; i++) {
		count[i] += count[i - 1];
	}

	for (let i = n - 1; i >= 0; i--) {
		const digit = Math.floor(arr[i].value / exp) % 10;
		output[count[digit] - 1] = arr[i];
		count[digit]--;
	}

	for (let i = 0; i < n; i++) {
		resetStates();
		arr[i] = { ...output[i], state: "swapping" };
		addStep(false, true);
	}
}