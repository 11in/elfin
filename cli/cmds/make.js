#!/usr/bin/env node

exports.command = 'make <command>'
exports.description = 'Make content, or at least the beginnings of content'
exports.builder = (yargs) => {
  return yargs
    .commandDir('make')
}
exports.handler = function (argv) {}