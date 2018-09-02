
var fs = require('fs');

var $root = "./blockSrc" ;
module.exports = function (grunt) {
   
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n'
      },
      app: {
        src: [
          $root+"/zepto.js",
          $root+"/acorn_interpreter.js",
          $root+"/customblock.js",
          $root+"/Tool.js",
          $root+"/main.js",
          $root+"/countSelect.js"
        ],
        dest: './blockly/lib/app.js'    
      },
      blockly: {
        src: [
          $root+"/blockly_compressed.js",
          $root+"/blocks_compressed.js",
          $root+"/msg/js/zh-hans.js",
          $root+"/javascript_compressed.js"
        ],
        dest: './blockly/lib/block.min.js'
      }
    },
    //压缩js
    uglify: {
         options: {
          compress: {
            drop_console: false
          }
         },
         //压缩
         blockly:{
            src: './blockly/lib/block.min.js',
            dest: './blockly/lib/block.min.js'
         },
         app:{
            src: './blockly/lib/app.js',
            dest: './blockly/lib/app.js'
         }
    },
    //css压缩合并
    cssmin: {
         options:{
            keepSpecialComments: 0
         },
         default:{
            src: './blockly/css/block.css',
            dest: './blockly/css/block.min.css'
         }
     }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认任务
  grunt.registerTask('build', ['cssmin:default','concat:app','concat:blockly','uglify:blockly','uglify:app']);


}