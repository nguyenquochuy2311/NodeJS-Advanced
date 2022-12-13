"use strict"

const _ = require("lodash");

(function () {
    _.chunk(['a', 'b', 'c', 'd'], 2);
    // => [['a', 'b'], ['c', 'd']]

    _.chunk(['a', 'b', 'c', 'd'], 3);
    // => [['a', 'b', 'c'], ['d']]
})();

(function () {
    _.compact([0, 1, false, 2, '', 3]);
    // => [1, 2, 3]
})();

(function () {
    var array = [1];
    var other = _.concat(array, 2, [3], [[4]], [[[5]]]);

    console.log(other);
    // => [1, 2, 3, [4]]

    console.log(array);
    // => [1]
})();

(function () { //Returns the new array of filtered values.
    _.difference([2, 1], [2, 3]);
    // => [1]
})();

(function () { //Returns the new array of filtered values.
    _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    // => [1.2]

    // The `_.property` iteratee shorthand.
    _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
    // => [{ 'x': 2 }]
})();

(function () {
    var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 2, 'y': 3 }];

    _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
    // => [{ 'x': 2, 'y': 1 }]
})();

(function () {
    _.drop([1, 2, 3]);
    // => [2, 3]

    _.drop([1, 2, 3], 2);
    // => [3]

    _.drop([1, 2, 3], 5);
    // => []

    _.drop([1, 2, 3], 0);
    // => [1, 2, 3]
})();

(function () {
    _.dropRight([1, 2, 3]);
    // => [1, 2]

    _.dropRight([1, 2, 3], 2);
    // => [1]

    _.dropRight([1, 2, 3], 5);
    // => []

    _.dropRight([1, 2, 3], 0);
    // => [1, 2, 3]
})();

(function () {
    var users = [
        { 'user': 'barney', 'active': true },
        { 'user': 'fred', 'active': false },
        { 'user': 'pebbles', 'active': false }
    ];

    _.dropRightWhile(users, function (o) { return !o.active; });
    // => objects for ['barney']

    // The `_.matches` iteratee shorthand.
    _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
    // => objects for ['barney', 'fred']

    // The `_.matchesProperty` iteratee shorthand.
    _.dropRightWhile(users, ['active', false]);
    // => objects for ['barney']

    // The `_.property` iteratee shorthand.
    _.dropRightWhile(users, 'active');
    // => objects for ['barney', 'fred', 'pebbles']
})();