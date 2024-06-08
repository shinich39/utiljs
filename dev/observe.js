function observe(obj, cb, deley) {
  if (!deley) {
    deley = 10; // 10ms
  }
  let _obj = clone(obj);
  const timer = setInterval(function() {
    let isChanged = false;
    for (const key of Object.keys(obj)) {
      if (_obj[key] !== obj[key]) {
        isChanged = true;
        cb(key, _obj[key], obj[key]);
      }
    }
    if (isChanged) {
      _obj = clone(obj);
    }
  }, deley);
  return function() {
    clearInterval(timer);
  };
}