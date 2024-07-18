export const parseNumber = (str: string, max: number, min: number, defaultValue?: number) => {
  const value = Number(str);
  if (Number.isNaN(value)) {
    return defaultValue ?? Number.NaN;
  }
  if (value > max || value < min) {
    return defaultValue ?? Number.NaN;
  }
  return value;
};

export const isEmptyObject = <T extends Record<string, unknown>>(obj: T) => {
  let emptyLength = 0;
  Object.keys(obj).map((key) => {
    if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
      emptyLength++;
    }
  });
  return emptyLength === Object.keys(obj).length;
};
