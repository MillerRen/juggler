var path = require('path');
var unwrap = require('unwrap');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '<%= pkg.version %>',
      banner:
        '// Juggler\n' +
        '// ----------------------------------\n' +
        '// v<%= pkg.version %>\n' +
        '//\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Miller Ren\n' +
        '// Distributed under MIT license\n' +
        '//\n' +
        '// http://renyufei.com\n' +
        '\n'
    },
    assets: {
      
    },

    clean: {
      lib: 'lib'
    },

    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },

    preprocess: {
      core: {
        src: 'src/dist/juggler.core.js',
        dest: 'tmp/juggler.core.js'
      },
      bundle: {
        src: 'src/dist/juggler.bundled.js',
        dest: 'tmp/backbone.juggler.js'
      }
    },

    template: {
      options: {
        data: {
          version: '<%= pkg.version %>'
        }
      },
      core: {
        src: '<%= preprocess.core.dest %>',
        dest: '<%= preprocess.core.dest %>'
      },
      bundle: {
        src: '<%= preprocess.bundle.dest %>',
        dest: '<%= preprocess.bundle.dest %>'
      }
    },

    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      core: {
        src: '<%= preprocess.core.dest %>',
        dest: 'lib/core/backbone.juggler.js'
      },
      bundle: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: '<%= preprocess.bundle.dest %>',
        dest: 'lib/backbone.juggler.js'
      }
    },

    uglify : {
      core: {
        src : '<%= concat.core.dest %>',
        dest : 'lib/core/backbone.juggler.min.js',
        options : {
          banner: '<%= meta.core_bundle %>',
          sourceMap : 'lib/core/backbone.juggler.map',
          sourceMappingURL : '<%= uglify.bundle.options.sourceMappingURL %>',
          sourceMapPrefix : 1
        }
      },

      bundle: {
        src : '<%= concat.bundle.dest %>',
        dest : 'lib/backbone.juggler.min.js',
        options : {
          banner: '<%= meta.banner %>',
          sourceMap : 'lib/backbone.juggler.map',
          sourceMappingURL : 'backbone.juggler.map',
          sourceMapPrefix : 2
        }
      }
    },

    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../../../test/tmp/'
      }
    },

    instrument: {
      files: 'tmp/backbone.juggler.js',
      options: {
        lazy: true,
        basePath: 'test'
      }
    },

    mochaTest: {
      tests: {
        options: {
          require: 'spec/javascripts/setup/node.js',
          reporter: grunt.option('mocha-reporter') || 'nyan',
          clearRequireCache: true,
          mocha: require('mocha')
        },
        src: [
          'spec/javascripts/setup/helpers.js',
          'spec/javascripts/*.spec.js'
        ]
      }
    },

    storeCoverage: {
      options: {
        dir: 'coverage'
      }
    },
    makeReport: {
      src: 'coverage/**/*.json',
      options: {
        type: 'lcov',
        dir: 'coverage',
        print: 'detail'
      }
    },

    coveralls: {
      options: {
        src: 'coverage/lcov.info',
        force: false
      },
      default: {
        src: 'coverage/lcov.info'
      }
    },

    plato: {
      marionette : {
        src : 'src/*.js',
        dest : 'reports',
        options : {
          jshint : grunt.file.readJSON('.jshintrc')
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },

      marionette: {
        src: [ 'src/*.js' ]
      },

      specs: {
        options: {
          jshintrc: 'spec/.jshintrc'
        },

        files: {
          src: ['spec/javascripts/**.js']
        }
      }
    },

    watch: {
      marionette : {
        options: {
          spawn: false
        },
        files : ['src/**/*.js', 'spec/**/*.js'],
        tasks : ['test']
      }
    },

    connect: {
      server: {
        options: {
          port: 8888
        }
      }
    },

    lintspaces: {
      all: {
        src: [
          'src/*.js',
          'docs/*.md'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    unwrap: {
      babysitter: {
        src: './bower_components/backbone.babysitter/lib/backbone.babysitter.js',
        dest: './tmp/backbone.babysitter.bare.js'
      },
      wreqr: {
        src: './bower_components/backbone.wreqr/lib/backbone.wreqr.js',
        dest: './tmp/backbone.wreqr.bare.js'
      }
    }
  });

  grunt.registerMultiTask('unwrap', 'Unwrap UMD', function () {
    var done = this.async();
    var timesLeft = 0;

    this.files.forEach(function (file) {
      file.src.forEach(function (src) {
        timesLeft++;
        unwrap(path.resolve(__dirname, src), function (err, content) {
          if (err) return grunt.log.error(err);
          grunt.file.write(path.resolve(__dirname, file.dest), content);
          grunt.log.ok(file.dest + ' created.');
          timesLeft--;
          if (timesLeft <= 0) done();
        });
      });
    });
  });

  grunt.registerTask('verify-bower', function () {
    if (!grunt.file.isDir('./bower_components')) {
      grunt.fail.warn('Missing bower components. You should run `bower install` before.');
    }
  });

  var defaultTestsSrc = grunt.config('mochaTest.tests.src');
  var defaultJshintSrc = grunt.config('jshint.marionette.src');
  var defaultJshintSpecSrc = grunt.config('jshint.specs.files.src');
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('mochaTest.tests.src', defaultTestsSrc);
    grunt.config('jshint.marionette.src', defaultJshintSrc);
    grunt.config('jshint.specs.files.src', defaultJshintSpecSrc);
    if (filepath.match('spec/javascripts/') && !filepath.match('setup') && !filepath.match('fixtures')) {
      grunt.config('mochaTest.tests.src', ['spec/javascripts/setup/helpers.js', filepath]);
      grunt.config('jshint.specs.files.src', filepath);
      grunt.config('jshint.marionette.src', 'DO_NOT_RUN_ME');
    }
    if (filepath.match('src/')) {
      grunt.config('jshint.marionette.src', filepath);
      grunt.config('jshint.specs.files.src', 'DO_NOT_RUN_ME');
    }
  });

  grunt.registerTask('default', 'An alias task for running tests.', ['test']);

  grunt.registerTask('lint', 'Lints our sources', ['lintspaces', 'jshint']);

  grunt.registerTask('test', 'Run the unit tests.', ['verify-bower', 'lint', 'unwrap', 'preprocess:bundle', 'template:bundle', 'mochaTest']);

  grunt.registerTask('coverage', ['unwrap', 'preprocess:bundle', 'template:bundle', 'env:coverage', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport', 'coveralls']);

  grunt.registerTask('dev', 'Auto-lints while writing code.', ['test', 'watch:marionette']);

  grunt.registerTask('build', 'Build all three versions of the library.', ['clean:lib', 'bower:install', 'lint', 'unwrap', 'preprocess', 'template', 'mochaTest', 'concat', 'uglify']);
};
