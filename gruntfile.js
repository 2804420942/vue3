module.exports = grunt => {

  grunt.initConfig({
    foo: {
      bar: 123
    }
  })
  grunt.registerTask('hello', function() {
    console.log('hello')
  })
  grunt.registerTask('world', function() {
    const done = this.async()
    setTimeout(() => {
      console.log('world')
      done()
    }, 1000)
  })
  grunt.registerTask('default', ['hello', 'world'])
}