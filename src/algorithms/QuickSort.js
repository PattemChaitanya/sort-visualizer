import { swap } from "./HelperFunctions";

export default function QuickSort(piles) {
    let statesInOrder = [];
    quickSortHelper(piles, 0, piles.length - 1, statesInOrder);
    return statesInOrder;
}

function quickSortHelper(piles, start, end, statesInOrder) {
    if (start < end) {
        let pivot = partition(piles, start, end, statesInOrder);
        quickSortHelper(piles, start, pivot - 1, statesInOrder);
        quickSortHelper(piles, pivot + 1, end, statesInOrder);
    }
}

function partition(piles, start, end, statesInOrder) {
    let pivot = piles[end];
    let i = start - 1;
    for (let j = start; j <= end - 1; j++) {
        if (piles[j] < pivot) {
            i++;
            swap(piles, i, j);
            const temp = { piles: piles.slice(), changing: [i, j], pivot: pivot};
            if(pivot !== piles.length+4) statesInOrder.push(temp);
        }
    }
    swap(piles, i + 1, end);
    const temp = { piles: piles.slice(), changing: [i + 1, end], pivot: pivot};
    if(pivot !== piles.length+4) statesInOrder.push(temp);
    return i + 1;
}