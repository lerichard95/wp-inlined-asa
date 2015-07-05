/* global module:true */

module.exports = function(grunt) {

    
    // Project configuration.
    grunt.initConfig({
        src: 'src',
        dev: 'dist',

        inlinecss: {
            main: {
                options: {
                    removeStyleTags: true
                },
                files: {
                    '<%= dev %>/out.html': '<%= src %>/in.html'
                }
            }
        },

        compass: {                 
            dist: {                  
                options: {
                    sassDir: '<%= src %>/scss',
                    cssDir: '<%= dev %>/css',
                    environment: 'production'
                }
            },
            dev: {                    
                options: {
                    sassDir: '<%= src %>/scss',
                    cssDir: '<%= dev %>/css'
                }
            }
        },

        // Task configuration.
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            compass: {
                files: '<%= src %>/scss/style.scss',
                tasks: 'default'
            },
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        }
    });

    // These plugins provide necessary tasks.
    //    grunt.loadNpmTasks('grunt-contrib-qunit');
    //    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-inline-css');

    // Default task.
    grunt.registerTask('default', ['compass:dist', 'inlinecss']);
    grunt.registerTask('watch', ['watch']);

};
