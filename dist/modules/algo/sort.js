'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mergeSort = mergeSort;

var _sortHelpers = require('./sortHelpers');

var sortHelpers = _interopRequireWildcard(_sortHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function mergeSort(unsorted) {
    var length = unsorted.length;
    if (length === 1) {
        return unsorted;
    }

    var left = unsorted.slice(0, length / 2);
    var right = unsorted.slice(length / 2);
    return sortHelpers.merge(mergeSort(left), mergeSort(right));
}