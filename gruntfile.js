module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'index.js', 'js/**/*.js', 'tests/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        browserify: {
            'dist/js/slides.js': ['index.js']
        },
        uglify: {
            my_target: {
                files: {
                    'dist/js/slides.min.js': ['dist/js/slides.js']
                }
            }
        }
    });
    
    //Tasks
    grunt.registerTask('dist', ['jshint', 'browserify', 'uglify']); //Generates dist folder
    
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
};
