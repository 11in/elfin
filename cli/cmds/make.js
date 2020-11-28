#!/usr/bin/env node

exports.command = 'make <command>'
exports.description = 'Scaffold useful things'
exports.builder = (yargs) => {
  return yargs
    .commandDir('make')
    .options({
      'stub': {
        alias: 's',
        describe: "Provide a path to your own stub file",
        type: 'string',
        requiresArg: true,
      }
    })
}
exports.handler = function (argv) {}