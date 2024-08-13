import React from 'react';
import { EditorContext } from '../../hook';
import { Form, Radio, Select, Tooltip } from 'antd';
import displayOptions from './options/displayOptions';
import flexDirectionOptions from './options/flexDirection';
import flexWrapOptions from './options/flexWrapOptions';
import alignContentOptions from './options/alignContentOptions';
import justifyContentOptions from './options/justifyContentOptions';
import alignItemsOptions from './options/alignItemsOptions';

export interface DisplayEditorHandler {
  clearState: () => void;
}

const prefixCls = 'rse-box';

const DisplayEditor = React.forwardRef((props, ref: React.ForwardedRef<DisplayEditorHandler>) => {
  const { styles, setState } = React.useContext(EditorContext);
  const [display, setDislay] = React.useState(styles.display);
  const [flexDirection, setFlexDirection] = React.useState(styles.flexDirection);
  const [flexWrap, setFlexWrap] = React.useState(styles.flexWrap);
  const [alignContent, setAlignContent] = React.useState(styles.alignContent);
  const [justifyContent, setJustifyContent] = React.useState(styles.justifyContent);
  const [alignItems, setAlignItems] = React.useState(styles.alignItems);

  React.useImperativeHandle(ref, () => ({
    clearState: () => {
      setDislay(void 0);
      setFlexDirection(void 0);
      setFlexWrap(void 0);
      setAlignContent(void 0);
      setJustifyContent(void 0);
      setAlignItems(void 0);
      const newStyles = { ...styles };
      delete newStyles.display;
      delete newStyles.flexDirection;
      delete newStyles.flexWrap;
      delete newStyles.alignContent;
      delete newStyles.justifyContent;
      delete newStyles.alignItems;
      setState({ styles: newStyles });
    },
  }));

  const transform = React.useCallback(
    (value: string) => {
      if (value === 'stretch') {
        return flexDirection?.startsWith('column') ? void 0 : 'rotate(90deg) translate(-2px, 2px)';
      }
      if (value === 'baseline') {
        return void 0;
      }
      return flexDirection?.startsWith('column') ? 'rotate(90deg) translate(-2px, 2px)' : void 0;
    },
    [flexDirection],
  );

  return (
    <div>
      <Form.Item
        label={<span className={`${prefixCls}-style-editor-label`}>布局类型</span>}
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 18 }}
        style={{ marginBottom: '8px' }}
      >
        <Select
          size="small"
          allowClear
          options={displayOptions}
          value={display}
          onChange={(value) => {
            setDislay(value);
            const newStyles = { ...styles };
            newStyles.display = value;
            if (!value) {
              delete newStyles.display;
            }
            setState({ styles: newStyles });
          }}
        />
      </Form.Item>
      {display === 'flex' && (
        <>
          <Form.Item
            label={<span className={`${prefixCls}-style-editor-label`}>排列方向</span>}
            labelCol={{ span: 6 }}
            labelAlign="left"
            wrapperCol={{ span: 18 }}
            style={{ marginBottom: '8px' }}
          >
            <Radio.Group size="small" style={{ display: 'flex', marginRight: '8px' }} value={flexDirection}>
              {flexDirectionOptions.map((item, index) => (
                <Tooltip key={index} title={item.label}>
                  <Radio.Button
                    value={item.value}
                    onClick={() => {
                      const value =
                        flexDirection === item.value ? void 0 : (item.value as React.CSSProperties['flexDirection']);
                      setFlexDirection(value);
                      const newStyles = { ...styles, flexDirection: value };
                      if (!value) {
                        delete newStyles.flexDirection;
                      }
                      setState({ styles: newStyles });
                    }}
                  >
                    <div className={`${prefixCls}-label`}>{item.icon}</div>
                  </Radio.Button>
                </Tooltip>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={<span className={`${prefixCls}-style-editor-label`}>自动换行</span>}
            labelCol={{ span: 6 }}
            labelAlign="left"
            wrapperCol={{ span: 18 }}
            style={{ marginBottom: '8px' }}
          >
            <Radio.Group size="small" style={{ display: 'flex', marginRight: '8px' }} value={flexWrap}>
              {flexWrapOptions.map((item, index) => (
                <Tooltip key={index} title={item.label}>
                  <Radio.Button
                    value={item.value}
                    onClick={() => {
                      const value = flexWrap === item.value ? void 0 : (item.value as React.CSSProperties['flexWrap']);
                      setFlexWrap(value);
                      const newStyles = { ...styles, flexWrap: value };
                      if (!value) {
                        delete newStyles.flexWrap;
                      }
                      setState({ styles: newStyles });
                    }}
                  >
                    <div
                      style={{
                        marginTop: 1,
                        transform: flexDirection?.startsWith('column') ? 'rotate(90deg) translate(-2px, 2px)' : void 0,
                      }}
                    >
                      {item.icon}
                    </div>
                  </Radio.Button>
                </Tooltip>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={
              <span className={`${prefixCls}-style-editor-label`}>
                {flexDirection?.startsWith('column') ? '列' : '行'}间对齐方式
              </span>
            }
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ marginBottom: '8px' }}
          >
            <Radio.Group size="small" style={{ display: 'flex', marginRight: '8px' }} value={alignContent}>
              {alignContentOptions.map((item, index) => (
                <Tooltip key={index} title={item.label}>
                  <Radio.Button
                    value={item.value}
                    onClick={() => {
                      const value =
                        alignContent === item.value ? void 0 : (item.value as React.CSSProperties['alignContent']);
                      setAlignContent(value);
                      const newStyles = { ...styles, alignContent: value };
                      if (!value) {
                        delete newStyles.alignContent;
                      }
                      setState({ styles: newStyles });
                    }}
                  >
                    <div
                      style={{
                        marginTop: 1,
                        transform: flexDirection?.startsWith('column') ? void 0 : 'rotate(90deg) translate(-2px, 2px)',
                      }}
                    >
                      {item.icon}
                    </div>
                  </Radio.Button>
                </Tooltip>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={
              <span className={`${prefixCls}-style-editor-label`}>
                {flexDirection?.startsWith('column') ? '列' : '行'}内对齐方式
              </span>
            }
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ marginBottom: '8px' }}
          >
            <Radio.Group size="small" style={{ display: 'flex', marginRight: '8px' }} value={justifyContent}>
              {justifyContentOptions.map((item, index) => (
                <Tooltip key={index} title={item.label}>
                  <Radio.Button
                    value={item.value}
                    onClick={() => {
                      const value =
                        justifyContent === item.value ? void 0 : (item.value as React.CSSProperties['justifyContent']);
                      setJustifyContent(value);
                      const newStyles = { ...styles, justifyContent: value };
                      if (!value) {
                        delete newStyles.justifyContent;
                      }
                      setState({ styles: newStyles });
                    }}
                  >
                    <div
                      style={{
                        marginTop: 1,
                        transform: flexDirection?.startsWith('column') ? 'rotate(90deg) translate(-2px, 2px)' : void 0,
                      }}
                    >
                      {item.icon}
                    </div>
                  </Radio.Button>
                </Tooltip>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={<span className={`${prefixCls}-style-editor-label`}>纵向对齐</span>}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ marginBottom: '8px' }}
          >
            <Radio.Group size="small" style={{ display: 'flex', marginRight: '8px' }} value={alignItems}>
              {alignItemsOptions.map((item, index) => (
                <Tooltip key={index} title={item.label}>
                  <Radio.Button
                    value={item.value}
                    onClick={() => {
                      const value =
                        alignItems === item.value ? void 0 : (item.value as React.CSSProperties['alignItems']);
                      setAlignItems(value);
                      const newStyles = { ...styles, alignItems: value };
                      if (!value) {
                        delete newStyles.alignItems;
                      }
                      setState({ styles: newStyles });
                    }}
                  >
                    <div
                      style={{
                        marginTop: 1,
                        transform: transform(item.value),
                      }}
                    >
                      {item.icon}
                    </div>
                  </Radio.Button>
                </Tooltip>
              ))}
            </Radio.Group>
          </Form.Item>
        </>
      )}
    </div>
  );
});

DisplayEditor.displayName = 'DisplayEditor';
export default DisplayEditor;
