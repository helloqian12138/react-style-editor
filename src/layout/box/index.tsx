import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { EditorContext } from '../../hook';
import { ReactStyleEditorProps } from '../../typing';

import './index.less';

export interface BoxStylesEditorProps extends ReactStyleEditorProps {
  containerWidth: number;
}

const prefixCls = 'rse-box';

const parseNumber = (str: string, max: number, min: number, handler: (val: number | undefined) => void) => {
  if (str === '' || str === void 0 || str === null) {
    return handler(void 0);
  }
  const value = Number(str);
  if (Number.isNaN(value)) {
    return handler(void 0);
  }
  if (value > max || value < min) {
    return;
  }
  return handler(value);
};

const parseValueWithDm = (str: string | number): (string | number | null | undefined)[] => {
  if (typeof str === 'number') {
    return [str, 'px'];
  }
  const matches = str.match(/(\d+)(\D+)/);
  if (matches) {
    return [parseInt(matches[1]), matches[2]];
  }
  return [null, void 0];
};

const selectAfter = (value: string | null | undefined, onChange: (value: string) => void) => (
  <Select value={value} onChange={onChange} style={{ minWidth: 58 }}>
    <Select.Option value="px">px</Select.Option>
    <Select.Option value="%">%</Select.Option>
  </Select>
);

const BoxStylesEditor = (props: BoxStylesEditorProps) => {
  const { styles, setState } = React.useContext(EditorContext);
  const [marginTop, setMarginTop] = React.useState(styles.marginTop);
  const [marginBottom, setMarginBottom] = React.useState(styles.marginBottom);
  const [marginLeft, setMarginLeft] = React.useState(styles.marginLeft);
  const [marginRight, setMarginRight] = React.useState(styles.marginRight);
  const [paddingTop, setPaddingTop] = React.useState(styles.paddingTop);
  const [paddingBottom, setPaddingBottom] = React.useState(styles.paddingBottom);
  const [paddingLeft, setPaddingLeft] = React.useState(styles.paddingLeft);
  const [paddingRight, setPaddingRight] = React.useState(styles.paddingRight);
  const [containerSize, setContainerSize] = React.useState(props.containerWidth > 400 ? 'middle' : 'small');
  const [width, setWidth] = React.useState(parseValueWithDm(styles.width ?? ''));
  const [height, setHeight] = React.useState(parseValueWithDm(styles.height ?? ''));

  React.useEffect(() => {
    const newStyles = { ...styles };
    newStyles.marginTop = marginTop;
    newStyles.marginBottom = marginBottom;
    newStyles.marginLeft = marginLeft;
    newStyles.marginRight = marginRight;
    setState({ styles: newStyles });
  }, [marginTop, marginBottom, marginLeft, marginRight]);

  React.useEffect(() => {
    const newStyles = { ...styles };
    newStyles.paddingTop = paddingTop;
    newStyles.paddingBottom = paddingBottom;
    newStyles.paddingLeft = paddingLeft;
    newStyles.paddingRight = paddingRight;
    setState({ styles: newStyles });
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
          value={String(marginTop ?? '')}
          onChange={(e) => parseNumber(e.target.value, 999, -999, setMarginTop)}
        />
      </div>
      <div className={`${prefixCls}-middle-container`}>
        <div className={`${prefixCls}-margin-left`}>
          <Input
            className={`${prefixCls}-transparent-input`}
            size={props.size}
            value={String(marginLeft ?? '')}
            onChange={(e) => parseNumber(e.target.value, 999, -999, setMarginLeft)}
          />
        </div>

        <div className={`${prefixCls}-padding-container`}>
          <div className={`${prefixCls}-padding-top ${containerSize}`}>
            <Input
              className={`${prefixCls}-transparent-input`}
              size={props.size}
              value={String(paddingTop ?? '')}
              onChange={(e) => parseNumber(e.target.value, 999, 0, setPaddingTop)}
            />
          </div>

          <div className={`${prefixCls}-padding-inner-container`}>
            <div className={`${prefixCls}-padding-left`}>
              <Input
                className={`${prefixCls}-transparent-input`}
                size={props.size}
                value={String(paddingLeft ?? '')}
                onChange={(e) => parseNumber(e.target.value, 999, 0, setPaddingLeft)}
              />
            </div>
            <div className={`${prefixCls}-padding-right`}>
              <Input
                className={`${prefixCls}-transparent-input`}
                size={props.size}
                value={String(paddingRight ?? '')}
                onChange={(e) => parseNumber(e.target.value, 999, 0, setPaddingRight)}
              />
            </div>
          </div>

          <div className={`${prefixCls}-padding-bottom ${containerSize}`}>
            <span className={`${prefixCls}-bottom-title`}>内边距</span>
            <Input
              className={`${prefixCls}-transparent-input`}
              size={props.size}
              value={String(paddingBottom ?? '')}
              onChange={(e) => parseNumber(e.target.value, 999, 0, setPaddingBottom)}
            />
          </div>
        </div>

        <div className={`${prefixCls}-margin-right`}>
          <Input
            className={`${prefixCls}-transparent-input`}
            size={props.size}
            value={String(marginRight ?? '')}
            onChange={(e) => parseNumber(e.target.value, 999, -999, setMarginRight)}
          />
        </div>
      </div>

      <div className={`${prefixCls}-margin-bottom ${containerSize}`}>
        <span className={`${prefixCls}-bottom-title`}>外边距</span>
        <Input
          className={`${prefixCls}-transparent-input`}
          size={props.size}
          value={String(marginBottom ?? '')}
          onChange={(e) => parseNumber(e.target.value, 999, -999, setMarginBottom)}
        />
      </div>

      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>宽度</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginTop: '12px' }}
      >
        <InputNumber
          size="small"
          addonAfter={selectAfter(width[1] as string | undefined, (v) => {
            setWidth([(width[0] as number) ?? 0, v]);
            setState({
              styles: { ...styles, width: `${width[0] ?? 0}${v}` },
            });
          })}
          value={width ? (width[0] as number) : 0}
          onChange={(value) => {
            setWidth([value as number, width[1] ?? 'px']);
            const newStyles: React.CSSProperties = { ...styles, width: `${value}${width[1] ?? 'px'}` };
            if (value === null) {
              delete newStyles.width;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>高度</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginTop: '12px' }}
      >
        <InputNumber
          size="small"
          addonAfter={selectAfter(height[1] as string | undefined, (v) => {
            setHeight([(height[0] as number) ?? 0, v]);
            setState({
              styles: { ...styles, height: `${height[0] ?? 0}${v}` },
            });
          })}
          value={height ? (height[0] as number) : 0}
          onChange={(value) => {
            setHeight([value as number, height[1] ?? 'px']);
            const newStyles: React.CSSProperties = { ...styles, height: `${value}${height[1] ?? 'px'}` };
            if (value === null) {
              delete newStyles.height;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
    </div>
  );
};

export default BoxStylesEditor;
