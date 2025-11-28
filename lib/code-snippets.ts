export const codeSnippets: Record<
	string,
	{ javascript: string; python: string; java: string }
> = {
	// ==========================================
	// SORTING ALGORITHMS
	// ==========================================
	"Bubble Sort": {
		javascript: `/**
 * Bubble Sort Implementation
 * repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        // Last i elements are already in place
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        // If no two elements were swapped by inner loop, then break
        if (!swapped) break;
    }
    return arr;
}`,
		python: `def bubble_sort(arr):
    """
    Bubble Sort Implementation
    Time Complexity: O(n^2)
    Space Complexity: O(1)
    """
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no two elements were swapped by inner loop, then break
        if not swapped:
            break
            
    return arr`,
		java: `public class BubbleSort {
    /**
     * Bubble Sort Implementation
     * Time Complexity: O(n^2)
     * Space Complexity: O(1)
     */
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no two elements were swapped by inner loop, then break
            if (!swapped) break;
        }
    }
}`,
	},

	"Selection Sort": {
		javascript: `/**
 * Selection Sort Implementation
 * repeatedly finds the minimum element (considering ascending order) from unsorted part and puts it at the beginning.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
function selectionSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        // Swap the found minimum element with the first element
        if (minIdx !== i) {
            let temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
    return arr;
}`,
		python: `def selection_sort(arr):
    """
    Selection Sort Implementation
    Time Complexity: O(n^2)
    Space Complexity: O(1)
    """
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
                
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        
    return arr`,
		java: `public class SelectionSort {
    /**
     * Selection Sort Implementation
     * Time Complexity: O(n^2)
     * Space Complexity: O(1)
     */
    public static void selectionSort(int[] arr) {
        int n = arr.length;
  
        // One by one move boundary of unsorted subarray
        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted array
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
  
            // Swap the found minimum element with the first element
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`,
	},

	"Insertion Sort": {
		javascript: `/**
 * Insertion Sort Implementation
 * Values from the unsorted part are picked and placed at the correct position in the sorted part.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        // Move elements of arr[0..i-1], that are greater than key,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
		python: `def insertion_sort(arr):
    """
    Insertion Sort Implementation
    Time Complexity: O(n^2)
    Space Complexity: O(1)
    """
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        key = arr[i]
        
        # Move elements of arr[0..i-1], that are greater than key,
        # to one position ahead of their current position
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
        
    return arr`,
		java: `public class InsertionSort {
    /**
     * Insertion Sort Implementation
     * Time Complexity: O(n^2)
     * Space Complexity: O(1)
     */
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;
  
            /* Move elements of arr[0..i-1], that are greater than key,
               to one position ahead of their current position */
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`,
	},

	"Merge Sort": {
		javascript: `/**
 * Merge Sort Implementation
 * Divide and Conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    // Concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // We need to concat to the element remaining parts
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
}`,
		python: `def merge_sort(arr):
    """
    Merge Sort Implementation
    Time Complexity: O(n log n)
    Space Complexity: O(n)
    """
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        # Recursive calls
        merge_sort(L)
        merge_sort(R)

        i = j = k = 0

        # Copy data to temp arrays L[] and R[]
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        # Checking if any element was left
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
            
    return arr`,
		java: `public class MergeSort {
    /**
     * Merge Sort Implementation
     * Time Complexity: O(n log n)
     * Space Complexity: O(n)
     */
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            // Find the middle point
            int m = l + (r - l) / 2;

            // Sort first and second halves
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);

            // Merge the sorted halves
            merge(arr, l, m, r);
        }
    }

    public static void merge(int[] arr, int l, int m, int r) {
        // Find sizes of two subarrays to be merged
        int n1 = m - l + 1;
        int n2 = r - m;

        /* Create temp arrays */
        int[] L = new int[n1];
        int[] R = new int[n2];

        /*Copy data to temp arrays*/
        for (int i = 0; i < n1; ++i)
            L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j)
            R[j] = arr[m + 1 + j];

        /* Merge the temp arrays */
        int i = 0, j = 0;
        int k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        /* Copy remaining elements of L[] if any */
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        /* Copy remaining elements of R[] if any */
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }
}`,
	},

	"Quick Sort": {
		javascript: `/**
 * Quick Sort Implementation
 * Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n)
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // pi is partitioning index, arr[pi] is now at right place
        let pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);  // Before pi
        quickSort(arr, pi + 1, high); // After pi
    }
    return arr;
}

function partition(arr, low, high) {
    // Pivot (Element to be placed at right position)
    let pivot = arr[high];  
    let i = (low - 1);  // Index of smaller element

    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than the pivot
        if (arr[j] < pivot) {
            i++;    // increment index of smaller element
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return (i + 1);
}`,
		python: `def quick_sort(arr, low, high):
    """
    Quick Sort Implementation
    Time Complexity: O(n log n)
    Space Complexity: O(log n)
    """
    if len(arr) == 1:
        return arr
    
    if low < high:
        # pi is partitioning index, arr[p] is now at right place
        pi = partition(arr, low, high)

        # Separately sort elements before partition and after partition
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
        
    return arr

def partition(arr, low, high):
    i = (low - 1)         # index of smaller element
    pivot = arr[high]     # pivot

    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return (i + 1)`,
		java: `public class QuickSort {
    /**
     * Quick Sort Implementation
     * Time Complexity: O(n log n)
     * Space Complexity: O(log n)
     */
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // pi is partitioning index, arr[pi] is now at right place
            int pi = partition(arr, low, high);

            // Recursively sort elements before partition and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1); // index of smaller element
        for (int j = low; j < high; j++) {
            // If current element is smaller than the pivot
            if (arr[j] < pivot) {
                i++;

                // swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // swap arr[i+1] and arr[high] (or pivot)
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }
}`,
	},

	"Heap Sort": {
		javascript: `/**
 * Heap Sort Implementation
 * Comparison-based sorting algorithm based on a Binary Heap data structure.
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function heapSort(arr) {
    let n = arr.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;   // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n && arr[l] > arr[largest])
        largest = l;

    // If right child is larger than largest so far
    if (r < n && arr[r] > arr[largest])
        largest = r;

    // If largest is not root
    if (largest != i) {
        let swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}`,
		python: `def heap_sort(arr):
    """
    Heap Sort Implementation
    Time Complexity: O(n log n)
    Space Complexity: O(1)
    """
    n = len(arr)

    # Build a maxheap.
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # One by one extract elements
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # swap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i  # Initialize largest as root
    l = 2 * i + 1     # left = 2*i + 1
    r = 2 * i + 2     # right = 2*i + 2

    # See if left child of root exists and is greater than root
    if l < n and arr[l] > arr[largest]:
        largest = l

    # See if right child of root exists and is greater than root
    if r < n and arr[r] > arr[largest]:
        largest = r

    # Change root, if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # swap

        # Heapify the root.
        heapify(arr, n, largest)`,
		java: `public class HeapSort {
    /**
     * Heap Sort Implementation
     * Time Complexity: O(n log n)
     * Space Complexity: O(1)
     */
    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Build heap (rearrange array)
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);

        // One by one extract an element from heap
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }

    // To heapify a subtree rooted with node i which is an index in arr[]. n is size of heap
    static void heapify(int[] arr, int n, int i) {
        int largest = i; // Initialize largest as root
        int l = 2 * i + 1; // left = 2*i + 1
        int r = 2 * i + 2; // right = 2*i + 2

        // If left child is larger than root
        if (l < n && arr[l] > arr[largest])
            largest = l;

        // If right child is larger than largest so far
        if (r < n && arr[r] > arr[largest])
            largest = r;

        // If largest is not root
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }
}`,
	},

	// ==========================================
	// SEARCHING ALGORITHMS
	// ==========================================
	"Linear Search": {
		javascript: `/**
 * Linear Search Implementation
 * Sequentially checks each element of the list until a match is found.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}`,
		python: `def linear_search(arr, target):
    """
    Linear Search Implementation
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
		java: `public class LinearSearch {
    /**
     * Linear Search Implementation
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
}`,
	},

	"Binary Search": {
		javascript: `/**
 * Binary Search Implementation
 * Search a sorted array by repeatedly dividing the search interval in half.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
		python: `def binary_search(arr, target):
    """
    Binary Search Implementation
    Time Complexity: O(log n)
    Space Complexity: O(1)
    """
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`,
		java: `public class BinarySearch {
    /**
     * Binary Search Implementation
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     */
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            }
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
	},

	"Jump Search": {
		javascript: `/**
 * Jump Search Implementation
 * Jumping ahead by fixed steps or skipping some elements in place of searching all elements.
 *
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 */
function jumpSearch(arr, target) {
    const n = arr.length;
    // Finding the block size to be jumped
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Finding the block where element is present (if it is present)
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1;
        }
    }
    
    // Doing a linear search for target in block beginning with prev
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) {
            return -1;
        }
    }
    
    // If element is found
    if (arr[prev] === target) {
        return prev;
    }
    return -1;
}`,
		python: `import math

def jump_search(arr, target):
    """
    Jump Search Implementation
    Time Complexity: O(√n)
    Space Complexity: O(1)
    """
    n = len(arr)
    step = math.sqrt(n)
    prev = 0
    
    while arr[int(min(step, n) - 1)] < target:
        prev = step
        step += math.sqrt(n)
        if prev >= n:
            return -1
            
    while arr[int(prev)] < target:
        prev += 1
        if prev == min(step, n):
            return -1
            
    if arr[int(prev)] == target:
        return int(prev)
        
    return -1`,
		java: `public class JumpSearch {
    /**
     * Jump Search Implementation
     * Time Complexity: O(√n)
     * Space Complexity: O(1)
     */
    public static int jumpSearch(int[] arr, int target) {
        int n = arr.length;
        int step = (int) Math.floor(Math.sqrt(n));
        int prev = 0;
        
        while (arr[Math.min(step, n) - 1] < target) {
            prev = step;
            step += (int) Math.floor(Math.sqrt(n));
            if (prev >= n) {
                return -1;
            }
        }
        
        while (arr[prev] < target) {
            prev++;
            if (prev == Math.min(step, n)) {
                return -1;
            }
        }
        
        if (arr[prev] == target) {
            return prev;
        }
        return -1;
    }
}`,
	},

	// ==========================================
	// DYNAMIC PROGRAMMING
	// ==========================================
	"0/1 Knapsack Problem": {
		javascript: `/**
 * 0/1 Knapsack Problem Implementation (Bottom-Up DP)
 * Returns the maximum value that can be put in a knapsack of capacity W.
 *
 * Time Complexity: O(n * W)
 * Space Complexity: O(n * W)
 */
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                // Max of (including the item, excluding the item)
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                // Can't include the item, take value from previous row
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}`,
		python: `def knapsack(weights, values, capacity):
    """
    0/1 Knapsack Problem (Bottom-Up DP)
    Time Complexity: O(n * W)
    Space Complexity: O(n * W)
    """
    n = len(weights)
    dp = [[0 for x in range(capacity + 1)] for x in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                # Max of (including current item, excluding current item)
                dp[i][w] = max(
                    values[i-1] + dp[i-1][w-weights[i-1]], 
                    dp[i-1][w]
                )
            else:
                dp[i][w] = dp[i-1][w]
                
    return dp[n][capacity]`,
		java: `public class Knapsack {
    /**
     * 0/1 Knapsack Problem (Bottom-Up DP)
     * Time Complexity: O(n * W)
     * Space Complexity: O(n * W)
     */
    public static int knapsack(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(
                        values[i - 1] + dp[i - 1][w - weights[i - 1]],
                        dp[i - 1][w]
                    );
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[n][capacity];
    }
}`,
	},

	"Fibonacci Sequence": {
		javascript: `/**
 * Fibonacci Sequence Implementation (Memoization/Tabulation)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function fibonacci(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space Optimized Version (O(1) Space)
function fibonacciOptimized(n) {
    if (n <= 1) return n;
    let a = 0, b = 1, c;
    for(let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
		python: `def fibonacci(n):
    """
    Fibonacci Sequence (Tabulation)
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if n <= 1: return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
        
    return dp[n]

def fibonacci_optimized(n):
    # Space Optimized Version
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
		java: `public class Fibonacci {
    /**
     * Fibonacci Sequence (Tabulation)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        int[] dp = new int[n + 1];
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    // Space Optimized Version
    public static int fibonacciOptimized(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1, c;
        for (int i = 2; i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
	},

	// ==========================================
	// BACKTRACKING
	// ==========================================
	"N-Queens Problem": {
		javascript: `/**
 * N-Queens Problem Implementation
 * Places N queens on an NxN chessboard so that no two queens attack each other.
 *
 * Time Complexity: O(N!)
 * Space Complexity: O(N^2)
 */
function solveNQueens(n) {
    const board = Array.from({ length: n }, () => Array(n).fill('.'));
    const solutions = [];

    function isSafe(row, col) {
        // Check left side of row
        for (let i = 0; i < col; i++) {
            if (board[row][i] === 'Q') return false;
        }
        // Check upper diagonal on left side
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        // Check lower diagonal on left side
        for (let i = row, j = col; i < n && j >= 0; i++, j--) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }

    function solve(col) {
        if (col >= n) {
            // Found a solution, add to list
            solutions.push(board.map(row => row.join('')));
            return;
        }

        for (let row = 0; row < n; row++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q'; // Place queen
                solve(col + 1);        // Recurse
                board[row][col] = '.'; // Backtrack
            }
        }
    }

    solve(0);
    return solutions;
}`,
		python: `def solve_n_queens(n):
    """
    N-Queens Problem Implementation
    Time Complexity: O(N!)
    Space Complexity: O(N^2)
    """
    board = [['.' for x in range(n)] for y in range(n)]
    solutions = []

    def is_safe(row, col):
        # Check this row on left side
        for i in range(col):
            if board[row][i] == 'Q':
                return False
        
        # Check upper diagonal on left side
        for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
            if board[i][j] == 'Q':
                return False
                
        # Check lower diagonal on left side
        for i, j in zip(range(row, n, 1), range(col, -1, -1)):
            if board[i][j] == 'Q':
                return False
        
        return True

    def solve(col):
        if col >= n:
            solutions.append(["".join(row) for row in board])
            return

        for i in range(n):
            if is_safe(i, col):
                board[i][col] = 'Q'
                solve(col + 1)
                board[i][col] = '.' # Backtrack

    solve(0)
    return solutions`,
		java: `import java.util.*;

public class NQueens {
    /**
     * N-Queens Problem Implementation
     * Time Complexity: O(N!)
     * Space Complexity: O(N^2)
     */
    public List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for(int i = 0; i < n; i++)
            for(int j = 0; j < n; j++)
                board[i][j] = '.';
        
        List<List<String>> res = new ArrayList<>();
        dfs(0, board, res);
        return res;
    }
    
    private void dfs(int col, char[][] board, List<List<String>> res) {
        if(col == board.length) {
            res.add(construct(board));
            return;
        }
        
        for(int row = 0; row < board.length; row++) {
            if(validate(board, row, col)) {
                board[row][col] = 'Q';
                dfs(col + 1, board, res);
                board[row][col] = '.';
            }
        }
    }
    
    private boolean validate(char[][] board, int row, int col) {
        int dupRow = row;
        int dupCol = col;
        while(row >= 0 && col >= 0) {
            if(board[row][col] == 'Q') return false;
            row--; col--;
        }
        row = dupRow; col = dupCol;
        while(col >= 0) {
            if(board[row][col] == 'Q') return false;
            col--;
        }
        row = dupRow; col = dupCol;
        while(col >= 0 && row < board.length) {
            if(board[row][col] == 'Q') return false;
            col--; row++;
        }
        return true;
    }
    
    private List<String> construct(char[][] board) {
        List<String> res = new ArrayList<>();
        for(int i = 0; i < board.length; i++) {
            res.add(new String(board[i]));
        }
        return res;
    }
}`,
	},

	"Sudoku Solver": {
		javascript: `/**
 * Sudoku Solver Implementation
 * Solves a 9x9 Sudoku board using Backtracking.
 *
 * Time Complexity: O(9^m) where m is blank cells
 * Space Complexity: O(n^2)
 */
function solveSudoku(board) {
    function isValid(row, col, num) {
        for (let i = 0; i < 9; i++) {
            // Check Row
            if (board[row][i] === num) return false;
            // Check Column
            if (board[i][col] === num) return false;
            // Check 3x3 Box
            if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)]
                     [3 * Math.floor(col / 3) + i % 3] === num)
                return false;
        }
        return true;
    }

    function solve() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === 0) { // Found empty cell
                    for (let c = 1; c <= 9; c++) {
                        if (isValid(i, j, c)) {
                            board[i][j] = c;
                            
                            if (solve()) return true;
                            else board[i][j] = 0; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    solve();
    return board;
}`,
		python: `def solve_sudoku(board):
    """
    Sudoku Solver Implementation
    Time Complexity: O(9^m)
    Space Complexity: O(n^2)
    """
    solve(board)
    
def solve(board):
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] == 0:
                for c in range(1, 10): # Try numbers 1-9
                    if is_valid(board, i, j, c):
                        board[i][j] = c
                        
                        if solve(board):
                            return True
                        else:
                            board[i][j] = 0 # Backtrack
                return False
    return True

def is_valid(board, row, col, c):
    for i in range(9):
        if board[i][col] == c: return False
        if board[row][i] == c: return False
        if board[3 * (row // 3) + i // 3][3 * (col // 3) + i % 3] == c: 
            return False
    return True`,
		java: `public class SudokuSolver {
    /**
     * Sudoku Solver Implementation
     * Time Complexity: O(9^m)
     * Space Complexity: O(n^2)
     */
    public void solveSudoku(char[][] board) {
        solve(board);
    }
    
    public boolean solve(char[][] board){
        for(int i=0; i<board.length; i++){
            for(int j=0; j<board[0].length; j++){
                if(board[i][j] == '.'){
                    for(char c = '1'; c <= '9'; c++){
                        if(isValid(board, i, j, c)){
                            board[i][j] = c;
                            
                            if(solve(board)) return true;
                            else board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    public boolean isValid(char[][] board, int row, int col, char c){
        for(int i=0; i<9; i++){
            if(board[i][col] != '.' && board[i][col] == c) return false;
            if(board[row][i] != '.' && board[row][i] == c) return false;
            
            if(board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] != '.' && 
               board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }
}`,
	},

	// ==========================================
	// GRAPH ALGORITHMS
	// ==========================================
	"Depth First Search (DFS)": {
		javascript: `/**
 * Depth First Search (DFS) Implementation
 * Recursive approach to traverse a graph.
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function dfs(graph, startNode, visited = new Set()) {
    visited.add(startNode);
    console.log(startNode); // Process node

    const neighbors = graph[startNode];
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
		python: `def dfs(graph, start, visited=None):
    """
    Depth First Search (DFS) Implementation
    Time Complexity: O(V + E)
    Space Complexity: O(V)
    """
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start) # Process node

    for next_node in graph[start] - visited:
        dfs(graph, next_node, visited)
    return visited`,
		java: `import java.util.*;

public class DFS {
    /**
     * Depth First Search (DFS) Implementation
     * Time Complexity: O(V + E)
     * Space Complexity: O(V)
     */
    public void dfs(int start, boolean[] visited, ArrayList<ArrayList<Integer>> adj) {
        visited[start] = true;
        System.out.print(start + " "); // Process node

        for (Integer neighbor : adj.get(start)) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, adj);
            }
        }
    }
}`,
	},

	"Breadth First Search (BFS)": {
		javascript: `/**
 * Breadth First Search (BFS) Implementation
 * Queue-based approach to traverse a graph level by level.
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function bfs(graph, startNode) {
    const visited = new Set();
    const queue = [startNode];
    
    visited.add(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift(); // Dequeue
        console.log(currentNode); // Process node

        const neighbors = graph[currentNode];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`,
		python: `from collections import deque

def bfs(graph, start):
    """
    Breadth First Search (BFS) Implementation
    Time Complexity: O(V + E)
    Space Complexity: O(V)
    """
    visited = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        vertex = queue.popleft()
        print(vertex) # Process node

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
		java: `import java.util.*;

public class BFS {
    /**
     * Breadth First Search (BFS) Implementation
     * Time Complexity: O(V + E)
     * Space Complexity: O(V)
     */
    public void bfs(int start, int V, ArrayList<ArrayList<Integer>> adj) {
        boolean[] visited = new boolean[V];
        LinkedList<Integer> queue = new LinkedList<Integer>();

        visited[start] = true;
        queue.add(start);

        while (queue.size() != 0) {
            start = queue.poll();
            System.out.print(start + " "); // Process node

            Iterator<Integer> i = adj.get(start).listIterator();
            while (i.hasNext()) {
                int n = i.next();
                if (!visited[n]) {
                    visited[n] = true;
                    queue.add(n);
                }
            }
        }
    }
}`,
	},

	"Dijkstra's Algorithm": {
		javascript: `/**
 * Dijkstra's Algorithm
 * Finds the shortest path from a start node to all other nodes in a weighted graph.
 *
 * Time Complexity: O((V + E) log V) using Priority Queue
 * Space Complexity: O(V)
 */
function dijkstra(graph, startNode) {
    let distances = {};
    let pq = new PriorityQueue(); // Assume PriorityQueue class exists

    // Initialize distances
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);

    while (!pq.isEmpty()) {
        let { element: currentNode, priority: currentDist } = pq.dequeue();

        // If found shorter path to neighbor, update it
        for (let neighbor in graph[currentNode]) {
            let weight = graph[currentNode][neighbor];
            let distance = currentDist + weight;

            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.enqueue(neighbor, distance);
            }
        }
    }
    return distances;
}`,
		python: `import heapq

def dijkstra(graph, start):
    """
    Dijkstra's Algorithm
    Time Complexity: O((V + E) log V)
    Space Complexity: O(V)
    """
    # Priority queue to store (distance, vertex)
    pq = [(0, start)]
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0

    while pq:
        current_dist, current_vertex = heapq.heappop(pq)

        # Nodes can get added to the priority queue multiple times
        if current_dist > distances[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex].items():
            distance = current_dist + weight

            # Only consider this new path if it's better
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances`,
		java: `import java.util.*;

public class Dijkstra {
    /**
     * Dijkstra's Algorithm
     * Time Complexity: O((V + E) log V)
     * Space Complexity: O(V)
     */
    public int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int S) {
        // Min-heap to store {distance, node}
        PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> x[0] - y[0]);
        int[] dist = new int[V];
        
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[S] = 0;
        pq.add(new int[]{0, S});
        
        while(pq.size() > 0) {
            int[] current = pq.poll();
            int dis = current[0];
            int node = current[1];
            
            for(int i = 0; i < adj.get(node).size(); i++) {
                int edgeWeight = adj.get(node).get(i).get(1);
                int adjNode = adj.get(node).get(i).get(0);
                
                if(dis + edgeWeight < dist[adjNode]) {
                    dist[adjNode] = dis + edgeWeight;
                    pq.add(new int[]{dist[adjNode], adjNode});
                }
            }
        }
        return dist;
    }
}`,
	},

	"A* Search": {
		javascript: `/**
 * A* Search Algorithm
 * Informed search algorithm that uses a heuristic function to guide search.
 * f(n) = g(n) + h(n)
 */
function aStar(start, goal, h) {
    // The set of discovered nodes that may need to be (re-)expanded.
    let openSet = [start];
    
    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path
    let cameFrom = {};

    // gScore[n] is the cost of the cheapest path from start to n
    let gScore = {};
    gScore[start] = 0;

    // fScore[n] := gScore[n] + h(n)
    let fScore = {};
    fScore[start] = h(start);

    while (openSet.length > 0) {
        // Node in openSet having the lowest fScore[] value
        let current = openSet.reduce((a, b) => fScore[a] < fScore[b] ? a : b);
        
        if (current === goal)
            return reconstruct_path(cameFrom, current);

        openSet = openSet.filter(item => item !== current);

        // For each neighbor of current
        for (let neighbor of getNeighbors(current)) {
            let tentative_gScore = gScore[current] + d(current, neighbor);
            
            if (tentative_gScore < (gScore[neighbor] || Infinity)) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentative_gScore;
                fScore[neighbor] = gScore[neighbor] + h(neighbor);
                
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return false; // Failure
}`,
		python: `import heapq

def a_star(start, goal, h):
    """
    A* Search Algorithm
    Uses a min-heap for the open set.
    """
    open_set = []
    heapq.heappush(open_set, (0, start))
    
    came_from = {}
    g_score = {start: 0}
    f_score = {start: h(start)}
    
    while open_set:
        current = heapq.heappop(open_set)[1]
        
        if current == goal:
            return reconstruct_path(came_from, current)
            
        for neighbor in get_neighbors(current):
            tentative_g_score = g_score[current] + d(current, neighbor)
            
            if tentative_g_score < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = g_score[neighbor] + h(neighbor)
                heapq.heappush(open_set, (f_score[neighbor], neighbor))
                
    return False`,
		java: `import java.util.*;

public class AStar {
    // Assuming Node class with f, g, h scores exists
    public List<Node> findPath(Node start, Node goal) {
        PriorityQueue<Node> openSet = new PriorityQueue<>(Comparator.comparingDouble(n -> n.f));
        Set<Node> closedSet = new HashSet<>();
        
        start.g = 0;
        start.f = start.g + heuristic(start, goal);
        openSet.add(start);
        
        while(!openSet.isEmpty()) {
            Node current = openSet.poll();
            
            if(current.equals(goal)) {
                return reconstructPath(current);
            }
            
            closedSet.add(current);
            
            for(Edge edge : current.neighbors) {
                Node neighbor = edge.target;
                if(closedSet.contains(neighbor)) continue;
                
                double tentativeG = current.g + edge.weight;
                
                if(tentativeG < neighbor.g) {
                    neighbor.parent = current;
                    neighbor.g = tentativeG;
                    neighbor.f = neighbor.g + heuristic(neighbor, goal);
                    
                    if(!openSet.contains(neighbor)) {
                        openSet.add(neighbor);
                    }
                }
            }
        }
        return null; // No path found
    }
}`,
	},

	// ==========================================
	// MST ALGORITHMS
	// ==========================================
	"Prim's Algorithm": {
		javascript: `/**
 * Prim's Algorithm Implementation
 * Finds the Minimum Spanning Tree (MST) of a weighted undirected graph.
 *
 * Time Complexity: O(E log V)
 */
function primMST(graph) {
    const parent = []; // Array to store constructed MST
    const key = [];    // Key values used to pick minimum weight edge
    const mstSet = []; // To represent set of vertices included in MST
    const V = graph.length;

    // Initialize all keys as INFINITE
    for (let i = 0; i < V; i++) {
        key[i] = Infinity;
        mstSet[i] = false;
    }

    // Always include first 1st vertex in MST.
    key[0] = 0;
    parent[0] = -1; // First node is always root of MST

    for (let count = 0; count < V - 1; count++) {
        // Pick the minimum key vertex from the set of vertices
        // not yet included in MST
        let u = minKey(key, mstSet, V);

        // Add the picked vertex to the MST Set
        mstSet[u] = true;

        // Update key value and parent index of the adjacent vertices
        for (let v = 0; v < V; v++) {
            if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }
    return parent;
}`,
		python: `import sys

class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = [[0 for column in range(vertices)] for row in range(vertices)]

    def printMST(self, parent):
        for i in range(1, self.V):
            print(parent[i], "-", i, "\t", self.graph[i][parent[i]])

    def minKey(self, key, mstSet):
        min_val = sys.maxsize
        min_index = -1
        for v in range(self.V):
            if key[v] < min_val and not mstSet[v]:
                min_val = key[v]
                min_index = v
        return min_index

    def primMST(self):
        """
        Prim's MST Algorithm
        Time Complexity: O(V^2) for adjacency matrix
        """
        key = [sys.maxsize] * self.V
        parent = [None] * self.V
        key[0] = 0
        mstSet = [False] * self.V
        parent[0] = -1

        for cout in range(self.V):
            u = self.minKey(key, mstSet)
            mstSet[u] = True

            for v in range(self.V):
                if self.graph[u][v] > 0 and not mstSet[v] and key[v] > self.graph[u][v]:
                    key[v] = self.graph[u][v]
                    parent[v] = u

        self.printMST(parent)`,
		java: `import java.util.*;

public class Prims {
    /**
     * Prim's MST Algorithm
     * Time Complexity: O(E log V) using Priority Queue
     */
    public int spanningTree(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj) {
        boolean[] vis = new boolean[V];
        PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> a.wt - b.wt);
        
        pq.add(new Pair(0, 0)); // {weight, node}
        int sum = 0;
        
        while(pq.size() > 0) {
            int wt = pq.peek().wt;
            int node = pq.peek().node;
            pq.remove();
            
            if(vis[node]) continue;
            vis[node] = true;
            sum += wt;
            
            for(int i = 0; i < adj.get(node).size(); i++) {
                int adjNode = adj.get(node).get(i).get(0);
                int edgeW = adj.get(node).get(i).get(1);
                
                if(!vis[adjNode]) {
                    pq.add(new Pair(edgeW, adjNode));
                }
            }
        }
        return sum;
    }
    
    class Pair {
        int wt; int node;
        public Pair(int distance, int node) {
            this.wt = distance;
            this.node = node;
        }
    }
}`,
	},

	"Kruskal's Algorithm": {
		javascript: `/**
 * Kruskal's Algorithm Implementation
 * Uses Union-Find data structure to detect cycles.
 *
 * Time Complexity: O(E log E) or O(E log V)
 */
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
    }
    
    find(i) {
        if (this.parent[i] == i)
            return i;
        return this.find(this.parent[i]);
    }
    
    union(i, j) {
        let rootI = this.find(i);
        let rootJ = this.find(j);
        if (rootI != rootJ) {
            this.parent[rootI] = rootJ;
            return true;
        }
        return false;
    }
}

function kruskalMST(edges, V) {
    // 1. Sort all edges in non-decreasing order of their weight
    edges.sort((a, b) => a.weight - b.weight);

    const uf = new UnionFind(V);
    const result = [];
    let e = 0; // Index of sorted edges
    let i = 0; // Index of result array

    // Number of edges to be taken is V-1
    while (i < V - 1 && e < edges.length) {
        const {src, dest, weight} = edges[e++];

        let x = uf.find(src);
        let y = uf.find(dest);

        // If including this edge doesn't cause cycle
        if (x !== y) {
            result.push({src, dest, weight});
            uf.union(x, y);
            i++;
        }
    }
    return result;
}`,
		python: `class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = []

    def addEdge(self, u, v, w):
        self.graph.append([u, v, w])

    def find(self, parent, i):
        if parent[i] == i:
            return i
        return self.find(parent, parent[i])

    def union(self, parent, rank, x, y):
        xroot = self.find(parent, x)
        yroot = self.find(parent, y)

        if rank[xroot] < rank[yroot]:
            parent[xroot] = yroot
        elif rank[xroot] > rank[yroot]:
            parent[yroot] = xroot
        else:
            parent[yroot] = xroot
            rank[xroot] += 1

    def KruskalMST(self):
        """
        Kruskal's MST Algorithm
        Time Complexity: O(E log E)
        """
        result = []
        i = 0; e = 0
        self.graph = sorted(self.graph, key=lambda item: item[2])
        parent = []; rank = []

        for node in range(self.V):
            parent.append(node)
            rank.append(0)

        while e < self.V - 1:
            u, v, w = self.graph[i]
            i = i + 1
            x = self.find(parent, u)
            y = self.find(parent, v)

            if x != y:
                e = e + 1
                result.append([u, v, w])
                self.union(parent, rank, x, y)
                
        return result`,
		java: `import java.util.*;

class Edge implements Comparable<Edge> {
    int src, dest, weight;
    public int compareTo(Edge compareEdge) {
        return this.weight - compareEdge.weight;
    }
}

public class Kruskal {
    /**
     * Kruskal's MST Algorithm
     * Time Complexity: O(E log E)
     */
    class Subset { int parent, rank; }

    int find(Subset subsets[], int i) {
        if (subsets[i].parent != i)
            subsets[i].parent = find(subsets, subsets[i].parent);
        return subsets[i].parent;
    }

    void Union(Subset subsets[], int x, int y) {
        int xroot = find(subsets, x);
        int yroot = find(subsets, y);

        if (subsets[xroot].rank < subsets[yroot].rank)
            subsets[xroot].parent = yroot;
        else if (subsets[xroot].rank > subsets[yroot].rank)
            subsets[yroot].parent = xroot;
        else {
            subsets[yroot].parent = xroot;
            subsets[xroot].rank++;
        }
    }

    void KruskalMST(Edge[] edges, int V, int E) {
        Edge result[] = new Edge[V];
        int e = 0;
        int i = 0;
        
        Arrays.sort(edges);
        Subset subsets[] = new Subset[V];
        for (int v = 0; v < V; ++v) {
            subsets[v] = new Subset();
            subsets[v].parent = v;
            subsets[v].rank = 0;
        }

        while (e < V - 1) {
            Edge next_edge = edges[i++];
            int x = find(subsets, next_edge.src);
            int y = find(subsets, next_edge.dest);

            if (x != y) {
                result[e++] = next_edge;
                Union(subsets, x, y);
            }
        }
    }
}`,
	},

	"Uniform Cost Search": {
		javascript: `/**
 * Uniform Cost Search (UCS)
 * Explores graph by visiting node with lowest cumulative path cost.
 * Equivalent to Dijkstra with no heuristic.
 */
function ucs(graph, start, goal) {
    const pq = new PriorityQueue(); // Custom PriorityQueue
    pq.enqueue(start, 0);
    const visited = new Set();
    
    while (!pq.isEmpty()) {
        const { element: node, priority: cost } = pq.dequeue();
        
        if (node === goal) return cost;
        if (visited.has(node)) continue;
        
        visited.add(node);
        
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                // cost + edge weight
                const newCost = cost + getWeight(node, neighbor); 
                pq.enqueue(neighbor, newCost);
            }
        }
    }
    return -1;
}`,
		python: `import heapq

def ucs(graph, start, goal):
    """
    Uniform Cost Search
    Time Complexity: O(E log V)
    """
    visited = set()
    # Queue stores (cost, node)
    queue = [(0, start)]
    
    while queue:
        cost, node = heapq.heappop(queue)
        
        if node == goal:
            return cost
            
        if node not in visited:
            visited.add(node)
            
            for neighbor, weight in graph[node].items():
                if neighbor not in visited:
                    total_cost = cost + weight
                    heapq.heappush(queue, (total_cost, neighbor))
    return -1`,
		java: `import java.util.*;

public class UCS {
    /**
     * Uniform Cost Search
     * Time Complexity: O(E log V)
     */
    public int solve(Map<Integer, List<int[]>> graph, int start, int goal) {
        // PriorityQueue stores {node, cost}
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        Set<Integer> visited = new HashSet<>();
        
        pq.add(new int[]{start, 0});
        
        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int node = current[0];
            int cost = current[1];
            
            if (node == goal) return cost;
            
            if (visited.contains(node)) continue;
            visited.add(node);
            
            for (int[] neighbor : graph.get(node)) {
                if (!visited.contains(neighbor[0])) {
                    pq.add(new int[]{neighbor[0], cost + neighbor[1]});
                }
            }
        }
        return -1;
    }
}`,
	},
	"Tree Sort": {
		javascript: `class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
}

function treeSort(arr) {
    if (arr.length === 0) return arr;

    // Build BST
    let root = new Node(arr[0]);
    for (let i = 1; i < arr.length; i++) {
      insert(root, arr[i]);
    }

    // In-order traversal to get sorted elements
    const result = [];
    inOrder(root, result);
    return result;
}

function insert(node, value) {
    if (value < node.value) {
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        insert(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        insert(node.right, value);
      }
    }
}

function inOrder(node, result) {
    if (node !== null) {
      inOrder(node.left, result);
      result.push(node.value);
      inOrder(node.right, result);
    }
}
// Time Complexity: O(n log n) average`,
		python: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def tree_sort(arr):
    if not arr: return arr
    
    root = Node(arr[0])
    for value in arr[1:]:
        insert(root, value)
        
    result = []
    in_order(root, result)
    return result

def insert(node, value):
    if value < node.value:
        if node.left is None:
            node.left = Node(value)
        else:
            insert(node.left, value)
    else:
        if node.right is None:
            node.right = Node(value)
        else:
            insert(node.right, value)

def in_order(node, result):
    if node:
        in_order(node.left, result)
        result.append(node.value)
        in_order(node.right, result)
        
# Time Complexity: O(n log n) average`,
		java: `import java.util.*;

class Node {
    int value;
    Node left, right;
    Node(int value) {
        this.value = value;
        left = right = null;
    }
}

public class TreeSort {
    public static void insert(Node node, int value) {
        if (value < node.value) {
            if (node.left == null) node.left = new Node(value);
            else insert(node.left, value);
        } else {
            if (node.right == null) node.right = new Node(value);
            else insert(node.right, value);
        }
    }

    public static void inOrder(Node node, List<Integer> result) {
        if (node != null) {
            inOrder(node.left, result);
            result.add(node.value);
            inOrder(node.right, result);
        }
    }

    public static int[] treeSort(int[] arr) {
        if (arr.length == 0) return arr;
        Node root = new Node(arr[0]);
        for (int i = 1; i < arr.length; i++) {
            insert(root, arr[i]);
        }
        
        List<Integer> result = new ArrayList<>();
        inOrder(root, result);
        return result.stream().mapToInt(i -> i).toArray();
    }
}
// Time Complexity: O(n log n) average`,
	},

	"Tim Sort": {
		javascript: `function timSort(arr) {
    const MIN_MERGE = 32;
    const n = arr.length;

    // Sort individual subarrays of size MIN_MERGE
    for (let i = 0; i < n; i += MIN_MERGE) {
      insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
    }

    // Merge subarrays
    for (let size = MIN_MERGE; size < n; size *= 2) {
      for (let start = 0; start < n; start += 2 * size) {
        const mid = start + size - 1;
        const end = Math.min(start + 2 * size - 1, n - 1);
        if (mid < end) {
          merge(arr, start, mid, end);
        }
      }
    }
    return arr;
}

// Helper insertion sort
function insertionSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
}

// Helper merge function
function merge(arr, l, m, r) {
    let len1 = m - l + 1, len2 = r - m;
    let left = new Array(len1);
    let right = new Array(len2);
    for (let x = 0; x < len1; x++) left[x] = arr[l + x];
    for (let x = 0; x < len2; x++) right[x] = arr[m + 1 + x];
    
    let i = 0, j = 0, k = l;
    while (i < len1 && j < len2) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < len1) arr[k++] = left[i++];
    while (j < len2) arr[k++] = right[j++];
}
// Time Complexity: O(n log n)`,
		python: `def tim_sort(arr):
    MIN_MERGE = 32
    n = len(arr)
    
    # Insertion Sort small runs
    for i in range(0, n, MIN_MERGE):
        insertion_sort(arr, i, min((i + MIN_MERGE - 1), n - 1))
        
    size = MIN_MERGE
    while size < n:
        for left in range(0, n, 2 * size):
            mid = left + size - 1
            right = min((left + 2 * size - 1), (n - 1))
            if mid < right:
                merge(arr, left, mid, right)
        size = 2 * size
    return arr

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        j = i
        while j > left and arr[j] < arr[j - 1]:
            arr[j], arr[j - 1] = arr[j - 1], arr[j]
            j -= 1

def merge(arr, l, m, r):
    len1, len2 = m - l + 1, r - m
    left, right = [], []
    for i in range(0, len1): left.append(arr[l + i])
    for i in range(0, len2): right.append(arr[m + 1 + i])
    
    i, j, k = 0, 0, l
    while i < len1 and j < len2:
        if left[i] <= right[j]:
            arr[k] = left[i]; i += 1
        else:
            arr[k] = right[j]; j += 1
        k += 1
    while i < len1: arr[k] = left[i]; k += 1; i += 1
    while j < len2: arr[k] = right[j]; k += 1; j += 1

# Time Complexity: O(n log n)`,
		java: `public class TimSort {
    static int MIN_MERGE = 32;

    public static void timSort(int[] arr, int n) {
        // Insertion Sort for small runs
        for (int i = 0; i < n; i += MIN_MERGE) {
            insertionSort(arr, i, Math.min((i + MIN_MERGE - 1), (n - 1)));
        }

        // Merge runs
        for (int size = MIN_MERGE; size < n; size = 2 * size) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = left + size - 1;
                int right = Math.min((left + 2 * size - 1), (n - 1));
                if (mid < right)
                    merge(arr, left, mid, right);
            }
        }
    }

    public static void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
        }
    }

    public static void merge(int[] arr, int l, int m, int r) {
        int len1 = m - l + 1, len2 = r - m;
        int[] left = new int[len1];
        int[] right = new int[len2];
        for (int x = 0; x < len1; x++) left[x] = arr[l + x];
        for (int x = 0; x < len2; x++) right[x] = arr[m + 1 + x];

        int i = 0, j = 0, k = l;
        while (i < len1 && j < len2) {
            if (left[i] <= right[j]) arr[k++] = left[i++];
            else arr[k++] = right[j++];
        }
        while (i < len1) arr[k++] = left[i++];
        while (j < len2) arr[k++] = right[j++];
    }
}`,
	},
	"Cocktail Shaker Sort": {
		javascript: `function cocktailShakerSort(arr) {
    let swapped = true;
    let start = 0;
    let end = arr.length - 1;

    while (swapped) {
      swapped = false;
      // Forward pass
      for (let i = start; i < end; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true;
        }
      }
      if (!swapped) break;
      swapped = false;
      end--;
      // Backward pass
      for (let i = end; i > start; i--) {
        if (arr[i] < arr[i - 1]) {
            [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            swapped = true;
        }
      }
      start++;
    }
    return arr;
}
// Time Complexity: O(n²)`,
		python: `def cocktail_shaker_sort(arr):
    n = len(arr)
    swapped = True
    start = 0
    end = n - 1
    
    while swapped:
        swapped = False
        # Forward pass
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped:
            break
        swapped = False
        end = end - 1
        # Backward pass
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start = start + 1
    return arr
# Time Complexity: O(n²)`,
		java: `public static void cocktailShakerSort(int[] arr) {
    boolean swapped = true;
    int start = 0;
    int end = arr.length;

    while (swapped) {
        swapped = false;
        // Forward pass
        for (int i = start; i < end - 1; ++i) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end = end - 1;
        // Backward pass
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        start = start + 1;
    }
}
// Time Complexity: O(n²)`,
	},
	"Counting Sort": {
		javascript: `function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    for (let i = 0; i < arr.length; i++) {
      count[arr[i] - min]++;
    }
    
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }
    
    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
    }
    
    return output;
}
// Time Complexity: O(n + k)`,
		python: `def counting_sort(arr):
    max_element = max(arr)
    min_element = min(arr)
    range_of_elements = max_element - min_element + 1
    
    count_arr = [0 for _ in range(range_of_elements)]
    output_arr = [0 for _ in range(len(arr))]
    
    for i in range(0, len(arr)):
        count_arr[arr[i] - min_element] += 1
        
    for i in range(1, len(count_arr)):
        count_arr[i] += count_arr[i-1]
        
    for i in range(len(arr)-1, -1, -1):
        output_arr[count_arr[arr[i] - min_element] - 1] = arr[i]
        count_arr[arr[i] - min_element] -= 1
        
    return output_arr
# Time Complexity: O(n + k)`,
		java: `import java.util.Arrays;

public static int[] countingSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min + 1;
    int count[] = new int[range];
    int output[] = new int[arr.length];
    
    for (int i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    
    for (int i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    for (int i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    return output;
}
// Time Complexity: O(n + k)`,
	},
	"Radix Sort": {
		javascript: `function radixSort(arr) {
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    return arr;
}

function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    for (let i = 0; i < n; i++) {
        let index = Math.floor(arr[i] / exp);
        count[index % 10]++;
    }
    
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = n - 1; i >= 0; i--) {
        let index = Math.floor(arr[i] / exp);
        output[count[index % 10] - 1] = arr[i];
        count[index % 10]--;
    }
    
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}
// Time Complexity: O(d * (n + k))`,
		python: `def radix_sort(arr):
    max1 = max(arr)
    exp = 1
    while max1 // exp > 0:
        counting_sort(arr, exp)
        exp *= 10

def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    for i in range(0, n):
        index = arr[i] // exp
        count[index % 10] += 1
        
    for i in range(1, 10):
        count[i] += count[i - 1]
        
    i = n - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1
        
    for i in range(0, n):
        arr[i] = output[i]
# Time Complexity: O(d * (n + k))`,
		java: `import java.util.Arrays;

public static void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countSort(arr, exp);
    }
}

public static void countSort(int[] arr, int exp) {
    int n = arr.length;
    int output[] = new int[n];
    int count[] = new int[10];
    Arrays.fill(count, 0);
    
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
        
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
        
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}
// Time Complexity: O(d * (n + k))`,
	},
	"Exponential Search": {
		javascript: `function exponentialSearch(arr, target) {
    const n = arr.length;
    if (arr[0] === target) return 0;
    
    // Find range for binary search
    let i = 1;
    while (i < n && arr[i] <= target) {
        i = i * 2;
    }
    
    return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, n - 1));
}

// Standard Binary Search helper
function binarySearch(arr, target, left, right) {
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
// Time Complexity: O(log n)`,
		python: `def exponential_search(arr, target):
    if arr[0] == target:
        return 0
    i = 1
    while i < len(arr) and arr[i] <= target:
        i = i * 2
    return binary_search(arr, target, i // 2, min(i, len(arr) - 1))

def binary_search(arr, target, left, right):
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1
# Time Complexity: O(log n)`,
		java: `public static int exponentialSearch(int[] arr, int target) {
    if (arr[0] == target) return 0;
    int i = 1;
    while (i < arr.length && arr[i] <= target) {
        i = i * 2;
    }
    return binarySearch(arr, target, i / 2, Math.min(i, arr.length - 1));
}

public static int binarySearch(int[] arr, int target, int left, int right) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
// Time Complexity: O(log n)`,
	},
	"Fibonacci Search": {
		javascript: `function fibonacciSearch(arr, target) {
    const n = arr.length;
    let fibM2 = 0; // (m-2)'th Fibonacci No.
    let fibM1 = 1; // (m-1)'th Fibonacci No.
    let fibM = fibM2 + fibM1; // m'th Fibonacci
    
    while (fibM < n) {
        fibM2 = fibM1;
        fibM1 = fibM;
        fibM = fibM2 + fibM1;
    }
    
    let offset = -1;
    while (fibM > 1) {
        let i = Math.min(offset + fibM2, n - 1);
        if (arr[i] < target) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibM2;
            fibM1 = fibM1 - fibM2;
            fibM2 = fibM - fibM1;
        } else return i;
    }
    if (fibM1 && arr[offset + 1] === target) return offset + 1;
    return -1;
}
// Time Complexity: O(log n)`,
		python: `def fibonacci_search(arr, target):
    n = len(arr)
    fibM2 = 0
    fibM1 = 1
    fibM = fibM2 + fibM1
    
    while fibM < n:
        fibM2 = fibM1
        fibM1 = fibM
        fibM = fibM2 + fibM1
        
    offset = -1
    while fibM > 1:
        i = min(offset + fibM2, n - 1)
        if arr[i] < target:
            fibM = fibM1
            fibM1 = fibM2
            fibM2 = fibM - fibM1
            offset = i
        elif arr[i] > target:
            fibM = fibM2
            fibM1 = fibM1 - fibM2
            fibM2 = fibM - fibM1
        else:
            return i
            
    if fibM1 and arr[offset + 1] == target:
        return offset + 1
    return -1
# Time Complexity: O(log n)`,
		java: `public static int fibonacciSearch(int[] arr, int target) {
    int n = arr.length;
    int fibM2 = 0;
    int fibM1 = 1;
    int fibM = fibM2 + fibM1;
    
    while (fibM < n) {
        fibM2 = fibM1;
        fibM1 = fibM;
        fibM = fibM2 + fibM1;
    }
    
    int offset = -1;
    while (fibM > 1) {
        int i = Math.min(offset + fibM2, n - 1);
        if (arr[i] < target) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibM2;
            fibM1 = fibM1 - fibM2;
            fibM2 = fibM - fibM1;
        } else return i;
    }
    if (fibM1 == 1 && arr[offset + 1] == target) return offset + 1;
    return -1;
}
// Time Complexity: O(log n)`,
	},
};
