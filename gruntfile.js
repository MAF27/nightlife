module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			files: ['*.js', 'client/**/*.js', 'server/**/*.js', 'test/*.js', '!client/build/*.js'],
			options: { esnext: true, globals: { jQuery: true }}
		},
		less: {
			production: {
				files: { 'client/build/app-less.css': ['less/*.less'] }
			}
		},
		autoprefixer: {
			single_file: {
				src: 'client/css/*.css', dest: 'client/build/app.css'
			}
		},
		browserify: {
			client: {
				src: ['client/**/*.js', '!client/build/*.js'],
				dest: 'client/build/bundle.js'
			}
		},
		watch: {
			css: {
				files: ['client/css/*.css'],
				tasks: ['css']
			},
			js: {
				files: ['*.js', 'client/**/*.js', 'server/**/*.js', '!client/build/*.js'],
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
