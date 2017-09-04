#!/usr/bin/env node

var program = require('commander');
var version = require('./package.json').version;
var valueless = require('./index');

program
  .version(version)
  .option('-p, --prefix [string]', `prefix each value with this optional string`);

program.parse(process.argv);

valueless.readStdin(process.stdin, process.stdout, {
  prefix: program.prefix
});
