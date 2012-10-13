var Baobab   = require('../index');
var jobQueue = Baobab();
var hoge = {};
hoge.isNum    = function (n) { return typeof n === 'number'; };
hoge.inc      = function (n) { return this.isNum(n) ? n + 1 : 1; };
hoge.callback = function (f, n) {
    n = f(n);

    setTimeout(function () {
        jobQueue.release(f, n);
    }, 1000);

    console.log(n);
};



jobQueue.push( hoge.callback.bind(hoge) )
        .push( hoge.callback.bind(hoge) )
        .push( hoge.callback.bind(hoge) )
        .release(hoge.inc.bind(hoge), 10);

