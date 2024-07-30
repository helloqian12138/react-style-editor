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

export const parseValueWithDm = (str: string | number): (string | number | null | undefined)[] => {
  if (typeof str === 'number') {
    return [str, 'px'];
  }
  const matches = str.match(/(\d+)(\D+)/);
  if (matches) {
    return [parseInt(matches[1]), matches[2]];
  }
  return [null, void 0];
};

export function stringToNumber(value: string | number, suffix?: string) {
  if (typeof value === 'number' || value === void 0) {
    return value;
  }
  if (suffix && value.endsWith(suffix)) {
    return Number(value.replace(suffix, ''));
  }
  return Number(value);
}
