# utiljs

Javascript utilities.

## Usage

```js
import utils from 'utiljs'; // esm
```

- Object type validations

```js
const res = utils.isBoolean(true); // true
const res = utils.isNumber(1); // true
const res = utils.isNumeric("1"); // true
const res = utils.isString("str"); // true
const res = utils.isEmptyString(""); // true
const res = utils.isObject({ a: 1 }); // true
const res = utils.isEmptyObject({}); // true
const res = utils.isNull(null); // true
const res = utils.isArray([0, 1, 2]); // true
const res = utils.isBooleanArray([true, false]); // true
const res = utils.isNumberArray([1,2,3]); // true
const res = utils.isStringArray(["a", "b", "c"]); // true
const res = utils.isObjectArray([{a: 1}, {a: 2}, {a: 3}]); // true
const res = utils.isEmptyArray([]); // true
const res = utils.isFunction(isNaN); // true
const res = utils.isEmpty(undefined); // true
const res = utils.isEmpty(null); // true
const res = utils.isSameType(1, 2); // true
const res = utils.isSameType(null, null); // true
```

- utils.random(min, max)

```js
const res = utils.random(0, 1);
// 0 <= n < 1
```

- utils.id()

```js
const res = utils.id();
// 66334bcae2c321000000
```

- utils.xor(str, salt)

```js
const str = "Lorem ipsum dolor sit amet.";
const salt = "3939";
const encrypted = utils.xor(str, salt);
// VA\^ZI@L^WV_VA@PGRTVM

const decrypted = utils.xor(encrypted, salt);
// Lorem ipsum dolor sit amet.
```

- Split number from string.

```js
const str = "Oregano Leaves, 0.5 tsp";
const res = utils.splitInt(str);
// [ 'Oregano Leaves, ', '0', '.', '5', ' tsp' ]
const res = utils.splitFloat(str);
// [ 'Oregano Leaves, ', '0.5', ' tsp' ]
```

- Change number, latin characters width.

```js
const str = "Lorem ipsum dolor sit amet.";
const full = utils.toFullWidth(str);
// Ｌｏｒｅｍ　ｉｐｓｕｍ　ｄｏｌｏｒ　ｓｉｔ　ａｍｅｔ．
const half = utils.toHalfWidth(full);
// Lorem ipsum dolor sit amet.
```

- utils.compare(strA, strB)

```js
const a = "Lorem ipsum dolor sit amet.";
const b = "Lorem ipsum foobar sit aget.";
const res = utils.compare(a, b);
// {
//   acc: 0.8727272727272727,
//   result: [
//     { type: 0, value: 'Lorem ipsum ' },
//     { type: -1, value: 'd' },
//     { type: 1, value: 'f' },
//     { type: 0, value: 'o' },
//     { type: -1, value: 'l' },
//     { type: 0, value: 'o' },
//     { type: 1, value: 'ba' },
//     { type: 0, value: 'r sit a' },
//     { type: -1, value: 'm' },
//     { type: 1, value: 'g' },
//     { type: 0, value: 'et.' }
//   ]
// }
```

Compare after split by word

```js
// 
const a = "Lorem ipsum dolor sit amet.".split(/([\s])/g);
const b = "Lorem ipsum foobar sit aget.".split(/([\s])/g);
const res = utils.compare(a, b);
// {
//   acc: 0.7777777777777778,
//   result: [
//     { type: 0, value: 'Lorem ipsum ' },
//     { type: -1, value: 'dolor' },
//     { type: 1, value: 'foobar' },
//     { type: 0, value: ' sit ' },
//     { type: -1, value: 'amet.' },
//     { type: 1, value: 'aget.' }
//   ]
// }
```

- utils.parseCommand(str)

```js
const str = "git commit -m \'update \\'many\\' features\' -f true";
const res = utils.parseCommand(str);
// [ 'git', 'commit', '-m', "update \\'many\\' features", '-f', 'true' ]
```

- utils.parseQuery(str)

```js
const str = "https://www.google.com/search?q=bing&page=10&page=39";
const res = utils.parseQuery(str);
// { q: [ 'bing' ], page: [ '10', '39' ] }

const str = "q=bing&page=10&page=39";
const res = utils.parseQuery(str);
// { q: [ 'bing' ], page: [ '10', '39' ] }
```

- utils.parseTemplate(str, obj)

```js
const str = "${a} ${b.bb.bbb} sit amet.";
const obj = {
  a: "Lorem ipsum",
  b: {
    bb: {
      bbb: "dolor"
    }
  }
}
const res = utils.parseTemplate(str, obj);
// Lorem ipsum dolor sit amet.
```

- utils.min(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.min(arr);
// 1
```

- utils.max(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.max(arr);
// 6
```

- utils.avg(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.avg(arr);
// 3.5
```

- utils.mode(arr)

```js
const arr = [1, 2, 3, 3, 4, 5, 6];
const res = utils.mode(arr);
// 3
```

- utils.choose(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.choose(arr);
// 1 ~ 6
```

- utils.array(len, value)

```js
const res = utils.array(5, 1);
// [ 1, 1, 1, 1, 1 ]

const res = utils.array(5, e => e);
// [ 0, 1, 2, 3, 4 ]

const res = utils.array(5, []);
res[0].push(1);
// [ [1], [], [], [], [] ]
```

- utils.sort(arr)

```js
const arr = ["a-10","b-2",true,"b-11","a-9",null,1,false];
const res = utils.sort(arr);
// [null, false, true, 1, 'a-9', 'a-10', 'b-2', 'b-11']
```

- utils.shuffle(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.shuffle(arr);
// [ 5, 1, 2, 4, 6, 3 ]
```

- utils.cases(arr)

```js
const arr = [
  [1,2,3],
  [4,5,6,7],
  [8,9,10],
];

const res = utils.cases(arr);
// [
//   [ 1, 4, 8 ], [ 1, 4, 9 ], [ 1, 4, 10 ],
//   [ 1, 5, 8 ], [ 1, 5, 9 ], [ 1, 5, 10 ],
//   [ 1, 6, 8 ], [ 1, 6, 9 ], [ 1, 6, 10 ],
//   [ 1, 7, 8 ], [ 1, 7, 9 ], [ 1, 7, 10 ],
//   [ 2, 4, 8 ], [ 2, 4, 9 ], [ 2, 4, 10 ],
//   [ 2, 5, 8 ], [ 2, 5, 9 ], [ 2, 5, 10 ],
//   [ 2, 6, 8 ], [ 2, 6, 9 ], [ 2, 6, 10 ],
//   [ 2, 7, 8 ], [ 2, 7, 9 ], [ 2, 7, 10 ],
//   [ 3, 4, 8 ], [ 3, 4, 9 ], [ 3, 4, 10 ],
//   [ 3, 5, 8 ], [ 3, 5, 9 ], [ 3, 5, 10 ],
//   [ 3, 6, 8 ], [ 3, 6, 9 ], [ 3, 6, 10 ],
//   [ 3, 7, 8 ], [ 3, 7, 9 ], [ 3, 7, 10 ]
// ]
```

- utils.copy(obj)

```js
const obj = {
  a: {
    b: "A"
  }
}
const clone = utils.copy(obj);
clone.a.b = "B";
// obj: { a: { b: "A" } }
// clone: { a: { b: "B" } }
```

- utils.query(obj, qry)

```js
const obj = {
  name: "John"
}

const qry = {
  name: {
    $eq: "John",
  }
}

const res = utils.query(obj, qry);
// true
```

- utils.contain(src, dst)

```js
const src = { width: 5, height: 10 }
const dst = { width: 20, height: 20 }
const res = utils.contain(src, dst);
// { width: 10, height: 20 }
```

- utils.cover(src, dst)

```js
const src = { width: 5, height: 10 }
const dst = { width: 20, height: 20 }
const res = utils.cover(src, dst);
// { width: 20, height: 40 }
```

- utils.wait(delay)

```js
await utils.wait(1000); // ms
```

- utils.promiseAll(func)

```js
let i = 0;
async function a() { return i++; }
const funcs = [a,a,a];
const res = await utils.promiseAll(funcs);
// [0,1,2]
```