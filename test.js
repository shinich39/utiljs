import jsu from "./index.js";

// const res = jsu.sort(["a-10","b-2",true,"b-11","a-9",null,1,false]);
// console.log(res)

// ;(async function() {
//   console.log(1);
//   await jsu.wait(500);
//   console.log(2);
// })();

// const a = "Lorem ipsum dolor sit amet.".split(/([\s])/g);
// const b = "Lorem ipsum foobar sit aget.".split(/([\s])/g);
// const res = jsu.compare(a, b);

// console.log(res)


const str = "${a} ${b.bb.bbb} sit amet.";
const obj = {
  a: "Lorem ipsum",
  b: {
    bb: {
      bbb: "dolor"
    }
  }
}
const res = jsu.parseTemplate(str, obj);
// Lorem ipsum dolor sit amet.
console.log(res)