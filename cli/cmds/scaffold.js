#!/usr/bin/env node

exports.command = 'scaffold <command>'
exports.description = 'Scaffold useful things'
exports.builder = (yargs) => {
  return yargs
    .commandDir('scaffold')
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