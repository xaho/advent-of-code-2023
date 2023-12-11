import * as fs from "fs";

const aAfterB = 1;
const bAfterA = -1;

const lut: { [key: string]: string } = {
    'A': 'A',
    'K': 'B',
    'Q': 'C',
    'J': 'D',
    'T': 'E',
    '9': 'F',
    '8': 'G',
    '7': 'H',
    '6': 'I',
    '5': 'J',
    '4': 'K',
    '3': 'L',
    '2': 'M',
}

const result = fs.readFileSync('resources/input.txt', 'utf-8')
    .split(/\r?\n/)
    .filter(x => x)
    .map(line => {
        let [originalHand, bid] = line.split(' ');
        let translatedHand = originalHand.split('').map(c => lut[c]).join('');
        let hand = translatedHand.split('').sort().join('');
        let counts: { [key: string]: number } = {};
        for (const card of hand) {
            counts[card] = (counts[card] || 0) + 1;
        }
        let multiples: { [key: number]: string[] } = {};
        Object.entries(counts).forEach(([card, amount]) => {
            multiples[amount] ? multiples[amount].push(card) : multiples[amount] = [card];
        });
        let handScore = 0;
        if (multiples[5]) handScore = 1 << 6; // Five of a kind
        else if (multiples[4]) handScore = 1 << 5; // Four of a kind
        else if (multiples[3] && multiples[2]) handScore = 1 << 4; // Full house
        else if (multiples[3]) handScore = 1 << 3; // Three of a kind
        else if (multiples[2]?.length === 2) handScore = 1 << 2; // Two pairs
        else if (multiples[2]?.length === 1) handScore = 1 << 1; // One pairs
        return {hand, originalHand, translatedHand, multiples, handScore, bid: +bid};
    })
    .sort((a, b) => {
        if (a.handScore > b.handScore) return aAfterB;
        if (a.handScore < b.handScore) return bAfterA;
        // check highchards
        for (let i = 0; i < a.translatedHand.length; i++) {
            // "A" with a lower numeric value wins from "B" with a higher numeric value
            if (a.translatedHand[i] > b.translatedHand[i]) return bAfterA;
            if (a.translatedHand[i] < b.translatedHand[i]) return aAfterB;
        }
        return 0;
    });
let sum = result
    .reduce((acc, hand, index) => {
        // console.log(`${hand.originalHand}: ${hand.bid} * ${index+1}`)
        return acc + hand.bid * (index + 1);
    }, 0);
console.log(sum);

