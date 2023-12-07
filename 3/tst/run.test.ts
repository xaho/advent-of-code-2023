import {describe, expect, test} from '@jest/globals';
import * as sut from '../src/run'
import fs from "fs";

describe('test', () => {
    test('example', () => {
        const example = fs.readFileSync(`resources/example.txt`, 'utf-8')
            .split(/\r?\n/)
            .map(line => line.split(''));
        const result = sut.run(example);
        expect(result).toEqual(4361);
    });

    [
        {
            desc: 'a',
            input:
                `.....1+
                 .......
                 .......
                 .......
                 .......`.split(/\s+/).map(line => line.split('')),
            sum: 1,
        },
        {
            desc: 'b',
            input:
                `.....1+
                 ......1
                 .......
                 .......
                 .......`.split(/\s+/).map(line => line.split('')),
            sum: 2,
        },
        {
            desc: 'c',
            input:
                `.....11
                 .....+1
                 .......
                 .......
                 .......`.split(/\s+/).map(line => line.split('')),
            sum: 12,
        },
        {
            desc: 'x',
            input:
                `1.1+1.1
                 +1.1.1+
                 1.1+1.1
                 .1.1.1.
                 1+1.1+1`.split(/\s+/).map(line => line.split('')),
            sum: 18,
        },
        {
            desc: 'y',
            input:
                `+1.1.1+
                 1.1+1.1 
                 +1.1.1+
                 1.1+1.1
                 +1.1.1+`.split(/\s+/).map(line => line.split('')),
            sum: 17,
        },
    ].forEach(testCase => {
        test(testCase.desc, () => {
            expect(sut.run(testCase.input)).toEqual(testCase.sum);
        })
    })
})
