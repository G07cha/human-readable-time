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
// -> 00:00 01/01/1970

// Day/month string patterns
console.log(hrt(new Date(0), 'Today is %day%'));
// -> Today is Thursday

// Relative pattern
console.log(hrt(new Date(0), '%relative% ago'));
// -> 45 years ago
```

Currying is also supported!

```javascript
var hrt = require('human-readable-time');

// You can use date, pattern and both in constructor
var clock = new hrt('hh:mm');

console.log(clock(new Date(0)));
// -> 00:00
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
| day | day of week |
| month | month of year |
| relative | relative time |
| 12h | Force AM/PM position |

Symbols can be used twice, it will add 0 if number less than 10, for example:

```javascript
console.log(hrt(new Date(1000) '%s%'));
// -> 1

console.log(hrt(new Date(1000) '%ss%'));
// -> 01
```

But year can only be used in `%YY%` or `%YYYY%` variants.

### Options

- shortDay - Return first 3 letters of day for %day% pattern
- shortTime - Return time in 12-hour format(you can specify %12h% option to force using 'PM'/'AM' in specific place)

## License

MIT © [Konstantin Azizov](http://G07cha.github.com/)
