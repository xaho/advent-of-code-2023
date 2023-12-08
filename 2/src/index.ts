import * as fs from 'fs'

const subsetRegex = /(?<amount>\d+) (?<color>red|green|blue)/;
let games = fs.readFileSync('resources/input.txt', 'utf-8')
    .split(/\r?\n/)
    .filter(x => x)
    .map((line, index) => {
        // Game X: x a, y b, z c; z a, y b, x c...
        let max: { [key: string]: number } = {red: 0, green: 0, blue: 0};
        let sets = line.split(':')[1].split(';')
            .map(line => {
                // x a, y b, z c
                return line.split(',')
                    .map(subset => {
                        // x a
                        const {amount, color} = subsetRegex.exec(subset)?.groups || {amount: '0', color: 'red'};
                        return {amount: +amount, color};
                    }).reduce((acc, cur) => {
                        acc[cur.color] = cur.amount;
                        max[cur.color] = Math.max(cur.amount, max[cur.color]);
                        return acc;
                    }, {} as { [key: string]: number });
            });
        return {
            nr: index + 1,
            sets,
            max
        }
    })
console.log(JSON.stringify(games[0]));
const allowedMax: { [key: string]: number } = {red: 12, green: 13, blue: 14};
const result = games.reduce((result, game) => {
    let valid = true;
    ['red', 'green', 'blue'].forEach(color => {
        if (game.max[color] > allowedMax[color]) valid = false;
    });
    if (valid) {
        result.sum += game.nr;
    }
    // part 2
    let powerSum = Object.values(game.max).reduce(
        (acc, cur) => acc === 0 ? cur : (acc || 1) * cur, 0);
    result.powerSum += powerSum;
    return result;
}, {sum: 0, powerSum: 0});
console.log(result);
