import { swap } from './HelperFunctions'
export default function InsertionSort(piles) {
    let statesInOrder = [];
    for (let i = 1; i < piles.length; i++) {
        for (let j = i; j > 0 && piles[j - 1] > piles[j]; j--) {
            swap(piles, j, j - 1);
            const temp = { piles: piles.slice(), changing: [j - 1] };
            statesInOrder.push(temp);
        }
    }
    console.log(statesInOrder);
    return statesInOrder;
}