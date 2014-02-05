var through = require("through2"),
    gutil = require("gulp-util");

var parse = require("./lib/parse");

module.exports = function (options) {
    "use strict";
    // {
    //     dir: 'templates',
    //     pattern: '*.dust',
    //     ext: '.dust',
    //     varPostfix: '_TMPL'
    // }

    function redust(file, enc, callback) {
        var self = this;

        parse.process(file, options, function (err, res) {
            if (err) {
                self.emit("error", new gutil.PluginError("gulp-redust", err));
            }

            file.contents = new Buffer(res);

            self.push(file);
            callback();
        });
    }

    return through.obj(redust);
};
