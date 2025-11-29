export const codeSnippets: Record<
	string,
	{ javascript: string; python: string; java: string }
> = {
	// ==========================================
	// SORTING ALGORITHMS
	// ==========================================
	"Bubble Sort": {
		javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}
// Time Complexity: O(n²)`,
		python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
# Time Complexity: O(n²)`,
		java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}
// Time Complexity: O(n²)`,
	},
	"Selection Sort": {
		javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}
// Time Complexity: O(n²)`,
		python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
# Time Complexity: O(n²)`,
		java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}
// Time Complexity: O(n²)`,
	},
	"Insertion Sort": {
		javascript: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
// Time Complexity: O(n²)`,
		python: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
# Time Complexity: O(n²)`,
		java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
// Time Complexity: O(n²)`,
	},
	"Merge Sort": {
		javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}
// Time Complexity: O(n log n)`,
		python: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
def merge(left, right):
    result = []; i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]); i += 1
        else: result.append(right[j]); j += 1
    result.extend(left[i:]); result.extend(right[j:])
    return result
# Time Complexity: O(n log n)`,
		java: `public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}
public static void merge(int[] arr, int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int[] L = new int[n1]; int[] R = new int[n2];
    for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
    for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
// Time Complexity: O(n log n)`,
	},
	"Quick Sort": {
		javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
// Time Complexity: O(n log n) avg`,
		python: `def quick_sort(arr, low=0, high=None):
    if high is None: high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr
def partition(arr, low, high):
    pivot = arr[high]; i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
# Time Complexity: O(n log n) avg`,
		java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}
// Time Complexity: O(n log n) avg`,
	},
	"Heap Sort": {
		javascript: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
function heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
// Time Complexity: O(n log n)`,
		python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1): heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr
def heapify(arr, n, i):
    largest = i; l = 2 * i + 1; r = 2 * i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
# Time Complexity: O(n log n)`,
		java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}
static void heapify(int[] arr, int n, int i) {
    int largest = i; int l = 2 * i + 1; int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int swap = arr[i]; arr[i] = arr[largest]; arr[largest] = swap;
        heapify(arr, n, largest);
    }
}
// Time Complexity: O(n log n)`,
	},
	"Shell Sort": {
		javascript: `function shellSort(arr) {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}
// Time Complexity: O(n log² n)`,
		python: `def shell_sort(arr):
    n = len(arr); gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]; j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]; j -= gap
            arr[j] = temp
        gap //= 2
    return arr
# Time Complexity: O(n log² n)`,
		java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i]; int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap]; j -= gap;
            }
            arr[j] = temp;
        }
    }
}
// Time Complexity: O(n log² n)`,
	},
	"Tree Sort": {
		javascript: `class Node {
  constructor(value) { this.value = value; this.left = null; this.right = null; }
}
function treeSort(arr) {
  if (arr.length === 0) return arr;
  let root = new Node(arr[0]);
  for (let i = 1; i < arr.length; i++) insert(root, arr[i]);
  const result = [];
  inOrder(root, result);
  return result;
}
function insert(node, value) {
  if (value < node.value) {
    if (node.left === null) node.left = new Node(value);
    else insert(node.left, value);
  } else {
    if (node.right === null) node.right = new Node(value);
    else insert(node.right, value);
  }
}
function inOrder(node, result) {
  if (node !== null) {
    inOrder(node.left, result);
    result.push(node.value);
    inOrder(node.right, result);
  }
}
// Time Complexity: O(n log n)`,
		python: `class Node:
    def __init__(self, value):
        self.value = value; self.left = None; self.right = None
def tree_sort(arr):
    if not arr: return arr
    root = Node(arr[0])
    for val in arr[1:]: insert(root, val)
    res = []; in_order(root, res)
    return res
def insert(node, val):
    if val < node.value:
        if node.left is None: node.left = Node(val)
        else: insert(node.left, val)
    else:
        if node.right is None: node.right = Node(val)
        else: insert(node.right, val)
def in_order(node, res):
    if node:
        in_order(node.left, res)
        res.append(node.value)
        in_order(node.right, res)
# Time Complexity: O(n log n)`,
		java: `import java.util.*;
class Node {
    int value; Node left, right;
    Node(int value) { this.value = value; left = right = null; }
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
        for (int i = 1; i < arr.length; i++) insert(root, arr[i]);
        List<Integer> result = new ArrayList<>();
        inOrder(root, result);
        return result.stream().mapToInt(i -> i).toArray();
    }
}
// Time Complexity: O(n log n)`,
	},
	"Tim Sort": {
		javascript: `function timSort(arr) {
    const MIN_MERGE = 32;
    const n = arr.length;
    for (let i = 0; i < n; i += MIN_MERGE) {
        insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
    }
    for (let size = MIN_MERGE; size < n; size *= 2) {
        for (let start = 0; start < n; start += 2 * size) {
            const mid = start + size - 1;
            const end = Math.min(start + 2 * size - 1, n - 1);
            if (mid < end) merge(arr, start, mid, end);
        }
    }
    return arr;
}
// Helper functions insertionSort and merge are same as standard implementations
// Time Complexity: O(n log n)`,
		python: `def tim_sort(arr):
    MIN_MERGE = 32
    n = len(arr)
    for i in range(0, n, MIN_MERGE):
        insertion_sort(arr, i, min((i + 31), (n - 1)))
    size = MIN_MERGE
    while size < n:
        for left in range(0, n, 2 * size):
            mid = left + size - 1
            right = min((left + 2 * size - 1), (n - 1))
            if mid < right: merge(arr, left, mid, right)
        size = 2 * size
    return arr
# Time Complexity: O(n log n)`,
		java: `public static void timSort(int[] arr) {
    int MIN_MERGE = 32;
    int n = arr.length;
    for (int i = 0; i < n; i += MIN_MERGE) {
        insertionSort(arr, i, Math.min((i + MIN_MERGE - 1), (n - 1)));
    }
    for (int size = MIN_MERGE; size < n; size = 2 * size) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = left + size - 1;
            int right = Math.min((left + 2 * size - 1), (n - 1));
            if (mid < right) merge(arr, left, mid, right);
        }
    }
}
// Time Complexity: O(n log n)`,
	},
	"Cocktail Shaker Sort": {
		javascript: `function cocktailShakerSort(arr) {
  let swapped = true;
  let start = 0;
  let end = arr.length - 1;
  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
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
    n = len(arr); swapped = True
    start = 0; end = n - 1
    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]; swapped = True
        if not swapped: break
        swapped = False; end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]; swapped = True
        start += 1
    return arr
# Time Complexity: O(n²)`,
		java: `public static void cocktailShakerSort(int[] arr) {
    boolean swapped = true;
    int start = 0;
    int end = arr.length;
    while (swapped) {
        swapped = false;
        for (int i = start; i < end - 1; ++i) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false; end = end - 1;
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
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
  
  for (let i = 0; i < arr.length; i++) count[arr[i] - min]++;
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  return output;
}
// Time Complexity: O(n + k)`,
		python: `def counting_sort(arr):
    if not arr: return arr
    max_val = max(arr); min_val = min(arr)
    range_val = max_val - min_val + 1
    count = [0] * range_val
    output = [0] * len(arr)
    for num in arr: count[num - min_val] += 1
    for i in range(1, len(count)): count[i] += count[i - 1]
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    return output
# Time Complexity: O(n + k)`,
		java: `import java.util.Arrays;
public static int[] countingSort(int[] arr) {
    if (arr.length == 0) return arr;
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min + 1;
    int[] count = new int[range];
    int[] output = new int[arr.length];
    for (int num : arr) count[num - min]++;
    for (int i = 1; i < count.length; i++) count[i] += count[i - 1];
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
  for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  for (let i = n - 1; i >= 0; i--) {
    let idx = Math.floor(arr[i] / exp) % 10;
    output[count[idx] - 1] = arr[i];
    count[idx]--;
  }
  for (let i = 0; i < n; i++) arr[i] = output[i];
}
// Time Complexity: O(d * (n + k))`,
		python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_digit(arr, exp)
        exp *= 10
    return arr
def counting_sort_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n): count[(arr[i] // exp) % 10] += 1
    for i in range(1, 10): count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        idx = (arr[i] // exp) % 10
        output[count[idx] - 1] = arr[i]
        count[idx] -= 1
    for i in range(n): arr[i] = output[i]
# Time Complexity: O(d * (n + k))`,
		java: `import java.util.Arrays;
public static void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    for (int exp = 1; max / exp > 0; exp *= 10) countSort(arr, exp);
}
public static void countSort(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int idx = (arr[i] / exp) % 10;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}
// Time Complexity: O(d * (n + k))`,
	},

	// ==========================================
	// SEARCHING ALGORITHMS
	// ==========================================
	"Linear Search": {
		javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
// Time Complexity: O(n)`,
		python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
# Time Complexity: O(n)`,
		java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
// Time Complexity: O(n)`,
	},
	"Binary Search": {
		javascript: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
// Time Complexity: O(log n)`,
		python: `def binary_search(arr, target):
    left = 0; right = len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1
# Time Complexity: O(log n)`,
		java: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
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
	"Jump Search": {
		javascript: `function jumpSearch(arr, target) {
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }
  if (arr[prev] === target) return prev;
  return -1;
}
// Time Complexity: O(√n)`,
		python: `import math
def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n: return -1
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n): return -1
    if arr[prev] == target: return prev
    return -1
# Time Complexity: O(√n)`,
		java: `public static int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = (int) Math.floor(Math.sqrt(n));
    int prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += (int) Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == Math.min(step, n)) return -1;
    }
    if (arr[prev] == target) return prev;
    return -1;
}
// Time Complexity: O(√n)`,
	},
	"Interpolation Search": {
		javascript: `function interpolationSearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
    if (lo === hi) {
      if (arr[lo] === target) return lo;
      return -1;
    }
    let pos = lo + Math.floor(((hi - lo) / (arr[hi] - arr[lo])) * (target - arr[lo]));
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) lo = pos + 1;
    else hi = pos - 1;
  }
  return -1;
}
// Time Complexity: O(log log n)`,
		python: `def interpolation_search(arr, target):
    lo = 0; hi = len(arr) - 1
    while lo <= hi and target >= arr[lo] and target <= arr[hi]:
        if lo == hi:
            if arr[lo] == target: return lo
            return -1
        pos = lo + int(((hi - lo) / (arr[hi] - arr[lo])) * (target - arr[lo]))
        if arr[pos] == target: return pos
        if arr[pos] < target: lo = pos + 1
        else: hi = pos - 1
    return -1
# Time Complexity: O(log log n)`,
		java: `public static int interpolationSearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (lo == hi) {
            if (arr[lo] == target) return lo;
            return -1;
        }
        int pos = lo + (((hi - lo) / (arr[hi] - arr[lo])) * (target - arr[lo]));
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}
// Time Complexity: O(log log n)`,
	},
	"Exponential Search": {
		javascript: `function exponentialSearch(arr, target) {
  if (arr[0] === target) return 0;
  let i = 1;
  while (i < arr.length && arr[i] <= target) i *= 2;
  return binarySearch(arr, target, Math.floor(i/2), Math.min(i, arr.length - 1));
}
function binarySearch(arr, target, l, r) {
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}
// Time Complexity: O(log n)`,
		python: `def exponential_search(arr, target):
    if arr[0] == target: return 0
    i = 1
    while i < len(arr) and arr[i] <= target:
        i *= 2
    return binary_search(arr, target, i // 2, min(i, len(arr) - 1))
def binary_search(arr, target, l, r):
    while l <= r:
        mid = (l + r) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: l = mid + 1
        else: r = mid - 1
    return -1
# Time Complexity: O(log n)`,
		java: `public static int exponentialSearch(int[] arr, int target) {
    if (arr[0] == target) return 0;
    int i = 1;
    while (i < arr.length && arr[i] <= target) i *= 2;
    return binarySearch(arr, target, i/2, Math.min(i, arr.length - 1));
}
public static int binarySearch(int[] arr, int target, int l, int r) {
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}
// Time Complexity: O(log n)`,
	},
	"Fibonacci Search": {
		javascript: `function fibonacciSearch(arr, target) {
  const n = arr.length;
  let fib2 = 0; let fib1 = 1; let fibM = fib2 + fib1;
  while (fibM < n) { fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1; }
  let offset = -1;
  while (fibM > 1) {
    let i = Math.min(offset + fib2, n - 1);
    if (arr[i] < target) {
      fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i;
    } else if (arr[i] > target) {
      fibM = fib2; fib1 = fib1 - fib2; fib2 = fibM - fib1;
    } else return i;
  }
  if (fib1 && arr[offset + 1] === target) return offset + 1;
  return -1;
}
// Time Complexity: O(log n)`,
		python: `def fibonacci_search(arr, target):
    n = len(arr)
    fib2 = 0; fib1 = 1; fibM = fib2 + fib1
    while fibM < n:
        fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1
    offset = -1
    while fibM > 1:
        i = min(offset + fib2, n - 1)
        if arr[i] < target:
            fibM = fib1; fib1 = fib2; fib2 = fibM - fib1
            offset = i
        elif arr[i] > target:
            fibM = fib2; fib1 = fib1 - fib2; fib2 = fibM - fib1
        else: return i
    if fib1 and arr[offset + 1] == target: return offset + 1
    return -1
# Time Complexity: O(log n)`,
		java: `public static int fibonacciSearch(int[] arr, int target) {
    int n = arr.length;
    int fib2 = 0, fib1 = 1, fibM = fib2 + fib1;
    while (fibM < n) {
        fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1;
    }
    int offset = -1;
    while (fibM > 1) {
        int i = Math.min(offset + fib2, n - 1);
        if (arr[i] < target) {
            fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i;
        } else if (arr[i] > target) {
            fibM = fib2; fib1 = fib1 - fib2; fib2 = fibM - fib1;
        } else return i;
    }
    if (fib1 == 1 && arr[offset + 1] == target) return offset + 1;
    return -1;
}
// Time Complexity: O(log n)`,
	},

	// ==========================================
	// DYNAMIC PROGRAMMING
	// ==========================================
	"0/1 Knapsack Problem": {
		javascript: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}
// Time Complexity: O(n * W)`,
		python: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0 for x in range(capacity + 1)] for x in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][capacity]
# Time Complexity: O(n * W)`,
		java: `public static int knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[n + 1][capacity + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}
// Time Complexity: O(n * W)`,
	},
	"Fibonacci Sequence": {
		javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0; dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
// Time Complexity: O(n)`,
		python: `def fibonacci(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]
# Time Complexity: O(n)`,
		java: `public static int fibonacci(int n) {
    if (n <= 1) return n;
    int[] dp = new int[n + 1];
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
// Time Complexity: O(n)`,
	},

	// ==========================================
	// BACKTRACKING
	// ==========================================
	"N-Queens Problem": {
		javascript: `function solveNQueens(n) {
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  const solutions = [];
  function isSafe(row, col) {
    for (let i = 0; i < col; i++) if (board[row][i] === 'Q') return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;
    for (let i = row, j = col; i < n && j >= 0; i++, j--) if (board[i][j] === 'Q') return false;
    return true;
  }
  function solve(col) {
    if (col >= n) {
      solutions.push(board.map(row => row.join('')));
      return;
    }
    for (let row = 0; row < n; row++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        solve(col + 1);
        board[row][col] = '.';
      }
    }
  }
  solve(0);
  return solutions;
}
// Time Complexity: O(n!)`,
		python: `def solve_n_queens(n):
    board = [['.' for _ in range(n)] for _ in range(n)]
    solutions = []
    def is_safe(row, col):
        for i in range(col):
            if board[row][i] == 'Q': return False
        for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
            if board[i][j] == 'Q': return False
        for i, j in zip(range(row, n, 1), range(col, -1, -1)):
            if board[i][j] == 'Q': return False
        return True
    def solve(col):
        if col >= n:
            solutions.append(["".join(row) for row in board])
            return
        for i in range(n):
            if is_safe(i, col):
                board[i][col] = 'Q'
                solve(col + 1)
                board[i][col] = '.'
    solve(0)
    return solutions
# Time Complexity: O(n!)`,
		java: `import java.util.*;
public class NQueens {
    public List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) Arrays.fill(board[i], '.');
        List<List<String>> res = new ArrayList<>();
        dfs(0, board, res);
        return res;
    }
    private void dfs(int col, char[][] board, List<List<String>> res) {
        if (col == board.length) {
            res.add(construct(board));
            return;
        }
        for (int row = 0; row < board.length; row++) {
            if (validate(board, row, col)) {
                board[row][col] = 'Q';
                dfs(col + 1, board, res);
                board[row][col] = '.';
            }
        }
    }
    private boolean validate(char[][] board, int row, int col) {
        int dupRow = row, dupCol = col;
        while (row >= 0 && col >= 0) { if (board[row][col] == 'Q') return false; row--; col--; }
        row = dupRow; col = dupCol;
        while (col >= 0) { if (board[row][col] == 'Q') return false; col--; }
        row = dupRow; col = dupCol;
        while (col >= 0 && row < board.length) { if (board[row][col] == 'Q') return false; col--; row++; }
        return true;
    }
    private List<String> construct(char[][] board) {
        List<String> res = new ArrayList<>();
        for (int i = 0; i < board.length; i++) res.add(new String(board[i]));
        return res;
    }
}
// Time Complexity: O(n!)`,
	},
	"Sudoku Solver": {
		javascript: `function solveSudoku(board) {
  function isValid(row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
      if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) return false;
    }
    return true;
  }
  function solve() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          for (let c = 1; c <= 9; c++) {
            if (isValid(i, j, c)) {
              board[i][j] = c;
              if (solve()) return true;
              board[i][j] = 0;
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
}
// Time Complexity: O(9^m)`,
		python: `def solve_sudoku(board):
    solve(board)
def solve(board):
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:
                for c in range(1, 10):
                    if is_valid(board, i, j, c):
                        board[i][j] = c
                        if solve(board): return True
                        board[i][j] = 0
                return False
    return True
def is_valid(board, row, col, c):
    for i in range(9):
        if board[i][col] == c or board[row][i] == c: return False
        if board[3 * (row // 3) + i // 3][3 * (col // 3) + i % 3] == c: return False
    return True
# Time Complexity: O(9^m)`,
		java: `public class SudokuSolver {
    public boolean solveSudoku(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solveSudoku(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    private boolean isValid(char[][] board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == c) return false;
            if (board[row][i] == c) return false;
            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }
}
// Time Complexity: O(9^m)`,
	},

	// ==========================================
	// GRAPH ALGORITHMS
	// ==========================================
	"Depth First Search (DFS)": {
		javascript: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) dfs(graph, neighbor, visited);
  }
}
// Time Complexity: O(V + E)`,
		python: `def dfs(graph, start, visited=None):
    if visited is None: visited = set()
    visited.add(start)
    print(start)
    for next_node in graph[start] - visited:
        dfs(graph, next_node, visited)
    return visited
# Time Complexity: O(V + E)`,
		java: `import java.util.*;
public class DFS {
    public void dfs(int start, boolean[] visited, ArrayList<ArrayList<Integer>> adj) {
        visited[start] = true;
        System.out.print(start + " ");
        for (Integer neighbor : adj.get(start)) {
            if (!visited[neighbor]) dfs(neighbor, visited, adj);
        }
    }
}
// Time Complexity: O(V + E)`,
	},
	"Breadth First Search (BFS)": {
		javascript: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
// Time Complexity: O(V + E)`,
		python: `from collections import deque
def bfs(graph, start):
    visited = set(); queue = deque([start])
    visited.add(start)
    while queue:
        vertex = queue.popleft()
        print(vertex)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
# Time Complexity: O(V + E)`,
		java: `import java.util.*;
public class BFS {
    public void bfs(int start, int V, ArrayList<ArrayList<Integer>> adj) {
        boolean[] visited = new boolean[V];
        LinkedList<Integer> queue = new LinkedList<>();
        visited[start] = true;
        queue.add(start);
        while (queue.size() != 0) {
            start = queue.poll();
            System.out.print(start + " ");
            for (int n : adj.get(start)) {
                if (!visited[n]) {
                    visited[n] = true;
                    queue.add(n);
                }
            }
        }
    }
}
// Time Complexity: O(V + E)`,
	},
	"Dijkstra's Algorithm": {
		javascript: `function dijkstra(graph, start) {
  const distances = {};
  const pq = new PriorityQueue(); // Assume PriorityQueue exists
  for (let node in graph) distances[node] = Infinity;
  distances[start] = 0;
  pq.enqueue(start, 0);
  while (!pq.isEmpty()) {
    let { element: currentNode, priority: currentDist } = pq.dequeue();
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
}
// Time Complexity: O((V+E)logV)`,
		python: `import heapq
def dijkstra(graph, start):
    pq = [(0, start)]
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0
    while pq:
        current_dist, current_vertex = heapq.heappop(pq)
        if current_dist > distances[current_vertex]: continue
        for neighbor, weight in graph[current_vertex].items():
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    return distances
# Time Complexity: O((V+E)logV)`,
		java: `import java.util.*;
public class Dijkstra {
    public int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int S) {
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
}
// Time Complexity: O((V+E)logV)`,
	},
	"A* Search": {
		javascript: `function aStar(start, goal, h) {
  let openSet = [start];
  let cameFrom = {};
  let gScore = {}; gScore[start] = 0;
  let fScore = {}; fScore[start] = h(start);
  while (openSet.length > 0) {
    let current = openSet.reduce((a, b) => fScore[a] < fScore[b] ? a : b);
    if (current === goal) return reconstruct_path(cameFrom, current);
    openSet = openSet.filter(item => item !== current);
    for (let neighbor of getNeighbors(current)) {
      let tentative_gScore = gScore[current] + d(current, neighbor);
      if (tentative_gScore < (gScore[neighbor] || Infinity)) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentative_gScore;
        fScore[neighbor] = gScore[neighbor] + h(neighbor);
        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    }
  }
  return false;
}
// Time Complexity: O(E)`,
		python: `import heapq
def a_star(start, goal, h):
    open_set = []
    heapq.heappush(open_set, (0, start))
    came_from = {}
    g_score = {start: 0}
    f_score = {start: h(start)}
    while open_set:
        current = heapq.heappop(open_set)[1]
        if current == goal: return reconstruct_path(came_from, current)
        for neighbor in get_neighbors(current):
            tentative_g_score = g_score[current] + d(current, neighbor)
            if tentative_g_score < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = g_score[neighbor] + h(neighbor)
                heapq.heappush(open_set, (f_score[neighbor], neighbor))
    return False
# Time Complexity: O(E)`,
		java: `import java.util.*;
public class AStar {
    public List<Node> findPath(Node start, Node goal) {
        PriorityQueue<Node> openSet = new PriorityQueue<>(Comparator.comparingDouble(n -> n.f));
        Set<Node> closedSet = new HashSet<>();
        start.g = 0;
        start.f = start.g + heuristic(start, goal);
        openSet.add(start);
        while(!openSet.isEmpty()) {
            Node current = openSet.poll();
            if(current.equals(goal)) return reconstructPath(current);
            closedSet.add(current);
            for(Edge edge : current.neighbors) {
                Node neighbor = edge.target;
                if(closedSet.contains(neighbor)) continue;
                double tentativeG = current.g + edge.weight;
                if(tentativeG < neighbor.g) {
                    neighbor.parent = current;
                    neighbor.g = tentativeG;
                    neighbor.f = neighbor.g + heuristic(neighbor, goal);
                    if(!openSet.contains(neighbor)) openSet.add(neighbor);
                }
            }
        }
        return null;
    }
}
// Time Complexity: O(E)`,
	},
	"Uniform Cost Search": {
		javascript: `function ucs(graph, start, goal) {
  const pq = new PriorityQueue(); 
  pq.enqueue(start, 0);
  const visited = new Set();
  while (!pq.isEmpty()) {
    const { element: node, priority: cost } = pq.dequeue();
    if (node === goal) return cost;
    if (visited.has(node)) continue;
    visited.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        const newCost = cost + getWeight(node, neighbor);
        pq.enqueue(neighbor, newCost);
      }
    }
  }
  return -1;
}
// Time Complexity: O(E log V)`,
		python: `import heapq
def ucs(graph, start, goal):
    visited = set()
    queue = [(0, start)]
    while queue:
        cost, node = heapq.heappop(queue)
        if node == goal: return cost
        if node not in visited:
            visited.add(node)
            for neighbor, weight in graph[node].items():
                if neighbor not in visited:
                    total_cost = cost + weight
                    heapq.heappush(queue, (total_cost, neighbor))
    return -1
# Time Complexity: O(E log V)`,
		java: `import java.util.*;
public class UCS {
    public int solve(Map<Integer, List<int[]>> graph, int start, int goal) {
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
}
// Time Complexity: O(E log V)`,
	},
	"Prim's Algorithm": {
		javascript: `function primMST(graph) {
  const parent = []; 
  const key = []; 
  const mstSet = []; 
  const V = graph.length;
  for (let i = 0; i < V; i++) { key[i] = Infinity; mstSet[i] = false; }
  key[0] = 0; parent[0] = -1;
  for (let count = 0; count < V - 1; count++) {
    let u = minKey(key, mstSet, V);
    mstSet[u] = true;
    for (let v = 0; v < V; v++) {
      if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v]) {
        parent[v] = u; key[v] = graph[u][v];
      }
    }
  }
  return parent;
}
// Time Complexity: O(E log V)`,
		python: `import sys
class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = [[0 for column in range(vertices)] for row in range(vertices)]
    def minKey(self, key, mstSet):
        min_val = sys.maxsize
        min_index = -1
        for v in range(self.V):
            if key[v] < min_val and not mstSet[v]:
                min_val = key[v]; min_index = v
        return min_index
    def primMST(self):
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
// Time Complexity: O(V^2)`,
		java: `import java.util.*;
public class Prims {
    public int spanningTree(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj) {
        boolean[] vis = new boolean[V];
        PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> a.wt - b.wt);
        pq.add(new Pair(0, 0));
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
                if(!vis[adjNode]) pq.add(new Pair(edgeW, adjNode));
            }
        }
        return sum;
    }
    class Pair {
        int wt; int node;
        public Pair(int distance, int node) { this.wt = distance; this.node = node; }
    }
}
// Time Complexity: O(E log V)`,
	},
	"Kruskal's Algorithm": {
		javascript: `class UnionFind {
  constructor(n) { this.parent = Array.from({length: n}, (_, i) => i); }
  find(i) {
    if (this.parent[i] == i) return i;
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
  edges.sort((a, b) => a.weight - b.weight);
  const uf = new UnionFind(V);
  const result = [];
  let e = 0; let i = 0;
  while (i < V - 1 && e < edges.length) {
    const {src, dest, weight} = edges[e++];
    let x = uf.find(src);
    let y = uf.find(dest);
    if (x !== y) {
      result.push({src, dest, weight});
      uf.union(x, y);
      i++;
    }
  }
  return result;
}
// Time Complexity: O(E log E)`,
		python: `class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = []
    def addEdge(self, u, v, w):
        self.graph.append([u, v, w])
    def find(self, parent, i):
        if parent[i] == i: return i
        return self.find(parent, parent[i])
    def union(self, parent, rank, x, y):
        xroot = self.find(parent, x)
        yroot = self.find(parent, y)
        if rank[xroot] < rank[yroot]: parent[xroot] = yroot
        elif rank[xroot] > rank[yroot]: parent[yroot] = xroot
        else: parent[yroot] = xroot; rank[xroot] += 1
    def KruskalMST(self):
        result = []
        i = 0; e = 0
        self.graph = sorted(self.graph, key=lambda item: item[2])
        parent = []; rank = []
        for node in range(self.V):
            parent.append(node); rank.append(0)
        while e < self.V - 1:
            u, v, w = self.graph[i]
            i = i + 1
            x = self.find(parent, u)
            y = self.find(parent, v)
            if x != y:
                e = e + 1
                result.append([u, v, w])
                self.union(parent, rank, x, y)
        return result
# Time Complexity: O(E log E)`,
		java: `import java.util.*;
class Edge implements Comparable<Edge> {
    int src, dest, weight;
    public int compareTo(Edge compareEdge) { return this.weight - compareEdge.weight; }
}
public class Kruskal {
    class Subset { int parent, rank; }
    int find(Subset subsets[], int i) {
        if (subsets[i].parent != i) subsets[i].parent = find(subsets, subsets[i].parent);
        return subsets[i].parent;
    }
    void Union(Subset subsets[], int x, int y) {
        int xroot = find(subsets, x);
        int yroot = find(subsets, y);
        if (subsets[xroot].rank < subsets[yroot].rank) subsets[xroot].parent = yroot;
        else if (subsets[xroot].rank > subsets[yroot].rank) subsets[yroot].parent = xroot;
        else { subsets[yroot].parent = xroot; subsets[xroot].rank++; }
    }
    void KruskalMST(Edge[] edges, int V, int E) {
        Edge result[] = new Edge[V];
        int e = 0; int i = 0;
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
}
// Time Complexity: O(E log E)`,
	},
};
