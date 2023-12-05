import {describe, expect, test} from '@jest/globals';
import * as sut from '../src/process'
import fs from "fs";

describe('test', () => {
    test('example', () => {
        const example = fs.readFileSync(`resources/example.txt`, 'utf-8');
        const result = sut.process(example);
        expect(result).toEqual(30);
    });
});
