import React from 'react';
import RowOutlined from '../icons/row';
import ColumnOutlined from '../icons/column';
import RowReverseOutlined from '../icons/row-reverse';
import ColumnReverseOutlined from '../icons/column-reverse';

export default [
  {
    label: '行',
    value: 'row',
    icon: <RowOutlined />,
  },
  {
    label: '列',
    value: 'column',
    icon: <ColumnOutlined />,
  },
  {
    label: '行逆向',
    value: 'row-reverse',
    icon: <RowReverseOutlined />,
  },
  {
    label: '列逆向',
    value: 'column-reverse',
    icon: <ColumnReverseOutlined />,
  },
];
