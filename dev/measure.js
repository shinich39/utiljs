function measureNumberArray(arr) {
  let totalValue = 0,
      totalCount = 0,
      minValue = Number.POSITIVE_INFINITY,
      maxValue = Number.NEGATIVE_INFINITY,
      maxCount = 0,
      seen = {},
      uniqueValues = [],
      duplicatedValues = [],
      mostFrequentValues = [],
      countValues = [];
  for (const item of arr) {
    if (!isNumber(item)) {
      continue;
    }

    if (minValue > item) {
      minValue = item;
    }

    if (maxValue < item) {
      maxValue = item;
    }

    if (!seen[item]) {
      seen[item] = 1;
    } else {
      seen[item] += 1;
    }

    if (maxCount < seen[item]) {
      maxCount = seen[item];
    }

    totalValue += item;
    totalCount += 1;
  }

  for (const [value, count] of Object.entries(seen)) {
    const v = parseFloat(value);
    // get uniq
    if (count === 1) {
      uniqueValues.push(v);
    }
    // get dupe
    if (count > 1) {
      duplicatedValues.push(v);
    }
    // get frq
    if (count === maxCount) {
      mostFrequentValues.push(v);
    }
    // get seen
    countValues.push({ value: v, count: count });
  }

  return {
    total: totalValue,
    count: totalCount,
    min: minValue,
    max: maxValue,
    avg: totalValue / totalCount,
    frq: mostFrequentValues,
    dupe: duplicatedValues,
    uniq: uniqueValues,
    seen: countValues,
  };
}