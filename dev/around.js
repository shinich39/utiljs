function getAround(arr, index, size, rtl) {
  // remove self
  size -= 1;

  const maxIndex = arr.length - 1;
  const minIndex = 0;

  let left = index - (rtl ? Math.ceil(size / 2) : Math.floor(size / 2)),
      right = index + (rtl ? Math.floor(size / 2) : Math.ceil(size / 2));

  if (left < minIndex) {
    let diff = minIndex - left;
    while(diff > 0 && right < maxIndex) {
      right++;
      diff--;
    }
    left = minIndex;
  }

  if (right > maxIndex) {
    let diff = right - maxIndex;
    while(diff > 0 && left > minIndex) {
      left--;
      diff--;
    }
    right = maxIndex;
  }

  return arr.slice(left, right + 1);
}