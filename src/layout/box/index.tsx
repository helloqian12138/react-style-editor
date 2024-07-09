import React from 'react';
import { Input } from 'antd';
import { EditorContext } from '../../hook';
import { ReactStyleEditorProps } from '../../typing';

import './index.less';

export interface BoxStylesEditorProps extends ReactStyleEditorProps {
  containerWidth: number;
}

const prefixCls = 'rse-box';

const parseNumber = (
  str: string,
  max: number,
  min: number,
  handler: (val: number) => void,
) => {
  const value = Number(str);
  if (Number.isNaN(value)) {
    return handler(0);
  }
  if (value > max || value < min) {
    return;
  }
  return handler(value);
};

const BoxStylesEditor = (props: BoxStylesEditorProps) => {
  const [marginTop, setMarginTop] = React.useState(0);
  const [marginBottom, setMarginBottom] = React.useState(0);
  const [marginLeft, setMarginLeft] = React.useState(0);
  const [marginRight, setMarginRight] = React.useState(0);
  const [paddingTop, setPaddingTop] = React.useState(0);
  const [paddingBottom, setPaddingBottom] = React.useState(0);
  const [paddingLeft, setPaddingLeft] = React.useState(0);
  const [paddingRight, setPaddingRight] = React.useState(0);
  const [containerSize, setContainerSize] = React.useState(
    props.containerWidth > 400 ? 'middle' : 'small',
  );
  const context = React.useContext(EditorContext);

  React.useEffect(() => {
    let margin: string | undefined = void 0;
    if (
      marginTop === 0 &&
      marginBottom === 0 &&
      marginLeft === 0 &&
      marginRight === 0
    ) {
      margin = void 0;
    } else {
      margin = `${marginTop}${marginTop !== 0 ? 'px' : ''} ${marginRight}${
        marginRight !== 0 ? 'px' : ''
      } ${marginBottom}${marginBottom !== 0 ? 'px' : ''} ${marginLeft}${
        marginLeft !== 0 ? 'px' : ''
      }`.trim();
    }
    const styles = { ...context.styles };
    if (!margin) {
      delete styles.margin;
    } else {
      styles.margin = margin;
    }
    context.setState({ styles });
  }, [marginTop, marginBottom, marginLeft, marginRight]);

  React.useEffect(() => {
    let padding: string | undefined = void 0;
    if (
      paddingTop === 0 &&
      paddingBottom === 0 &&
      paddingLeft === 0 &&
      paddingRight === 0
    ) {
      padding = void 0;
    } else {
      padding = `${paddingTop}${paddingTop !== 0 ? 'px' : ''} ${paddingRight}${
        paddingRight !== 0 ? 'px' : ''
      } ${paddingBottom}${paddingBottom !== 0 ? 'px' : ''} ${paddingLeft}${
        paddingLeft !== 0 ? 'px' : ''
      }`.trim();
    }
    const styles = { ...context.styles };
    if (!padding) {
      delete styles.padding;
    } else {
      styles.padding = padding;
    }
    context.setState({ styles });
  }, [paddingTop, paddingBottom, paddingLeft, paddingRight]);

  React.useEffect(() => {
    setContainerSize(props.containerWidth > 400 ? 'middle' : 'small');
  }, [props.containerWidth]);

  return (
    <div>
      <div className={`${prefixCls}-margin-top ${containerSize}`}>
        <Input
          className={`${prefixCls}-transparent-input`}
          size={props.size}
          value={String(marginTop)}
          onChange={(e) => parseNumber(e.target.value, 999, -999, setMarginTop)}
        />
      </div>
      <div className={`${prefixCls}-middle-container`}>
        <div className={`${prefixCls}-margin-left`}>
          <Input
            className={`${prefixCls}-transparent-input`}
            size={props.size}
            value={String(marginLeft)}
            onChange={(e) =>
              parseNumber(e.target.value, 999, -999, setMarginLeft)
            }
          />
        </div>

        <div className={`${prefixCls}-padding-container`}>
          <div className={`${prefixCls}-padding-top ${containerSize}`}>
            <Input
              className={`${prefixCls}-transparent-input`}
              size={props.size}
              value={String(paddingTop)}
              onChange={(e) =>
                parseNumber(e.target.value, 999, 0, setPaddingTop)
              }
            />
          </div>

          <div className={`${prefixCls}-padding-inner-container`}>
            <div className={`${prefixCls}-padding-left`}>
              <Input
                className={`${prefixCls}-transparent-input`}
                size={props.size}
                value={String(paddingLeft)}
                onChange={(e) =>
                  parseNumber(e.target.value, 999, 0, setPaddingLeft)
                }
              />
            </div>
            <div className={`${prefixCls}-padding-right`}>
              <Input
                className={`${prefixCls}-transparent-input`}
                size={props.size}
                value={String(paddingRight)}
                onChange={(e) =>
                  parseNumber(e.target.value, 999, 0, setPaddingRight)
                }
              />
            </div>
          </div>

          <div className={`${prefixCls}-padding-bottom ${containerSize}`}>
            <span className={`${prefixCls}-bottom-title`}>内边距</span>
            <Input
              className={`${prefixCls}-transparent-input`}
              size={props.size}
              value={String(paddingBottom)}
              onChange={(e) =>
                parseNumber(e.target.value, 999, 0, setPaddingBottom)
              }
            />
          </div>
        </div>

        <div className={`${prefixCls}-margin-right`}>
          <Input
            className={`${prefixCls}-transparent-input`}
            size={props.size}
            value={String(marginRight)}
            onChange={(e) =>
              parseNumber(e.target.value, 999, -999, setMarginRight)
            }
          />
        </div>
      </div>

      <div className={`${prefixCls}-margin-bottom ${containerSize}`}>
        <span className={`${prefixCls}-bottom-title`}>外边距</span>
        <Input
          className={`${prefixCls}-transparent-input`}
          size={props.size}
          value={String(marginBottom)}
          onChange={(e) =>
            parseNumber(e.target.value, 999, -999, setMarginBottom)
          }
        />
      </div>
    </div>
  );
};

export default BoxStylesEditor;
