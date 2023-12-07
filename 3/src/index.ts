import {run} from "./run";
import fs from "fs";
const input = fs.readFileSync(`resources/input.txt`, 'utf-8')
    .split(/\r?\n/)
    .map(line => line.split(''));
console.log(run(input));
