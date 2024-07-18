import cloneDeep from 'lodash/cloneDeep';

export function parseMarginString(marginString: string) {
  const regex = /(\d+)px/g;
  const matches = marginString.match(regex);
  if (matches) {
    // 如果只有一个值，将其应用于所有方向
    if (matches.length === 1) {
      const value = Number(matches[0].replace('px', '')) || 0;
      return {
        marginLeft: value,
        marginRight: value,
        marginTop: value,
        marginBottom: value,
      };
    }
    // 如果有两个值，分别应用于左右和上下
    else if (matches.length === 2) {
      return {
        marginLeft: Number(matches[1].replace('px', '')) || 0,
        marginRight: Number(matches[1].replace('px', '')) || 0,
        marginTop: Number(matches[0].replace('px', '')) || 0,
        marginBottom: Number(matches[0].replace('px', '')) || 0,
      };
    }
    // 如果有三个值，分别应用于上、左右和下
    else if (matches.length === 3) {
      return {
        marginLeft: Number(matches[1].replace('px', '')) || 0,
        marginRight: Number(matches[1].replace('px', '')) || 0,
        marginTop: Number(matches[0].replace('px', '')) || 0,
        marginBottom: Number(matches[2].replace('px', '')) || 0,
      };
    }
    // 如果有四个值，分别应用于上、右、下和左
    else if (matches.length === 4) {
      return {
        marginLeft: Number(matches[3]) || 0,
        marginRight: Number(matches[1]) || 0,
        marginTop: Number(matches[0]) || 0,
        marginBottom: Number(matches[2]) || 0,
      };
    }
  }
  return {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  };
}

export const parseStyles = (styles: string | React.CSSProperties): React.CSSProperties => {
  if (typeof styles === 'string') {
    return {};
  }
  const formattedStyles = { ...styles };
  if (styles.margin) {
    const { marginTop, marginBottom, marginLeft, marginRight } = parseMarginString(String(styles.margin));
    formattedStyles.marginTop = marginTop || styles.marginTop;
    formattedStyles.marginBottom = marginBottom || styles.marginBottom;
    formattedStyles.marginLeft = marginLeft || styles.marginLeft;
    formattedStyles.marginRight = marginRight || styles.marginRight;
    delete formattedStyles.margin;
  }
  if (styles.padding) {
    const { marginTop, marginBottom, marginLeft, marginRight } = parseMarginString(String(styles.padding));
    formattedStyles.paddingTop = marginTop || styles.paddingTop;
    formattedStyles.paddingBottom = marginBottom || styles.paddingBottom;
    formattedStyles.paddingLeft = marginLeft || styles.paddingLeft;
    formattedStyles.paddingRight = marginRight || styles.paddingRight;
    delete formattedStyles.padding;
  }
  return formattedStyles;
};

export function formatCSSProperties(styles: React.CSSProperties): React.CSSProperties {
  const formattedStyles = cloneDeep(styles);
  console.log('formattedStyles', formattedStyles);

  const { marginTop, marginBottom, marginLeft, marginRight } = styles;
  if (marginTop !== void 0 || marginBottom !== void 0 || marginLeft !== void 0 || marginRight !== void 0) {
    console.log('has margin not undefined');
    formattedStyles.margin = `${marginTop ?? 0}px ${marginRight ?? 0}px ${marginBottom ?? 0}px ${marginLeft ?? 0}px`;
    console.log('formattedStyles.margin', formattedStyles.margin);
  } else {
    delete formattedStyles.margin;
  }
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } = styles;
  if (paddingTop !== void 0 || paddingBottom !== void 0 || paddingLeft !== void 0 || paddingRight !== void 0) {
    formattedStyles.padding = `${paddingTop ?? 0}px ${paddingRight ?? 0}px ${paddingBottom ?? 0}px ${
      paddingLeft ?? 0
    }px`;
  } else {
    delete formattedStyles.padding;
  }
  delete formattedStyles.marginTop;
  delete formattedStyles.marginBottom;
  delete formattedStyles.marginLeft;
  delete formattedStyles.marginRight;
  delete formattedStyles.paddingTop;
  delete formattedStyles.paddingBottom;
  delete formattedStyles.paddingLeft;
  delete formattedStyles.paddingRight;
  return formattedStyles;
}
