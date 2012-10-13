# BaoBab

a simple FIFO callback dispatcher

## Usage

### exsample.

- 1st. fetch your account
- 2nd. get friend list json from api.
- 3rd. print friendlist

```javascript
var http   = require('http');
var crypto = require('crypto');

var userid = 'hoge';
var pass   = 'foo';

var shasum = crypto.createHash('sha1');
shasum.update([ userid, pass ].join(':'));

var options = {
    host: 'bar.to'
  , port: 80
  , method: 'GET'
  , headers: { 'X-Auth' : shasum.digest('hex') }
};


var createBaoBab = require('BaoBab');
var bb           = createBaoBab();

bb.push(function () { // 1st job
    options.path = userid;
    http.request( options, function (res) {
        (res.statusCode !== 200) ? bb.clear() : bb.release();
    });
}).push(function () { // 2nd job
    options.path = '/friendlist?mode=json';
    http.request( options, function (res) {
        (res.statusCode !== 200) ? bb.clear() : bb.release();
    });
}).push(function (res) { // 3rd job
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) { data += chunk; };
    res.on('end', function () {
        var friendlist = JSON.parse(data);
        friendlist.forEach(function (friend) {
            console.log("name: %s\t%s", friend.name, friend.address);
        );
    });
})
;

bb.release(); // start. do 1st job
```

## Method

### `push(callback)`

required callback.

### `release(arg1, arg2, ...)`

these arguments are passed as arguments to the callback.
*when this method is called, calback si executed.*

### `clear()`

clear the job that has been left.



