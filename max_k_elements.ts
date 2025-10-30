/**
 * Function that takes a list of numbers and returns the maximum of each K elements
 * @param numbers - Array of numbers
 * @param k - Number of elements to group together (default: 3)
 * @returns Array containing the maximum value from each group of K elements
 */
function getMaxOfEachKElements(numbers: number[], k: number = 3): number[] {
    if (numbers.length === 0) {
        return [];
    }
    
    if (k <= 0) {
        throw new Error("K must be a positive number");
    }
    
    const result: number[] = [];
    
    // Process each group of K elements
    for (let i = 0; i < numbers.length; i += k) {
        // Get the current group of K elements (or remaining elements if less than K)
        const group = numbers.slice(i, i + k);
        
        // Find the maximum value in the current group
        const maxInGroup = Math.max(...group);
        
        // Add the maximum to the result
        result.push(maxInGroup);
    }
    
    return result;
}

/**
 * Function that takes a list of numbers and returns the minimum of each K elements
 * @param numbers - Array of numbers
 * @param k - Number of elements to group together (default: 2)
 * @returns Array containing the minimum value from each group of K elements
 */
function getMinOfEachKElements(numbers: number[], k: number = 2): number[] {
    if (numbers.length === 0) {
        return [];
    }
    
    if (k <= 0) {
        throw new Error("K must be a positive number");
    }
    
    const result: number[] = [];

    for (let i = 0; i < numbers.length; i += k) {
        const group = numbers.slice(i, i + k);
        const minInGroup = Math.min(...group);
        result.push(minInGroup);
    }

    return result;
}


// Example usage and test cases
console.log("Example 1:");
console.log("Input: [3, 4, -1, 6, 7, 11], K = 3");
console.log("Output:", getMaxOfEachKElements([3, 4, -1, 6, 7, 11], 3));
console.log("Expected: [4, 11]");
console.log();

console.log("Example 1:");
console.log("Input: [3, 4, -1, 6, 7, 11], K = 2");
console.log("Output:", getMinOfEachKElements([3, 4, -1, 6, 7, 11], 2));
console.log("Expected: [3, -1, 7]");

console.log("Example 2:");
console.log("Input: [1, 2, 3, 4, 5, 6, 7, 8, 9], K = 3");
console.log("Output:", getMaxOfEachKElements([1, 2, 3, 4, 5, 6, 7, 8, 9], 3));
console.log("Expected: [3, 6, 9]");
console.log();

console.log("Example 3:");
console.log("Input: [10, 20, 30, 40], K = 2");
console.log("Output:", getMaxOfEachKElements([10, 20, 30, 40], 2));
console.log("Expected: [20, 40]");
console.log();

console.log("Example 4:");
console.log("Input: [5], K = 3");
console.log("Output:", getMaxOfEachKElements([5], 3));
console.log("Expected: [5]");
console.log();

console.log("Example 5:");
console.log("Input: [], K = 3");
console.log("Output:", getMaxOfEachKElements([], 3));
console.log("Expected: []");

export { getMaxOfEachKElements };
