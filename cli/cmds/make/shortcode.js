exports.command = 'shortcode'
exports.desc = 'Scaffold a new shortcode or shortcode collection'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  console.log('init called for dir', argv.dir)
}