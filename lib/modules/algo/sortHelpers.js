// Merge two sorted arrays into a single sorted array
export function merge(a, b) {
    const result = [];

    let aIndex = 0;
    let bIndex = 0;

    while (aIndex < a.length && bIndex < b.length) {
        if (a[aIndex] <= b[bIndex]) {
            result.push(a[aIndex++]); // Push the element to result and increase index value by 1 afterwards
        }
        else if (b[bIndex]) {
            result.push(b[bIndex++]);
        }
    }

    // Concat the remaining elements from a and b which we haven't seen yet.
    return result.concat(a.slice(aIndex)).concat(b.slice(bIndex));
}

// Swap two values in an array in place.
export function swap(arr, posA, posB) {
    const tmp = arr[posA];
    arr[posA] = arr[posB];
    arr[posB] = tmp;
}