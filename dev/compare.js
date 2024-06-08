function compareString(strA, strB) {
  function composeResult(n) {
    if (n > 0) {
      return 1;
    }
    if (n < 0) {
      return -1;
    }
    return 0;
  }
  function compareNum(a, b) {
    return composeResult(parseInt(a) - parseInt(b));
  }
  function compareStr(a, b) {
    const len = Math.max(a.length, b.length);
    for (let i = 0; i < len; i++) {
      const charA = a.charAt(i);
      const charB = b.charAt(i);
      if (charA === "") {
        return -1;
      }
      if (charB === "") {
        return 1;
      }
      const pointA = charA.codePointAt(0);
      const pointB = charB.codePointAt(0);
      if (pointA > pointB) {
        return 1;
      }
      if (pointA < pointB) {
        return -1;
      }
    }
    return 0;
  }

  const arrA = splitInt(strA).filter(Boolean);
  const arrB = splitInt(strB).filter(Boolean);
  const len = Math.max(arrA.length, arrB.length);
  for (let i = 0; i < len; i++) {
    const a = arrA[i];
    const b = arrB[i];
    if (a !== b) {
      if (typeof(b) === "undefined") {
        return 1;
      } else if (typeof(a) === "undefined") {
        return -1;
      } else if (isNumeric(a) && isNumeric(b)) {
        return compareNum(a, b);
      } else {
        return compareStr(a, b);
      }
    }
  }
}