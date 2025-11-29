"use client";

import { useState, useEffect } from "react";
import { AlgorithmSelector } from "@/components/algorithm-selector";
import { AlgorithmVisualizer } from "@/components/algorithm-visualizer";
import { RaceMode } from "@/components/race-mode";
import { ThemeToggle } from "@/components/theme-toggle";
import { Code2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper component for the conditional grid background
const GridBackground = ({ children }: { children: React.ReactNode }) => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const checkTheme = () => {
			setIsDark(document.documentElement.classList.contains("dark"));
		};

		const observer = new MutationObserver(checkTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		checkTheme();
		return () => observer.disconnect();
	}, []);

	// Define Grid Styles based on theme
	const gridStyles = isDark
		? {
				backgroundColor: "var(--color-background)",
				backgroundImage: `
                linear-gradient(to right, var(--color-muted-foreground) 1px, transparent 1px),
                linear-gradient(to bottom, var(--color-muted-foreground) 1px, transparent 1px)
            `,
				backgroundSize: "40px 40px",
				opacity: 0.1,
		  }
		: {
				backgroundColor: "#ffffff",
				backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
				backgroundSize: "40px 40px",
				opacity: 1,
		  };

	return (
		<div className="relative min-h-screen">
			<div
				className="absolute inset-0 z-0 transition-opacity duration-500"
				style={gridStyles}
			/>
			<div className="relative z-10">{children}</div>
		</div>
	);
};

export default function Home() {
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<{
		category: string;
		name: string;
	} | null>(null);
	const [isRaceMode, setIsRaceMode] = useState(false);

	return (
		<GridBackground>
			<div className="min-h-screen bg-transparent">
				<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-sm">
					<div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 md:px-6">
						{/* LEFT SIDE: LOGO & TITLE */}
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary">
								<Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
							</div>
							<div>
								<h1 className="text-base sm:text-lg font-black">
									DijkstraFlow
								</h1>
								<p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
									Algorithm Visualizer
								</p>
							</div>
						</div>

						{/* RIGHT SIDE: CONTROLS */}
						<div className="flex items-center gap-2">
							{/* Race Mode Button - Only show if we aren't already deep in a visualizer */}
							{!selectedAlgorithm && (
								<Button
									variant={isRaceMode ? "default" : "outline"}
									size="sm"
									onClick={() => setIsRaceMode(!isRaceMode)} // FIX: Simple toggle, don't touch selectedAlgorithm
									className="gap-1.5 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 touch-manipulation font-bold"
								>
									<Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									<span className="hidden sm:inline font-black">
										Race Mode
									</span>
									<span className="sm:hidden">Race</span>
								</Button>
							)}
							<ThemeToggle />
						</div>
					</div>
				</header>

				<main className="container px-3 py-6 sm:px-4 sm:py-8 md:px-6 lg:py-10">
					<div className="mx-auto max-w-7xl">
						<div className="mb-8 sm:mb-10 lg:mb-12 text-center px-2">
							<h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-balance leading-tight">
								Visualize Algorithms
								<span className="block text-primary mt-1">
									In Real Time
								</span>
							</h2>
							<p className="mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground text-balance leading-relaxed font-black">
								Learn data structures and algorithms through
								interactive visualizations. <br />
								Perfect for students preparing for Computer
								Science and LeetCode.
							</p>
						</div>

						<div className="mx-auto max-w-5xl">
							{!selectedAlgorithm ? (
								isRaceMode ? (
									<RaceMode
										onBack={() => {
											setIsRaceMode(false);
											setSelectedAlgorithm(null);
										}}
									/>
								) : (
									<AlgorithmSelector
										onSelect={setSelectedAlgorithm}
									/>
								)
							) : (
								<AlgorithmVisualizer
									algorithm={selectedAlgorithm}
									onBack={() => {
										setSelectedAlgorithm(null);
										setIsRaceMode(false);
									}}
								/>
							)}
						</div>
					</div>
				</main>

				<footer className="mt-12 sm:mt-16 lg:mt-20 border-t border-border/40 py-6 sm:py-8">
					<div className="container px-3 sm:px-4 md:px-6 text-center text-xs sm:text-sm text-muted-foreground">
						<p className="leading-relaxed font-black">
							Built to help students master algorithms • All
							visualizations run in real-time
						</p>
					</div>
				</footer>
			</div>
		</GridBackground>
	);
}
