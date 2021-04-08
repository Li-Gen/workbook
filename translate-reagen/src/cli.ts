import {translate} from "./main";

const { Command } = require('commander');

const program = new Command();

program.version('0.0.2')
    .name('tl')
    .usage('<Word>')
    .arguments('<word>')
    .action((word)=>{
        translate(word)
    });

program.parse(program.argv);