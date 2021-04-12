#!/usr/bin/env node;
import {translate} from "./main";

const {Command} = require('commander');

const program = new Command();

program.version('0.0.1')
    .name('fany')
    .usage('<Word>')
    .arguments('<word>')
    .action(function(word:string){
        translate(word)
    });

program.parse(process.argv);
