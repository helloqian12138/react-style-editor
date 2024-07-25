import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { EditorContext } from '../../hook';
import { ReactStyleEditorProps } from '../../typing';

import './index.less';
import { parseValueWithDm } from '../../utils/number';

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
  const [minWidth, setMinWidth] = React.useState(parseValueWithDm(styles.minWidth ?? ''));
  const [minHeight, setMinHeight] = React.useState(parseValueWithDm(styles.minHeight ?? ''));
  const [maxWidth, setMaxWidth] = React.useState(parseValueWithDm(styles.maxWidth ?? ''));
  const [maxHeight, setMaxHeight] = React.useState(parseValueWithDm(styles.maxHeight ?? ''));

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
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>最小宽度</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginTop: '12px' }}
      >
        <InputNumber
          size="small"
          addonAfter={selectAfter(minWidth[1] as string | undefined, (v) => {
            setMinWidth([(minWidth[0] as number) ?? 0, v]);
            setState({
              styles: { ...styles, minWidth: `${minWidth[0] ?? 0}${v}` },
            });
          })}
          value={minWidth ? (minWidth[0] as number) : 0}
          onChange={(value) => {
            setMinWidth([value as number, minWidth[1] ?? 'px']);
            const newStyles: React.CSSProperties = { ...styles, minWidth: `${value}${minWidth[1] ?? 'px'}` };
            if (value === null) {
              delete newStyles.minWidth;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>最小高度</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginTop: '12px' }}
      >
        <InputNumber
          size="small"
          addonAfter={selectAfter(minHeight[1] as string | undefined, (v) => {
            setMinHeight([(minHeight[0] as number) ?? 0, v]);
            setState({
              styles: { ...styles, minHeight: `${minHeight[0] ?? 0}${v}` },
            });
          })}
          value={minHeight ? (minHeight[0] as number) : 0}
          onChange={(value) => {
            setMinHeight([value as number, minHeight[1] ?? 'px']);
            const newStyles: React.CSSProperties = { ...styles, minHeight: `${value}${minHeight[1] ?? 'px'}` };
            if (value === null) {
              delete newStyles.minHeight;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>最大宽度</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginTop: '12px' }}
      >
        <InputNumber
          size="small"
          addonAfter={selectAfter(maxWidth[1] as string | undefined, (v) => {
            setMaxWidth([(maxWidth[0] as number) ?? 0, v]);
            setState({
              styles: { ...styles, maxWidth: `${maxWidth[0] ?? 0}${v}` },
            });
          })}
          value={maxWidth ? (maxWidth[0] as number) : 0}
          onChange={(value) => {
            setMaxWidth([value as number, maxWidth[1] ?? 'px']);
            const newStyles: React.CSSProperties = { ...styles, maxWidth: `${value}${maxWidth[1] ?? 'px'}` };
            if (value === null) {
              delete newStyles.maxWidth;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>最大高度</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginTop: '12px' }}
      >
        <InputNumber
          size="small"
          addonAfter={selectAfter(maxHeight[1] as string | undefined, (v) => {
            setMaxHeight([(maxHeight[0] as number) ?? 0, v]);
            setState({
              styles: { ...styles, maxHeight: `${maxHeight[0] ?? 0}${v}` },
            });
          })}
          value={maxHeight ? (maxHeight[0] as number) : 0}
          onChange={(value) => {
            setMaxHeight([value as number, maxHeight[1] ?? 'px']);
            const newStyles: React.CSSProperties = { ...styles, maxHeight: `${value}${maxHeight[1] ?? 'px'}` };
            if (value === null) {
              delete newStyles.maxHeight;
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
