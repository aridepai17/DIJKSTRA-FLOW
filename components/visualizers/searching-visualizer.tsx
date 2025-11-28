"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";

interface SearchingVisualizerProps {
	algorithm: string;
	isPlaying: boolean;
	speed: number;
	onComplete: () => void;
}

interface ArrayElement {
	value: number;
	state: "default" | "checking" | "found" | "notfound" | "range";
}

export function SearchingVisualizer({
	algorithm,
	isPlaying,
	speed,
	onComplete,
}: SearchingVisualizerProps) {
	const [array, setArray] = useState<ArrayElement[]>([]);
	const [target, setTarget] = useState<number>(0);
	const [comparisons, setComparisons] = useState(0);
	const [foundIndex, setFoundIndex] = useState<number>(-1);
	const animationRef = useRef<NodeJS.Timeout | null>(null);
	const stepsRef = useRef<
		Array<{ array: ArrayElement[]; comparison?: boolean; found?: number }>
	>([]);
	const currentStepRef = useRef(0);

	// Initialization array (sorted for most serach algorithms)
	useEffect(() => {
		const newArray = Array.from({ length: 20 }, (_, i) => ({
			value: (i + 1) * 5,
			state: "default" as const,
		}));
		setArray(newArray);

		// Pick a random target from the array
		const randomTarget =
			newArray[Math.floor(Math.random() * newArray.length)].value;
		setTarget(randomTarget);
		setComparisons(0);
		setFoundIndex(-1);
		currentStepRef.current = 0;

		// Generate steps based on algorithm
		stepsRef.current = generateSearchingSteps(
			newArray,
			randomTarget,
			algorithm
		);
	}, [algorithm]);

	// Animation loop
	useEffect(() => {
		if (isPlaying && currentStepRef.current < stepsRef.current.length) {
			// Speed 1 = 1000ms delay, Speed 100 = 50ms delay
			const delay = Math.max(50, 1000 - speed * 9.5);

			animationRef.current = setInterval(() => {
				const step = stepsRef.current[currentStepRef.current];
				setArray(step.array);

				if (step.comparison) {
					setComparisons((prev) => prev + 1);
				}
				if (step.found !== undefined) {
					setFoundIndex(step.found);
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
	}, [isPlaying, onComplete, speed]); // Added speed to dependency array

	return (
		<div className="w-full space-y-4 sm:space-y-6">
			<div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 flex-wrap px-2">
				<Badge
					variant="secondary"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					Target: {target}
				</Badge>
				<Badge
					variant="secondary"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					Comparisons: {comparisons}
				</Badge>
				<Badge
					variant={foundIndex !== -1 ? "default" : "destructive"}
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					{foundIndex !== -1
						? `Found at index ${foundIndex}`
						: "Searching..."}
				</Badge>
			</div>

			<div className="flex items-end justify-center gap-1 sm:gap-2 h-64 sm:h-72 lg:h-80 px-2 sm:px-4 overflow-x-auto">
				{array.map((item, index) => (
					<div
						key={index}
						className="flex-1 flex flex-col items-center gap-0.5 sm:gap-1 min-w-[25px] sm:min-w[35px] max-w-[50px]"
					>
						<div className="text-[9x] sm:text-xs font-semibold h-4 sm:h-5">
							{item.value}
						</div>
						<div
							className="w-full transition-all duration-300 rounded-t flex items-end justify-center pb-1 sm:pb-2"
							style={{
								height:
									window.innerWidth < 640 ? "200px" : "240px",
								backgroundColor:
									item.state === "checking"
										? "#3b82f6"
										: item.state === "found"
										? "#10b981"
										: item.state === "notfound"
										? "#ef4444"
										: item.state === "range"
										? "#8b5cf6"
										: "#e2e8f0",
								transform:
									item.state === "checking"
										? "scale(1.05)"
										: "scale(1)",
								boxShadow:
									item.state !== "default"
										? "0 4px 12px rgba(0,0,0,0.15)"
										: "none",
							}}
						>
							<span
								className="text-xs sm:text-sm font-bold"
								style={{
									color:
										item.state !== "default"
											? "white"
											: "#64748b",
								}}
							>
								{item.value}
							</span>
						</div>
						<div className="text-[8px] sm:text-[10px] font-bold text-muted-foreground h-4 bg-muted/50 px-1 sm:px-2 rounded">
							[{index}]
						</div>
					</div>
				))}
			</div>

			<div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-[10px] sm:text-xs flex-wrap px-2">
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#e2e8f0" }}
					/>
					<span>Default</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded "
						style={{ backgroundColor: "#3b82f6" }}
					/>
					<span>Checking</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#8b5cf6" }}
					/>
					<span>Range</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#10b981" }}
					/>
					<span>Found</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#ef4444" }}
					/>
					<span>Not Found</span>
				</div>
			</div>
		</div>
	);
}

// Helper function to generate searching steps
function generateSearchingSteps(
	initialArray: ArrayElement[],
	target: number,
	algorithm: string
): Array<{ array: ArrayElement[]; comparison?: boolean; found?: number }> {
	const steps: Array<{
		array: ArrayElement[];
		comparison?: boolean;
		found?: number;
	}> = [];
	const arr = initialArray.map((item) => ({ ...item }));

	const addStep = (comparison = false, found?: number) => {
		steps.push({
			array: arr.map((item) => ({ ...item })),
			comparison,
			found,
		});
	};

	const resetStates = () => {
		arr.forEach((item) => {
			item.state = "default";
		});
	};

	switch (algorithm) {
		case "Linear Search":
			linearSearch(arr, target, addStep, resetStates);
			break;
		case "Binary Search":
			binarySearch(arr, target, addStep, resetStates);
			break;
		case "Jump Search":
			jumpSearch(arr, target, addStep, resetStates);
			break;
		case "Interpolation Search":
			interpolationSearch(arr, target, addStep, resetStates);
			break;
		case "Exponential Search":
			exponentialSearch(arr, target, addStep, resetStates);
			break;
		case "Fibonacci Search":
			fibonacciSearch(arr, target, addStep, resetStates);
			break;
	}

	return steps;
}

// Search Algorithm implementations
function linearSearch(
	arr: ArrayElement[],
	target: number,
	addStep: (comparison?: boolean, found?: number) => void,
	resetStates: () => void
) {
	for (let i = 0; i < arr.length; i++) {
		resetStates();
		arr[i].state = "checking";
		addStep(true);

		if (arr[i].value === target) {
			arr[i].state = "found";
			addStep(false, i);
			return;
		} else {
			arr[i].state = "notfound";
			addStep();
		}
	}
}

function binarySearch(
	arr: ArrayElement[],
	target: number,
	addStep: (comparison?: boolean, found?: number) => void,
	resetStates: () => void
) {
	let left = 0;
	let right = arr.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		resetStates();
		for (let i = left; i <= right; i++) {
			arr[i].state = "range";
		}
		arr[mid].state = "checking";
		addStep(true);

		if (arr[mid].value === target) {
			arr[mid].state = "found";
			addStep(false, mid);
			return;
		} else if (arr[mid].value < target) {
			arr[mid].state = "notfound";
			left = mid + 1;
			addStep();
		} else {
			arr[mid].state = "notfound";
			right = mid - 1;
			addStep();
		}
	}

	resetStates();
	addStep(false, -1);
}

function jumpSearch(
	arr: ArrayElement[],
	target: number,
	addStep: (comparison?: boolean, found?: number) => void,
	resetStates: () => void
) {
	const n = arr.length;
	const step = Math.floor(Math.sqrt(n));
	let prev = 0;

	// Jump to find the block
	while (prev < n && arr[Math.min(step, n) - 1].value < target) {
		resetStates();
		const jumpIdx = Math.min(step, n) - 1;
		arr[jumpIdx].state = "checking";
		addStep(true);

		if (arr[jumpIdx].value < target) {
			arr[jumpIdx].state = "notfound";
			prev = step;
			addStep();
		}
	}

	// Linear search in the block
	for (let i = prev; i < Math.min(prev + step, n); i++) {
		resetStates();
		arr[i].state = "checking";
		addStep(true);

		if (arr[i].value === target) {
			arr[i].state = "found";
			addStep(false, i);
			return;
		} else {
			arr[i].state = "notfound";
			addStep();
		}
	}

	resetStates();
	addStep(false, -1);
}

function interpolationSearch(
	arr: ArrayElement[],
	target: number,
	addStep: (comparison?: boolean, found?: number) => void,
	resetStates: () => void
) {
	let low = 0;
	let high = arr.length - 1;

	while (
		low <= high &&
		target >= arr[low].value &&
		target <= arr[high].value
	) {
		if (low === high) {
			resetStates();
			arr[low].state = "checking";
			addStep(true);

			if (arr[low].value === target) {
				arr[low].state = "found";
				addStep(false, low);
				return;
			}
			break;
		}

		// Interpolation formula
		const pos =
			low +
			Math.floor(
				((target - arr[low].value) * (high - low)) /
					(arr[high].value - arr[low].value)
			);

		resetStates();
		for (let i = low; i <= high; i++) {
			arr[i].state = "range";
		}
		arr[pos].state = "checking";
		addStep(true);

		if (arr[pos].value === target) {
			arr[pos].state = "found";
			addStep(false, pos);
			return;
		}

		if (arr[pos].value < target) {
			arr[pos].state = "notfound";
			low = pos + 1;
			addStep();
		} else {
			arr[pos].state = "notfound";
			high = pos - 1;
			addStep();
		}
	}

	resetStates();
	addStep(false, -1);
}

function exponentialSearch(
	arr: ArrayElement[],
	target: number,
	addStep: (comparison?: boolean, found?: number) => void,
	resetStates: () => void
) {
	const n = arr.length;

	if (arr[0].value === target) {
		resetStates();
		arr[0].state = "found";
		addStep(true, 0);
		return;
	}

	// Find range for binary search
	let i = 1;
	while (i < n && arr[i].value <= target) {
		resetStates();
		arr[i].state = "checking";
		addStep(true);

		if (arr[i].value === target) {
			arr[i].state = "found";
			addStep(false, i);
			return;
		}

		arr[i].state = "notfound";
		addStep();
		i *= 2;
	}

	// Binary search in the found range
	binarySearchRange(
		arr,
		target,
		Math.floor(i / 2),
		Math.min(i, n - 1),
		addStep,
		resetStates
	);
}

function binarySearchRange(
	arr: ArrayElement[],
	target: number,
	left: number,
	right: number,
	addStep: (comparison?: boolean, found?: number) => void,
	resetStates: () => void
) {
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		resetStates();
		for (let i = left; i <= right; i++) {
			arr[i].state = "range";
		}
		arr[mid].state = "checking";
		addStep(true);

		if (arr[mid].value === target) {
			arr[mid].state = "found";
			addStep(false, mid);
			return;
		} else if (arr[mid].value < target) {
			arr[mid].state = "notfound";
			left = mid + 1;
			addStep();
		} else {
			arr[mid].state = "notfound";
			right = mid - 1;
			addStep();
		}
	}

	resetStates();
	addStep(false, -1);
}

function fibonacciSearch(
	arr: ArrayElement[],
	target: number,
	addStep: (comparison?: boolean, found?: number) => void,
	resetStates: () => void
) {
	const n = arr.length;
	let fibM2 = 0;
	let fibM1 = 1;
	let fibM = fibM2 + fibM1;

	// Find smallest Fibonacci >= n
	while (fibM < n) {
		fibM2 = fibM1;
		fibM1 = fibM;
		fibM = fibM2 + fibM1;
	}

	let offset = -1;

	while (fibM > 1) {
		const i = Math.min(offset + fibM2, n - 1);

		resetStates();
		arr[i].state = "checking";
		addStep(true);

		if (arr[i].value < target) {
			arr[i].state = "notfound";
			fibM = fibM1;
			fibM1 = fibM2;
			fibM2 = fibM - fibM1;
			offset = i;
			addStep();
		} else if (arr[i].value > target) {
			arr[i].state = "notfound";
			fibM = fibM2;
			fibM1 = fibM1 - fibM2;
			fibM2 = fibM - fibM1;
			addStep();
		} else {
			arr[i].state = "found";
			addStep(false, i);
			return;
		}
	}

	if (fibM1 && offset + 1 < n) {
		resetStates();
		arr[offset + 1].state = "checking";
		addStep(true);

		if (arr[offset + 1].value === target) {
			arr[offset + 1].state = "found";
			addStep(false, offset + 1);
			return;
		}
	}

	resetStates();
	addStep(false, -1);
}
