import { Button, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import React from 'react';
import { EditorContext } from '../../hook';
import RSEColorPicker from '../../components/color-picker';
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
} from '@ant-design/icons';
import Overline from './icons/overline';

import './index.less';
import NoWrapOutlined from './icons/nowrap';
import WrapOutlined from './icons/wrap';
import { parseValueWithDm, stringToNumber } from '../../utils/number';

export interface TextStylesEditorHandler {
  clearState: () => void;
}

const prefixCls = 'rse-text';

function formatDecoration(value: string | undefined): (string | undefined)[] {
  if (typeof value === 'string') {
    let decorationLine: 'overline' | 'underline' | 'strikethrough' | undefined;
    let decorationColor: string | undefined;
    const parts = value.split(' ');
    parts.map((item) => {
      if (['overline', 'underline', 'strikethrough'].includes(item)) {
        decorationLine = item as 'overline' | 'underline' | 'strikethrough';
      } else {
        decorationColor = item;
      }
    });
    return [decorationLine, decorationColor];
  }
  return [void 0, void 0];
}

function formatFontWeight(fontWeight: string | number | undefined): boolean {
  if (typeof fontWeight === 'string' && fontWeight.startsWith('bold')) {
    return true;
  }
  if (typeof fontWeight === 'number' && fontWeight >= 500) {
    return true;
  }
  return false;
}

const selectAfter = (value: string | null | undefined, onChange: (value: string) => void) => (
  <Select value={value} onChange={onChange} style={{ minWidth: 58 }}>
    <Select.Option value="px">px</Select.Option>
    <Select.Option value="%">%</Select.Option>
  </Select>
);

const TextStylesEditor = React.forwardRef((props, ref: React.ForwardedRef<TextStylesEditorHandler>) => {
  const { styles, setState } = React.useContext(EditorContext);
  const [fontSize, setFontSize] = React.useState(stringToNumber(styles.fontSize as string, 'px') as number | undefined);
  const [color, setColor] = React.useState(styles.color);
  const [textAlign, setTextAlign] = React.useState(styles.textAlign);
  const [fontStyle, setFontStyle] = React.useState(styles.fontStyle);
  const [fontWeight, setFontWeight] = React.useState(formatFontWeight(styles.fontWeight));
  const [whiteSpace, setWhiteSpace] = React.useState(styles.whiteSpace === 'nowrap');
  const [textDecoration, setTextDecoration] = React.useState(formatDecoration(styles.textDecoration as string));
  const [letterSpacing, setLetterSpacing] = React.useState(
    stringToNumber(styles.letterSpacing as string, 'px') as number | undefined,
  );
  const [wordSpacing, setWordSpacing] = React.useState(
    stringToNumber(styles.wordSpacing as string, 'px') as number | undefined,
  );
  const [wordBreak, setWordBreak] = React.useState(styles.wordBreak);
  const [lineHeight, setLineHeight] = React.useState(parseValueWithDm(styles.lineHeight ?? ''));

  React.useImperativeHandle(ref, () => ({
    clearState: () => {
      setFontSize(void 0);
      setColor('');
      setTextAlign(void 0);
      setFontStyle(void 0);
      setFontWeight(false);
      setTextDecoration([void 0, void 0]);
      setLetterSpacing(void 0);
      setWordSpacing(void 0);
      setWhiteSpace(false);
      setWordBreak(void 0);
      setLineHeight([void 0, void 0]);
      const newStyles = { ...styles };
      delete newStyles.fontSize;
      delete newStyles.color;
      delete newStyles.textAlign;
      delete newStyles.fontStyle;
      delete newStyles.textDecoration;
      delete newStyles.fontWeight;
      delete newStyles.letterSpacing;
      delete newStyles.wordSpacing;
      delete newStyles.whiteSpace;
      delete newStyles.wordBreak;
      delete newStyles.lineHeight;
      setState({ styles: newStyles });
    },
  }));

  const handleTextDecoration = (newValue: string | undefined) => {
    setTextDecoration([newValue, textDecoration[1]]);
    const newDecoration = textDecoration[1] ? `${newValue ?? 'none'} ${textDecoration[1]}` : newValue;
    const newStyles: React.CSSProperties = { ...styles, textDecoration: newDecoration };
    if (!newValue && !textDecoration[1]) {
      delete newStyles.textDecoration;
    }
    setState({
      styles: newStyles,
    });
  };

  return (
    <div className={`${prefixCls}-style-editor`}>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>常用样式</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginBottom: '12px' }}
      >
        <div className={`${prefixCls}-text-styles`}>
          <Tooltip title="粗体">
            <Button
              size="small"
              icon={<BoldOutlined />}
              type={fontWeight ? 'primary' : void 0}
              onClick={() => {
                const value = fontWeight ? void 0 : 'bold';
                setFontWeight(!!value);
                const newStyles: React.CSSProperties = { ...styles, fontWeight: value };
                if (!value) {
                  delete newStyles.fontWeight;
                }
                setState({
                  styles: newStyles,
                });
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="斜体">
            <Button
              size="small"
              type={fontStyle ? 'primary' : void 0}
              icon={<ItalicOutlined />}
              onClick={() => {
                const value = fontStyle ? void 0 : 'italic';
                setFontStyle(value);
                const newStyles: React.CSSProperties = { ...styles, fontStyle: value };
                if (!value) {
                  delete newStyles.fontStyle;
                }
                setState({
                  styles: newStyles,
                });
              }}
            ></Button>
          </Tooltip>
          <Tooltip title={`文本${whiteSpace ? '不' : ''}换行`}>
            <Button
              size="small"
              className="icon-center"
              icon={
                whiteSpace ? (
                  <NoWrapOutlined width={12} height={12} style={{ marginTop: 4 }} />
                ) : (
                  <WrapOutlined style={{ marginTop: 2 }} />
                )
              }
              onClick={() => {
                const value = whiteSpace ? void 0 : 'nowrap';
                setWhiteSpace(!!value);
                const newStyles: React.CSSProperties = { ...styles, whiteSpace: value };
                if (!value) {
                  delete newStyles.whiteSpace;
                }
                setState({
                  styles: newStyles,
                });
              }}
            ></Button>
          </Tooltip>
        </div>
      </Form.Item>

      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>字体大小</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginBottom: '12px' }}
      >
        <InputNumber
          size="small"
          addonAfter="px"
          min={12}
          value={fontSize}
          onChange={(value) => {
            setFontSize(value as number);
            const newStyles: React.CSSProperties = { ...styles, fontSize: value ? `${value}px` : void 0 };
            if (value === null) {
              delete newStyles.fontSize;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>字体颜色</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        style={{ marginBottom: '8px' }}
      >
        <RSEColorPicker
          value={color as string}
          onChange={(value) => {
            setColor(value);
            const newStyles: React.CSSProperties = { ...styles, color: value };
            if (value === null || value === '' || value === void 0) {
              delete newStyles.color;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>文本对齐</span>}
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 18 }}
        style={{ marginBottom: '8px' }}
      >
        <Radio.Group
          size="small"
          value={textAlign}
          onChange={(e) => {
            setTextAlign(e.target.value);
            const newStyles: React.CSSProperties = { ...styles, textAlign: e.target.value };
            if (!e.target.value) {
              delete newStyles.textAlign;
            }
            setState({
              styles: newStyles,
            });
          }}
        >
          <Radio.Button value="left">
            <div className={`${prefixCls}-label`}>
              <AlignLeftOutlined />
              <span>左对齐</span>
            </div>
          </Radio.Button>
          <Radio.Button value="center">
            <div className={`${prefixCls}-label`}>
              <AlignCenterOutlined />
              <span>居中</span>
            </div>
          </Radio.Button>
          <Radio.Button value="right">
            <div className={`${prefixCls}-label`}>
              <AlignRightOutlined />
              <span>右对齐</span>
            </div>
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>文字装饰</span>}
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 18 }}
        style={{ marginBottom: '8px' }}
      >
        <div style={{ display: 'flex' }}>
          <Radio.Group size="small" style={{ display: 'flex', marginRight: '8px' }} value={textDecoration[0]}>
            <Radio.Button
              value="underline"
              onClick={() => {
                const value = textDecoration[0] === 'underline' ? void 0 : 'underline';
                handleTextDecoration(value);
              }}
            >
              <div className={`${prefixCls}-label`}>
                <UnderlineOutlined />
              </div>
            </Radio.Button>
            <Radio.Button
              value="strike-through"
              onClick={() => {
                const value = textDecoration[0] === 'strike-through' ? void 0 : 'strike-through';
                handleTextDecoration(value);
              }}
            >
              <div className={`${prefixCls}-label`}>
                <StrikethroughOutlined />
              </div>
            </Radio.Button>
            <Radio.Button
              value="overline"
              onClick={() => {
                const value = textDecoration[0] === 'overline' ? void 0 : 'overline';
                handleTextDecoration(value);
              }}
            >
              <div className={`${prefixCls}-label`} style={{ marginTop: 3, height: 16 }}>
                <Overline />
              </div>
            </Radio.Button>
          </Radio.Group>
          <RSEColorPicker
            value={textDecoration[1] ?? ''}
            onChange={(color) => {
              setTextDecoration([textDecoration[0], color]);
              const newDecoration = color ? `${textDecoration[0] ?? 'none'} ${color}` : textDecoration[0];
              const newStyles: React.CSSProperties = { ...styles, textDecoration: newDecoration };
              if (!color && !textDecoration[1]) {
                delete newStyles.textDecoration;
              }
              setState({
                styles: newStyles,
              });
            }}
          />
        </div>
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
          addonAfter={selectAfter(lineHeight[1] as string | undefined, (v) => {
            setLineHeight([(lineHeight[0] as number) ?? 0, v]);
            setState({
              styles: { ...styles, lineHeight: `${lineHeight[0] ?? 0}${v}` },
            });
          })}
          value={lineHeight ? (lineHeight[0] as number) : 0}
          onChange={(value) => {
            setLineHeight([value as number, lineHeight[1] ?? 'px']);
            const newStyles: React.CSSProperties = { ...styles, lineHeight: `${value}${lineHeight[1] ?? 'px'}` };
            if (value === null) {
              delete newStyles.lineHeight;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>文字间距</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginBottom: '12px' }}
      >
        <InputNumber
          size="small"
          addonAfter="px"
          min={12}
          value={letterSpacing}
          onChange={(value) => {
            setLetterSpacing(value as number);
            const newStyles: React.CSSProperties = { ...styles, letterSpacing: value ? `${value}px` : void 0 };
            if (value === null) {
              delete newStyles.letterSpacing;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>单词间距</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        className="no-margin"
        style={{ marginBottom: '12px' }}
      >
        <InputNumber
          size="small"
          addonAfter="px"
          min={12}
          value={wordSpacing}
          onChange={(value) => {
            setWordSpacing(value as number);
            const newStyles: React.CSSProperties = { ...styles, wordSpacing: value ? `${value}px` : void 0 };
            if (value === null) {
              delete newStyles.wordSpacing;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>换行格式</span>}
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 18 }}
        style={{ marginBottom: '8px' }}
      >
        <Radio.Group size="small" value={wordBreak}>
          <Radio.Button
            value="break-all"
            onClick={() => {
              const value = wordBreak === 'break-all' ? void 0 : 'break-all';
              setWordBreak(value);
              const newStyles: React.CSSProperties = { ...styles, wordBreak: value };
              setState({
                styles: newStyles,
              });
            }}
          >
            <div className={`${prefixCls}-label`}>
              <span>切开单词换行</span>
            </div>
          </Radio.Button>
          <Radio.Button
            value="break-word"
            onClick={() => {
              const value = wordBreak === 'break-word' ? void 0 : 'break-word';
              setWordBreak(value);
              const newStyles: React.CSSProperties = { ...styles, wordBreak: value };
              setState({
                styles: newStyles,
              });
            }}
          >
            <div className={`${prefixCls}-label`}>
              <span>保留单词换行</span>
            </div>
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    </div>
  );
});

TextStylesEditor.displayName = 'TextStylesEditor';

export default TextStylesEditor;
