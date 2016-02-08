# longcut

Cut your deep data structures into smaller pieces using regular expressions.

## Installation

    npm install longcut

## Usage

    var longcut = require('longcut').longcut;
    var lc = longcut({
      key1: [10, 20, 'hello'],
      key2: { another: 'child object' },
      key3: 'just a string'
    });
    
    console.log(lc('key1')(2).val());
    // hello
    console.log(lc('key2')('another').val());
    // child object
    console.log(lc(/3/).val());
    // { key3: 'just a string' }
    console.log(lc('key1')(/2/).val());
    // [ 20 ]

## Description

Longcut lets you slice and dice your data structures with a very terse syntax where you don't have to worry
about the exact types involved and with regular expressions at your disposal.

Given

    var obj = {
      key1: [10, 20, 'hello'],
      key2: { another: 'child object' },
      key3: 'just a string'
    };
    var lo = longcut(obj);

| JavaScript               | longcut                      | value                       |
|--------------------------|------------------------------|-----------------------------|
| `obj['key2'][3]`         | `lo('key2')(3).val()`        | `hello`                     |
| `obj['key2']['another']` | `lo('key')('another').val()` | `child object`              |
| horribly complicated!    | `lo(/3/).val()`              | `{ key3: 'just a string' }` |

## Author

Written by Michael Zedeler <michael@zedeler.dk>. Copyright 2016, see the attached LICENSE file.

## Bugs

If you encounter any unexpected behavior, here is what you can do - ordered by increasing value to me:

 * Write me.
 * File a bug report on the issue tracker.
 * Write a failing test and open a pull request with it.
 * Write a failing test, fix the bug and demonstrate that the test is passing with your changes. Open a pull request with the test and the fix.


