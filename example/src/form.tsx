import { Button, Form, Radio } from 'antd';
import React from 'react';
import { ClearOutlined } from '@ant-design/icons';

const PropsForm = ({ value: formData, onChange }) => {
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      style={{ width: 400 }}
      initialValues={formData}
    >
      <Form.Item label="尺寸大小" name="size">
        <Radio.Group
          options={[
            { label: '大', value: 'large' },
            { label: '中', value: 'middle' },
            { label: '小', value: 'small' },
          ]}
          optionType="button"
          buttonStyle="solid"
          size="small"
          value={formData.size}
          onChange={(e) => onChange({ size: e.target.value })}
        />
        <Button
          style={{ marginLeft: 5 }}
          size="small"
          shape="circle"
          icon={<ClearOutlined />}
          onClick={() => onChange({ size: void 0 })}
        />
      </Form.Item>
    </Form>
  );
};

export default PropsForm;
