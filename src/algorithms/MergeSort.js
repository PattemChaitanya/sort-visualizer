export default function MergeSort(piles) {
    let statesInOrder = [];
    mergeSortHelper(piles, 0, piles.length - 1, statesInOrder);
    return statesInOrder;
}

function mergeSortHelper(piles, start, end, statesInOrder) {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(piles, start, mid, statesInOrder);
    mergeSortHelper(piles, mid + 1, end, statesInOrder);
    merge(piles, start, mid, end, statesInOrder);
}

function merge(piles, start, mid, end, statesInOrder) {
    let k = start, i = start, j = mid + 1;
    let pilesC = piles.slice();
    while (i <= mid && j <= end) {
        if (pilesC[i] <= pilesC[j]) {
            piles[k++] = pilesC[i++];
        }
        else {
            piles[k++] = pilesC[j++];
        }
        const temp = { piles: piles.slice(), changing: [i, j, k] };
        statesInOrder.push(temp);

    }
    while (i <= mid) {
        piles[k++] = pilesC[i++];
        const temp = { piles: piles.slice(), changing: [i, k] };
        statesInOrder.push(temp);
    }
    while (j <= end) {
        piles[k++] = pilesC[j++];
        const temp = { piles: piles.slice(), changing: [j, k] };
        statesInOrder.push(temp);
    }
}