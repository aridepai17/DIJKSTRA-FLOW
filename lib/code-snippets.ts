export const codeSnippets: Record<
	string,
	{ javascript: string; python: string; java: string }
> = {
	"Bubble Sort": {
		javascript: `function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
        }
      }
      
      // If no swaps, array is sorted
      if (!swapped) break;
    }
    
    return arr;
  }
  
  // Time Complexity: O(n²)
  // Space Complexity: O(1)`,
		python: `def bubble_sort(arr):
      n = len(arr)
      
      for i in range(n - 1):
          swapped = False
          
          for j in range(n - i - 1):
              if arr[j] > arr[j + 1]:
                  # Swap elements
                  arr[j], arr[j + 1] = arr[j + 1], arr[j]
                  swapped = True
          
          # If no swaps, array is sorted
          if not swapped:
              break
      
      return arr
  
  # Time Complexity: O(n²)
  # Space Complexity: O(1)`,
		java: `public static void bubbleSort(int[] arr) {
      int n = arr.length;
      
      for (int i = 0; i < n - 1; i++) {
          boolean swapped = false;
          
          for (int j = 0; j < n - i - 1; j++) {
              if (arr[j] > arr[j + 1]) {
                  // Swap elements
                  int temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
                  swapped = true;
              }
          }
          
          // If no swaps, array is sorted
          if (!swapped) break;
      }
  }
  
  // Time Complexity: O(n²)
  // Space Complexity: O(1)`,
	},
	"Selection Sort": {
		javascript: `function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      // Find minimum element in unsorted portion
      let minIdx = i;
      
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      
      // Swap minimum with first unsorted element
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
    }
    
    return arr;
  }
  
  // Time Complexity: O(n²)
  // Space Complexity: O(1)`,
		python: `def selection_sort(arr):
      n = len(arr)
      
      for i in range(n - 1):
          # Find minimum element in unsorted portion
          min_idx = i
          
          for j in range(i + 1, n):
              if arr[j] < arr[min_idx]:
                  min_idx = j
          
          # Swap minimum with first unsorted element
          if min_idx != i:
              arr[i], arr[min_idx] = arr[min_idx], arr[i]
      
      return arr
  
  # Time Complexity: O(n²)
  # Space Complexity: O(1)`,
		java: `public static void selectionSort(int[] arr) {
      int n = arr.length;
      
      for (int i = 0; i < n - 1; i++) {
          // Find minimum element in unsorted portion
          int minIdx = i;
          
          for (int j = i + 1; j < n; j++) {
              if (arr[j] < arr[minIdx]) {
                  minIdx = j;
              }
          }
          
          // Swap minimum with first unsorted element
          if (minIdx != i) {
              int temp = arr[i];
              arr[i] = arr[minIdx];
              arr[minIdx] = temp;
          }
      }
  }
  
  // Time Complexity: O(n²)
  // Space Complexity: O(1)`,
	},
	"Insertion Sort": {
		javascript: `function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      
      // Move elements greater than key one position ahead
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      
      arr[j + 1] = key;
    }
    
    return arr;
  }
  
  // Time Complexity: O(n²)
  // Space Complexity: O(1)`,
		python: `def insertion_sort(arr):
      n = len(arr)
      
      for i in range(1, n):
          key = arr[i]
          j = i - 1
          
          # Move elements greater than key one position ahead
          while j >= 0 and arr[j] > key:
              arr[j + 1] = arr[j]
              j -= 1
          
          arr[j + 1] = key
      
      return arr
  
  # Time Complexity: O(n²)
  # Space Complexity: O(1)`,
		java: `public static void insertionSort(int[] arr) {
      int n = arr.length;
      
      for (int i = 1; i < n; i++) {
          int key = arr[i];
          int j = i - 1;
          
          // Move elements greater than key one position ahead
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j--;
          }
          
          arr[j + 1] = key;
      }
  }
  
  // Time Complexity: O(n²)
  // Space Complexity: O(1)`,
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
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
  
  // Time Complexity: O(n log n)
  // Space Complexity: O(n)`,
		python: `def merge_sort(arr):
      if len(arr) <= 1:
          return arr
      
      mid = len(arr) // 2
      left = merge_sort(arr[:mid])
      right = merge_sort(arr[mid:])
      
      return merge(left, right)
  
  def merge(left, right):
      result = []
      i = j = 0
      
      while i < len(left) and j < len(right):
          if left[i] <= right[j]:
              result.append(left[i])
              i += 1
          else:
              result.append(right[j])
              j += 1
      
      result.extend(left[i:])
      result.extend(right[j:])
      return result
  
  # Time Complexity: O(n log n)
  # Space Complexity: O(n)`,
		java: `public static void mergeSort(int[] arr, int left, int right) {
      if (left < right) {
          int mid = left + (right - left) / 2;
          
          mergeSort(arr, left, mid);
          mergeSort(arr, mid + 1, right);
          merge(arr, left, mid, right);
      }
  }
  
  public static void merge(int[] arr, int left, int mid, int right) {
      int n1 = mid - left + 1;
      int n2 = right - mid;
      
      int[] L = new int[n1];
      int[] R = new int[n2];
      
      for (int i = 0; i < n1; i++)
          L[i] = arr[left + i];
      for (int j = 0; j < n2; j++)
          R[j] = arr[mid + 1 + j];
      
      int i = 0, j = 0, k = left;
      
      while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
              arr[k++] = L[i++];
          } else {
              arr[k++] = R[j++];
          }
      }
      
      while (i < n1) arr[k++] = L[i++];
      while (j < n2) arr[k++] = R[j++];
  }
  
  // Time Complexity: O(n log n)
  // Space Complexity: O(n)`,
	},
	"Quick Sort": {
		javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
      const pivotIdx = partition(arr, low, high);
      quickSort(arr, low, pivotIdx - 1);
      quickSort(arr, pivotIdx + 1, high);
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
  
  // Time Complexity: O(n log n) average, O(n²) worst
  // Space Complexity: O(log n)`,
		python: `def quick_sort(arr, low=0, high=None):
      if high is None:
          high = len(arr) - 1
      
      if low < high:
          pivot_idx = partition(arr, low, high)
          quick_sort(arr, low, pivot_idx - 1)
          quick_sort(arr, pivot_idx + 1, high)
      
      return arr
  
  def partition(arr, low, high):
      pivot = arr[high]
      i = low - 1
      
      for j in range(low, high):
          if arr[j] < pivot:
              i += 1
              arr[i], arr[j] = arr[j], arr[i]
      
      arr[i + 1], arr[high] = arr[high], arr[i + 1]
      return i + 1
  
  # Time Complexity: O(n log n) average, O(n²) worst
  # Space Complexity: O(log n)`,
		java: `public static void quickSort(int[] arr, int low, int high) {
      if (low < high) {
          int pivotIdx = partition(arr, low, high);
          quickSort(arr, low, pivotIdx - 1);
          quickSort(arr, pivotIdx + 1, high);
      }
  }
  
  public static int partition(int[] arr, int low, int high) {
      int pivot = arr[high];
      int i = low - 1;
      
      for (int j = low; j < high; j++) {
          if (arr[j] < pivot) {
              i++;
              int temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
          }
      }
      
      int temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      
      return i + 1;
  }
  
  // Time Complexity: O(n log n) average, O(n²) worst
  // Space Complexity: O(log n)`,
	},
	"Heap Sort": {
		javascript: `function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, i, 0);
    }
    
    return arr;
  }
  
  function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  }
  
  // Time Complexity: O(n log n)
  // Space Complexity: O(1)`,
		python: `def heap_sort(arr):
      n = len(arr)
      
      # Build max heap
      for i in range(n // 2 - 1, -1, -1):
          heapify(arr, n, i)
      
      # Extract elements from heap one by one
      for i in range(n - 1, 0, -1):
          arr[0], arr[i] = arr[i], arr[0]
          heapify(arr, i, 0)
      
      return arr
  
  def heapify(arr, n, i):
      largest = i
      left = 2 * i + 1
      right = 2 * i + 2
      
      if left < n and arr[left] > arr[largest]:
          largest = left
      
      if right < n and arr[right] > arr[largest]:
          largest = right
      
      if largest != i:
          arr[i], arr[largest] = arr[largest], arr[i]
          heapify(arr, n, largest)
  
  # Time Complexity: O(n log n)
  # Space Complexity: O(1)`,
		java: `public static void heapSort(int[] arr) {
      int n = arr.length;
      
      // Build max heap
      for (int i = n / 2 - 1; i >= 0; i--) {
          heapify(arr, n, i);
      }
      
      // Extract elements from heap one by one
      for (int i = n - 1; i > 0; i--) {
          int temp = arr[0];
          arr[0] = arr[i];
          arr[i] = temp;
          
          heapify(arr, i, 0);
      }
  }
  
  public static void heapify(int[] arr, int n, int i) {
      int largest = i;
      int left = 2 * i + 1;
      int right = 2 * i + 2;
      
      if (left < n && arr[left] > arr[largest]) {
          largest = left;
      }
      
      if (right < n && arr[right] > arr[largest]) {
          largest = right;
      }
      
      if (largest != i) {
          int temp = arr[i];
          arr[i] = arr[largest];
          arr[largest] = temp;
          
          heapify(arr, n, largest);
      }
  }
  
  // Time Complexity: O(n log n)
  // Space Complexity: O(1)`,
	},
	"Shell Sort": {
		javascript: `function shellSort(arr) {
    const n = arr.length;
    
    // Start with a large gap, then reduce
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      // Do a gapped insertion sort
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
  
  // Time Complexity: O(n log² n)
  // Space Complexity: O(1)`,
		python: `def shell_sort(arr):
      n = len(arr)
      gap = n // 2
      
      # Start with a large gap, then reduce
      while gap > 0:
          # Do a gapped insertion sort
          for i in range(gap, n):
              temp = arr[i]
              j = i
              
              while j >= gap and arr[j - gap] > temp:
                  arr[j] = arr[j - gap]
                  j -= gap
              
              arr[j] = temp
          
          gap //= 2
      
      return arr
  
  # Time Complexity: O(n log² n)
  # Space Complexity: O(1)`,
		java: `public static void shellSort(int[] arr) {
      int n = arr.length;
      
      // Start with a large gap, then reduce
      for (int gap = n / 2; gap > 0; gap /= 2) {
          // Do a gapped insertion sort
          for (int i = gap; i < n; i++) {
              int temp = arr[i];
              int j = i;
              
              while (j >= gap && arr[j - gap] > temp) {
                  arr[j] = arr[j - gap];
                  j -= gap;
              }
              
              arr[j] = temp;
          }
      }
  }
  
  // Time Complexity: O(n log² n)
  // Space Complexity: O(1)`,
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
    
    // In-order traversal
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
  
  // Time Complexity: O(n log n) average, O(n²) worst
  // Space Complexity: O(n)`,
		python: `class Node:
      def __init__(self, value):
          self.value = value
          self.left = None
          self.right = None
  
  def tree_sort(arr):
      if not arr:
          return arr
      
      # Build BST
      root = Node(arr[0])
      for value in arr[1:]:
          insert(root, value)
      
      # In-order traversal
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
      if node is not None:
          in_order(node.left, result)
          result.append(node.value)
          in_order(node.right, result)
  
  # Time Complexity: O(n log n) average, O(n²) worst
  # Space Complexity: O(n)`,
		java: `class Node {
      int value;
      Node left, right;
      
      Node(int value) {
          this.value = value;
          left = right = null;
      }
  }
  
  public static int[] treeSort(int[] arr) {
      if (arr.length == 0) return arr;
      
      // Build BST
      Node root = new Node(arr[0]);
      for (int i = 1; i < arr.length; i++) {
          insert(root, arr[i]);
      }
      
      // In-order traversal
      List<Integer> result = new ArrayList<>();
      inOrder(root, result);
      
      return result.stream().mapToInt(i -> i).toArray();
  }
  
  public static void insert(Node node, int value) {
      if (value < node.value) {
          if (node.left == null) {
              node.left = new Node(value);
          } else {
              insert(node.left, value);
          }
      } else {
          if (node.right == null) {
              node.right = new Node(value);
          } else {
              insert(node.right, value);
          }
      }
  }
  
  public static void inOrder(Node node, List<Integer> result) {
      if (node != null) {
          inOrder(node.left, result);
          result.add(node.value);
          inOrder(node.right, result);
      }
  }
  
  // Time Complexity: O(n log n) average, O(n²) worst
  // Space Complexity: O(n)`,
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
  
  function insertionSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;
      
      while (j >= left && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }
  
  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
      }
    }
    
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
  }
  
  // Time Complexity: O(n log n)
  // Space Complexity: O(n)`,
		python: `def tim_sort(arr):
      MIN_MERGE = 32
      n = len(arr)
      
      # Sort individual subarrays of size MIN_MERGE
      for start in range(0, n, MIN_MERGE):
          end = min(start + MIN_MERGE - 1, n - 1)
          insertion_sort(arr, start, end)
      
      # Merge subarrays
      size = MIN_MERGE
      while size < n:
          for start in range(0, n, size * 2):
              mid = start + size - 1
              end = min(start + size * 2 - 1, n - 1)
              
              if mid < end:
                  merge(arr, start, mid, end)
          
          size *= 2
      
      return arr
  
  def insertion_sort(arr, left, right):
      for i in range(left + 1, right + 1):
          key = arr[i]
          j = i - 1
          
          while j >= left and arr[j] > key:
              arr[j + 1] = arr[j]
              j -= 1
          arr[j + 1] = key
  
  def merge(arr, left, mid, right):
      left_arr = arr[left:mid + 1]
      right_arr = arr[mid + 1:right + 1]
      
      i = j = 0
      k = left
      
      while i < len(left_arr) and j < len(right_arr):
          if left_arr[i] <= right_arr[j]:
              arr[k] = left_arr[i]
              i += 1
          else:
              arr[k] = right_arr[j]
              j += 1
          k += 1
      
      while i < len(left_arr):
          arr[k] = left_arr[i]
          i += 1
          k += 1
      
      while j < len(right_arr):
          arr[k] = right_arr[j]
          j += 1
          k += 1
  
  # Time Complexity: O(n log n)
  # Space Complexity: O(n)`,
		java: `public static void timSort(int[] arr) {
      final int MIN_MERGE = 32;
      int n = arr.length;
      
      // Sort individual subarrays of size MIN_MERGE
      for (int i = 0; i < n; i += MIN_MERGE) {
          insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
      }
      
      // Merge subarrays
      for (int size = MIN_MERGE; size < n; size *= 2) {
          for (int start = 0; start < n; start += 2 * size) {
              int mid = start + size - 1;
              int end = Math.min(start + 2 * size - 1, n - 1);
              
              if (mid < end) {
                  merge(arr, start, mid, end);
              }
          }
      }
  }
  
  public static void insertionSort(int[] arr, int left, int right) {
      for (int i = left + 1; i <= right; i++) {
          int key = arr[i];
          int j = i - 1;
          
          while (j >= left && arr[j] > key) {
              arr[j + 1] = arr[j];
              j--;
          }
          arr[j + 1] = key;
      }
  }
  
  // Time Complexity: O(n log n)
  // Space Complexity: O(n)`,
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
  
  // Time Complexity: O(n²)
  // Space Complexity: O(1)`,
		python: `def cocktail_shaker_sort(arr):
      swapped = True
      start = 0
      end = len(arr) - 1
      
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
          end -= 1
          
          # Backward pass
          for i in range(end, start, -1):
              if arr[i] < arr[i - 1]:
                  arr[i], arr[i - 1] = arr[i - 1], arr[i]
                  swapped = True
          
          start += 1
      
      return arr
  
  # Time Complexity: O(n²)
  # Space Complexity: O(1)`,
		java: `public static void cocktailShakerSort(int[] arr) {
      boolean swapped = true;
      int start = 0;
      int end = arr.length - 1;
      
      while (swapped) {
          swapped = false;
          
          // Forward pass
          for (int i = start; i < end; i++) {
              if (arr[i] > arr[i + 1]) {
                  int temp = arr[i];
                  arr[i] = arr[i + 1];
                  arr[i + 1] = temp;
                  swapped = true;
              }
          }
          
          if (!swapped) break;
          
          swapped = false;
          end--;
          
          // Backward pass
          for (int i = end; i > start; i--) {
              if (arr[i] < arr[i - 1]) {
                  int temp = arr[i];
                  arr[i] = arr[i - 1];
                  arr[i - 1] = temp;
                  swapped = true;
              }
          }
          
          start++;
      }
  }
  
  // Time Complexity: O(n²)
  // Space Complexity: O(1)`,
	},
	"Counting Sort": {
		javascript: `function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
      count[arr[i] - min]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
    }
    
    return output;
  }
  
  // Time Complexity: O(n + k) where k is range
  // Space Complexity: O(n + k)`,
		python: `def counting_sort(arr):
      if not arr:
          return arr
      
      max_val = max(arr)
      min_val = min(arr)
      range_val = max_val - min_val + 1
      
      count = [0] * range_val
      output = [0] * len(arr)
      
      # Count occurrences
      for num in arr:
          count[num - min_val] += 1
      
      # Calculate cumulative count
      for i in range(1, len(count)):
          count[i] += count[i - 1]
      
      # Build output array
      for i in range(len(arr) - 1, -1, -1):
          output[count[arr[i] - min_val] - 1] = arr[i]
          count[arr[i] - min_val] -= 1
      
      return output
  
  # Time Complexity: O(n + k) where k is range
  # Space Complexity: O(n + k)`,
		java: `public static int[] countingSort(int[] arr) {
      if (arr.length == 0) return arr;
      
      int max = Arrays.stream(arr).max().getAsInt();
      int min = Arrays.stream(arr).min().getAsInt();
      int range = max - min + 1;
      
      int[] count = new int[range];
      int[] output = new int[arr.length];
      
      // Count occurrences
      for (int num : arr) {
          count[num - min]++;
      }
      
      // Calculate cumulative count
      for (int i = 1; i < count.length; i++) {
          count[i] += count[i - 1];
      }
      
      // Build output array
      for (int i = arr.length - 1; i >= 0; i--) {
          output[count[arr[i] - min] - 1] = arr[i];
          count[arr[i] - min]--;
      }
      
      return output;
  }
  
  // Time Complexity: O(n + k) where k is range
  // Space Complexity: O(n + k)`,
	},
	"Radix Sort": {
		javascript: `function radixSort(arr) {
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSortByDigit(arr, exp);
    }
    
    return arr;
  }
  
  function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Count occurrences of digits
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
    
    // Copy output to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }
  }
  
  // Time Complexity: O(d * (n + k)) where d is digits
  // Space Complexity: O(n + k)`,
		python: `def radix_sort(arr):
      max_val = max(arr)
      
      # Do counting sort for every digit
      exp = 1
      while max_val // exp > 0:
          counting_sort_by_digit(arr, exp)
          exp *= 10
      
      return arr
  
  def counting_sort_by_digit(arr, exp):
      n = len(arr)
      output = [0] * n
      count = [0] * 10
      
      # Count occurrences of digits
      for num in arr:
          digit = (num // exp) % 10
          count[digit] += 1
      
      # Calculate cumulative count
      for i in range(1, 10):
          count[i] += count[i - 1]
      
      # Build output array
      for i in range(n - 1, -1, -1):
          digit = (arr[i] // exp) % 10
          output[count[digit] - 1] = arr[i]
          count[digit] -= 1
      
      # Copy output to arr
      for i in range(n):
          arr[i] = output[i]
  
  # Time Complexity: O(d * (n + k)) where d is digits
  # Space Complexity: O(n + k)`,
		java: `public static void radixSort(int[] arr) {
      int max = Arrays.stream(arr).max().getAsInt();
      
      // Do counting sort for every digit
      for (int exp = 1; max / exp > 0; exp *= 10) {
          countingSortByDigit(arr, exp);
      }
  }
  
  public static void countingSortByDigit(int[] arr, int exp) {
      int n = arr.length;
      int[] output = new int[n];
      int[] count = new int[10];
      
      // Count occurrences of digits
      for (int num : arr) {
          int digit = (num / exp) % 10;
          count[digit]++;
      }
      
      // Calculate cumulative count
      for (int i = 1; i < 10; i++) {
          count[i] += count[i - 1];
      }
      
      // Build output array
      for (int i = n - 1; i >= 0; i--) {
          int digit = (arr[i] / exp) % 10;
          output[count[digit] - 1] = arr[i];
          count[digit]--;
      }
      
      // Copy output to arr
      for (int i = 0; i < n; i++) {
          arr[i] = output[i];
      }
  }
  
  // Time Complexity: O(d * (n + k)) where d is digits
  // Space Complexity: O(n + k)`,
	},
	"Linear Search": {
		javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        return i; // Return index if found
      }
    }
    return -1; // Return -1 if not found
  }
  
  // Time Complexity: O(n)
  // Space Complexity: O(1)`,
		python: `def linear_search(arr, target):
      for i in range(len(arr)):
          if arr[i] == target:
              return i  # Return index if found
      return -1  # Return -1 if not found
  
  # Time Complexity: O(n)
  # Space Complexity: O(1)`,
		java: `public static int linearSearch(int[] arr, int target) {
      for (int i = 0; i < arr.length; i++) {
          if (arr[i] == target) {
              return i; // Return index if found
          }
      }
      return -1; // Return -1 if not found
  }
  
  // Time Complexity: O(n)
  // Space Complexity: O(1)`,
	},
	"Binary Search": {
		javascript: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (arr[mid] === target) {
        return mid; // Found
      } else if (arr[mid] < target) {
        left = mid + 1; // Search right half
      } else {
        right = mid - 1; // Search left half
      }
    }
    
    return -1; // Not found
  }
  
  // Time Complexity: O(log n)
  // Space Complexity: O(1)
  // Note: Array must be sorted`,
		python: `def binary_search(arr, target):
      left = 0
      right = len(arr) - 1
      
      while left <= right:
          mid = (left + right) // 2
          
          if arr[mid] == target:
              return mid  # Found
          elif arr[mid] < target:
              left = mid + 1  # Search right half
          else:
              right = mid - 1  # Search left half
      
      return -1  # Not found
  
  # Time Complexity: O(log n)
  # Space Complexity: O(1)
  # Note: Array must be sorted`,
		java: `public static int binarySearch(int[] arr, int target) {
      int left = 0;
      int right = arr.length - 1;
      
      while (left <= right) {
          int mid = left + (right - left) / 2;
          
          if (arr[mid] == target) {
              return mid; // Found
          } else if (arr[mid] < target) {
              left = mid + 1; // Search right half
          } else {
              right = mid - 1; // Search left half
          }
      }
      
      return -1; // Not found
  }
  
  // Time Complexity: O(log n)
  // Space Complexity: O(1)
  // Note: Array must be sorted`,
	},
	"Jump Search": {
		javascript: `function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Find block where element is present
    while (arr[Math.min(step, n) - 1] < target) {
      prev = step;
      step += Math.floor(Math.sqrt(n));
      if (prev >= n) {
        return -1;
      }
    }
    
    // Linear search in block
    while (arr[prev] < target) {
      prev++;
      if (prev === Math.min(step, n)) {
        return -1;
      }
    }
    
    if (arr[prev] === target) {
      return prev;
    }
    
    return -1;
  }
  
  // Time Complexity: O(√n)
  // Space Complexity: O(1)`,
		python: `import math
  
  def jump_search(arr, target):
      n = len(arr)
      step = int(math.sqrt(n))
      prev = 0
      
      # Find block where element is present
      while arr[min(step, n) - 1] < target:
          prev = step
          step += int(math.sqrt(n))
          if prev >= n:
              return -1
      
      # Linear search in block
      while arr[prev] < target:
          prev += 1
          if prev == min(step, n):
              return -1
      
      if arr[prev] == target:
          return prev
      
      return -1
  
  # Time Complexity: O(√n)
  # Space Complexity: O(1)`,
		java: `public static int jumpSearch(int[] arr, int target) {
      int n = arr.length;
      int step = (int) Math.sqrt(n);
      int prev = 0;
      
      // Find block where element is present
      while (arr[Math.min(step, n) - 1] < target) {
          prev = step;
          step += (int) Math.sqrt(n);
          if (prev >= n) {
              return -1;
          }
      }
      
      // Linear search in block
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
  
  // Time Complexity: O(√n)
  // Space Complexity: O(1)`,
	},
	"Interpolation Search": {
		javascript: `function interpolationSearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high && target >= arr[low] && target <= arr[high]) {
      if (low === high) {
        if (arr[low] === target) return low;
        return -1;
      }
      
      // Probing position with uniform distribution
      const pos = low + Math.floor(
        ((target - arr[low]) * (high - low)) / 
        (arr[high] - arr[low])
      );
      
      if (arr[pos] === target) {
        return pos;
      }
      
      if (arr[pos] < target) {
        low = pos + 1;
      } else {
        high = pos - 1;
      }
    }
    
    return -1;
  }
  
  // Time Complexity: O(log log n) average, O(n) worst
  // Space Complexity: O(1)`,
		python: `def interpolation_search(arr, target):
      low = 0
      high = len(arr) - 1
      
      while low <= high and target >= arr[low] and target <= arr[high]:
          if low == high:
              if arr[low] == target:
                  return low
              return -1
          
          # Probing position with uniform distribution
          pos = low + int(
              ((target - arr[low]) * (high - low)) / 
              (arr[high] - arr[low])
          )
          
          if arr[pos] == target:
              return pos
          
          if arr[pos] < target:
              low = pos + 1
          else:
              high = pos - 1
      
      return -1
  
  # Time Complexity: O(log log n) average, O(n) worst
  # Space Complexity: O(1)`,
		java: `public static int interpolationSearch(int[] arr, int target) {
      int low = 0;
      int high = arr.length - 1;
      
      while (low <= high && target >= arr[low] && target <= arr[high]) {
          if (low == high) {
              if (arr[low] == target) return low;
              return -1;
          }
          
          // Probing position with uniform distribution
          int pos = low + (int)(
              ((double)(target - arr[low]) * (high - low)) / 
              (arr[high] - arr[low])
          );
          
          if (arr[pos] == target) {
              return pos;
          }
          
          if (arr[pos] < target) {
              low = pos + 1;
          } else {
              high = pos - 1;
          }
      }
      
      return -1;
  }
  
  // Time Complexity: O(log log n) average, O(n) worst
  // Space Complexity: O(1)`,
	},
	"Exponential Search": {
		javascript: `function exponentialSearch(arr, target) {
    const n = arr.length;
    
    if (arr[0] === target) {
      return 0;
    }
    
    // Find range for binary search
    let i = 1;
    while (i < n && arr[i] <= target) {
      i *= 2;
    }
    
    // Binary search in found range
    return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, n - 1));
  }
  
  function binarySearch(arr, target, left, right) {
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
  }
  
  // Time Complexity: O(log n)
  // Space Complexity: O(1)`,
		python: `def exponential_search(arr, target):
      n = len(arr)
      
      if arr[0] == target:
          return 0
      
      # Find range for binary search
      i = 1
      while i < n and arr[i] <= target:
          i *= 2
      
      # Binary search in found range
      return binary_search(arr, target, i // 2, min(i, n - 1))
  
  def binary_search(arr, target, left, right):
      while left <= right:
          mid = (left + right) // 2
          
          if arr[mid] == target:
              return mid
          elif arr[mid] < target:
              left = mid + 1
          else:
              right = mid - 1
      
      return -1
  
  # Time Complexity: O(log n)
  # Space Complexity: O(1)`,
		java: `public static int exponentialSearch(int[] arr, int target) {
      int n = arr.length;
      
      if (arr[0] == target) {
          return 0;
      }
      
      // Find range for binary search
      int i = 1;
      while (i < n && arr[i] <= target) {
          i *= 2;
      }
      
      // Binary search in found range
      return binarySearch(arr, target, i / 2, Math.min(i, n - 1));
  }
  
  public static int binarySearch(int[] arr, int target, int left, int right) {
      while (left <= right) {
          int mid = left + (right - left) / 2;
          
          if (arr[mid] == target) {
              return mid;
          } else if (arr[mid] < target) {
              left = mid + 1;
          } else {
              right = mid - 1;
          }
      }
      
      return -1;
  }
  
  // Time Complexity: O(log n)
  // Space Complexity: O(1)`,
	},
	"Fibonacci Search": {
		javascript: `function fibonacciSearch(arr, target) {
    const n = arr.length;
    
    // Initialize Fibonacci numbers
    let fibM2 = 0; // (m-2)'th Fibonacci
    let fibM1 = 1; // (m-1)'th Fibonacci
    let fibM = fibM2 + fibM1; // m'th Fibonacci
    
    // Find smallest Fibonacci >= n
    while (fibM < n) {
      fibM2 = fibM1;
      fibM1 = fibM;
      fibM = fibM2 + fibM1;
    }
    
    let offset = -1;
    
    while (fibM > 1) {
      const i = Math.min(offset + fibM2, n - 1);
      
      if (arr[i] < target) {
        fibM = fibM1;
        fibM1 = fibM2;
        fibM2 = fibM - fibM1;
        offset = i;
      } else if (arr[i] > target) {
        fibM = fibM2;
        fibM1 = fibM1 - fibM2;
        fibM2 = fibM - fibM1;
      } else {
        return i;
      }
    }
    
    if (fibM1 && offset + 1 < n && arr[offset + 1] === target) {
      return offset + 1;
    }
    
    return -1;
  }
  
  // Time Complexity: O(log n)
  // Space Complexity: O(1)`,
		python: `def fibonacci_search(arr, target):
      n = len(arr)
      
      # Initialize Fibonacci numbers
      fib_m2 = 0  # (m-2)'th Fibonacci
      fib_m1 = 1  # (m-1)'th Fibonacci
      fib_m = fib_m2 + fib_m1  # m'th Fibonacci
      
      # Find smallest Fibonacci >= n
      while fib_m < n:
          fib_m2 = fib_m1
          fib_m1 = fib_m
          fib_m = fib_m2 + fib_m1
      
      offset = -1
      
      while fib_m > 1:
          i = min(offset + fib_m2, n - 1)
          
          if arr[i] < target:
              fib_m = fib_m1
              fib_m1 = fib_m2
              fib_m2 = fib_m - fib_m1
              offset = i
          elif arr[i] > target:
              fib_m = fib_m2
              fib_m1 = fib_m1 - fib_m2
              fib_m2 = fib_m - fib_m1
          else:
              return i
      
      if fib_m1 and offset + 1 < n and arr[offset + 1] == target:
          return offset + 1
      
      return -1
  
  # Time Complexity: O(log n)
  # Space Complexity: O(1)`,
		java: `public static int fibonacciSearch(int[] arr, int target) {
      int n = arr.length;
      
      // Initialize Fibonacci numbers
      int fibM2 = 0; // (m-2)'th Fibonacci
      int fibM1 = 1; // (m-1)'th Fibonacci
      int fibM = fibM2 + fibM1; // m'th Fibonacci
      
      // Find smallest Fibonacci >= n
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
          } else {
              return i;
          }
      }
      
      if (fibM1 == 1 && offset + 1 < n && arr[offset + 1] == target) {
          return offset + 1;
      }
      
      return -1;
  }
  
  // Time Complexity: O(log n)
  // Space Complexity: O(1)`,
	},
	"Depth First Search (DFS)": {
		javascript: `// Graph represented as adjacency list
  function dfs(graph, start, visited = new Set()) {
    console.log(start); // Process node
    visited.add(start);
    
    for (const neighbor of graph[start] || []) {
      if (!visited.has(neighbor)) {
        dfs(graph, neighbor, visited);
      }
    }
    
    return visited;
  }
  
  // Iterative DFS using stack
  function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    
    while (stack.length > 0) {
      const node = stack.pop();
      
      if (!visited.has(node)) {
        console.log(node); // Process node
        visited.add(node);
        
        // Add neighbors to stack
        for (const neighbor of graph[node] || []) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }
    
    return visited;
  }
  
  // Time Complexity: O(V + E)
  // Space Complexity: O(V)`,
		python: `# Graph represented as adjacency list
  def dfs(graph, start, visited=None):
      if visited is None:
          visited = set()
      
      print(start)  # Process node
      visited.add(start)
      
      for neighbor in graph.get(start, []):
          if neighbor not in visited:
              dfs(graph, neighbor, visited)
      
      return visited
  
  # Iterative DFS using stack
  def dfs_iterative(graph, start):
      visited = set()
      stack = [start]
      
      while stack:
          node = stack.pop()
          
          if node not in visited:
              print(node)  # Process node
              visited.add(node)
              
              # Add neighbors to stack
              for neighbor in graph.get(node, []):
                  if neighbor not in visited:
                      stack.append(neighbor)
      
      return visited
  
  # Time Complexity: O(V + E)
  # Space Complexity: O(V)`,
		java: `// Graph represented as adjacency list
  public static void dfs(Map<Integer, List<Integer>> graph, 
                        int start, Set<Integer> visited) {
      System.out.println(start); // Process node
      visited.add(start);
      
      for (int neighbor : graph.getOrDefault(start, new ArrayList<>())) {
          if (!visited.contains(neighbor)) {
              dfs(graph, neighbor, visited);
          }
      }
  }
  
  // Iterative DFS using stack
  public static void dfsIterative(Map<Integer, List<Integer>> graph, 
                                 int start) {
      Set<Integer> visited = new HashSet<>();
      Stack<Integer> stack = new Stack<>();
      stack.push(start);
      
      while (!stack.isEmpty()) {
          int node = stack.pop();
          
          if (!visited.contains(node)) {
              System.out.println(node); // Process node
              visited.add(node);
              
              // Add neighbors to stack
              for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
                  if (!visited.contains(neighbor)) {
                      stack.push(neighbor);
                  }
              }
          }
      }
  }
  
  // Time Complexity: O(V + E)
  // Space Complexity: O(V)`,
	},
	"Breadth First Search (BFS)": {
		javascript: `// Graph represented as adjacency list
  function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    
    while (queue.length > 0) {
      const node = queue.shift();
      console.log(node); // Process node
      
      for (const neighbor of graph[node] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    
    return visited;
  }
  
  // BFS with level tracking
  function bfsWithLevels(graph, start) {
    const visited = new Set();
    const queue = [[start, 0]]; // [node, level]
    visited.add(start);
    
    while (queue.length > 0) {
      const [node, level] = queue.shift();
      console.log(\`Node \${node} at level \${level}\`);
      
      for (const neighbor of graph[node] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, level + 1]);
        }
      }
    }
  }
  
  // Time Complexity: O(V + E)
  // Space Complexity: O(V)`,
		python: `from collections import deque
  
  # Graph represented as adjacency list
  def bfs(graph, start):
      visited = set()
      queue = deque([start])
      visited.add(start)
      
      while queue:
          node = queue.popleft()
          print(node)  # Process node
          
          for neighbor in graph.get(node, []):
              if neighbor not in visited:
                  visited.add(neighbor)
                  queue.append(neighbor)
      
      return visited
  
  # BFS with level tracking
  def bfs_with_levels(graph, start):
      visited = set()
      queue = deque([(start, 0)])  # (node, level)
      visited.add(start)
      
      while queue:
          node, level = queue.popleft()
          print(f"Node {node} at level {level}")
          
          for neighbor in graph.get(node, []):
              if neighbor not in visited:
                  visited.add(neighbor)
                  queue.append((neighbor, level + 1))
  
  # Time Complexity: O(V + E)
  // Space Complexity: O(V)`,
		java: `// Graph represented as adjacency list
  public static void bfs(Map<Integer, List<Integer>> graph, int start) {
      Set<Integer> visited = new HashSet<>();
      Queue<Integer> queue = new LinkedList<>();
      
      queue.offer(start);
      visited.add(start);
      
      while (!queue.isEmpty()) {
          int node = queue.poll();
          System.out.println(node); // Process node
          
          for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
              if (!visited.contains(neighbor)) {
                  visited.add(neighbor);
                  queue.offer(neighbor);
              }
          }
      }
  }
  
  // BFS with level tracking
  public static void bfsWithLevels(Map<Integer, List<Integer>> graph, 
                                   int start) {
      Set<Integer> visited = new HashSet<>();
      Queue<int[]> queue = new LinkedList<>(); // [node, level]
      
      queue.offer(new int[]{start, 0});
      visited.add(start);
      
      while (!queue.isEmpty()) {
          int[] current = queue.poll();
          int node = current[0];
          int level = current[1];
          
          System.out.println("Node " + node + " at level " + level);
          
          for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
              if (!visited.contains(neighbor)) {
                  visited.add(neighbor);
                  queue.offer(new int[]{neighbor, level + 1});
              }
          }
      }
  }
  
  // Time Complexity: O(V + E)
  // Space Complexity: O(V)`,
	},
	"Dijkstra's Algorithm": {
		javascript: `function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = [[0, start]]; // [distance, node]
    
    // Initialize distances
    for (const node in graph) {
      distances[node] = Infinity;
    }
    distances[start] = 0;
    
    while (pq.length > 0) {
      // Sort to get minimum distance
      pq.sort((a, b) => a[0] - b[0]);
      const [currentDist, currentNode] = pq.shift();
      
      if (visited.has(currentNode)) continue;
      visited.add(currentNode);
      
      // Update distances to neighbors
      for (const [neighbor, weight] of graph[currentNode] || []) {
        const distance = currentDist + weight;
        
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          pq.push([distance, neighbor]);
        }
      }
    }
    
    return distances;
  }
  
  // Example graph: {node: [[neighbor, weight], ...]}
  // const graph = {
  //   'A': [['B', 4], ['C', 2]],
  //   'B': [['C', 1], ['D', 5]],
  //   'C': [['D', 8]],
  //   'D': []
  // };
  
  // Time Complexity: O((V + E) log V) with priority queue
  // Space Complexity: O(V)`,
		python: `import heapq
  
  def dijkstra(graph, start):
      distances = {node: float('inf') for node in graph}
      distances[start] = 0
      visited = set()
      pq = [(0, start)]  # (distance, node)
      
      while pq:
          current_dist, current_node = heapq.heappop(pq)
          
          if current_node in visited:
              continue
          visited.add(current_node)
          
          # Update distances to neighbors
          for neighbor, weight in graph.get(current_node, []):
              distance = current_dist + weight
              
              if distance < distances[neighbor]:
                  distances[neighbor] = distance
                  heapq.heappush(pq, (distance, neighbor))
      
      return distances
  
  # Example graph: {node: [(neighbor, weight), ...]}
  # graph = {
  #     'A': [('B', 4), ('C', 2)],
  #     'B': [('C', 1), ('D', 5)],
  #     'C': [('D', 8)],
  #     'D': []
  # }
  
  # Time Complexity: O((V + E) log V) with priority queue
  # Space Complexity: O(V)`,
		java: `public static Map<String, Integer> dijkstra(
      Map<String, List<int[]>> graph, String start) {
      
      Map<String, Integer> distances = new HashMap<>();
      Set<String> visited = new HashSet<>();
      PriorityQueue<int[]> pq = new PriorityQueue<>(
          Comparator.comparingInt(a -> a[0])
      ); // [distance, node_hash]
      
      // Initialize distances
      for (String node : graph.keySet()) {
          distances.put(node, Integer.MAX_VALUE);
      }
      distances.put(start, 0);
      // For simplicity, assuming node names can be hashed to integers for the PQ.
      // In a real-world scenario, you'd map node names to unique integers or use
      // a custom class in the PriorityQueue.
      pq.offer(new int[]{0, start.hashCode()}); 
      
      // Placeholder for mapping hashcode back to node string. This requires
      // maintaining a separate map or using integer IDs for nodes.
      Map<Integer, String> nodeMap = new HashMap<>();
      for(String node : graph.keySet()) {
          nodeMap.put(node.hashCode(), node);
      }
      
      while (!pq.isEmpty()) {
          int[] current = pq.poll();
          int currentDist = current[0];
          String currentNode = nodeMap.get(current[1]); // Retrieve node string from hashcode
          
          if (currentNode == null || visited.contains(currentNode)) continue;
          visited.add(currentNode);
          
          // Update distances to neighbors
          for (int[] edge : graph.getOrDefault(currentNode, new ArrayList<>())) {
              String neighbor = nodeMap.get(edge[0]); // Assuming edge[0] is neighbor's hashcode
              int weight = edge[1];
              
              if (neighbor == null) continue; // Skip if neighbor not found in map
  
              int distance = currentDist + weight;
              
              if (distance < distances.get(neighbor)) {
                  distances.put(neighbor, distance);
                  pq.offer(new int[]{distance, neighbor.hashCode()});
              }
          }
      }
      
      return distances;
  }
  
  // Time Complexity: O((V + E) log V) with priority queue
  // Space Complexity: O(V)`,
	},
	"A* Search": {
		javascript: `function astar(graph, start, goal, heuristic) {
    const openSet = [[0, start]]; // [f_score, node]
    const cameFrom = {};
    const gScore = { [start]: 0 };
    const fScore = { [start]: heuristic(start, goal) };
    
    while (openSet.length > 0) {
      // Sort by f_score
      openSet.sort((a, b) => a[0] - b[0]);
      const [, current] = openSet.shift();
      
      if (current === goal) {
        return reconstructPath(cameFrom, current);
      }
      
      for (const [neighbor, cost] of graph[current] || []) {
        const tentativeGScore = gScore[current] + cost;
        
        if (!(neighbor in gScore) || tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeGScore;
          fScore[neighbor] = tentativeGScore + heuristic(neighbor, goal);
          
          if (!openSet.some(([, node]) => node === neighbor)) {
            openSet.push([fScore[neighbor], neighbor]);
          }
        }
      }
    }
    
    return null; // No path found
  }
  
  function reconstructPath(cameFrom, current) {
    const path = [current];
    while (current in cameFrom) {
      current = cameFrom[current];
      path.unshift(current);
    }
    return path;
  }
  
  // Example heuristic (Manhattan distance for grid)
  function manhattanDistance(node, goal) {
    return Math.abs(node[0] - goal[0]) + Math.abs(node[1] - goal[1]);
  }
  
  // Time Complexity: O((V + E) log V)
  // Space Complexity: O(V)`,
		python: `
  import heapq
  
  def astar(graph, start, goal, heuristic):
      open_set = [(0, start)]  # (f_score, node)
      came_from = {}
      g_score = { start: 0 }
      f_score = { start: heuristic(start, goal) }
  
      while open_set:
          _, current = heapq.heappop(open_set)
  
          if current == goal:
              return reconstruct_path(came_from, current)
          
          for neighbor, cost in graph.get(current, []):
              tentative_g_score = g_score[current] + cost
              
              if neighbor not in g_score or tentative_g_score < g_score[neighbor]:
                  came_from[neighbor] = current
                  g_score[neighbor] = tentative_g_score
                  f_score[neighbor] = tentative_g_score + heuristic(neighbor, goal)
                  
                  if not any(node == neighbor for _, node in open_set):
                      heapq.heappush(open_set, (f_score[neighbor], neighbor))
  
      return None  # No path found
  
  def reconstruct_path(came_from, current):
      path = [current]
      while current in came_from:
          current = came_from[current]
          path.insert(0, current)
      return path
  
  # Example heuristic (Manhattan distance for grid)
  def manhattan_distance(node, goal):
      return abs(node[0] - goal[0]) + abs(node[1] - goal[1])
  
  # Time Complexity: O((V + E) log V)
  # Space Complexity: O(V)`,
		java: `public static List<String> astar(
      Map<String, List<int[]>> graph, String start, String goal,
      BiFunction<String, String, Integer> heuristic) {
      
      PriorityQueue<int[]> openSet = new PriorityQueue<>(
          Comparator.comparingInt(a -> a[0])
      ); // [f_score, node_hash]
      
      Map<String, String> cameFrom = new HashMap<>();
      Map<String, Integer> gScore = new HashMap<>();
      Map<String, Integer> fScore = new HashMap<>();
      
      gScore.put(start, 0);
      fScore.put(start, heuristic.apply(start, goal));
      
      // Placeholder for mapping hashcode to node string. Requires a separate map.
      Map<Integer, String> nodeMap = new HashMap<>();
      for(String node : graph.keySet()) {
          nodeMap.put(node.hashCode(), node);
      }
      // Ensure start node is in map if not in graph keys (e.g., isolated start node)
      if (!nodeMap.containsKey(start.hashCode())) {
          nodeMap.put(start.hashCode(), start);
      }
  
      openSet.offer(new int[]{fScore.get(start), start.hashCode()});
      
      while (!openSet.isEmpty()) {
          int[] current = openSet.poll();
          String currentNode = nodeMap.get(current[1]); // Retrieve node string
  
          if (currentNode == null) continue; // Should not happen if map is correct
  
          if (currentNode.equals(goal)) {
              return reconstructPath(cameFrom, currentNode);
          }
          
          for (int[] edge : graph.getOrDefault(currentNode, new ArrayList<>())) {
              String neighbor = nodeMap.get(edge[0]); // Assuming edge[0] is neighbor's hashcode
              int cost = edge[1];
  
              if (neighbor == null) continue; // Skip if neighbor not found
              
              int tentativeGScore = gScore.getOrDefault(currentNode, Integer.MAX_VALUE) + cost;
              
              if (!gScore.containsKey(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                  cameFrom.put(neighbor, currentNode);
                  gScore.put(neighbor, tentativeGScore);
                  fScore.put(neighbor, tentativeGScore + heuristic.apply(neighbor, goal));
                  
                  // Check if neighbor is already in openSet. If so, update its priority.
                  // If not, add it. This requires a way to efficiently update or check.
                  // For simplicity here, we'll add it again if not present (can lead to duplicates, but works).
                  // A more efficient approach would use a map to track nodes in openSet for updates.
                  boolean inOpenSet = false;
                  for(int[] item : openSet) {
                      if (nodeMap.get(item[1]).equals(neighbor)) {
                          inOpenSet = true;
                          // Update priority if needed (more complex in Java PriorityQueue)
                          break;
                      }
                  }
                  if (!inOpenSet) {
                      openSet.offer(new int[]{fScore.get(neighbor), neighbor.hashCode()});
                  }
              }
          }
      }
      
      return null; // No path found
  }
  
  private static List<String> reconstructPath(Map<String, String> cameFrom, String current) {
      List<String> path = new LinkedList<>();
      while (current != null) {
          path.add(0, current);
          current = cameFrom.get(current);
      }
      return path;
  }
  
  // Time Complexity: O((V + E) log V)
  // Space Complexity: O(V)`,
	},
	"Uniform Cost Search": {
		javascript: `function uniformCostSearch(graph, start, goal) {
    const pq = [[0, start, [start]]]; // [cost, node, path]
    const visited = new Set();
    
    while (pq.length > 0) {
      // Sort by cost
      pq.sort((a, b) => a[0] - b[0]);
      const [cost, node, path] = pq.shift();
      
      if (node === goal) {
        return { cost, path };
      }
      
      if (visited.has(node)) continue;
      visited.add(node);
      
      for (const [neighbor, edgeCost] of graph[node] || []) {
        if (!visited.has(neighbor)) {
          const newCost = cost + edgeCost;
          const newPath = [...path, neighbor];
          pq.push([newCost, neighbor, newPath]);
        }
      }
    }
    
    return null; // No path found
  }
  
  // Example graph: {node: [[neighbor, cost], ...]}
  // Time Complexity: O((V + E) log V)
  // Space Complexity: O(V)`,
		python: `import heapq
  
  def uniform_cost_search(graph, start, goal):
      pq = [(0, start, [start])]  # (cost, node, path)
      visited = set()
      
      while pq:
          cost, node, path = heapq.heappop(pq)
          
          if node == goal:
              return {'cost': cost, 'path': path}
          
          if node in visited:
              continue
          visited.add(node)
          
          for neighbor, edge_cost in graph.get(node, []):
              if neighbor not in visited:
                  new_cost = cost + edge_cost
                  new_path = path + [neighbor]
                  heapq.heappush(pq, (new_cost, neighbor, new_path))
      
      return None  # No path found
  
  # Example graph: {node: [(neighbor, cost), ...]}
  # Time Complexity: O((V + E) log V)
  # Space Complexity: O(V)`,
		java: `public static Map<String, Object> uniformCostSearch(
      Map<String, List<int[]>> graph, String start, String goal) {
      
      PriorityQueue<Object[]> pq = new PriorityQueue<>(
          Comparator.comparingInt(a -> (int)a[0])
      ); // [cost, node, path]
      
      Set<String> visited = new HashSet<>();
      List<String> initialPath = new ArrayList<>();
      initialPath.add(start);
      pq.offer(new Object[]{0, start, initialPath});
      
      while (!pq.isEmpty()) {
          Object[] current = pq.poll();
          int cost = (int) current[0];
          String node = (String) current[1];
          List<String> path = (List<String>) current[2];
          
          if (node.equals(goal)) {
              Map<String, Object> result = new HashMap<>();
              result.put("cost", cost);
              result.put("path", path);
              return result;
          }
          
          if (visited.contains(node)) continue;
          visited.add(node);
          
          for (int[] edge : graph.getOrDefault(node, new ArrayList<>())) {
              // Assuming edge[0] represents the neighbor node's identifier (e.g., its name as a string)
              String neighbor = String.valueOf(edge[0]); 
              int edgeCost = edge[1];
              
              if (!visited.contains(neighbor)) {
                  int newCost = cost + edgeCost;
                  List<String> newPath = new ArrayList<>(path);
                  newPath.add(neighbor);
                  pq.offer(new Object[]{newCost, neighbor, newPath});
              }
          }
      }
      
      return null; // No path found
  }
  
  // Time Complexity: O((V + E) log V)
  // Space Complexity: O(V)`,
	},
	"Prim's Algorithm": {
		javascript: `function primsAlgorithm(graph, numNodes) {
    const visited = new Set([0]); // Start from node 0
    const mst = [];
    let totalCost = 0;
    
    while (visited.size < numNodes) {
      let minEdge = null;
      let minWeight = Infinity;
      
      // Find minimum weight edge connecting visited to unvisited
      for (const edge of graph) {
        const fromVisited = visited.has(edge.from);
        const toVisited = visited.has(edge.to);
        
        if ((fromVisited && !toVisited) || (toVisited && !fromVisited)) {
          if (edge.weight < minWeight) {
            minEdge = edge;
            minWeight = edge.weight;
          }
        }
      }
      
      if (minEdge) {
        mst.push(minEdge);
        visited.add(minEdge.from);
        visited.add(minEdge.to);
        totalCost += minEdge.weight;
      }
    }
    
    return { mst, totalCost };
  }
  
  // Time Complexity: O((V+E) log V) with priority queue
  // Space Complexity: O(V)`,
		python: `
  import heapq
  
  def prims_algorithm(graph, num_nodes):
      visited = set()
      # Add node 0 to visited set initially
      visited.add(0) 
      mst = []
      total_cost = 0
      edges = []
  
      # Add all edges from node 0 to the priority queue
      for edge in graph:
          if edge['from'] == 0 or edge["to"] == 0:
              heapq.heappush(edges, (edge['weight'], edge))
  
      while len(visited) < num_nodes and edges:
          weight, edge = heapq.heappop(edges)
  
          from_visited = edge["from"] in visited
          to_visited = edge["to"] in visited
  
          if from_visited and not to_visited:
              mst.append(edge)
              visited.add(edge["to"])
              total_cost += weight
              # Add new edges from the newly visited node
              for e in graph:
                  if e['from'] == edge['to'] or e["to"] == edge['to']:
                      if (e['from'] not in visited) or (e['to'] not in visited):
                          heapq.heappush(edges, (e['weight'], e))
          
          elif to_visited and not from_visited:
              mst.append(edge)
              visited.add(edge['from'])
              total_cost += weight
              # Add new edges from the newly visited node
              for e in graph:
                  if e['from'] == edge['from'] or e["to"] == edge['from']:
                      if (e['from'] not in visited) or (e['to'] not in visited):
                          heapq.heappush(edges, (e['weight'], e))
  
      return mst, total_cost
  
  # Time Complexity: O((V+E) log V)
  # Space Complexity: O(V)`,
		java: `
      import java.util.*;
  
      public class PrimsAlgorithm {
        static class Edge {
          int from, to, weight;
          Edge(int from, int to, int weight) {
                  this.from = from;
                  this.to = to;
                  this.weight = weight;
              }
        }
  
        public static List<Edge> primsAlgorithm(List<Edge> graph, int numNodes) {
          Set<Integer> visited = new HashSet<>();
          visited.add(0); // Start from node 0
          List<Edge> mst = new ArrayList<>();
          int totalCost = 0;
  
          // Using a priority queue to efficiently find the minimum weight edge
          PriorityQueue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.weight));
  
          // Add all edges connected to the starting node (node 0)
          for (Edge edge : graph) {
              if (edge.from == 0 || edge.to == 0) {
                  pq.offer(edge);
              }
          }
  
          while (visited.size() < numNodes && !pq.isEmpty()) {
              Edge minEdge = pq.poll();
              
              int from = minEdge.from;
              int to = minEdge.to;
              int weight = minEdge.weight;
  
              // Determine which node is not yet visited
              int nextNode = -1;
              if (visited.contains(from) && !visited.contains(to)) {
                  nextNode = to;
              } else if (!visited.contains(from) && visited.contains(to)) {
                  nextNode = from;
              }
  
              if (nextNode != -1) {
                  mst.add(minEdge);
                  visited.add(nextNode);
                  totalCost += weight;
  
                  // Add new edges connected to the newly visited node
                  for (Edge edge : graph) {
                      if ((edge.from == nextNode && !visited.contains(edge.to)) || 
                          (edge.to == nextNode && !visited.contains(edge.from))) {
                          pq.offer(edge);
                      }
                  }
              }
          }
          
          // If MST is not fully formed (e.g., disconnected graph)
          if (visited.size() < numNodes) {
              // Handle this case, e.g., return null or throw an exception
              return null; 
          }
  
          return mst;
      }
  }
  
  // Time Complexity: O((V+E) log V)
  // Space Complexity: O(V)`,
	},
	"Kruskal's Algorithm": {
		javascript: `class UnionFind {
    constructor(size) {
      this.parent = Array.from({ length: size }, (_, i) => i);
      this.rank = Array(size).fill(0);
    }
    
    find(x) {
      if (this.parent[x] !== x) {
        this.parent[x] = this.find(this.parent[x]);
      }
      return this.parent[x];
    }
    
    union(x, y) {
      const rootX = this.find(x);
      const rootY = this.find(y);
      
      if (rootX === rootY) return false;
      
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
      
      return true;
    }
  }
  
  function kruskalsAlgorithm(edges, numNodes) {
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    const uf = new UnionFind(numNodes);
    const mst = [];
    let totalCost = 0;
    
    for (const edge of edges) {
      // If adding edge doesn't create cycle
      if (uf.union(edge.from, edge.to)) {
        mst.push(edge);
        totalCost += edge.weight;
        
        // Stop if we have V-1 edges
        if (mst.length === numNodes - 1) break;
      }
    }
    
    return { mst, totalCost };
  }
  
  // Time Complexity: O(E log E) or O(E log V)
  // Space Complexity: O(V)`,
		python: `
  class UnionFind:
      def __init__(self, size):
          self.parent = list(range(size))
          self.rank = [0] * size
      
      def find(self, x):
          if self.parent[x] != x:
              self.parent[x] = self.find(self.parent[x])
          return self.parent[x]
      
      def union(self, x, y):
          root_x = self.find(x)
          root_y = self.find(y)
          
          if root_x == root_y:
              return False
          
          if self.rank[root_x] < self.rank[root_y]:
              self.parent[root_x] = root_y
          elif self.rank[root_x] > self.rank[root_y]:
              self.parent[root_y] = root_x
          else:
              self.parent[root_y] = root_x
              self.rank[root_x] += 1
          
          return True
  
  def kruskals_algorithm(edges, num_nodes):
      # Sort edges by weight
      edges.sort(key=lambda e: e['weight'])
      
      uf = UnionFind(num_nodes)
      mst = []
      total_cost = 0
      
      for edge in edges:
          # If adding edge doesn't create cycle
          if uf.union(edge['from'], edge['to']):
              mst.append(edge)
              total_cost += edge['weight']
              
              # Stop if we have V-1 edges
              if len(mst) == num_nodes - 1:
                  break
      
      return mst, total_cost
  
  # Time Complexity: O(E log E) or O(E log V)
  # Space Complexity: O(V)`,
		java: `class UnionFind {
      private int[] parent;
      private int[] rank;
      
      public UnionFind(int size) {
          parent = new int[size];
          rank = new int[size];
          for (int i = 0; i < size; i++) {
              parent[i] = i;
          }
      }
      
      public int find(int x) {
          if (parent[x] != x) {
              parent[x] = find(parent[x]);
          }
          return parent[x];
      }
      
      public boolean union(int x, int y) {
          int rootX = find(x);
          int rootY = find(y);
          
          if (rootX == rootY) return false;
          
          if (rank[rootX] < rank[rootY]) {
              parent[rootX] = rootY;
          } else if (rank[rootX] > rank[rootY]) {
              parent[rootY] = rootX;
          } else {
              parent[rootY] = rootX;
              rank[rootX]++;
          }
          
          return true;
      }
  }
  
  public class KruskalsAlgorithm {
      static class Edge implements Comparable<Edge> {
          int from, to, weight;
          
          public Edge(int from, int to, int weight) {
              this.from = from;
              this.to = to;
              this.weight = weight;
          }
          
          public int compareTo(Edge other) {
              return this.weight - other.weight;
          }
      }
      
      public static List<Edge> kruskalsAlgorithm(List<Edge> edges, int numNodes) {
          Collections.sort(edges);
          
          UnionFind uf = new UnionFind(numNodes);
          List<Edge> mst = new ArrayList<>();
          int totalCost = 0;
          
          for (Edge edge : edges) {
              if (uf.union(edge.from, edge.to)) {
                  mst.add(edge);
                  totalCost += edge.weight;
                  
                  if (mst.size() == numNodes - 1) break;
              }
          }
          
          return mst;
      }
  }
  
  // Time Complexity: O(E log E)
  // Space Complexity: O(V)`,
	},
	"N-Queens Problem": {
		javascript: `function solveNQueens(n) {
    const board = Array.from({ length: n }, () => Array(n).fill('.'));
    const solutions = [];
    
    function isSafe(row, col) {
      // Check row
      for (let i = 0; i < col; i++) {
        if (board[row][i] === 'Q') return false;
      }
      
      // Check upper diagonal
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') return false;
      }
      
      // Check lower diagonal
      for (let i = row, j = col; i < n && j >= 0; i++, j--) {
        if (board[i][j] === 'Q') return false;
      }
      
      return true;
    }
    
    function solve(col) {
      // Base case: all queens placed
      if (col >= n) {
        solutions.push(board.map(row => row.join('')));
        return;
      }
      
      // Try placing queen in each row
      for (let row = 0; row < n; row++) {
        if (isSafe(row, col)) {
          board[row][col] = 'Q';
          solve(col + 1);
          board[row][col] = '.'; // Backtrack
        }
      }
    }
    
    solve(0);
    return solutions;
  }
  
  // Time Complexity: O(n!)
  // Space Complexity: O(n²)`,
		python: `def solve_n_queens(n):
      board = [['.' for _ in range(n)] for _ in range(n)]
      solutions = []
      
      def is_safe(row, col):
          # Check row
          for i in range(col):
              if board[row][i] == 'Q':
                  return False
  
          # Check upper diagonal
          i, j = row, col
          while i >= 0 and j >= 0:
              if board[i][j] == 'Q':
                  return False
              i -= 1
              j -= 1
  
          # Check lower diagonal
          i, j = row, col
          while i < n and j >= 0:
              if board[i][j] == 'Q':
                  return False
              i += 1
              j -= 1
  
          return True
  
      def solve(col):
          # Base case: all queens placed
          if col >= n:
              solutions.append([''.join(row) for row in board])
              return
  
          # Try placing queen in each row
          for row in range(n):
              if is_safe(row, col):
                  board[row][col] = 'Q'
                  solve(col + 1)
                  board[row][col] = '.'  # Backtrack
      
      solve(0)
      return solutions
  
  # Time Complexity: O(n!)
  # Space Complexity: O(n²)`,
		java: `
      import java.util.*;
  
      public class NQueens {
        public static List<List<String>> solveNQueens(int n) {
          char[][] board = new char[n][n];
          for (int i = 0; i < n; i++) 
              Arrays.fill(board[i], '.');
          
          List<List<String>> solutions = new ArrayList<>();
          solve(board, 0, solutions);
          return solutions;
      }
  
        private static boolean isSafe(char[][] board, int row, int col, int n) {
          // Check row
          for (int i = 0; i < col; i++) 
              if (board[row][i] == 'Q') return false;
          
          // Check upper diagonal
          for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) 
              if (board[i][j] == 'Q') return false;
          
          // Check lower diagonal
          for (int i = row, j = col; i < n && j >= 0; i++, j--) 
              if (board[i][j] == 'Q') return false;
          
          return true;
      }
  
        private static void solve(char[][] board, int col, List<List<String>> solutions) {
          int n = board.length;
          
          if (col >= n) {
              List<String> solution = new ArrayList<>();
              for (char[] row : board) 
                  solution.add(new String(row));
              solutions.add(solution);
              return;
          }
          
          for (int row = 0; row < n; row++) 
              if (isSafe(board, row, col, n)) {
                  board[row][col] = 'Q';
                  solve(board, col + 1, solutions);
                  board[row][col] = '.';
              }
      }
      }
  
      // Time Complexity: O(n!)
      // Space Complexity: O(n²)`,
	},
	"Sudoku Solver": {
		javascript: `function solveSudoku(board) {
    function isValid(row, col, num) {
      // Check row
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
      }
      
      // Check column
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
      }
      
      // Check 3x3 box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[boxRow + i][boxCol + j] === num) return false;
        }
      }
      
      return true;
    }
    
    function solve() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(row, col, num)) {
                board[row][col] = num;
                
                if (solve()) return true;
                
                board[row][col] = 0; // Backtrack
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
  
  // Time Complexity: O(9^(n*n)) worst case
  // Space Complexity: O(n*n)`,
		python: `def solve_sudoku(board):
      def is_valid(row, col, num):
          # Check row
          if num in board[row]:
              return False
  
          # Check column
          if num in [board[i][col] for i in range(9)]:
              return False
  
          # Check 3x3 box
          box_row, box_col = (row // 3) * 3, (col // 3) * 3
          for i in range(3):
              for j in range(3):
                  if board[box_row + i][box_col + j] == num:
                      return False
  
          return True
  
      def solve():
          for row in range(9):
              for col in range(9):
                  if board[row][col] == 0:
                      for num in range(1, 10):
                          if is_valid(row, col, num):
                              board[row][col] = num
  
                              if solve():
                                  return True
  
                              board[row][col] = 0  # Backtrack
                      return False
          return True
  
      solve()
      return board
  
  # Time Complexity: O(9 ^ (n * n))
  # Space Complexity: O(n * n)`,
		java: `
      public class SudokuSolver {
        public static boolean solveSudoku(int[][] board) {
          for (int row = 0; row < 9; row++) 
              for (int col = 0; col < 9; col++) 
                  if (board[row][col] == 0) {
                      for (int num = 1; num <= 9; num++) 
                          if (isValid(board, row, col, num)) {
                              board[row][col] = num;
                              
                              if (solveSudoku(board)) {
                                  return true;
                              }
                              
                              board[row][col] = 0; // Backtrack
                          }
                      return false;
                  }
          return true;
      }
  
        private static boolean isValid(int[][] board, int row, int col, int num) {
          // Check row
          for (int i = 0; i < 9; i++) 
              if (board[row][i] == num) return false;
          
          // Check column
          for (int i = 0; i < 9; i++) 
              if (board[i][col] == num) return false;
          
          // Check 3x3 box
          int boxRow = (row / 3) * 3;
          int boxCol = (col / 3) * 3;
          for (int i = 0; i < 3; i++) 
              for (int j = 0; j < 3; j++) 
                  if (board[boxRow + i][boxCol + j] == num) {
                      return false;
                  }
          
          return true;
      }
      }
  
      // Time Complexity: O(9^(n*n))
      // Space Complexity: O(n*n)`,
	},
	"0/1 Knapsack": {
		javascript: `function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        // Don't include current item
        dp[i][w] = dp[i - 1][w];
        
        // Include current item if possible
        if (weights[i - 1] <= w) {
          dp[i][w] = Math.max(
            dp[i][w],
            values[i - 1] + dp[i - 1][w - weights[i - 1]]
          );
        }
      }
    }
    
    return dp[n][capacity];
  }
  
  // Example usage
  const weights = [2, 3, 4, 5];
  const values = [3, 4, 5, 6];
  const capacity = 10;
  console.log(knapsack(weights, values, capacity)); // Output: 10
  
  // Time Complexity: O(n * W)
  // Space Complexity: O(n * W)`,
		python: `def knapsack(weights, values, capacity):
      n = len(weights)
      dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
  
      for i in range(1, n + 1):
          for w in range(capacity + 1):
              # Don't include current item
              dp[i][w] = dp[i - 1][w]
              
              # Include current item if possible
              if weights[i - 1] <= w:
                  dp[i][w] = max(
                      dp[i][w],
                      values[i - 1] + dp[i - 1][w - weights[i - 1]]
                  )
  
      return dp[n][capacity]
  
  # Example usage
  weights = [2, 3, 4, 5]
  values = [3, 4, 5, 6]
  capacity = 10
  print(knapsack(weights, values, capacity)) # Output: 10
  
  # Time Complexity: O(n * W)
  # Space Complexity: O(n * W)`,
		java: `
      public class Knapsack {
        public static int knapsack(int[] weights, int[] values, int capacity) {
          int n = weights.length;
          int[][] dp = new int[n + 1][capacity + 1];
          
          for (int i = 1; i <= n; i++) 
              for (int w = 0; w <= capacity; w++) 
                  // Don't include current item
                  dp[i][w] = dp[i - 1][w];
                  
                  // Include current item if possible
                  if (weights[i - 1] <= w) {
                      dp[i][w] = Math.max(
                          dp[i][w],
                          values[i - 1] + dp[i - 1][w - weights[i - 1]]
                      );
                  }
          
          return dp[n][capacity];
      }
  
        public static void main(String[] args) {
          int[] weights = {2, 3, 4, 5};
          int[] values = {3, 4, 5, 6};
          int capacity = 10;
          System.out.println(knapsack(weights, values, capacity)); // 10
      }
      }
  
      // Time Complexity: O(n * W)
      // Space Complexity: O(n * W)`,
	},
	"Fibonacci Sequence (DP)": {
		javascript: `function fibonacci(n) {
    if (n <= 1) return n;
    
    const dp = Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
  }
  
  // Space-optimized version
  function fibonacciOptimized(n) {
    if (n <= 1) return n;
    
    let prev2 = 0;
    let prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
      const current = prev1 + prev2;
      prev2 = prev1;
      prev1 = current;
    }
    
    return prev1;
  }
  
  // Example
  console.log(fibonacci(10)); // 55
  
  // Time Complexity: O(n)
  // Space Complexity: O(n) or O(1) optimized`,
		python: `def fibonacci(n):
      if n <= 1:
          return n
  
      dp = [0] * (n + 1)
      dp[0] = 0
      dp[1] = 1
  
      for i in range(2, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
  
      return dp[n]
  
  # Space-optimized version
  def fibonacci_optimized(n):
      if n <= 1:
          return n
  
      prev2 = 0
      prev1 = 1
  
      for i in range(2, n + 1):
          current = prev1 + prev2
          prev2 = prev1
          prev1 = current
  
      return prev1
  
  # Example
  print(fibonacci(10)) # 55
  
  # Time Complexity: O(n)
  # Space Complexity: O(n) or O(1) optimized`,
		java: `
      public class Fibonacci {
        public static int fibonacci(int n) {
          if (n <= 1) return n;
          
          int[] dp = new int[n + 1];
          dp[0] = 0;
          dp[1] = 1;
          
          for (int i = 2; i <= n; i++) 
              dp[i] = dp[i - 1] + dp[i - 2];
          
          return dp[n];
      }
  
        // Space-optimized version
        public static int fibonacciOptimized(int n) {
          if (n <= 1) return n;
          
          int prev2 = 0;
          int prev1 = 1;
          
          for (int i = 2; i <= n; i++) {
              int current = prev1 + prev2;
              prev2 = prev1;
              prev1 = current;
          }
          
          return prev1;
      }
  
        public static void main(String[] args) {
          System.out.println(fibonacci(10)); // 55
      }
      }
  
      // Time Complexity: O(n)
      // Space Complexity: O(n) or O(1) optimized`,
	},
};
