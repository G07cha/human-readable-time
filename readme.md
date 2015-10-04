Convert Date to format given by pattern

![Test status](https://api.travis-ci.org/G07cha/human-readable-time.svg)

## Examples

```javascript
var hrt = require('human-readable-time');

console.log(hrt(new Date(0), '%hh%:%mm%'));
// -> 00:00

console.log(hrt(new Date(0), 'Now is %YYYY% year'));
// -> Now is 1970 year

// Default pattern
console.log(hrt(new Date(0)));
// -> 00:00 01/00/1970
```

## Docs

|Symbol|Meaning|
|:---:|-------|
| h | hours |
| m | minutes  |
| s | seconds |
| D | day of month |
| M | month |
| YY | year |
| day | day of week|
| month | month of year |

Symbols can be used twice, it will add 0 if number less than 10, for example:

```javascript
console.log(hrt(new Date(1000) '%s%'));
// -> 1

console.log(hrt(new Date(1000) '%ss%'));
// -> 01
```

But year only be used in `%YY%` or `%YYYY%` variants.


## License

MIT © [Konstantin Azizov](http://G07cha.github.com/)