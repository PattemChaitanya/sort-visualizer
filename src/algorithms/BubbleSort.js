import { swap } from "./HelperFunctions";

export default function BubbleSort(piles) {
    let statesInOrder = [];
    let n = piles.length;
    while (n > 1) {
        let newN = 0;
        for (let i = 1; i < n; i++) {
            if (piles[i - 1] > piles[i]) {
                swap(piles, i - 1, i);
                newN = i;
                const temp = { piles: piles.slice(), changing: [i] };
                statesInOrder.push(temp);
            }
        }
        n = newN;
    }
    return statesInOrder;
}