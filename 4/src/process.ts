export function process(file: string) {
    const part1 = false;
    const cardRegex = /Card +(?<nr>\d+): (?<winningNrs>.*) \| (?<nrs>.*)/;

    function intersection<T>(setA: Set<T>, setB: Set<T>) {
        const _intersection = new Set();
        for (const elem of setB) {
            if (setA.has(elem)) {
                _intersection.add(elem);
            }
        }
        return _intersection;
    }

    let input = file
        .split(/\r?\n/)
        .filter(x => x)
        .map(line => {
            const match = cardRegex.exec((line));
            if (match?.groups?.nr && match.groups.nrs && match.groups.winningNrs) {
                const {nr, nrs, winningNrs} = match.groups;
                let result: {
                    nr: string,
                    nrs: Set<number>,
                    winningNrs: Set<number>,
                    nrOfWinningNrs: number,
                    scratchCards: number
                } = {
                    nr,
                    nrs: new Set(nrs.trim().split(/\s+/).map(x => +x)),
                    winningNrs: new Set(winningNrs.trim().split(/\s+/).map(x => +x)),
                    nrOfWinningNrs: 0,
                    scratchCards: 0
                };
                result.nrOfWinningNrs = intersection(result.nrs, result.winningNrs).size
                return result;
            }
            throw new Error(`Failed to process '${line}'`);
        });
    let sum = 0;
    if (part1) {
        for (let card of input) {
            const nrOfWinningNrs = card.nrOfWinningNrs;
            if (nrOfWinningNrs === 0) continue;
            sum += 1 << nrOfWinningNrs - 1;
        }
        console.log(sum);
        return sum;
    } else {
        let totalScratchCards = 0;
        for (let i = 0; i < input.length; i++) {
            const card = input[i];
            card.scratchCards += 1; // add one for the original on top of all the copies
            let x = card.nrOfWinningNrs;
            for (let j = 0; j < x; j++) { // add for each copy and original to
                input[i + j + 1].scratchCards += card.scratchCards;
            }
            totalScratchCards += card.scratchCards;
        }
        console.log(totalScratchCards);
        return totalScratchCards;
    }
}
