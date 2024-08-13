import React from 'react';
import ColumnStretchOutlined from '../icons/column-stretch';
import BaselineOutlined from '../icons/baseline';
import ColumnCenterOutlined from '../icons/column-center';
import ColumnStartOutlined from '../icons/column-start';
import ColumnEndOutlined from '../icons/column-end';

export default [
  {
    label: '居中',
    value: 'center',
    icon: <ColumnCenterOutlined />,
  },
  {
    label: '顶部对齐',
    value: 'flex-start',
    icon: <ColumnStartOutlined />,
  },
  {
    label: '底部对齐',
    value: 'flex-end',
    icon: <ColumnEndOutlined />,
  },
  {
    label: '拉伸',
    value: 'stretch',
    icon: <ColumnStretchOutlined />,
  },
  {
    label: '文字底部对齐',
    value: 'baseline',
    icon: <BaselineOutlined />,
  },
];
