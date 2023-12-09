import * as fs from 'fs';
// const timeRegex = /Time:(\s+(?<time>\d+))+/g;
const timeRegex = /(\d+)/g;
const distanceRegex = /(\d+)/g;

let [timeLine, distanceLince] = fs.readFileSync('resources/input.txt', 'utf-8')
    .split(/\r?\n/)
    .filter(x => x);
const part2 = true;
if (part2) {
    timeLine = timeLine.replace(/\s+/g, '');
    distanceLince = distanceLince.replace(/\s+/g, '');
}
let match;
let result = 0;
while(match = timeRegex.exec(timeLine)) {
    const time = +match[0];
    const distanceRecord = +(distanceRegex.exec(distanceLince)?.[0] || -1);
    if (!distanceRecord) process.exit(-1);
    let recordBreakingTimes = 0;
    for (let i = 0; i < time; i++) {
        // TODO: [Optimization] abort if we're going down hill
        let speed = i;
        let duration = time - i;
        let distance = speed*duration;
        if (distance > distanceRecord) {
            recordBreakingTimes++;
        }
    }
    if (result === 0) result = recordBreakingTimes;
    else result *= recordBreakingTimes;
}
console.log(result);
