import * as fs from 'fs';

const part2 = true;

let input = fs.readFileSync('./resources/input.txt', 'utf-8').split(/\r?\n/);

let seeds = input.splice(0, 1)[0].split(':')[1].trim().split(' ').map(x => +x);

function* SeedGenerator() {
    if (!part2) {
        for (let i = 0; i < seeds.length; i++) {
            yield seeds[i];
        }
    }
    else {
        for (let i = 0; i <= seeds.length; i += 2) {
            let seed = seeds[i];
            console.log('processing range of seeds');
            for (let j = 0; j < seeds[i+1]; j++) {
                if (j % 10000000 === 0) console.log('10.000.000 seeds processed')
                yield seed + j;
            }
        }
    }
}

let lut: { sourceStart: number, destinationStart: number, length: number }[][] = [];
for (const line of input) {
    if (line.trim() === '') {
        continue
    }
    if (line.endsWith('map:')) {
        // console.log(`starting new layer: ${line}`);
        lut.push([]);
        continue;
    }
    const [destinationStart, sourceStart, length] = line.split(' ').map(x => +x);
    lut[lut.length - 1].push({sourceStart, destinationStart, length});
}

function lookupLocationForSeed(seed: number) {
    let currentLookup = seed;
    // iterate over all layers to end up with the location
    for (const element of lut) {
        //iterate over lookup tables to find match, if none is found, keep currentLookup identical
        for (const l of element) {
            if (currentLookup >= l.sourceStart && currentLookup <= l.sourceStart + l.length - 1) {// 50 + 5 - 1 - 52 = 2,
                // console.log(`found match in lut, looking up ${currentLookup}, lut: ${l.sourceStart}, ${l.destinationStart}, ${l.length}, destination: ${l.destinationStart + currentLookup + l.sourceStart}`)
                currentLookup = l.destinationStart + currentLookup - l.sourceStart;
                break;
            }
        }
    }
    // console.log(`Seed ${seed} ended up at location ${currentLookup}`);
    return currentLookup;
}

let min;
let seedGenerator = SeedGenerator();
for (let seed of seedGenerator) {
    let locationForSeed = lookupLocationForSeed(seed);
    if (min && locationForSeed < min) console.log(`new min: ${locationForSeed}`)
    min = min === undefined ? locationForSeed : Math.min(locationForSeed, min);
}
console.log(min);
