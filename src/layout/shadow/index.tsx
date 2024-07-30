import { Col, Form, InputNumber, Radio, Row } from 'antd';
import React from 'react';
import RSEColorPicker from '../../components/color-picker';
import { EditorContext } from '../../hook';
import { stringToNumber } from '../../utils/number';
import OutSetOutlined from './icons/outset';
import InSetOutlined from './icons/inset';

import './index.less';

export interface BoxShadowEditorHandler {
  clearState: () => void;
}

export interface BoxShadowValue {
  color: string;
  offsetX: number | undefined;
  offsetY: number | undefined;
  blurRadius: number | undefined;
  spreadRadius: number | undefined;
  type: 'outset' | 'inset';
}

const prefixCls: string = 'rse-box-shadow';

const defaultBoxShadowValue: BoxShadowValue = {
  color: '',
  offsetX: void 0,
  offsetY: void 0,
  blurRadius: void 0,
  spreadRadius: void 0,
  type: 'outset',
};

const parseBoxShadow = (boxShadow: string | undefined) => {
  if (typeof boxShadow === 'string') {
    const boxShadowRegex = /(\d+px|\d+%|rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*\d+\.?\d*)?\)|[a-zA-Z]+)/g;
    const matches = boxShadow.match(boxShadowRegex);
    if (!matches) {
      return {
        ...defaultBoxShadowValue,
      };
    }

    const result = {
      ...defaultBoxShadowValue,
    };

    let index = 0;
    if (matches.includes('inset')) {
      result.type = 'inset';
      index++;
    }

    result.offsetX = stringToNumber(matches[index++] as string, 'px') || 0;
    result.offsetY = stringToNumber(matches[index++] as string, 'px') || 0;
    result.blurRadius = stringToNumber(matches[index++] as string, 'px') || 0;
    result.spreadRadius = stringToNumber(matches[index++] as string, 'px') || 0;
    result.color = matches[index] || '';

    return result;
  }
  return {
    ...defaultBoxShadowValue,
  };
};

const BoxShadowEditor = React.forwardRef((props, ref: React.ForwardedRef<BoxShadowEditorHandler>) => {
  const { styles, setState } = React.useContext(EditorContext);
  const boxShadow = parseBoxShadow(styles.boxShadow);
  const [type, setType] = React.useState(boxShadow.type);
  const [offsetX, setOffsetX] = React.useState(boxShadow.offsetX);
  const [offsetY, setOffsetY] = React.useState(boxShadow.offsetY);
  const [blurRadius, setBlurRadius] = React.useState(boxShadow.blurRadius);
  const [spreadRadius, setSpreadRadius] = React.useState(boxShadow.spreadRadius);
  const [boxShadowColor, setBoxShadowColor] = React.useState(boxShadow.color);

  React.useImperativeHandle(ref, () => ({
    clearState: () => {
      setOffsetX(void 0);
      setOffsetY(void 0);
      setBlurRadius(void 0);
      setSpreadRadius(void 0);
      setType('outset');
      setBoxShadowColor('');
      const newStyles = { ...styles };
      delete newStyles.boxShadow;
      setState({ styles: newStyles });
    },
  }));
  return (
    <div>
      <Form.Item
        label={<span>阴影类型</span>}
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 18 }}
        style={{ marginBottom: '8px' }}
      >
        <Radio.Group
          size="small"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <Radio.Button value="outset">
            <div className={`${prefixCls}-label`}>
              <OutSetOutlined width={14} height={14} style={{ marginRight: 8 }} />
              <span>外阴影</span>
            </div>
          </Radio.Button>
          <Radio.Button value="inset">
            <div className={`${prefixCls}-label`}>
              <InSetOutlined style={{ marginRight: 8 }} />
              <span>内阴影</span>
            </div>
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Row>
        <Col span={12}>
          <Form.Item
            label={<span className={`${prefixCls}-small-label`}>X</span>}
            labelCol={{ span: 6 }}
            labelAlign="right"
            wrapperCol={{ span: 18 }}
            style={{ marginBottom: '8px' }}
          >
            <InputNumber
              size="small"
              addonAfter="px"
              value={offsetX}
              onChange={(value) => {
                setOffsetX(value as number);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className={`${prefixCls}-small-label`}>Y</span>}
            labelCol={{ span: 6 }}
            labelAlign="right"
            wrapperCol={{ span: 18 }}
            style={{ marginBottom: '8px' }}
          >
            <InputNumber
              size="small"
              addonAfter="px"
              value={offsetY}
              onChange={(value) => {
                setOffsetY(value as number);
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            label={<span className={`${prefixCls}-small-label`}>模糊</span>}
            labelCol={{ span: 6 }}
            labelAlign="right"
            wrapperCol={{ span: 18 }}
            style={{ marginBottom: '8px' }}
          >
            <InputNumber
              size="small"
              addonAfter="px"
              value={blurRadius}
              onChange={(value) => {
                setBlurRadius(value as number);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className={`${prefixCls}-small-label`}>拓展</span>}
            labelCol={{ span: 6 }}
            labelAlign="right"
            wrapperCol={{ span: 18 }}
            style={{ marginBottom: '8px' }}
          >
            <InputNumber
              size="small"
              addonAfter="px"
              value={spreadRadius}
              onChange={(value) => {
                setSpreadRadius(value as number);
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={<span className={'rse-text-style-editor-label'}>阴影颜色</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        style={{ marginBottom: '8px' }}
      >
        <RSEColorPicker
          value={boxShadowColor as string}
          onChange={(value) => {
            setBoxShadowColor(value);
          }}
        />
      </Form.Item>
    </div>
  );
});

BoxShadowEditor.displayName = 'Editor';
export default BoxShadowEditor;
