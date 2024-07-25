import React from 'react';
import { Col, Form, InputNumber, Radio, Row, Select, Slider } from 'antd';

import './index.less';
import {
  BorderBottomOutlined,
  BorderLeftOutlined,
  BorderOuterOutlined,
  BorderRightOutlined,
  BorderTopOutlined,
  DashOutlined,
  LineOutlined,
  SmallDashOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { isEmptyObject } from '../../utils/number';
import { EditorContext } from '../../hook';
import UnionBorderRadius from './icons/unionborder';
import IndependentRadius from './icons/independent';
import RSEColorPicker from '../../components/color-picker';

const prefixCls = 'rse-border';

type BorderType = 'border' | 'borderTop' | 'borderBottom' | 'borderLeft' | 'borderRight';

interface BorderStyle {
  borderWidth?: number;
  borderStyle?: 'dashed' | 'solid' | 'dotted';
  borderColor?: string;
}

export interface BorderStylesEditorHandler {
  clearState: () => void;
}

const borderStyleOptions = [
  {
    label: (
      <div>
        <LineOutlined />
        <span className={`${prefixCls}-option-label`}>solid</span>
      </div>
    ),
    value: 'solid',
  },
  {
    label: (
      <div>
        <DashOutlined />
        <span className={`${prefixCls}-option-label`}>dashed</span>
      </div>
    ),
    value: 'dashed',
  },
  {
    label: (
      <div>
        <SmallDashOutlined />
        <span className={`${prefixCls}-option-label`}>dotted</span>
      </div>
    ),
    value: 'dotted',
  },
  // {
  //   label: (
  //     <div>
  //       <PauseOutlined style={{ transform: 'rotate(90deg)' }} />
  //       <span className={`${prefixCls}-option-label`}>double</span>
  //     </div>
  //   ),
  //   value: 'double',
  // },
];

const getDefaultBorderKey = (styles: React.CSSProperties) => {
  if (styles.border) {
    return 'border';
  }
  if (styles.borderTop) {
    return 'borderTop';
  }
  if (styles.borderBottom) {
    return 'borderBottom';
  }
  if (styles.borderLeft) {
    return 'borderLeft';
  }
  if (styles.borderRight) {
    return 'borderRight';
  }
  return void 0;
};

const stringToBorder = (value: string) => {
  const values = value.split(' ');
  const borderStyle: BorderStyle = {};
  for (const value of values) {
    if (value.startsWith('#')) {
      borderStyle.borderColor = value;
    } else if (value.endsWith('px')) {
      borderStyle.borderWidth = Number(value.replace('px', ''));
    } else if (['solid', 'dashed', 'dotted'].includes(value)) {
      borderStyle.borderStyle = value as BorderStyle['borderStyle'];
    }
  }
  return borderStyle;
};

const borderRadiusToType = (value: string | number) => {
  if (typeof value === 'number') {
    return 'united';
  }
  const values = value.split(' ');
  if (values.length <= 1) {
    return 'united';
  }
  return 'independent';
};

const borderRadiusFormat = (value: string | number, defaultValue: number | null) => {
  if (typeof value === 'number') {
    return value;
  }
  if (value === '') {
    return defaultValue ?? null;
  }
  const values = value.split(' ');
  if (values.length === 1) {
    return Number(values[0].replace('px', '')) ?? null;
  }
  if (values.length === 4) {
    return [
      Number(values[0].replace('px', '')) ?? null,
      Number(values[1].replace('px', '')) ?? null,
      Number(values[2].replace('px', '')) ?? null,
      Number(values[3].replace('px', '')) ?? null,
    ];
  }
  return defaultValue;
};

const BorderStylesEditor = React.forwardRef((props, ref: React.ForwardedRef<BorderStylesEditorHandler>) => {
  const { styles, setState } = React.useContext(EditorContext);
  const [borderKey, setBorderKey] = React.useState(getDefaultBorderKey(styles) as BorderType | undefined);
  const [border, setBorder] = React.useState(stringToBorder((styles.border as string) ?? ''));
  const [borderTop, setBorderTop] = React.useState(stringToBorder((styles.borderTop as string) ?? ''));
  const [borderLeft, setBorderLeft] = React.useState(stringToBorder((styles.borderLeft as string) ?? ''));
  const [borderRight, setBorderRight] = React.useState(stringToBorder((styles.borderRight as string) ?? ''));
  const [borderBottom, setBorderBottom] = React.useState(stringToBorder((styles.borderBottom as string) ?? ''));
  const [borderRadiusType, setBorderRadiusType] = React.useState(borderRadiusToType(styles.borderRadius ?? ''));
  const [borderRadius, setBorderRadius] = React.useState(borderRadiusFormat(styles.borderRadius ?? '', null));

  React.useEffect(() => {
    setState({
      styles: {
        ...styles,
        borderRadius: Array.isArray(borderRadius) ? `${borderRadius.join('px ').trim()}px` : `${borderRadius ?? 0}px`,
      },
    });
  }, [borderRadius]);

  const getBorderStyleByType = (type: BorderType) => {
    if (type === 'border') {
      return border;
    }
    if (type === 'borderTop') {
      return borderTop;
    }
    if (type === 'borderLeft') {
      return borderLeft;
    }
    if (type === 'borderRight') {
      return borderRight;
    }
    if (type === 'borderBottom') {
      return borderBottom;
    }
  };

  const setBorderStyleByType = (type: BorderType, currentStyle: BorderStyle) => {
    const newStyles = { ...styles };
    const borderStyleValue = `${currentStyle.borderWidth ?? 0}px ${currentStyle.borderStyle ?? ''} ${
      currentStyle.borderColor ?? ''
    }`;
    if (type === 'border') {
      newStyles.border = borderStyleValue;
      setBorder({ ...currentStyle });
    } else if (type === 'borderTop') {
      newStyles.borderTop = borderStyleValue;
      setBorderTop({ ...currentStyle });
    } else if (type === 'borderLeft') {
      newStyles.borderLeft = borderStyleValue;
      setBorderLeft({ ...currentStyle });
    } else if (type === 'borderRight') {
      newStyles.borderRight = borderStyleValue;
      setBorderRight({ ...currentStyle });
    } else if (type === 'borderBottom') {
      newStyles.borderBottom = borderStyleValue;
      setBorderBottom({ ...currentStyle });
    }
    setState({ styles: newStyles });
  };

  React.useImperativeHandle(ref, () => ({
    clearState: () => {
      setBorderKey(void 0);
      setBorderStyleByType('border', {});
      setBorderStyleByType('borderBottom', {});
      setBorderStyleByType('borderLeft', {});
      setBorderStyleByType('borderRight', {});
      setBorderStyleByType('borderTop', {});
      setBorderRadiusType('united');
      setBorderRadius(null);
      const newStyles = { ...styles };
      delete newStyles.border;
      delete newStyles.borderTop;
      delete newStyles.borderBottom;
      delete newStyles.borderLeft;
      delete newStyles.borderRight;
      delete newStyles.borderRadius;
      setState({ styles: newStyles });
    },
  }));

  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${prefixCls}-style-container`}>
        <div className={`${prefixCls}-key-selector`}>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <BorderTopOutlined
                className={classNames(`${prefixCls}-key-selector-icon`, {
                  checked: borderKey === 'borderTop',
                  valued: !isEmptyObject(borderTop as Record<string, unknown>),
                })}
                onClick={() => setBorderKey(borderKey === 'borderTop' ? void 0 : 'borderTop')}
              />
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row>
            <Col span={8}>
              <BorderLeftOutlined
                className={classNames(`${prefixCls}-key-selector-icon`, {
                  checked: borderKey === 'borderLeft',
                  valued: !isEmptyObject(borderLeft as Record<string, unknown>),
                })}
                onClick={() => setBorderKey(borderKey === 'borderLeft' ? void 0 : 'borderLeft')}
              />
            </Col>
            <Col span={8}>
              <BorderOuterOutlined
                className={classNames(`${prefixCls}-key-selector-icon`, {
                  checked: borderKey === 'border',
                  valued: !isEmptyObject(border as Record<string, unknown>),
                })}
                onClick={() => setBorderKey(borderKey === 'border' ? void 0 : 'border')}
              />
            </Col>
            <Col span={8}>
              <BorderRightOutlined
                className={classNames(`${prefixCls}-key-selector-icon`, {
                  checked: borderKey === 'borderRight',
                  valued: !isEmptyObject(borderRight as Record<string, unknown>),
                })}
                onClick={() => setBorderKey(borderKey === 'borderRight' ? void 0 : 'borderRight')}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <BorderBottomOutlined
                className={classNames(`${prefixCls}-key-selector-icon`, {
                  checked: borderKey === 'borderBottom',
                  valued: !isEmptyObject(borderBottom as Record<string, unknown>),
                })}
                onClick={() => setBorderKey(borderKey === 'borderBottom' ? void 0 : 'borderBottom')}
              />
            </Col>
            <Col span={8}></Col>
          </Row>
        </div>
        {borderKey && (
          <div className={`${prefixCls}-style-editor`}>
            <Form.Item
              label={<span className={`${prefixCls}-style-editor-label`}>宽度</span>}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              className="no-margin"
            >
              <InputNumber
                size="small"
                addonAfter="px"
                min={0}
                max={100}
                value={getBorderStyleByType(borderKey)?.borderWidth}
                onChange={(value) => {
                  if (!Number.isNaN(value)) {
                    setBorderStyleByType(borderKey, {
                      ...getBorderStyleByType(borderKey),
                      borderWidth: value ?? void 0,
                    });
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              label={<span className={`${prefixCls}-style-editor-label`}>颜色</span>}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              className="no-margin"
            >
              <RSEColorPicker
                value={getBorderStyleByType(borderKey)?.borderColor ?? ''}
                onChange={(value) => {
                  setBorderStyleByType(borderKey, {
                    ...getBorderStyleByType(borderKey),
                    borderColor: value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label={<span className={`${prefixCls}-style-editor-label`}>样式</span>}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              className="no-margin"
            >
              <Select
                size="small"
                options={borderStyleOptions}
                value={getBorderStyleByType(borderKey)?.borderStyle}
                onChange={(value) => {
                  setBorderStyleByType(borderKey, {
                    ...getBorderStyleByType(borderKey),
                    borderStyle: value,
                  });
                }}
              />
            </Form.Item>
          </div>
        )}
      </div>
      <div style={{ marginTop: '8px' }}>
        <Form.Item
          label={<span className={`${prefixCls}-style-editor-label`}>圆角设置</span>}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
          style={{ marginBottom: '8px' }}
        >
          <Radio.Group
            size="small"
            value={borderRadiusType}
            onChange={(e) => {
              setBorderRadiusType(e.target.value);
              setBorderRadius(e.target.value === 'united' ? 0 : [0, 0, 0, 0]);
            }}
          >
            <Radio.Button value="united">
              <div className={`${prefixCls}-border-radius-label`}>
                <UnionBorderRadius />
                <span>统一设置</span>
              </div>
            </Radio.Button>
            <Radio.Button value="independent">
              <div className={`${prefixCls}-border-radius-label`}>
                <IndependentRadius />
                <span>独立设置</span>
              </div>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        {borderRadiusType === 'united' ? (
          <Form.Item
            label={<span className={`${prefixCls}-style-editor-label`}>圆角大小</span>}
            labelCol={{ span: 6 }}
            labelAlign="left"
            wrapperCol={{ span: 18 }}
            className="no-margin"
          >
            <Row>
              <Col span={14}>
                <Slider min={0} max={999} value={borderRadius as number} onChange={(v) => setBorderRadius(v)} />
              </Col>
              <Col span={10}>
                <InputNumber
                  size="small"
                  min={0}
                  max={999}
                  value={borderRadius as number}
                  onChange={(v) => setBorderRadius(v ?? 0)}
                  style={{ marginLeft: '6px', marginTop: '4px' }}
                  addonAfter="px"
                />
              </Col>
            </Row>
          </Form.Item>
        ) : (
          <div>
            <div className={`${prefixCls}-border-radius-row`}>
              <InputNumber
                value={(borderRadius as number[])[0]}
                onChange={(v) => {
                  const newBorderRadius = !Array.isArray(borderRadius) ? [0, 0, 0, 0] : borderRadius;
                  newBorderRadius[0] = v ?? 0;
                  setBorderRadius([...newBorderRadius]);
                }}
                style={{ width: 88 }}
                size="small"
                min={0}
                max={999}
                addonAfter="px"
              />
              <InputNumber
                value={(borderRadius as number[])[1]}
                onChange={(v) => {
                  const newBorderRadius = !Array.isArray(borderRadius) ? [0, 0, 0, 0] : borderRadius;
                  newBorderRadius[1] = v ?? 0;
                  setBorderRadius([...newBorderRadius]);
                }}
                style={{ width: 88 }}
                size="small"
                min={0}
                max={999}
                addonAfter="px"
              />
            </div>
            <Row className={`${prefixCls}-border-radius-center`}>
              <div
                className={`${prefixCls}-border-radius-demo`}
                style={{
                  borderTopLeftRadius: (borderRadius as number[])[0],
                  borderTopRightRadius: (borderRadius as number[])[1],
                  borderBottomLeftRadius: (borderRadius as number[])[3],
                  borderBottomRightRadius: (borderRadius as number[])[2],
                }}
              ></div>
            </Row>
            <div className={`${prefixCls}-border-radius-row`}>
              <InputNumber
                value={(borderRadius as number[])[3]}
                onChange={(v) => {
                  const newBorderRadius = !Array.isArray(borderRadius) ? [0, 0, 0, 0] : borderRadius;
                  newBorderRadius[3] = v ?? 0;
                  setBorderRadius([...newBorderRadius]);
                }}
                style={{ width: 88 }}
                size="small"
                min={0}
                max={999}
                addonAfter="px"
              />
              <InputNumber
                value={(borderRadius as number[])[2]}
                onChange={(v) => {
                  const newBorderRadius = !Array.isArray(borderRadius) ? [0, 0, 0, 0] : borderRadius;
                  newBorderRadius[2] = v ?? 0;
                  setBorderRadius([...newBorderRadius]);
                }}
                style={{ width: 88 }}
                size="small"
                min={0}
                max={999}
                addonAfter="px"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

BorderStylesEditor.displayName = 'BorderStylesEditor';
export default BorderStylesEditor;
