"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

interface CustomInputDialogProps {
	category: string;
	onSubmit: (data: number[]) => void;
}

export function CustomInputDialog({
	category,
	onSubmit,
}: CustomInputDialogProps) {
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = () => {
		if (
			category === "Sorting Algorithms" ||
			category === "Searching Algorithms"
		) {
			const numbers = inputValue
				.split(",")
				.map((n) => Number.parseInt(n.trim()))
				.filter((n) => !isNaN(n) && n >= 0 && n <= 100);

			if (numbers.length > 0) {
				onSubmit(numbers);
				setOpen(false);
				setInputValue("");
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="gap-1.5 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 touch-manipulation bg-transparent"
				>
					<Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
					<span className="hidden sm:inline">Custom Input</span>
					<span className="sm:hidden">Custom</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Custom Input</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="custom-data">
							Enter numbers (0-100, comma-separated)
						</Label>
						<Input
							id="custom-data"
							placeholder="eg., 45, 23, 67, 12, 89, 34"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<p className="text-xs text-muted-foreground">
							Example: 45, 23, 67, 12, 89, 34, 56, 78, 90, 11
						</p>
					</div>
					<div className="flex gap-2 justify-end">
						<Button
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button onClick={handleSubmit}>Apply</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}