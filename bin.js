#!/usr/bin/env node

var program = require('commander');
var version = require('./package.json').version;
var valueless = require('./index');

program
  .version(version)
  .option('-p, --prefix [string]', 'prefix each value with this optional string')
  .option('-e, --excludes [keys]', 'preserve the original values of these comma-separated keys');

program.parse(process.argv);

valueless.readStdin(process.stdin, process.stdout, {
  excludes: typeof program.excludes === 'string' ? program.excludes.split(',') : [],
  prefix: program.prefix
});
