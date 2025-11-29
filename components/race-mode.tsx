"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, RotateCcw, Pause } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// Updated list to include ALL implemented algorithms
const sortingAlgorithms = [
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
];

interface RaceModeProps {
	onBack: () => void;
}

interface ArrayBar {
	value: number;
	state: "default" | "comparing" | "swapping" | "sorted" | "pivot";
}

function RaceSortingVisualizer({
	algorithm,
	isPlaying,
	speed,
	sharedData,
	onStatsUpdate,
}: {
	algorithm: string;
	isPlaying: boolean;
	speed: number;
	sharedData: ArrayBar[];
	onStatsUpdate: (comparisons: number, swaps: number, done: boolean) => void;
}) {
	const [array, setArray] = useState<ArrayBar[]>([]);
	const [comparisons, setComparisons] = useState(0);
	const [swaps, setSwaps] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const [steps, setSteps] = useState<
		Array<{ array: ArrayBar[]; comparison?: boolean; swap?: boolean }>
	>([]);

	const onStatsUpdateRef = useRef(onStatsUpdate);
	useEffect(() => {
		onStatsUpdateRef.current = onStatsUpdate;
	});

	useEffect(() => {
		const newArray = sharedData.map((item) => ({ ...item }));
		setArray(newArray);
		setComparisons(0);
		setSwaps(0);
		setCurrentStep(0);
		setSteps(generateSortingSteps(newArray, algorithm));
	}, [sharedData, algorithm]);

	useEffect(() => {
		// FIX: Changed condition to >= steps.length so 'done' triggers only AFTER the final (green) step is rendered
		const isDone = currentStep >= steps.length && steps.length > 0;
		onStatsUpdateRef.current(comparisons, swaps, isDone);
	}, [comparisons, swaps, currentStep, steps.length]);

	useEffect(() => {
		if (isPlaying && currentStep < steps.length) {
			const delay = Math.max(10, 400 - speed * 3.9);
			const timer = setTimeout(() => {
				const step = steps[currentStep];
				setArray(step.array);
				if (step.comparison) setComparisons((prev) => prev + 1);
				if (step.swap) setSwaps((prev) => prev + 1);
				setCurrentStep((prev) => prev + 1);
			}, delay);
			return () => clearTimeout(timer);
		}
	}, [isPlaying, currentStep, steps, speed]);

	const maxValue = Math.max(...array.map((item) => item.value), 1);

	return (
		<div className="w-full space-y-3">
			<div className="flex items-end justify-center gap-px h-32 sm:h-40 lg:h-48">
				{array.map((item, index) => (
					<div
						key={index}
						// FIX: Added h-full and justify-end so percentage heights work correctly
						className="flex flex-col items-center min-w-0 h-full justify-end"
						style={{
							flex: `1 1 ${100 / array.length}%`,
							maxWidth: `${100 / array.length}%`,
						}}
					>
						<div className="text-[6px] sm:text-[8px] font-medium text-foreground/70 truncate w-full text-center">
							{item.value}
						</div>
						<div
							className="w-full transition-all duration-75 rounded-t"
							style={{
								// FIX: Adjusted to 85% max height to leave room for labels
								height: `${(item.value / maxValue) * 85}%`,
								minHeight: "4px",
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
							}}
						/>
						<div className="text-[5px] sm:text-[7px] text-muted-foreground truncate w-full text-center">
							{index}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function RaceMode({ onBack }: RaceModeProps) {
	const [algorithm1, setAlgorithm1] = useState("Bubble Sort");
	const [algorithm2, setAlgorithm2] = useState("Quick Sort");
	const [isPlaying, setIsPlaying] = useState(false);
	const [key, setKey] = useState(0);
	const [speed, setSpeed] = useState(50);
	const [sharedData, setSharedData] = useState<ArrayBar[]>([]);
	const [stats1, setStats1] = useState({
		comparisons: 0,
		swaps: 0,
		done: false,
	});
	const [stats2, setStats2] = useState({
		comparisons: 0,
		swaps: 0,
		done: false,
	});

	useEffect(() => {
		const newData = Array.from({ length: 15 }, () => ({
			value: Math.floor(Math.random() * 80) + 20,
			state: "default" as const,
		}));
		setSharedData(newData);
		setStats1({ comparisons: 0, swaps: 0, done: false });
		setStats2({ comparisons: 0, swaps: 0, done: false });
	}, [key]);

	// FIX: Only stop playing when BOTH algorithms are done.
	useEffect(() => {
		if (stats1.done && stats2.done) {
			setIsPlaying(false);
		}
	}, [stats1.done, stats2.done]);

	const handleReset = () => {
		setKey((prev) => prev + 1);
		setIsPlaying(false);
	};

	const handleStats1Update = useCallback(
		(c: number, s: number, d: boolean) => {
			setStats1({ comparisons: c, swaps: s, done: d });
		},
		[]
	);

	const handleStats2Update = useCallback(
		(c: number, s: number, d: boolean) => {
			setStats2({ comparisons: c, swaps: s, done: d });
		},
		[]
	);

	const getWinnerBadge = (
		algoStats: typeof stats1,
		otherStats: typeof stats1
	) => {
		// If this one isn't done, it can't be the winner yet.
		if (!algoStats.done) return null;

		// If this one IS done, check if it's the winner
		// Case 1: The other one is still running? Then this one definitely won (it finished first).
		if (!otherStats.done) {
			return (
				<Badge className="bg-green-500 text-white text-[10px] sm:text-xs font-bold animate-pulse">
					Winner!
				</Badge>
			);
		}

		// Case 2: Both are done? Compare efficiency (Comparisons, then Swaps).
		if (algoStats.comparisons < otherStats.comparisons) {
			return (
				<Badge className="bg-green-500 text-white text-[10px] sm:text-xs font-bold">
					Winner!
				</Badge>
			);
		}

		if (
			algoStats.comparisons === otherStats.comparisons &&
			algoStats.swaps < otherStats.swaps
		) {
			return (
				<Badge className="bg-green-500 text-white text-[10px] sm:text-xs font-bold">
					Winner!
				</Badge>
			);
		}

		return null;
	};

	return (
		<div className="space-y-4 sm:space-y-6">
			<div className="flex items-center justify-between">
				<Button
					variant="secondary"
					onClick={onBack}
					className="gap-2 h-11 px-5 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground transition-all font-black"
				>
					<ArrowLeft className="h-5 w-5" />
					<span className="hidden sm:inline">Back to Algorithms</span>
					<span className="sm:hidden">Back</span>
				</Button>
			</div>

			<div>
				<h2 className="text-2xl sm:text-3xl font-black mb-1.5 sm:mb-2 text-balance">
					Race Mode
				</h2>
				<p className="text-sm sm:text-base text-muted-foreground">
					Compare two algorithms side-by-side on the same dataset
				</p>
			</div>

			<div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
				{/* Left Algorithm Card */}
				<Card className="p-3 sm:p-4 lg:p-5 overflow-hidden border-border/60 shadow-sm">
					<div className="mb-3 flex items-center justify-between gap-2 flex-wrap">
						<Select
							value={algorithm1}
							onValueChange={setAlgorithm1}
						>
							<SelectTrigger className="w-[140px] sm:w-[180px] font-bold">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{sortingAlgorithms.map((algo) => (
									<SelectItem key={algo} value={algo}>
										{algo}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{getWinnerBadge(stats1, stats2)}
					</div>
					{sharedData.length > 0 && (
						<RaceSortingVisualizer
							key={`${key}-1-${algorithm1}`}
							algorithm={algorithm1}
							isPlaying={isPlaying}
							speed={speed}
							sharedData={sharedData}
							onStatsUpdate={handleStats1Update}
						/>
					)}
					<div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 flex-wrap">
						<Badge
							variant="secondary"
							className="text-[10px] sm:text-xs font-bold"
						>
							Comparisons: {stats1.comparisons}
						</Badge>
						<Badge
							variant="secondary"
							className="text-[10px] sm:text-xs font-bold"
						>
							Swaps: {stats1.swaps}
						</Badge>
					</div>
				</Card>

				{/* Right Algorithm Card */}
				<Card className="p-3 sm:p-4 lg:p-5 overflow-hidden border-border/60 shadow-sm">
					<div className="mb-3 flex items-center justify-between gap-2 flex-wrap">
						<Select
							value={algorithm2}
							onValueChange={setAlgorithm2}
						>
							<SelectTrigger className="w-[140px] sm:w-[180px] font-bold">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{sortingAlgorithms.map((algo) => (
									<SelectItem key={algo} value={algo}>
										{algo}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{getWinnerBadge(stats2, stats1)}
					</div>
					{sharedData.length > 0 && (
						<RaceSortingVisualizer
							key={`${key}-2-${algorithm2}`}
							algorithm={algorithm2}
							isPlaying={isPlaying}
							speed={speed}
							sharedData={sharedData}
							onStatsUpdate={handleStats2Update}
						/>
					)}
					<div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 flex-wrap">
						<Badge
							variant="secondary"
							className="text-[10px] sm:text-xs font-bold"
						>
							Comparisons: {stats2.comparisons}
						</Badge>
						<Badge
							variant="secondary"
							className="text-[10px] sm:text-xs font-bold"
						>
							Swaps: {stats2.swaps}
						</Badge>
					</div>
				</Card>
			</div>

			{/* Legend */}
			<div className="flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs flex-wrap font-bold text-muted-foreground">
				<div className="flex items-center gap-1.5">
					<div
						className="w-3 h-3 rounded"
						style={{ backgroundColor: "#64748b" }}
					/>
					<span>Default</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div
						className="w-3 h-3 rounded"
						style={{ backgroundColor: "#3b82f6" }}
					/>
					<span>Comparing</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div
						className="w-3 h-3 rounded"
						style={{ backgroundColor: "#f59e0b" }}
					/>
					<span>Swapping</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div
						className="w-3 h-3 rounded"
						style={{ backgroundColor: "#10b981" }}
					/>
					<span>Sorted</span>
				</div>
			</div>

			<Card className="p-4 sm:p-5 lg:p-6 border-border/60 shadow-sm">
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 lg:gap-6">
					<div className="flex items-center gap-2 justify-center sm:justify-start">
						<Button
							variant="outline"
							size="icon"
							onClick={handleReset}
							disabled={isPlaying}
							className="h-10 w-10 sm:h-11 sm:w-11 touch-manipulation shrink-0 bg-transparent"
						>
							<RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
						</Button>
						<Button
							onClick={() => setIsPlaying(!isPlaying)}
							className="gap-2 min-w-[100px] sm:min-w-[110px] h-10 sm:h-11 touch-manipulation text-sm sm:text-base font-black shadow-sm"
						>
							{isPlaying ? (
								<>
									<Pause className="h-4 w-4" />
									Pause
								</>
							) : (
								<>
									<Play className="h-4 w-4" />
									Race
								</>
							)}
						</Button>
					</div>

					<div className="flex-1 flex items-center gap-3 sm:gap-4 min-w-0">
						<span className="text-xs sm:text-sm font-black whitespace-nowrap shrink-0">
							Speed:
						</span>
						<Slider
							value={[speed]}
							onValueChange={(value) => setSpeed(value[0])}
							min={1}
							max={100}
							step={1}
							className="flex-1 touch-manipulation"
						/>
						<span className="text-xs sm:text-sm font-black text-muted-foreground w-8 sm:w-10 text-right shrink-0">
							{speed}
						</span>
					</div>
				</div>
			</Card>
		</div>
	);
}

// Sorting algorithm step generation (simplified for race mode)
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

	arr.forEach((item) => (item.state = "sorted"));
	addStep();

	return steps;
}

// Sorting algorithm implementations
function bubbleSort(
	arr: ArrayBar[],
	addStep: (c?: boolean, s?: boolean) => void,
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
	addStep: (c?: boolean, s?: boolean) => void,
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
			if (arr[j].value < arr[minIdx].value) minIdx = j;
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
	addStep: (c?: boolean, s?: boolean) => void,
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
			} else break;
		}
		arr[j + 1] = key;
	}
}

function mergeSort(
	arr: ArrayBar[],
	left: number,
	right: number,
	addStep: (c?: boolean, s?: boolean) => void,
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
	addStep: (c?: boolean, s?: boolean) => void,
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
	addStep: (c?: boolean, s?: boolean) => void,
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
	addStep: (c?: boolean, s?: boolean) => void,
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
	addStep: (c?: boolean, s?: boolean) => void,
	resetStates: () => void
) {
	const n = arr.length;
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
		heapify(arr, n, i, addStep, resetStates);
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
	addStep: (c?: boolean, s?: boolean) => void,
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
		if (arr[left].value > arr[largest].value) largest = left;
	}
	if (right < n) {
		resetStates();
		arr[right].state = "comparing";
		arr[largest].state = "comparing";
		addStep(true);
		if (arr[right].value > arr[largest].value) largest = right;
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
	addStep: (c?: boolean, s?: boolean) => void,
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
				} else break;
			}
			arr[j] = temp;
		}
		gap = Math.floor(gap / 2);
	}
}

function treeSort(
	arr: ArrayBar[],
	addStep: (c?: boolean, s?: boolean) => void,
	resetStates: () => void
) {
	// Using insertion sort as a simplified tree sort visualization
	insertionSort(arr, addStep, resetStates);
}

function timSort(
	arr: ArrayBar[],
	addStep: (c?: boolean, s?: boolean) => void,
	resetStates: () => void
) {
	const MIN_MERGE = 4;
	const n = arr.length;
	for (let i = 0; i < n; i += MIN_MERGE) {
		const end = Math.min(i + MIN_MERGE - 1, n - 1);
		for (let j = i + 1; j <= end; j++) {
			const key = arr[j];
			let k = j - 1;
			while (k >= i) {
				resetStates();
				arr[k].state = "comparing";
				arr[k + 1].state = "comparing";
				addStep(true);
				if (arr[k].value > key.value) {
					arr[k + 1] = arr[k];
					arr[k + 1].state = "swapping";
					addStep(false, true);
					k--;
				} else break;
			}
			arr[k + 1] = key;
		}
	}
	let size = MIN_MERGE;
	while (size < n) {
		for (let start = 0; start < n; start += 2 * size) {
			const mid = start + size - 1;
			const end = Math.min(start + 2 * size - 1, n - 1);
			if (mid < end) merge(arr, start, mid, end, addStep, resetStates);
		}
		size *= 2;
	}
}

function cocktailShakerSort(
	arr: ArrayBar[],
	addStep: (c?: boolean, s?: boolean) => void,
	resetStates: () => void
) {
	let swapped = true;
	let start = 0;
	let end = arr.length - 1;
	while (swapped) {
		swapped = false;
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
	addStep: (c?: boolean, s?: boolean) => void,
	resetStates: () => void
) {
	const max = Math.max(...arr.map((item) => item.value));
	const min = Math.min(...arr.map((item) => item.value));
	const range = max - min + 1;
	const count = new Array(range).fill(0);
	for (let i = 0; i < arr.length; i++) {
		resetStates();
		arr[i].state = "comparing";
		addStep(true);
		count[arr[i].value - min]++;
	}
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
	addStep: (c?: boolean, s?: boolean) => void,
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
	addStep: (c?: boolean, s?: boolean) => void,
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
