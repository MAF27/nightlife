module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			files: ['*.js', 'lib/*.js', 'test/*.js'],
			options: { esnext: true, globals: { jQuery: true }}
		},
		less: {
			production: {
				files: { 'public/css/style.css': ['less/*.less'] }
			}
		},
		autoprefixer: {
			single_file: {
				src: 'client/css/style.css', dest: 'client/css/style.css'
			}
		},
		browserify: {
			client: {
				src: ['client/**/*.js', '!client/bundle.js'],
				dest: 'client/bundle.js'
			}
		},
		watch: {
			css: {
				files: ['less/*.less'],
				tasks: ['css']
			},
			js: {
				files: ['*.js', 'client/**/*.*', 'server/**/*.*', '!client/bundle.js'],
				tasks: ['jshint', 'browserify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('css', ['autoprefixer']);
	grunt.registerTask('js', ['browserify']);
	grunt.registerTask('default', ['jshint', 'css', 'js']);

};
