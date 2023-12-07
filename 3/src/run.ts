import fs from "fs";

const symbolRegex = /[^\dx.]/;

function hasSymbolAdjacent(map: string[][], x: number, y: number): boolean {
    const offsets = [-1, 0, 1];
    for (const xOffset of offsets) {
        for (const yOffset of offsets) {
            if (xOffset === 0 && yOffset === 0) continue;
            if (symbolRegex.test(map?.[y + yOffset]?.[x + xOffset] || '.')) {
                return true;
            }
            // when checking xOffset === 1, which should be the last 3 checks, return false if x+xOffset goes out of bounds
            if (xOffset === 1 && map[y].length === x + 1) return false;
            // if xOffset === 1, yOffset === 0 is a digit, check for that cell
            if (yOffset === 0 && xOffset === 1) {
                if (/\d/.test(map?.[y + yOffset]?.[x + xOffset] || '.')) {
                    return hasSymbolAdjacent(map, x + 1, y);
                }
            }
        }
    }
    return false;
}

export function run(input: string[][]): number {
    let match;
    let previousMatchedAndHadSymbolAdjacent = false;
    for (let y = 0; y < input.length; y++) {
        previousMatchedAndHadSymbolAdjacent = false; // reset
        for (let x = 0; x < input[y].length; x++) {
            if (x === 0 && y === 38 && input[y][x] === '7') {
                console.log('')
            }
            let symbolAdjacent = false;
            match = /\d/.exec(input[y][x])
            if (match) {
                if (previousMatchedAndHadSymbolAdjacent) continue;
                symbolAdjacent = hasSymbolAdjacent(input, +x, +y);
                if (!symbolAdjacent) {
                    input[y][x] = 'x';
                }
            }
            previousMatchedAndHadSymbolAdjacent = !!match && symbolAdjacent;
        }
    }
    let total = input.reduce((acc, line) => {
        const nrRegex = /\d+/g;
        let row = line.join('');
        let match;
        while (match = nrRegex.exec(row)) {
            console.log(+match[0])
            acc += +match[0];
        }
        console.log();
        return acc;
    }, 0)
    console.log(input.map(line => line.join('')).join('\n'));
    console.log(total);
    return total;
// for x/y check if number, check if symbol in any direction,
// if number on the right, check additional 5 cells to the right (recursive)
}
