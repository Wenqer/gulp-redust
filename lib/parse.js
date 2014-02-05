"use strict";
var fs = require("fs");
var path = require("path");
var async = require("async");
var dust = require("dustjs-linkedin");


var tmpl = /__(.*)_TMPL__(?!\s\*\/)/img;

module.exports = {
    process: function (file, opts, done) {
        opts = opts || {};

        // Shift args if no options object is specified
        if (typeof opts === "function") {
            done = opts;
            opts = {};
        }

        function finish(err, result) {
            if (err) {
                done(err);
            }

            content = content.replace(tmpl, JSON.stringify(result));

            done(null, content);
        }

        function iterator(obj, tmpl, callback) {
            var name = path.basename(tmpl, opts.ext);

            fs.readFile(path.join(dir + tmpl), function (err, data) {
                if (err) {
                    callback(err);
                }

                obj[name] = dust.compile(data.toString(), name);

                callback(null, obj);
            });
        }

        function readDir(err, files) {
            if (err) {
                done(err);
            }

            async.reduce(files, {}, iterator, finish);
        }

        function testDir(exist) {
            if (exist) {
                fs.readdir(dir, readDir);
            } else {
                done("specified module doesn\'t have folder \'templates\'");
            }
        }

        var result;

        var content = file.contents.toString();

        if ((result = tmpl.exec(content)) !== null) {
            var module = result[1];
            var dir = path.join(file.cwd, "src", module, opts.dir + "/");

            fs.exists(dir, testDir);

        } else {
            done(null, content);
        }
    }
};
