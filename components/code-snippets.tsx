"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { codeSnippets } from "@/lib/code-snippets";

interface CodeSnippetsProps {
	algorithm: string;
}

export function CodeSnippets({ algorithm }: CodeSnippetsProps) {
	const snippets = codeSnippets[algorithm] || {
		javascript: "// Code snippet not available yet",
		python: "# Code snippet not available yet",
		java: "// Code snippet not available yet",
	};

	return (
		<Card className="overflow-hidden">
			<Tabs defaultValue="javascript">
				<div className="border-b border-border/50 bg-muted/20 px-2 sm:px-4 overflow-x-auto">
					<TabsList className="h-11 sm:h-12 bg-transparent">
						<TabsTrigger
							value="javascript"
							className="text-xs sm:text-sm"
						>
							JavaScript
						</TabsTrigger>
						<TabsTrigger
							value="python"
							className="text-xs sm:text-sm"
						>
							Python
						</TabsTrigger>
						<TabsTrigger
							value="java"
							className="text-xs sm:text-sm"
						>
							Java
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="javascript" className="m-0">
					<pre className="overflow-x-auto p-4 sm:p-6 text-xs sm:text-sm max-h-[60vh] overflow-y-auto">
						<code className="font-mono text-foreground">
							{snippets.javascript}
						</code>
					</pre>
				</TabsContent>

				<TabsContent value="python" className="m-0">
					<pre className="overflow-x-auto p-4 sm:p-6 text-xs sm:text-sm max-h-[60vh] overflow-y-auto">
						<code className="font-mono text-foreground">
							{snippets.python}
						</code>
					</pre>
				</TabsContent>

				<TabsContent value="java" className="m-0">
					<pre className="overflow-x-auto p-4 sm:p-6 text-xs sm:text-sm max-h-[60vh] overflow-y-auto">
						<code className="font-mono text-foreground">
							{snippets.java}
						</code>
					</pre>
				</TabsContent>
			</Tabs>
		</Card>
	);
}