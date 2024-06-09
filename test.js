import utils from "./index.js";

// const res = utils.sort(["a-10","b-2",true,"b-11","a-9",null,1,false]);
// console.log(res)

// ;(async function() {
//   console.log(1);
//   await utils.wait(500);
//   console.log(2);
// })();

// const a = "Lorem ipsum dolor sit amet.".split(/([\s])/g);
// const b = "Lorem ipsum foobar sit aget.".split(/([\s])/g);
// const res = utils.compare(a, b);

// console.log(res)


// const str = "${a} ${b.bb.bbb} sit amet.";
// const obj = {
//   a: "Lorem ipsum",
//   b: {
//     bb: {
//       bbb: "dolor"
//     }
//   }
// }
// const res = utils.parseTemplate(str, obj);
// // Lorem ipsum dolor sit amet.
// console.log(res)

;(async function() {
  let i = 0;
  async function a() { return i++; }
  const funcs = [a,a,a];
  const res = await utils.promiseAll(funcs);
  console.log(res);
})();