import React from 'react';
import { EditorContext } from '../../hook';
import { Button, Form, Input } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { arrayToObject, filterStyles, objectToArray } from './utils';

export interface OthersEditorHandler {
  clearState: () => void;
}

const OthersEditor = React.forwardRef((props, ref: React.ForwardedRef<OthersEditorHandler>) => {
  const { styles, setState } = React.useContext(EditorContext);
  const [otherStyles, setOtherStyles] = React.useState(objectToArray(filterStyles(styles)));

  React.useImperativeHandle(ref, () => ({
    clearState: () => {
      const newStyles = { ...styles } as Record<string, string>;
      otherStyles.forEach((item) => {
        delete newStyles[item.key];
      });
      setState({ styles: newStyles });
      setOtherStyles([]);
    },
  }));

  const onChangeStyle = (id: number, type: 'key' | 'value', value: string) => {
    const newOtherStyles = [...otherStyles];
    newOtherStyles[id][type] = value;
    setOtherStyles(newOtherStyles);
    if (newOtherStyles[id].value) {
      const stylesObject = arrayToObject(newOtherStyles);
      setState({ styles: { ...styles, ...stylesObject } });
    }
  };

  return (
    <div>
      {otherStyles.map((item, index) => {
        return (
          <Form.Item
            key={index}
            label={
              <Input
                size="small"
                placeholder="样式名"
                value={item.key}
                onChange={(e) => onChangeStyle(item.id, 'key', e.target.value)}
              />
            }
            labelCol={{ span: 8 }}
            labelAlign="left"
            wrapperCol={{ span: 16 }}
            style={{ marginBottom: '8px' }}
          >
            <div style={{ display: 'flex' }}>
              <Input
                value={item.value}
                onChange={(e) => onChangeStyle(item.id, 'value', e.target.value)}
                placeholder="样式值"
                style={{ marginRight: 5 }}
                size="small"
              />
              <Button
                style={{ marginRight: 5 }}
                shape="circle"
                size="small"
                icon={<PlusCircleOutlined />}
                onClick={() => {
                  setOtherStyles([...otherStyles, { id: otherStyles.length, key: '', value: '' }]);
                }}
              />
              <Button
                shape="circle"
                size="small"
                icon={<MinusCircleOutlined />}
                onClick={() => {
                  const newOtherStyles = [...otherStyles];
                  newOtherStyles.splice(item.id, 1);
                  setOtherStyles([...newOtherStyles]);
                  const stylesObject = arrayToObject(newOtherStyles);
                  const newStyles = { ...styles, ...stylesObject } as Record<string, string>;
                  delete newStyles[item.key];
                  setState({ styles: newStyles });
                }}
              />
            </div>
          </Form.Item>
        );
      })}
      <Button
        size="small"
        icon={<PlusOutlined />}
        onClick={() => {
          setOtherStyles([...otherStyles, { id: otherStyles.length, key: '', value: '' }]);
        }}
      >
        添加
      </Button>
    </div>
  );
});

OthersEditor.displayName = 'OthersEditor';
export default OthersEditor;
