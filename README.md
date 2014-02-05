# gulp-redust
[![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url]

> redust plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-redust` as a development dependency:

```shell
npm install --save-dev gulp-redust
```

Then, add it to your `gulpfile.js`:

```javascript
var redust = require("gulp-redust");

gulp.src("./src/*.js")
	.pipe(redust({
	    dir: 'templates',
	    ext: '.dust'
	}))
	.pipe(gulp.dest("./dist"));
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-redust
[npm-image]: https://badge.fury.io/js/gulp-redust.png

[depstat-url]: https://david-dm.org/wenqer/gulp-redust
[depstat-image]: https://david-dm.org/wenqer/gulp-redust.png
