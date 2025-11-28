"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface BacktrackingVisualizerProps {
	algorithm: string;
	isPlaying: boolean;
	speed: number; // 0..100
	onComplete: () => void;
	currentStep: number;
	setCurrentStep: (step: number) => void;
	setMaxSteps: (steps: number) => void;
}

type CellState = "default" | "trying" | "success" | "backtrack" | "fixed";

interface Cell {
	value: number | string;
	state: CellState;
}

export function BacktrackingVisualizer({
	algorithm,
	isPlaying,
	speed,
	onComplete,
	currentStep,
	setCurrentStep,
	setMaxSteps,
}: BacktrackingVisualizerProps) {
	// board state shown in UI
	const [board, setBoard] = useState<Cell[][]>([]);
	const [attempts, setAttempts] = useState(0);
	const [backtracks, setBacktracks] = useState(0);
	const [solved, setSolved] = useState(false);
	const [boardSize, setBoardSize] = useState(0);

	// refs for animation and internal step tracking
	const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const stepsRef = useRef<
		Array<{
			board: Cell[][];
			attempts: number;
			backtracks: number;
			solved: boolean;
		}>
	>([]);
	const isInitializedRef = useRef(false);

	const isPlayingRef = useRef(isPlaying);
	const speedRef = useRef(speed);
	const internalStepRef = useRef(0);

	// keep refs in sync with props
	useEffect(() => {
		isPlayingRef.current = isPlaying;
	}, [isPlaying]);
	useEffect(() => {
		speedRef.current = speed;
	}, [speed]);

	const updateStep = useCallback(
		(step: number) => {
			if (step >= 0 && step < stepsRef.current.length) {
				const stepData = stepsRef.current[step];
				setBoard(stepData.board);
				setAttempts(stepData.attempts);
				setBacktracks(stepData.backtracks);
				setSolved(stepData.solved);
				internalStepRef.current = step;
			}
		},
		[setBoard, setAttempts, setBacktracks, setSolved]
	);

	// Initialize when algorithm changes
	useEffect(() => {
		isInitializedRef.current = false;

		if (algorithm === "N-Queens Problem") {
			// pick small deterministic sizes for reproducibility; keep a bit of variety
			const size = 4 + (Math.floor(Date.now() / 1000) % 3); // 4..6
			setBoardSize(size);
			const initialBoard = generateEmptyBoard(size);
			setBoard(initialBoard);
			stepsRef.current = generateNQueensSteps(size);
		} else {
			setBoardSize(9);
			const initialBoard = generateRandomSudokuBoard();
			setBoard(initialBoard);
			stepsRef.current = generateSudokuSteps(initialBoard);
		}

		setAttempts(0);
		setBacktracks(0);
		setSolved(false);
		internalStepRef.current = 0;

		// update parent controls
		const maxSteps = Math.max(0, stepsRef.current.length - 1);
		setMaxSteps(maxSteps);
		setCurrentStep(0);

		isInitializedRef.current = true;
	}, [algorithm, setCurrentStep, setMaxSteps]);

	// if parent changes step (eg button controls), sync
	useEffect(() => {
		if (
			isInitializedRef.current &&
			currentStep !== internalStepRef.current
		) {
			updateStep(currentStep);
		}
	}, [currentStep, updateStep]);

	// animation loop
	useEffect(() => {
		if (!isInitializedRef.current) return;

		let mounted = true;

		const animate = () => {
			if (!mounted) return;
			if (!isPlayingRef.current) return;

			const nextStep = internalStepRef.current + 1;
			const maxSteps = stepsRef.current.length - 1;

			if (nextStep <= maxSteps) {
				updateStep(nextStep);
				setCurrentStep(nextStep);

				const delay = Math.max(
					30,
					400 - Math.round((speedRef.current / 100) * 350)
				);
				animationRef.current = setTimeout(animate, delay);
			} else {
				// ensure timer cleared and notify completion
				if (animationRef.current) {
					clearTimeout(animationRef.current);
					animationRef.current = null;
				}
				onComplete();
			}
		};

		if (isPlaying) {
			const delay = Math.max(
				30,
				400 - Math.round((speedRef.current / 100) * 350)
			);
			animationRef.current = setTimeout(animate, delay);
		}

		return () => {
			mounted = false;
			if (animationRef.current) {
				clearTimeout(animationRef.current);
				animationRef.current = null;
			}
		};
	}, [isPlaying, onComplete, setCurrentStep, updateStep]);

	const cellSize =
		algorithm === "N-Queens Problem"
			? boardSize <= 5
				? "w-10 h-10 sm:w-12 sm:h-12"
				: "w-8 h-8 sm:w-10 sm:h-10"
			: "w-8 h-8 sm:w-9 sm:h-9";

	return (
		<div className="w-full space-y-4 sm:space-y-6">
			<div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
				<Badge
					variant="secondary"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					{algorithm === "N-Queens Problem"
						? `Board: ${boardSize}x${boardSize}`
						: "Sudoku 9x9"}
				</Badge>
				<Badge
					variant="secondary"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					Attempts: {attempts}
				</Badge>
				<Badge
					variant="outline"
					className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
				>
					Backtracks: {backtracks}
				</Badge>
				{solved && (
					<Badge className="bg-green-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
						Solved!
					</Badge>
				)}
			</div>

			<div className="flex justify-center overflow-x-auto px-2">
				<div
					className={`inline-grid gap-[px] sm:gap-[2px] p-1 sm:p-2 rounded-lg ${
						algorithm === "Sudoku Solver"
							? "bg-border"
							: "bg-transparent"
					}`}
				>
					{board.map((row, rowIndex) => (
						<div
							key={rowIndex}
							className="flex gap-[px] sm:gap-[2px]"
						>
							{row.map((cell, colIndex) => {
								const sudokuBorderRight =
									algorithm === "Sudoku Solver" &&
									(colIndex + 1) % 3 === 0 &&
									colIndex < 8;
								const sudokuBorderBottom =
									algorithm === "Sudoku Solver" &&
									(rowIndex + 1) % 3 === 0 &&
									rowIndex < 8;
								const isChessLight =
									algorithm === "N-Queens Problem" &&
									(rowIndex + colIndex) % 2 === 0;

								return (
									<div
										key={`${rowIndex}-${colIndex}`}
										className={`${cellSize} flex items-center justify-center text-xs sm:text-sm lg:text-base font-bold rounded transition-all duration-150 ${
											sudokuBorderRight ? "mr-1" : ""
										} ${sudokuBorderBottom ? "mb-1" : ""}`}
										style={{
											backgroundColor:
												cell.state === "trying"
													? "#3b82f6"
													: cell.state === "success"
													? "#10b981"
													: cell.state === "backtrack"
													? "#ef4444"
													: cell.state === "fixed"
													? "#6366f1"
													: algorithm ===
													  "N-Queens Problem"
													? isChessLight
														? "#e2e8f0"
														: "#94a3b8"
													: "#f1f5f9",
											color:
												cell.state === "default"
													? algorithm ===
													  "N-Queens Problem"
														? "#1e293b"
														: "#64748b"
													: cell.state === "fixed"
													? "#fff"
													: "#fff",
											transform:
												cell.state === "trying"
													? "scale(1.05)"
													: "scale(1)",
											boxShadow:
												cell.state === "trying"
													? "0 0 8px rgba(59, 130, 246, 0.5)"
													: "none",
										}}
									>
										{cell.value}
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>

			<div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-[10px] sm:text-xs flex-wrap px-2">
				{algorithm === "Sudoku Solver" && (
					<div className="flex items-center gap-1.5 sm:gap-2">
						<div
							className="w-3 h-3 sm:w-4 sm:h-4 rounded"
							style={{ backgroundColor: "#6366f1" }}
						/>
						<span>Fixed</span>
					</div>
				)}
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#3b82f6" }}
					/>
					<span>Trying</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#10b981" }}
					/>
					<span>Placed</span>
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<div
						className="w-3 h-3 sm:w-4 sm:h-4 rounded"
						style={{ backgroundColor: "#ef4444" }}
					/>
					<span>Conflict</span>
				</div>
			</div>
		</div>
	);
}

function generateEmptyBoard(size: number): Cell[][] {
	const board: Cell[][] = [];
	for (let i = 0; i < size; i++) {
		board[i] = [];
		for (let j = 0; j < size; j++) {
			board[i][j] = { value: "", state: "default" };
		}
	}
	return board;
}

// ---------------- N-Queens ----------------
function generateNQueensSteps(n: number) {
	const MAX_NQ_STEPS = 4000;
	const steps: Array<{
		board: Cell[][];
		attempts: number;
		backtracks: number;
		solved: boolean;
	}> = [];
	let attempts = 0;
	let backtracks = 0;

	const queens: number[] = new Array(n).fill(-1);

	const createBoard = (
		highlightCol?: number,
		highlightRow?: number,
		state?: "trying" | "backtrack"
	) => {
		const board: Cell[][] = [];
		for (let i = 0; i < n; i++) {
			board[i] = [];
			for (let j = 0; j < n; j++) {
				if (queens[j] === i) {
					board[i][j] = { value: "♛", state: "success" };
				} else {
					board[i][j] = { value: "", state: "default" };
				}
			}
		}
		if (highlightCol !== undefined && highlightRow !== undefined && state) {
			// don't override placed queens when highlighting
			if (queens[highlightCol] !== highlightRow) {
				board[highlightRow][highlightCol] = { value: "♛", state };
			}
		}
		return board;
	};

	const pushStep = (obj: {
		board: Cell[][];
		attempts: number;
		backtracks: number;
		solved: boolean;
	}) => {
		const last = steps[steps.length - 1];
		// basic dedupe (fast): compare attempts/backtracks and JSON of board
		if (!last) {
			steps.push(obj);
			return;
		}
		try {
			if (
				last.attempts === obj.attempts &&
				last.backtracks === obj.backtracks &&
				JSON.stringify(last.board) === JSON.stringify(obj.board)
			) {
				return; // skip identical
			}
		} catch (e) {
			// fallback: just push
		}
		if (steps.length < MAX_NQ_STEPS) steps.push(obj);
	};

	const saveStep = (
		solvedFlag = false,
		highlightCol?: number,
		highlightRow?: number,
		state?: "trying" | "backtrack"
	) => {
		pushStep({
			board: createBoard(highlightCol, highlightRow, state),
			attempts,
			backtracks,
			solved: solvedFlag,
		});
	};

	const isSafe = (row: number, col: number) => {
		for (let c = 0; c < col; c++) {
			const r = queens[c];
			if (r === -1) continue;
			if (r === row) return false;
			if (Math.abs(r - row) === Math.abs(c - col)) return false;
		}
		return true;
	};

	saveStep();

	const solve = (col: number): boolean => {
		if (col >= n) {
			// final
			const finalBoard = createBoard();
			steps.push({
				board: finalBoard,
				attempts,
				backtracks,
				solved: true,
			});
			return true;
		}

		for (let row = 0; row < n; row++) {
			attempts++;
			saveStep(false, col, row, "trying");

			if (isSafe(row, col)) {
				queens[col] = row;
				saveStep(false);

				if (solve(col + 1)) return true;

				// actual backtrack (removal after deeper failure)
				backtracks++;
				saveStep(false, col, row, "backtrack");
				queens[col] = -1;
				saveStep(false);
			} else {
				// show immediate conflict but do not count as backtrack
				saveStep(false, col, row, "backtrack");
			}
		}

		return false;
	};

	solve(0);

	if (steps.length === 0 || !steps[steps.length - 1].solved) saveStep(false);
	return steps;
}

// ---------------- Sudoku ----------------
function generateRandomSudokuBoard(): Cell[][] {
	// curated set of valid puzzles (unique or at least solvable) - replaced problematic entries
	const puzzles = [
		{
			puzzle: [
				[0, 0, 0, 2, 6, 0, 7, 0, 1],
				[6, 8, 0, 0, 7, 0, 0, 9, 0],
				[1, 9, 0, 0, 0, 4, 5, 0, 0],
				[8, 2, 0, 1, 0, 0, 0, 4, 0],
				[0, 0, 4, 6, 0, 2, 9, 0, 0],
				[0, 5, 0, 0, 0, 3, 0, 2, 8],
				[0, 0, 9, 3, 0, 0, 0, 7, 4],
				[0, 4, 0, 0, 5, 0, 0, 3, 6],
				[7, 0, 3, 0, 1, 8, 0, 0, 0],
			],
		},

		{
			puzzle: [
				[4, 0, 0, 0, 0, 0, 8, 0, 5],
				[0, 3, 0, 0, 0, 5, 0, 0, 0],
				[0, 0, 0, 2, 0, 0, 0, 0, 0],
				[0, 0, 7, 0, 4, 0, 0, 0, 0],
				[0, 0, 0, 6, 0, 8, 0, 0, 0],
				[0, 0, 0, 0, 1, 0, 7, 0, 0],
				[0, 0, 0, 0, 0, 4, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 2, 0],
				[3, 0, 1, 0, 0, 0, 0, 0, 8],
			],
		},
		{
			puzzle: [
				[2, 0, 0, 8, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 4, 3, 0],
				[0, 6, 0, 0, 7, 0, 0, 0, 2],
				[0, 0, 0, 0, 0, 0, 6, 0, 0],
				[0, 0, 0, 0, 0, 3, 0, 0, 5],
				[0, 0, 0, 0, 0, 0, 0, 1, 0],
				[0, 1, 0, 0, 0, 0, 0, 6, 0],
				[0, 0, 7, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 1, 0, 0, 4],
			],
		},

		{
			puzzle: [
				[1, 0, 0, 4, 8, 9, 0, 0, 6],
				[7, 3, 0, 0, 0, 0, 0, 4, 0],
				[0, 0, 0, 0, 0, 1, 2, 9, 5],
				[0, 0, 7, 1, 2, 0, 6, 0, 0],
				[5, 0, 0, 7, 0, 3, 0, 0, 8],
				[0, 0, 6, 0, 9, 5, 7, 0, 0],
				[9, 1, 4, 6, 0, 0, 0, 0, 0],
				[0, 2, 0, 0, 0, 0, 0, 3, 7],
				[8, 0, 0, 5, 1, 2, 0, 0, 4],
			],
		},

		{
			puzzle: [
				[0, 0, 1, 0, 0, 7, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 2],
				[9, 0, 0, 0, 0, 0, 0, 1, 0],
				[0, 0, 0, 0, 6, 0, 0, 0, 0],
				[0, 0, 0, 4, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 1, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 6, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
			],
		},
		{
			puzzle: [
				[0, 6, 0, 0, 0, 0, 2, 0, 0],
				[0, 0, 0, 0, 7, 0, 0, 0, 5],
				[0, 0, 0, 4, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 6, 0, 0, 0],
				[0, 0, 0, 0, 9, 0, 0, 0, 0],
				[3, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 2, 0],
				[0, 4, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 7, 0, 0, 0, 0, 0, 1],
			],
		},
	];

	const selected =
		puzzles[Math.floor(Math.abs((Date.now() / 1000) % puzzles.length))];
	const board: Cell[][] = [];
	for (let i = 0; i < 9; i++) {
		board[i] = [];
		for (let j = 0; j < 9; j++) {
			const val = selected.puzzle[i][j];
			board[i][j] = {
				value: val || "",
				state: val ? "fixed" : "default",
			};
		}
	}
	return board;
}

function generateSudokuSteps(initialBoard: Cell[][]) {
	const MAX_STEPS = 5000;
	const steps: Array<{
		board: Cell[][];
		attempts: number;
		backtracks: number;
		solved: boolean;
	}> = [];

	const grid: number[][] = [];
	const fixed: boolean[][] = [];
	for (let i = 0; i < 9; i++) {
		grid[i] = [];
		fixed[i] = [];
		for (let j = 0; j < 9; j++) {
			const val = initialBoard[i][j].value;
			grid[i][j] =
				typeof val === "number"
					? val
					: val === ""
					? 0
					: Number.parseInt(val as string) || 0;
			fixed[i][j] = initialBoard[i][j].state === "fixed";
		}
	}

	let attempts = 0;
	let backtracks = 0;

	const createBoardState = (
		highlightRow?: number,
		highlightCol?: number,
		highlightState?: "trying" | "backtrack" | "success"
	) => {
		const board: Cell[][] = [];
		for (let i = 0; i < 9; i++) {
			board[i] = [];
			for (let j = 0; j < 9; j++) {
				let state: CellState = "default";
				if (fixed[i][j]) state = "fixed";
				else if (grid[i][j] !== 0) state = "success";

				if (
					highlightRow === i &&
					highlightCol === j &&
					highlightState
				) {
					// do not override fixed cells
					if (!fixed[i][j]) state = highlightState;
				}

				board[i][j] = {
					value: grid[i][j] === 0 ? "" : grid[i][j],
					state,
				};
			}
		}
		return board;
	};

	const pushStep = (obj: {
		board: Cell[][];
		attempts: number;
		backtracks: number;
		solved: boolean;
	}) => {
		const last = steps[steps.length - 1];
		if (!last) {
			steps.push(obj);
			return;
		}
		try {
			if (
				last.attempts === obj.attempts &&
				last.backtracks === obj.backtracks &&
				JSON.stringify(last.board) === JSON.stringify(obj.board)
			)
				return;
		} catch (e) {}
		if (steps.length < MAX_STEPS) steps.push(obj);
	};

	const saveStep = (
		solvedFlag = false,
		highlightRow?: number,
		highlightCol?: number,
		highlightState?: "trying" | "backtrack" | "success"
	) => {
		pushStep({
			board: createBoardState(highlightRow, highlightCol, highlightState),
			attempts,
			backtracks,
			solved: solvedFlag,
		});
	};

	const isValid = (row: number, col: number, num: number) => {
		for (let c = 0; c < 9; c++)
			if (c !== col && grid[row][c] === num) return false;
		for (let r = 0; r < 9; r++)
			if (r !== row && grid[r][col] === num) return false;
		const boxRowStart = Math.floor(row / 3) * 3;
		const boxColStart = Math.floor(col / 3) * 3;
		for (let r = 0; r < 3; r++) {
			for (let c = 0; c < 3; c++) {
				const checkR = boxRowStart + r;
				const checkC = boxColStart + c;
				if (
					(checkR !== row || checkC !== col) &&
					grid[checkR][checkC] === num
				)
					return false;
			}
		}
		return true;
	};

	const findEmpty = (): [number, number] | null => {
		for (let i = 0; i < 9; i++)
			for (let j = 0; j < 9; j++) if (grid[i][j] === 0) return [i, j];
		return null;
	};

	saveStep();

	const solve = (): boolean => {
		const empty = findEmpty();
		if (!empty) {
			saveStep(true);
			return true;
		}
		const [row, col] = empty;

		for (let num = 1; num <= 9; num++) {
			attempts++;
			grid[row][col] = num;
			saveStep(false, row, col, "trying");

			if (isValid(row, col, num)) {
				if (solve()) return true;

				backtracks++;
				saveStep(false, row, col, "backtrack");
				grid[row][col] = 0;
			} else {
				backtracks++;
				saveStep(false, row, col, "backtrack");
				grid[row][col] = 0;
			}

			// safety: stop if steps exceed limit
			if (steps.length >= MAX_STEPS) return false;
		}

		grid[row][col] = 0;
		return false;
	};

	solve();

	if (steps.length > 0 && !steps[steps.length - 1].solved) saveStep(true);
	return steps;
}
