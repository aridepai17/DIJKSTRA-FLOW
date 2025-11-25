"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	ArrowLeft,
	Play,
	RotateCcw,
	Pause,
	SkipBack,
	SkipForward,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { SortingVisualizer } from "@/components/visualizers/sorting-visualizer";
import { SearchingVisualizer } from "@/components/visualizers/searching-visualizer";
import { GraphVisualizer } from "@/components/visualizers/graph-visualizer";
import { MSTVisualizer } from "@/components/visualizers/mst-visualizer";
import { BacktrackingVisualizer } from "@/components/visualizers/backtracking-visualizer";
import { DPVisualizer } from "@/components/visualizers/dp-visualizer";
import { CodeSnippets } from "@/components/code-snippets";
import { algorithmDescriptions } from "@/lib/algorithm-descriptions";
import { CustomInputDialog } from "@/components/custom-input-dialog";

interface AlgorithmVisualizerProps {
	algorithm: {
		category: string;
		name: string;
	};
	onBack: () => void;
}

export function AlgorithmVisualizer({
	algorithm,
	onBack,
}: AlgorithmVisualizerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [key, setKey] = useState(0);
	const [speed, setSpeed] = useState(50);
	const [currentStep, setCurrentStep] = useState(0);
	const [customData, setCustomData] = useState<number[] | null>(null);

	const handleReset = () => {
		setKey((prev) => prev + 1);
		setIsPlaying(false);
		setCurrentStep(0);
		setCustomData(null);
	};

	const handleStepBack = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleStepForward = () => {
		if (currentStep < maxSteps) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const renderVisualizer = () => {
		const commonProps = {
			algorithm: algorithm.name,
			isPlaying,
			speed,
			onComplete: () => setIsPlaying(false),
			currentStep,
			setCurrentStep,
			setMaxSteps,
			customData,
		};

		if (algorithm.category === "Sorting Algorithms") {
			return <SortingVisualizer key={key} {...commonProps} />;
		} else if (algorithm.category === "Searching Algorithms") {
			return <SearchingVisualizer key={key} {...commonProps} />;
		} else if (algorithm.category === "Graph Algorithms") {
			return <GraphVisualizer key={key} {...commonProps} />;
		} else if (algorithm.category === "Minimum Spanning Tree") {
			return <MSTVisualizer key={key} {...commonProps} />;
		} else if (algorithm.category === "Backtracking") {
			return <BacktrackingVisualizer key={key} {...commonProps} />;
		} else if (algorithm.category === "Dynamic Programming") {
			return <DPVisualizer key={key} {...commonProps} />;
		}
	};

	const supportsCustomInput =
		algorithm.category === "Sorting Algorithms" ||
		algorithm.category === "Searching Algorithms" ||
		algorithm.category === "Graph Algorithms";

	return (
		<div className="space-y-4 sm:space-y-6">
			<div className="flex items-center justify-between">
				<Button
					variant="ghost"
					onClick={onBack}
					className="gap-2 -ml-2 sm:ml-3 touch-manipulation"
				>
					<ArrowLeft className="h-4 w-4" />
					<span className="hidden sm:inline">Back to Algorithms</span>
					<span className="sm:hidden">Back</span>
				</Button>
				{supportsCustomInput && (
					<CustomInputDialog
						category={algorithm.category}
						onSubmit={(data) => {
							setCustomData(data);
							setKey((prev) => prev + 1);
							setIsPlaying(false);
							setCurrentStep(0);
						}}
					/>
				)}
			</div>

			<div>
				<h2 className="text-2xl sm:text-3xl font-bold mb-1.5 sm:mb-2 text-balance">
					{algorithm.name}
				</h2>
				<p className="text-sm sm:text-base text-muted-foreground">
					{algorithm.category}
				</p>
			</div>

			<Tabs
				defaultValue="visualization"
				className="space-y-4 sm:space-y-6"
			>
				<TabsList className="grid w-full max-w-md grid-cols-2 h-10 sm:h-11">
					<TabsTrigger
						value="visualization"
						className="text-sm sm:text-base"
					>
						Visualization
					</TabsTrigger>
					<TabsTrigger value="code" className="text-sm sm:text-base">
						Code
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value="visualization"
					className="space-y-4 sm:space-y-6 lg:space-y-8"
				>
					<Card className="p-4 sm:p-6 lg:p-8 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col bg-card gap-4 sm:gap-6 lg:gap-8">
						<div className="w-full flex-1 flex items-center justify-center overflow-x-auto">
							{renderVisualizer()}
						</div>
						<div className="w-full flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
							<div className="flex items-center justify-center gap-2">
								<Button
									variant="outline"
									size="icon"
									onClick={handleStepBack}
									disabled={currentStep === 0 || isPlaying}
									className="h-9 w-9 sm:h-10 sm:w-10 touch-manipulation shrink-0 bg-transparent"
									title="Step Back"
								>
									<SkipBack className="h-4 w-4" />
								</Button>
								<div className="text-xs sm:text-sm font-medium text-muted-foreground min-w-[80px] sm:min-w-[100px] text-center">
									Step {currentStep} / {maxSteps}
								</div>
								<Button
									variant="outline"
									size="icon"
									onClick={handleStepForward}
									disabled={
										currentStep >= maxSteps || isPlaying
									}
									className="h-9 w-9 sm:h-10 sm:w-10 touch-manipulation shrink-0 bg-transparent"
									title="Step Forward"
								>
									<SkipForward className="h-4 w-4" />
								</Button>
							</div>

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
										className="gap-2 min-w-[100px] sm:min-w-[110px] h-10 sm:h-11 touch-manipulation text-sm sm:text-base"
									>
										{isPlaying ? (
											<>
												<Pause className="h-4 w-4" />
												Pause
											</>
										) : (
											<>
												<Play className="h-4 w-4" />
												Play
											</>
										)}
									</Button>
								</div>

								<div className="flex-1 flex items-center gap-3 sm:gap-4 min-w-0">
									<span className="text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
										Speed:
									</span>
									<Slider
										value={[speed]}
										onValueChange={(value) =>
											setSpeed(value[0])
										}
										min={1}
										max={100}
										step={1}
										className="flex-1 touch-manipulation"
									/>
									<span className="text-xs sm:text-sm font-medium text-muted-foreground w-8 sm:w-10 text-right shrink-0">
										{speed}
									</span>
								</div>
							</div>
						</div>
					</Card>

					<Card className="p-4 sm:p-5 lg:p-6">
						<h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
							How it works
						</h3>
						<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
							{algorithmDescriptions[algorithm.name] ||
								"Description coming soon."}
						</p>
					</Card>
				</TabsContent>

				<TabsContent value="code">
					<CodeSnippets algorithm={algorithm.name} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
