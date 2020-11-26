#!/usr/bin/env node

exports.command = 'make <command>'
exports.description = 'Scaffold useful things'
exports.builder = function (yargs) {
  return yargs.commandDir('make')
}
exports.handler = function (argv) {}