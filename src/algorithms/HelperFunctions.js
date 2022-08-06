export function swap(piles, a, b) {
    const tempVal = piles[a];
    piles[a] = piles[b];
    piles[b] = tempVal;
}