"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight, Search, ArrowDown, GitBranch, Network, Brain } from "lucide-react"

const algorithmCategories = [
    {
        title: "Sorting Algorithms",
        icon: ArrowDown,
        color: "text-chart-1",
        bgColor: "bg-chart-1/10",
        algorithms: [
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
            "Radix Sort"
        ],
    },
    {
        title: "Searching Algorithms",
        icon: Search,
        color: "text-chart-2",
        bgColor: "bg-chart-2/10",
        algorithms: [
            "Linear Search",
            "Binary Search",
            "Jump Search",
            "Interpolation Search",
            "Exponential Search",
            "Fibonacci Search"
        ],
    },
    {
        title: "Graph Algorithms",
        icon: GitBranch,
        color: "text-chart-3",
        bgColor: "bg-chart-3/10",
        algorithms: [
            "Depth First Search (DFS)",
            "Breadth First Search (BFS)",
            "Dijkstra's Algorithm",
            "A* Search",
            "Uniform Cost Search"
        ],
    },
    {
        title: "Minimum Spanning Tree",
        icon: Network,
        color: "text-chart-4",
        bgColor: "bg-chart-4/10",
        algorithms: [
            "Prim's Algorithm",
            "Kruskal's Algorithm"
        ],
    },
    {
        title: "Dynamic Programming",
        icon: Brain,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        algorithms: [
            "0/1 Knapsack Problem",
            "Fibonacci Sequence"
        ],
    },
]

interface AlgorithmSelectorProps {
    onSelect: (algorithm: { category: string; name: string }) => void
}

export function AlgorithmSelector({ onSelect }: AlgorithmSelectorProps) {
    return (
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {algorithmCategories.map((category) => (
                <Card key={category.title} className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
                    <div className={`${category.bgColor} border-b border-border/50 p-4 sm:p-5 lg:p-6`}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <div className={`${category.bgColor} rounded-lg p-2`}>
                                <category.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${category.color}`} />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold">{category.title}</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{category.algorithms.length} algorithms</p>
                    </div>
                    <div className="p-3 sm:p-4">
                        <div className="space-y-1.5 sm:space-y-2">
                            {category.algorithms.map((algorithm) => (
                                <button
                                    key={algorithm}
                                    onClick={() => onSelect({ category: category.title, name: algorithm })}
                                    className="flex w-full items-center justify-between rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm transition-colors hover:bg-accent active:bg-accent/80 group touch-manipulation"
                                >
                                    <span className="font-medium">{algorithm}</span>
                                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}