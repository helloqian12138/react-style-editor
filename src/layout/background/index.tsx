import React from 'react';
import { EditorContext } from '../../hook';
import RSEColorPicker from '../../components/color-picker';
import { Button, Form, Input, Radio, Select } from 'antd';
import backgroundRepeatOptions from './options/backgroundRepeat';
import backgroundPositionOptions from './options/backgroundPosition';
import { RedoOutlined } from '@ant-design/icons';

export interface BackgroundEditorHandler {
  clearState: () => void;
}

const prefixCls = 'rse-background';

function formatBackgroundPosition(position: string | undefined): (string | undefined)[] {
  if (position) {
    const [x, y] = position.split(' ');
    if (y === undefined) {
      return [x, x];
    }
    return [x, y];
  }
  return [void 0, void 0];
}

const BackgroundEditor = React.forwardRef((props, ref: React.ForwardedRef<BackgroundEditorHandler>) => {
  const { styles, setState } = React.useContext(EditorContext);
  const [backgroundColor, setBackgroundColor] = React.useState(styles.backgroundColor);
  const [backgroundImage, setBackgroundImage] = React.useState(styles.backgroundImage);
  const [backgroundRepeat, setBackgroundRepeat] = React.useState(styles.backgroundRepeat);
  const [backgroundPosition, setBackgroundPosition] = React.useState(
    formatBackgroundPosition(styles.backgroundPosition as string | undefined),
  );

  React.useImperativeHandle(ref, () => ({
    clearState: () => {
      setBackgroundColor('');
      setBackgroundImage('');
      setBackgroundRepeat(void 0);
      setBackgroundPosition([void 0, void 0]);
      const newStyles = { ...styles };
      delete newStyles.backgroundColor;
      delete newStyles.backgroundImage;
      delete newStyles.backgroundRepeat;
      delete newStyles.backgroundPosition;
      setState({ styles: newStyles });
    },
  }));

  return (
    <div>
      <Form.Item
        label={<span className={'rse-text-style-editor-label'}>背景颜色</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        style={{ marginBottom: '8px' }}
      >
        <RSEColorPicker
          value={backgroundColor as string}
          onChange={(value) => {
            setBackgroundColor(value);
            const newStyles: React.CSSProperties = { ...styles, backgroundColor: value };
            if (value === null || value === '' || value === void 0) {
              delete newStyles.backgroundColor;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={'rse-text-style-editor-label'}>背景图片</span>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        style={{ marginBottom: '8px' }}
      >
        <Input
          placeholder="示例: url(path/to/image)"
          size="small"
          value={backgroundImage as string}
          onChange={(e) => {
            const value = e.target.value;
            setBackgroundImage(value);
            const newStyles: React.CSSProperties = { ...styles, backgroundImage: value };
            if (value === null || value === '' || value === void 0) {
              delete newStyles.backgroundImage;
            }
            setState({
              styles: newStyles,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label={<span className={`rse-text--style-editor-label`}>背景重复</span>}
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 18 }}
        style={{ marginBottom: '8px' }}
      >
        <Radio.Group size="small" value={backgroundRepeat}>
          {backgroundRepeatOptions.map((option, i) => (
            <Radio.Button
              key={i}
              value={option.value}
              onClick={() => {
                const value = backgroundRepeat === option.value ? void 0 : option.value;
                setBackgroundRepeat(value);
                const newStyles: React.CSSProperties = { ...styles, backgroundRepeat: value };
                if (value === void 0) {
                  delete newStyles.backgroundRepeat;
                }
                setState({
                  styles: newStyles,
                });
              }}
            >
              <div className={`${prefixCls}-label`}>
                <span>{option.label}</span>
              </div>
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={<span className={`rse-text--style-editor-label`}>背景定位</span>}
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 18 }}
        style={{ marginBottom: '8px' }}
      >
        <div style={{ display: 'flex' }}>
          <Select
            size="small"
            style={{ marginRight: '8px' }}
            placeholder="垂直方向"
            options={backgroundPositionOptions}
            value={backgroundPosition[0]}
            onChange={(value) => {
              const newPosition = [value, backgroundPosition[1]];
              setBackgroundPosition(newPosition);
              const newStyles = { ...styles, backgroundPosition: newPosition.join(' ') };
              setState({ styles: newStyles });
            }}
          ></Select>
          <Select
            size="small"
            style={{ marginRight: '8px' }}
            placeholder="水平方向"
            options={backgroundPositionOptions}
            value={backgroundPosition[1]}
            onChange={(value) => {
              const newPosition = [backgroundPosition[0], value];
              setBackgroundPosition(newPosition);
              const newStyles = { ...styles, backgroundPosition: newPosition.join(' ') };
              setState({ styles: newStyles });
            }}
          ></Select>
          <Button
            size="small"
            shape="circle"
            icon={<RedoOutlined />}
            onClick={() => {
              const newPosition = [void 0, void 0];
              setBackgroundPosition(newPosition);
              const newStyles = { ...styles, backgroundPosition: void 0 };
              delete newStyles.backgroundPosition;
              setState({ styles: newStyles });
            }}
          />
        </div>
      </Form.Item>
    </div>
  );
});

BackgroundEditor.displayName = 'BackgroundEditor';
export default BackgroundEditor;
