export const algorithmDescriptions: Record<string, string> = {
	// Sorting Algorithms
	"Bubble Sort":
		"Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. This process repeats until the list is sorted. Named for how smaller elements 'bubble' to the top of the list.",

	"Selection Sort":
		"Selection Sort divides the array into sorted and unsorted regions. It repeatedly finds the minimum element from the unsorted region and places it at the beginning of the unsorted region, expanding the sorted region by one element each iteration.",

	"Insertion Sort":
		"Insertion Sort builds the final sorted array one item at a time. It takes each element and inserts it into its correct position within the already sorted portion of the array, similar to sorting playing cards in your hands.",

	"Merge Sort":
		"Merge Sort uses a divide-and-conquer approach. It recursively divides the array into two halves until each sub-array has one element, then merges the sub-arrays back together in sorted order. Guaranteed O(n log n) time complexity.",

	"Quick Sort":
		"Quick Sort selects a 'pivot' element and partitions the array so that elements smaller than the pivot come before it, and larger elements come after. It then recursively sorts the sub-arrays. Average case O(n log n), widely used in practice.",

	"Heap Sort":
		"Heap Sort builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and rebuilds the heap until it's empty. The extracted elements form a sorted array. In-place sorting with O(n log n) time complexity.",

	"Shell Sort":
		"Shell Sort is an optimization of Insertion Sort that allows the exchange of items that are far apart. It starts by sorting elements at a large gap and progressively reduces the gap, finishing with a gap of 1 (regular insertion sort).",

	"Tree Sort":
		"Tree Sort builds a Binary Search Tree from the array elements, then performs an in-order traversal to retrieve elements in sorted order. The BST property ensures left subtree < root < right subtree, giving us sorted output.",

	"Tim Sort":
		"Tim Sort is a hybrid sorting algorithm derived from Merge Sort and Insertion Sort. It divides the array into small chunks, sorts them using Insertion Sort, then merges them using Merge Sort. Used in Python and Java's standard libraries.",

	"Cocktail Shaker Sort":
		"Cocktail Shaker Sort is a variation of Bubble Sort that sorts in both directions alternately. It passes through the list in one direction, then reverses and passes in the opposite direction, which can be more efficient than regular Bubble Sort.",

	"Counting Sort":
		"Counting Sort counts the number of occurrences of each distinct element, then uses arithmetic to determine each element's position in the output. Works in O(n+k) time where k is the range of input, but requires extra space for counting array.",

	"Radix Sort":
		"Radix Sort sorts numbers digit by digit, starting from the least significant digit to the most significant digit. It uses Counting Sort as a subroutine to sort digits. Works in O(d×n) time where d is the number of digits, non-comparison based.",

	// Searching Algorithms
	"Linear Search":
		"Linear Search sequentially checks each element in the array until a match is found or the entire array has been searched. Simple but inefficient for large datasets. Time complexity: O(n). Works on both sorted and unsorted arrays.",

	"Binary Search":
		"Binary Search works on sorted arrays by repeatedly dividing the search interval in half. It compares the target value to the middle element and eliminates half of the remaining elements. Time complexity: O(log n). Very efficient for large sorted datasets.",

	"Jump Search":
		"Jump Search works on sorted arrays by jumping ahead by fixed steps, then performing linear search in the block where the element is likely to be. Optimal jump size is √n. Time complexity: O(√n), better than linear search for large arrays.",

	"Interpolation Search":
		"Interpolation Search is an improved variant of Binary Search for uniformly distributed sorted arrays. It estimates the position of the target value using interpolation formula. Best case O(log log n), but can degrade to O(n) for non-uniform data.",

	"Exponential Search":
		"Exponential Search finds the range where the target element is present by exponentially increasing the index (1, 2, 4, 8, 16...), then performs Binary Search in that range. Time complexity: O(log n). Particularly useful for unbounded or infinite arrays.",

	"Fibonacci Search":
		"Fibonacci Search is similar to Binary Search but divides the array into unequal parts using Fibonacci numbers. It has advantages on large arrays because it uses addition and subtraction instead of division. Time complexity: O(log n).",

	// Graph Algorithms
	"Depth First Search (DFS)":
		"DFS explores as far as possible along each branch before backtracking. It uses a stack (or recursion) to track the path. Goes deep into the graph structure before exploring neighbors. Used for pathfinding, topological sorting, and detecting cycles.",

	"Breadth First Search (BFS)":
		"BFS explores all neighbors at the present depth before moving to nodes at the next depth level. It uses a queue to track nodes. Guarantees the shortest path in unweighted graphs. Used for shortest path problems and level-order traversal.",

	"Dijkstra's Algorithm":
		"Dijkstra's Algorithm finds the shortest path from a source node to all other nodes in a weighted graph with non-negative weights. It uses a priority queue to greedily select the closest unvisited node. Time complexity: O((V+E) log V) with a min-heap.",

	"A* Search":
		"A* Search is an informed search algorithm that uses heuristics to guide its search. It combines the actual cost from start (like Dijkstra) with an estimated cost to goal (heuristic) to find the optimal path efficiently. Widely used in game development and robotics.",

	"Uniform Cost Search":
		"Uniform Cost Search is similar to Dijkstra's Algorithm, expanding the node with the lowest path cost first. It guarantees finding the least-cost path. Unlike A*, it doesn't use heuristics. Useful when all paths need to be explored or heuristics aren't available.",

	// MST Algorithms
	"Prim's Algorithm":
		"Prim's Algorithm builds a Minimum Spanning Tree by starting from an arbitrary node and greedily adding the minimum-weight edge that connects a visited node to an unvisited node. It continues until all nodes are included in the tree. Uses a priority queue for efficiency with O((V+E) log V) time complexity.",

	"Kruskal's Algorithm":
		"Kruskal's Algorithm builds a Minimum Spanning Tree by sorting all edges by weight and greedily adding edges that don't create cycles, using a Union-Find data structure to detect cycles. It processes edges from smallest to largest weight until all nodes are connected. Time complexity: O(E log E) or O(E log V).",

	// Backtracking Algorithms
	"N-Queens Problem":
		"The N-Queens Problem places N chess queens on an N×N chessboard so that no two queens threaten each other (same row, column, or diagonal). Uses backtracking to try placing queens column by column, backtracking when a placement leads to a conflict. Demonstrates constraint satisfaction and exhaustive search with pruning.",

	"Sudoku Solver":
		"The Sudoku Solver fills a 9×9 grid so that each row, column, and 3×3 box contains digits 1-9 without repetition. Uses backtracking to try numbers in empty cells, recursively solving the rest of the puzzle, and backtracking when no valid number can be placed. Shows the power of constraint propagation and backtracking.",

	// Dynamic Programming Algorithms
	"0/1 Knapsack":
		"The 0/1 Knapsack Problem maximizes the value of items in a knapsack with weight capacity limit, where each item can be taken or left (0/1 choice). Uses dynamic programming with a 2D table where dp[i][w] represents the maximum value using the first i items with weight limit w. Time complexity: O(n×W) where n is items and W is capacity.",

	"Fibonacci Sequence (DP)":
		"The Fibonacci Sequence generates numbers where each number is the sum of the two preceding ones (0, 1, 1, 2, 3, 5, 8...). Dynamic Programming avoids redundant calculations by storing computed values in a table, reducing time complexity from exponential O(2ⁿ) to linear O(n). Demonstrates the power of memoization.",
};