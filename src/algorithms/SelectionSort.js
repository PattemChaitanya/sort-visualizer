import { swap } from "./HelperFunctions";

export default function SelectionSort(piles) {

    let statesInOrder = [];
    for (let i = 0; i < piles.length - 1; i++) {
        let minId = i;
        for (let j = i + 1; j < piles.length; j++) {
            if (piles[j] < piles[minId]) {
                minId = j;
            }
            const temp = { piles: piles.slice(), changing: [j] };
            statesInOrder.push(temp);

        }
        swap(piles, minId, i);
        const temp = { piles: piles.slice(), changing: [minId, i] };
        statesInOrder.push(temp);
    }
    return statesInOrder;
}