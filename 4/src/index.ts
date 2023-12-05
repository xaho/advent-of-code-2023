import {process} from './process';
import fs from "fs";

const input = fs.readFileSync('./resources/input.txt', 'utf-8');
process(input);
