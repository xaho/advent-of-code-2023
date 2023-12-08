import * as fs from 'fs';

const part2 = true;

function getFirstAndLast(line: string) {
    const numbersonly = line.replace(/\D/g, '');
    const first = numbersonly.charAt(0);
    const last = numbersonly.slice(-1);
    return {first, last}
}

const translations: { [key: string]: string } = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

const sum = fs.readFileSync('./resources/input.txt', 'utf-8')
    .split(/\r?\n/)
    .filter(x => x)
    .map(line => {
        if (!part2) return line;
        const regex = /(one|two|three|four|five|six|seven|eight|nine)/g;
        let match;
        while (match = regex.exec(line)) {
            line = line.substring(0, match.index) + translations[match[0]] + line.substring(match.index)
        }
        return line;
    })
    .reduce((acc, line) => {
        const {first, last} = getFirstAndLast(line);
        return acc + +(first + last);
    }, 0);

console.log(sum)


