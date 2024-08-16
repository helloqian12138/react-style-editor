export const standardStyles = [
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'margin',
  'padding',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'fontSize',
  'color',
  'textAlign',
  'fontStyle',
  'textDecoration',
  'fontWeight',
  'letterSpacing',
  'wordSpacing',
  'whiteSpace',
  'wordBreak',
  'lineHeight',
  'backgroundColor',
  'backgroundImage',
  'backgroundRepeat',
  'backgroundPosition',
  'border',
  'borderTop',
  'borderBottom',
  'borderLeft',
  'borderRight',
  'borderRadius',
  'display',
  'flexDirection',
  'flexWrap',
  'alignContent',
  'justifyContent',
  'alignItems',
  'position',
  'top',
  'bottom',
  'left',
  'right',
  'zIndex',
  'boxShadow',
];

export const filterStyles = (styles: React.CSSProperties) => {
  const styleObjects = { ...styles } as { [key: string]: string };
  const result: Record<string, string> = {};
  Object.keys(styleObjects)
    .filter((item) => !standardStyles.includes(item))
    .forEach((key) => {
      result[key] = styleObjects[key];
    });
  return result;
};

export const objectToArray = (obj: Record<string, string>) => {
  const result: { id: number; key: string; value: string }[] = [];
  Object.keys(obj).forEach((key, index) => {
    result.push({
      id: index,
      key,
      value: obj[key],
    });
  });
  return result;
};

export const arrayToObject = (array: { id: number; key: string; value: string }[]) => {
  const result: Record<string, string> = {};
  array.forEach((item) => {
    result[item.key] = item.value;
  });
  return result;
};
