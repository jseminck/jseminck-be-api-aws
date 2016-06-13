import * as sortHelpers from './sortHelpers';

export function mergeSort(unsorted) {
    const length = unsorted.length;
    if (length === 1) {
        return unsorted;
    }

    const left = unsorted.slice(0, length/2);
    const right = unsorted.slice(length/2);
    return sortHelpers.merge(mergeSort(left), mergeSort(right));
}

