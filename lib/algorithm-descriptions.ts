export const algorithmDescriptions: Record<string, string> = {
	// Sorting Algorithms
	"Bubble Sort": `Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. This process repeats until the list is sorted. Named for how smaller elements 'bubble' to the top of the list.

Under the hood: Uses nested loops where the outer loop runs n-1 times and the inner loop compares adjacent pairs. After each pass, the largest unsorted element 'bubbles' to its correct position at the end.

The algorithm can be optimized with a flag to detect if any swaps occurred—if not, the array is already sorted. Space complexity: O(1) as it sorts in-place. Best case: O(n) when already sorted, Worst case: O(n²). Stable sort that preserves relative order of equal elements.`,

	"Selection Sort": `Selection Sort divides the array into sorted and unsorted regions. It repeatedly finds the minimum element from the unsorted region and places it at the beginning of the unsorted region, expanding the sorted region by one element each iteration.

Under the hood: Uses two nested loops. The outer loop maintains the boundary between sorted and unsorted regions. For each position i, the inner loop scans the remaining unsorted elements to find the minimum, then swaps it with element at position i.

Unlike Bubble Sort, it makes only O(n) swaps, making it useful when write operations are expensive. Always performs O(n²) comparisons regardless of input. Space complexity: O(1). Not stable by default, but can be made stable with modifications.`,

	"Insertion Sort": `Insertion Sort builds the final sorted array one item at a time. It takes each element and inserts it into its correct position within the already sorted portion of the array, similar to sorting playing cards in your hands.

Under the hood: Maintains a sorted subarray at the beginning. For each element, it shifts larger elements one position to the right until finding the correct insertion point. Uses a while loop to shift elements backwards.

Performs well on small datasets or nearly sorted data. Best case: O(n) for already sorted arrays (only comparisons, no shifts). Worst case: O(n²) for reverse-sorted arrays. Space complexity: O(1). Stable and adaptive (runs faster on partially sorted data). Efficient for small arrays, often used as the base case in hybrid algorithms like TimSort.`,

	"Merge Sort": `Merge Sort uses a divide-and-conquer approach. It recursively divides the array into two halves until each sub-array has one element, then merges the sub-arrays back together in sorted order. Guaranteed O(n log n) time complexity.

Under the hood: Recursively splits the array at midpoint until reaching base case (single element). The merge operation uses two pointers to traverse both subarrays, comparing elements and copying the smaller one to the result array.

Requires O(n) auxiliary space for temporary arrays during merging. The recursion depth is log n, and each level processes n elements, giving O(n log n). Not in-place but stable. Parallelizable and predictable performance makes it ideal for external sorting (sorting data that doesn't fit in memory).

The merge operation is the key: it takes two sorted arrays and produces one sorted array by maintaining indices for both input arrays and the output.`,

	"Quick Sort": `Quick Sort selects a 'pivot' element and partitions the array so that elements smaller than the pivot come before it, and larger elements come after. It then recursively sorts the sub-arrays. Average case O(n log n), widely used in practice.

Under the hood: The partition operation is crucial—it rearranges the array using two pointers (low and high) that move toward each other, swapping elements to ensure all elements less than pivot are on the left. Multiple pivot strategies exist: last element, first element, random, or median-of-three.

The algorithm is in-place (O(log n) space for recursion stack) but not stable. Worst case O(n²) occurs when the pivot is consistently the smallest or largest element (e.g., already sorted array with poor pivot choice). Randomized pivot selection makes worst case unlikely.

Cache-friendly due to sequential access patterns. Three-way partitioning (Dijkstra's flag algorithm) handles duplicate values efficiently.`,

	"Heap Sort": `Heap Sort builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and rebuilds the heap until it's empty. The extracted elements form a sorted array. In-place sorting with O(n log n) time complexity.

Under the hood: First builds a max heap using heapify operation in O(n) time by starting from the last non-leaf node and sifting down. The heap property ensures parent ≥ children. Then repeatedly swaps the root (maximum) with the last element, reduces heap size, and re-heapifies in O(log n).

Uses array representation where for element at index i: left child is at 2i+1, right child at 2i+2, parent at (i-1)/2. Total: O(n) build + O(n log n) extraction = O(n log n).

Not stable and has poor cache locality compared to Quick Sort, but guarantees O(n log n) worst case with O(1) space. The sift-down operation is key: compares parent with children and swaps with the larger child if needed, recursing down the tree.`,

	"Shell Sort": `Shell Sort is an optimization of Insertion Sort that allows the exchange of items that are far apart. It starts by sorting elements at a large gap and progressively reduces the gap, finishing with a gap of 1 (regular insertion sort).

Under the hood: Uses a gap sequence (e.g., Knuth's sequence: h = 3h+1, or Sedgewick's sequence) to divide the array into interleaved subarrays. For each gap, performs insertion sort on elements gap positions apart. As gaps decrease, the array becomes more sorted, making the final insertion sort pass (gap=1) very efficient.

The gap sequence dramatically affects performance—original Shell sequence gives O(n²), while better sequences achieve O(n^(3/2)) or even O(n log² n). Space complexity: O(1). Not stable.

The key insight is that sorting with large gaps moves elements close to their final position quickly, and smaller gaps then fine-tune. Adaptive and performs well on medium-sized arrays.`,

	"Tree Sort": `Tree Sort builds a Binary Search Tree from the array elements, then performs an in-order traversal to retrieve elements in sorted order. The BST property ensures left subtree < root < right subtree, giving us sorted output.

Under the hood: Each insertion into a BST compares the element with nodes starting from root, going left if smaller or right if larger, until finding an empty spot. This builds the tree structure. In-order traversal (left-root-right) naturally produces sorted sequence due to BST property.

Average case O(n log n) when tree is balanced, but degrades to O(n²) for skewed trees (e.g., inserting sorted data creates a linked list). Space complexity: O(n) for the tree structure. Not in-place and not stable by default.

Can be improved using self-balancing trees (AVL, Red-Black) to guarantee O(n log n). The traversal is implemented recursively: visit left subtree, process current node, visit right subtree.`,

	"Tim Sort": `Tim Sort is a hybrid sorting algorithm derived from Merge Sort and Insertion Sort. It divides the array into small chunks called 'runs', sorts them using Insertion Sort, then merges them using Merge Sort. Used in Python and Java's standard libraries.

Under the hood: Identifies 'natural runs' (already sorted sequences) or creates runs of minimum size (32-64 elements) using binary insertion sort. Maintains a stack of runs and uses sophisticated merging strategy based on run lengths to maintain balance (ensures merge operations are efficient).

The key insight is that real-world data often has ordered subsequences—TimSort exploits this. Uses galloping mode during merge: when one run is consistently winning, switches to exponential search to find the merge point quickly.

Space complexity: O(n) for merge buffer. Stable sort. Best case: O(n) for already sorted data, Worst case: O(n log n). Adaptive to patterns in data. The merge policy ensures pending runs satisfy invariants that keep merge cost low.`,

	"Cocktail Shaker Sort": `Cocktail Shaker Sort is a variation of Bubble Sort that sorts in both directions alternately. It passes through the list in one direction, then reverses and passes in the opposite direction, which can be more efficient than regular Bubble Sort.

Under the hood: Uses two phases per iteration. Forward pass bubbles largest element to the end, backward pass bubbles smallest element to the beginning. Maintains two boundaries (start and end) that shrink toward center after each bidirectional pass.

This bidirectional approach can move turtles (small values at the end) faster than standard Bubble Sort, which only moves them one position per complete pass. Can be optimized by remembering the last swap position to adjust boundaries.

Space complexity: O(1). Stable sort. Time complexity still O(n²) worst case, but practical performance is better than Bubble Sort on certain inputs, particularly when small elements are at the end. Also called Bidirectional Bubble Sort or Shaker Sort.`,

	"Counting Sort": `Counting Sort counts the number of occurrences of each distinct element, then uses arithmetic to determine each element's position in the output. Works in O(n+k) time where k is the range of input, but requires extra space for counting array.

Under the hood: First pass finds the range (min to max). Creates a counting array of size (max-min+1) initialized to zero. Second pass increments count[element-min] for each element in input.

Third pass transforms counts into actual positions by cumulative sum: count[i] += count[i-1], giving the last position where each value should appear. Final pass places elements into output array at count[element]-- position, decrementing count for duplicates.

Space complexity: O(n+k). Stable when implemented correctly (processing input from right to left). Not comparison-based, hence can beat O(n log n) bound. Only works for integer-like data within a reasonable range. Used as subroutine in Radix Sort. The cumulative sum trick is key: it converts counts into positions.`,

	"Radix Sort": `Radix Sort sorts numbers digit by digit, starting from the least significant digit (LSD) to the most significant digit (MSD). It uses Counting Sort as a subroutine to sort digits. Works in O(d×n) time where d is the number of digits, non-comparison based.

Under the hood: LSD approach processes digits from right to left. For each digit position, uses stable Counting Sort (0-9 for base 10) to sort the array based on that digit only. After d passes, the array is fully sorted. Stability is crucial—earlier sorts must be preserved.

Can use any base (binary for computers is efficient). MSD variant processes from left to right, can short-circuit and be more cache-friendly but requires partitioning.

Space complexity: O(n+k) where k is the base (usually 10). Works on integers, strings, and other data representable as sequences of digits. Time complexity O(d×(n+k)) where d is number of digits. Beats comparison sorts when d is small.

The key insight: sorting by individual digits with a stable sort eventually produces a fully sorted array due to positional value system.`,

	// Searching Algorithms
	"Linear Search": `Linear Search sequentially checks each element in the array until a match is found or the entire array has been searched. Simple but inefficient for large datasets. Time complexity: O(n). Works on both sorted and unsorted arrays.

Under the hood: Uses a single loop with an index variable starting at 0. Compares each element with the target value. Returns index immediately on match, or -1/null after checking all elements. No preprocessing required. Can short-circuit on first match.

Space complexity: O(1). Can be optimized with sentinel search (add target at end to eliminate end-of-array check in loop) or by searching from both ends simultaneously.

Useful when data is unsorted, dataset is small, or element is likely near the beginning. Also used when only a single search will be performed (sorting overhead not justified). The simplest search algorithm—just iterate and compare.`,

	"Binary Search": `Binary Search works on sorted arrays by repeatedly dividing the search interval in half. It compares the target value to the middle element and eliminates half of the remaining elements. Time complexity: O(log n). Very efficient for large sorted datasets.

Under the hood: Maintains two pointers (low and high) representing the current search range. Calculates mid = low + (high-low)/2 to avoid integer overflow. If array[mid] equals target, return mid. If target < array[mid], search left half (high = mid-1). If target > array[mid], search right half (low = mid+1). Terminates when low > high.

Can be implemented iteratively (O(1) space) or recursively (O(log n) space for call stack). Requires sorted data—this is crucial. The logarithmic behavior comes from halving the search space each iteration (log₂ n iterations max).

Variants include finding first/last occurrence, or insertion point for target. The mid calculation avoiding overflow is important: mid = low + (high-low)/2 instead of (low+high)/2.`,

	"Jump Search": `Jump Search works on sorted arrays by jumping ahead by fixed steps, then performing linear search in the block where the element is likely to be. Optimal jump size is √n. Time complexity: O(√n), better than linear search for large arrays.

Under the hood: First determines the block size (step = √n). Jumps forward by step size while array[min(step, n)-1] < target, tracking the previous jump position. Once finding a block where array[jump] ≥ target, performs linear search backward from jump to prev position.

Makes O(√n) jumps and O(√n) linear searches in worst case. Requires sorted array. Space complexity: O(1).

Advantage over Binary Search: simpler to implement and better for systems where jumping backward is costly (like linked lists or tapes). Works well with systems where sequential access is faster than random access. The √n block size is optimal: larger blocks increase linear search time, smaller blocks increase number of jumps.`,

	"Interpolation Search": `Interpolation Search is an improved variant of Binary Search for uniformly distributed sorted arrays. It estimates the position of the target value using interpolation formula. Best case O(log log n), but can degrade to O(n) for non-uniform data.

Under the hood: Instead of always checking the middle element, estimates position using the formula: pos = low + ((target - arr[low]) × (high - low)) / (arr[high] - arr[low]). This interpolation assumes uniform distribution and calculates where target would be proportionally.

Works like looking up a name in a phone book—if searching for 'Smith', you start near the end, not the middle. If arr[pos] equals target, return pos. If target < arr[pos], search left (high = pos-1). If target > arr[pos], search right (low = pos+1).

Requires sorted array and works best with uniformly distributed numerical data. Degrades to O(n) when data is clustered or non-uniform. Must handle edge cases: division by zero when arr[high] == arr[low], and ensuring pos stays in bounds.

Space complexity: O(1) iterative, O(log log n) recursive.`,

	"Exponential Search": `Exponential Search finds the range where the target element is present by exponentially increasing the index (1, 2, 4, 8, 16...), then performs Binary Search in that range. Time complexity: O(log n). Particularly useful for unbounded or infinite arrays.

Under the hood: First checks if target is at position 0. Then finds range by repeatedly doubling the index i (1, 2, 4, 8, 16...) until arr[i] ≥ target or i ≥ array length. This takes O(log i) time where i is the position where target would be found.

Once range [i/2, min(i, n-1)] is identified, performs Binary Search in that range. The exponential phase is efficient because it quickly jumps over large portions of the array. Total time: O(log i) exponential search + O(log i) binary search = O(log i) ≤ O(log n).

Space complexity: O(1). Advantages: works on unbounded arrays (where size is unknown), finds the range quickly if target is near the beginning. Better than Binary Search when target is closer to the beginning. The doubling strategy ensures we don't overshoot by too much.`,

	"Fibonacci Search": `Fibonacci Search is similar to Binary Search but divides the array into unequal parts using Fibonacci numbers. It has advantages on large arrays because it uses addition and subtraction instead of division. Time complexity: O(log n).

Under the hood: Uses three consecutive Fibonacci numbers (fibM, fibM-1, fibM-2) where fibM ≥ array length. Maintains offset to track eliminated portion of array. Compares target with arr[min(offset + fibM-2, n-1)].

If match, return index. If target < arr[i], move fibM and offset down by two Fibonacci numbers (equivalent to moving to left subarray). If target > arr[i], move down by one Fibonacci number and update offset (right subarray).

The Fibonacci numbers create a division ratio of approximately the golden ratio (1.618...). Continues until fibM becomes 1.

Advantages: uses only addition/subtraction (no division or multiplication, faster on some hardware), cache-friendly sequential access. Space complexity: O(1). The key is maintaining the Fibonacci sequence and offset carefully. Works on sorted arrays.`,

	// Graph Algorithms
	"Depth First Search (DFS)": `DFS explores as far as possible along each branch before backtracking. It uses a stack (or recursion) to track the path. Goes deep into the graph structure before exploring neighbors. Used for pathfinding, topological sorting, and detecting cycles.

Under the hood: Maintains a visited set to track explored nodes. Recursive implementation uses call stack implicitly; iterative uses explicit stack. Starting from a source node, marks it visited and recursively visits each unvisited neighbor. Backtracks when reaching a node with no unvisited neighbors.

Time complexity: O(V+E) where V is vertices and E is edges—visits each vertex once and explores each edge once. Space complexity: O(V) for visited set and stack (recursion depth can be V in worst case).

For graphs represented as adjacency lists, exploring neighbors is efficient. Can be modified to detect cycles (if visiting a visited node that's not the parent, cycle exists), find connected components, or perform topological sort.

The order of visiting neighbors affects the traversal path. Doesn't guarantee shortest path in weighted graphs.`,

	"Breadth First Search (BFS)": `BFS explores all neighbors at the present depth before moving to nodes at the next depth level. It uses a queue to track nodes. Guarantees the shortest path in unweighted graphs. Used for shortest path problems and level-order traversal.

Under the hood: Uses a queue (FIFO) and a visited set. Starts by enqueueing the source node and marking it visited. In each iteration, dequeues a node, explores all its unvisited neighbors, marks them visited, and enqueues them. This level-by-level exploration ensures nodes are visited in order of their distance from source.

Time complexity: O(V+E). Space complexity: O(V) for queue and visited set. In worst case (like a star graph), queue might hold O(V) nodes.

For adjacency list representation, efficiently explores neighbors. BFS tree formed during traversal contains shortest paths from source. Can be used to find connected components, test bipartiteness (color nodes with two colors, conflict means not bipartite), or find shortest path in unweighted graphs.

The queue discipline (FIFO) is what makes it explore level by level.`,

	"Dijkstra's Algorithm": `Dijkstra's Algorithm finds the shortest path from a source node to all other nodes in a weighted graph with non-negative weights. It uses a priority queue to greedily select the closest unvisited node. Time complexity: O((V+E) log V) with a min-heap.

Under the hood: Initializes distances to all nodes as infinity except source (distance 0). Uses a min-heap priority queue containing (distance, node) pairs. In each iteration, extracts the node u with minimum distance, and for each neighbor v of u, checks if path through u is shorter: if dist[u] + weight(u,v) < dist[v], updates dist[v] and adds to queue (relaxation step).

Marks nodes as visited/finalized once extracted from queue. Continues until queue is empty or target is reached (for single target). The greedy choice (always process closest node) guarantees correctness for non-negative weights.

Time: O((V+E) log V) because each vertex is extracted once (V log V), and each edge is relaxed once (E log V for updates). Space: O(V) for distance array and queue.

Doesn't work with negative edges (Bellman-Ford needed). Can reconstruct path by tracking predecessor of each node during relaxation.`,

	"A* Search": `A* Search is an informed search algorithm that uses heuristics to guide its search. It combines the actual cost from start (like Dijkstra) with an estimated cost to goal (heuristic) to find the optimal path efficiently. Widely used in game development and robotics.

Under the hood: Uses a priority queue ordered by f(n) = g(n) + h(n), where g(n) is actual cost from start to node n, and h(n) is heuristic estimate from n to goal. The heuristic must be admissible (never overestimates) for optimality. Common heuristics: Manhattan distance for grid, Euclidean distance for geometric space.

Initializes start node with g=0, h=heuristic(start). Extracts node with lowest f-value, relaxes neighbors by calculating g(neighbor) = g(current) + edge_cost and f(neighbor) = g(neighbor) + h(neighbor). Maintains open set (to be explored) and closed set (already explored). Terminates when goal is extracted or open set is empty.

The heuristic guides search toward goal, making it much faster than Dijkstra for single-target searches. If h(n)=0, reduces to Dijkstra. If h(n) is consistent (triangle inequality holds), guarantees optimal path.

Time/space complexity depends on heuristic quality: good heuristics dramatically reduce explored nodes.`,

	"Uniform Cost Search": `Uniform Cost Search is similar to Dijkstra's Algorithm, expanding the node with the lowest path cost first. It guarantees finding the least-cost path. Unlike A*, it doesn't use heuristics. Useful when all paths need to be explored or heuristics aren't available.

Under the hood: Identical to Dijkstra's Algorithm but conceptualized as a tree search (doesn't assume graph structure). Uses a priority queue ordered by cumulative path cost g(n). Starts with source node at cost 0. Extracts node with minimum cost, checks if it's the goal (goal test during expansion, not insertion).

Expands node by generating successors, calculating their cumulative costs g(successor) = g(node) + edge_cost, and inserting into queue if not visited or if found with lower cost. Unlike BFS, doesn't guarantee fewest edges, but guarantees minimum cost.

Time complexity: O(b^(C*/ε)) where b is branching factor, C* is optimal cost, ε is minimum edge cost. With proper visited tracking, similar to Dijkstra: O((V+E) log V). Space: O(V) for queue and visited set.

Completeness and optimality guaranteed for non-negative edge weights. The key difference from Dijkstra is conceptual: UCS is a search algorithm, while Dijkstra is typically presented as shortest path algorithm computing all distances.`,

	// MST Algorithms
	"Prim's Algorithm": `Prim's Algorithm builds a Minimum Spanning Tree by starting from an arbitrary node and greedily adding the minimum-weight edge that connects a visited node to an unvisited node. It continues until all nodes are included in the tree. Uses a priority queue for efficiency with O((V+E) log V) time complexity.

Under the hood: Starts with an arbitrary vertex as the initial tree. Maintains a min-heap containing edges from visited to unvisited nodes, keyed by edge weight. Also maintains a visited set and an array tracking minimum edge weight to reach each unvisited vertex.

In each iteration, extracts the minimum-weight edge connecting to an unvisited vertex, adds that vertex to the MST, and updates the priority queue with edges from the newly added vertex. The key insight: at each step, adds the minimum-weight edge that expands the tree, guaranteeing the overall MST (cut property of MSTs).

For each vertex v, maintains key[v] = minimum weight of any edge connecting v to the tree. When v is added to tree, updates keys of its neighbors.

Time: O((V+E) log V) with binary heap, O(E + V log V) with Fibonacci heap. Space: O(V) for keys and visited set, O(E) for priority queue in worst case. Works on connected, weighted, undirected graphs. The algorithm grows a single tree from a starting vertex.`,

	"Kruskal's Algorithm": `Kruskal's Algorithm builds a Minimum Spanning Tree by sorting all edges by weight and greedily adding edges that don't create cycles, using a Union-Find data structure to detect cycles. It processes edges from smallest to largest weight until all nodes are connected. Time complexity: O(E log E) or O(E log V).

Under the hood: First sorts all edges by weight in ascending order: O(E log E). Initializes Union-Find structure where each vertex is its own set. Iterates through sorted edges, and for each edge (u,v): uses Find to check if u and v are in the same set (would create cycle). If in different sets, adds edge to MST and performs Union to merge the sets.

Continues until MST has V-1 edges (spanning tree property). Union-Find operations (with path compression and union by rank) take nearly O(1) amortized time per operation.

Time complexity: O(E log E) for sorting dominates. Since E ≤ V², log E = O(log V²) = O(2 log V) = O(log V), also written as O(E log V). Space: O(V) for Union-Find structure.

Works on disconnected graphs too (produces minimum spanning forest). The greedy choice (always add minimum-weight edge that doesn't create cycle) guarantees MST by the cycle property. Processes edges globally, unlike Prim's vertex-centric approach.`,

	// Backtracking Algorithms
	"N-Queens Problem": `The N-Queens Problem places N chess queens on an N×N chessboard so that no two queens threaten each other (same row, column, or diagonal). Uses backtracking to try placing queens column by column, backtracking when a placement leads to a conflict. Demonstrates constraint satisfaction and exhaustive search with pruning.

Under the hood: Uses recursive backtracking. Places queens column by column (ensures different columns automatically). For each column, tries each row position. Before placing queen at (row, col), checks three constraints: (1) no queen in same row (track with boolean array), (2) no queen in same diagonal (track ascending diagonal by row-col, descending by row+col), (3) column constraint satisfied by construction.

If position is safe, places queen, marks constraints, and recursively solves for next column. If recursion succeeds, solution found. If all rows tried without success, backtracks by removing queen and unmarking constraints. Base case: all N queens placed successfully.

Time complexity: O(N!) in worst case, though pruning significantly reduces actual search space. Space: O(N) for recursion stack and constraint tracking arrays. Can optimize by using bitwise operations for constraint checking.

The problem demonstrates combinatorial explosion and the power of constraint propagation in pruning search space.`,

	"Sudoku Solver": `The Sudoku Solver fills a 9×9 grid so that each row, column, and 3×3 box contains digits 1-9 without repetition. Uses backtracking to try numbers in empty cells, recursively solving the rest of the puzzle, and backtracking when no valid number can be placed. Shows the power of constraint propagation and backtracking.

Under the hood: Finds the next empty cell (typically left-to-right, top-to-bottom). For each digit 1-9, checks if it's valid at that position by verifying: (1) not in the same row, (2) not in the same column, (3) not in the same 3×3 box (box index calculated as (row/3)*3 + col/3).

If valid, places digit and recursively solves the remaining puzzle. If recursion returns true, puzzle solved. If all digits fail, backtracks by removing the digit and returning false. Base case: no empty cells remain (solved).

Can optimize by choosing empty cell with fewest possibilities (most constrained first) or using constraint propagation techniques (naked singles, hidden singles) before backtracking.

Time complexity: O(9^m) where m is empty cells, but heavily pruned in practice. Space: O(m) recursion depth. Can use bitsets for efficient constraint checking (each row, column, box has 9 bits indicating used digits).

The algorithm demonstrates systematic exploration of solution space with intelligent pruning.`,

	// Dynamic Programming Algorithms
	"0/1 Knapsack Problem": `The 0/1 Knapsack Problem maximizes the value of items in a knapsack with weight capacity limit, where each item can be taken or left (0/1 choice). Uses dynamic programming with a 2D table where dp[i][w] represents the maximum value using the first i items with weight limit w. Time complexity: O(n×W) where n is items and W is capacity.

Under the hood: Builds a 2D table dp[n+1][W+1] where dp[i][w] = maximum value achievable using items 0 to i-1 with capacity w. Base case: dp[0][w] = 0 (no items) and dp[i][0] = 0 (no capacity).

Recurrence: for each item i and capacity w: if item weight > w, can't include it: dp[i][w] = dp[i-1][w]. Otherwise, choose maximum of: (a) not including item i: dp[i-1][w], or (b) including item i: value[i-1] + dp[i-1][w-weight[i-1]]. The second option adds item's value plus the best value achievable with remaining capacity.

After filling table, dp[n][W] contains maximum value. Can reconstruct solution by backtracking through table: if dp[i][w] ≠ dp[i-1][w], item i-1 was included.

Space: O(n×W), can optimize to O(W) using rolling array since only previous row needed. The DP table avoids recomputing subproblems. Pseudo-polynomial time (depends on W value, not just input size).`,

	"Fibonacci Sequence": `The Fibonacci Sequence generates numbers where each number is the sum of the two preceding ones (0, 1, 1, 2, 3, 5, 8...). Dynamic Programming avoids redundant calculations by storing computed values in a table, reducing time complexity from exponential O(2ⁿ) to linear O(n). Demonstrates the power of memoization.

Under the hood: Naive recursion: fib(n) = fib(n-1) + fib(n-2) with base cases fib(0)=0, fib(1)=1. This creates a binary recursion tree with massive overlap—fib(n-2) computed twice, fib(n-3) computed three times, etc. Total calls: O(2ⁿ).

Top-down DP (memoization): uses a cache/dictionary to store computed values. Before computing fib(n), checks if already in cache. If yes, returns cached value. If no, computes recursively and stores result. Eliminates redundant computation. Time: O(n), Space: O(n) for cache + O(n) recursion stack.

Bottom-up DP (tabulation): builds array iteratively from base cases. dp[0]=0, dp[1]=1, then dp[i] = dp[i-1] + dp[i-2] for i from 2 to n. Time: O(n), Space: O(n) for array.

Space-optimized: only need previous two values: use two variables (prev2, prev1) instead of array. Time: O(n), Space: O(1).

The transformation from exponential to linear demonstrates DP's power: identifying overlapping subproblems and optimal substructure.`,
};
