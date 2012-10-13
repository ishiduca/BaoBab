function BaoBab () { this.queue = []; }

var BBP = {
    push: function (f) {
        (typeof f === 'function')
          && this.queue.push(f);
        return this;
    }
  , release: function () {
        var f = this.queue.shift();
        return (typeof f !== 'function')
            ? undefined
            : f.apply(null, arguments);
    }
  , clear: function () {
        this.queue = [];
        return this;
    }
};

BaoBab.prototype = BBP;

function createBaoBab () {
    return (typeof Object.create === 'function')
        ? Object.create( BBP, { queue: { value: [], writable: true } })
        : new BaoBab
    ;
}

if (typeof window === 'object') {
    window.baoBab = createBaoBab;
} else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = createBaoBab;
}

