"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";

interface CustomInputDialogProps {
	category: string;
	onSubmit: (data: any) => void;
}

export function CustomInputDialog({
	category,
	onSubmit,
}: CustomInputDialogProps) {
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState("");

	const isGraph =
		category === "Graph Algorithms" || category === "Minimum Spanning Tree";

	const handleSubmit = () => {
		setError("");
		try {
			if (isGraph) {
				// Graph Input Parsing (JSON)
				const parsedData = JSON.parse(inputValue);
				if (!parsedData.nodes || !parsedData.edges) {
					throw new Error(
						"Graph must have 'nodes' and 'edges' arrays."
					);
				}
				onSubmit(parsedData);
				setOpen(false);
				setInputValue("");
			} else {
				// Array Input Parsing (Comma separated)
				const numbers = inputValue
					.split(/[\s,]+/)
					.map((n) => n.trim())
					.filter((n) => n !== "")
					.map((n) => Number(n));

				const invalidNumbers = numbers.filter((n) => isNaN(n));
				if (invalidNumbers.length > 0) {
					throw new Error("Input must contain only valid numbers.");
				}

				if (numbers.length > 0) {
					onSubmit(numbers);
					setOpen(false);
					setInputValue("");
				}
			}
		} catch (e: any) {
			setError(e.message || "Invalid input format");
		}
	};

	const getPlaceholder = () => {
		if (isGraph) {
			return '{\n  "nodes": [0, 1, 2],\n  "edges": [[0, 1, 5], [1, 2, 3]]\n}';
		}
		return "10, 45, 23, 8, 67...";
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="secondary"
					size="sm"
					className="gap-1.5 sm:gap-2 text-xs font-black sm:text-sm h-8 sm:h-9 touch-manipulation bg-background"
				>
					<Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
					<span className="hidden sm:inline">Custom Input</span>
					<span className="sm:hidden">Custom</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Custom Input</DialogTitle>
					<DialogDescription>
						{isGraph
							? "Provide a JSON object with nodes and edges."
							: "Enter numbers separated by commas or spaces."}
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="custom-data">
							{isGraph ? "Graph Data (JSON)" : "Array Data"}
						</Label>
						{isGraph ? (
							<Textarea
								id="custom-data"
								placeholder={getPlaceholder()}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className="font-mono text-xs h-[150px]"
							/>
						) : (
							<Input
								id="custom-data"
								placeholder="e.g., 45, 23, 67, 12"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
						)}

						{error && (
							<p className="text-xs text-destructive font-medium">
								{error}
							</p>
						)}
						<p className="text-xs text-muted-foreground">
							{isGraph
								? "Format: { nodes: number[], edges: [from, to, weight][] }"
								: "Enter integer values for sorting or searching."}
						</p>
					</div>
					<div className="flex gap-2 justify-end">
						<Button
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button onClick={handleSubmit}>Visualize</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
