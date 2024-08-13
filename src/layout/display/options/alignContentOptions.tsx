import React from 'react';
import CenterOutlined from '../icons/center';
import FlexStartOutlined from '../icons/flex-start';
import FlexEndOutlined from '../icons/flex-end';
import SpaceAroundOutlined from '../icons/space-around';
import SpaceBetweenOutlined from '../icons/space-between';
import ColumnStretchOutlined from '../icons/column-stretch';

export default [
  {
    label: '居中',
    value: 'center',
    icon: <CenterOutlined />,
  },
  {
    label: '左对齐',
    value: 'flex-start',
    icon: <FlexStartOutlined />,
  },
  {
    label: '右对齐',
    value: 'flex-end',
    icon: <FlexEndOutlined />,
  },
  {
    label: '均匀分配',
    value: 'space-around',
    icon: <SpaceAroundOutlined />,
  },
  {
    label: '两端对齐',
    value: 'space-between',
    icon: <SpaceBetweenOutlined />,
  },
  {
    label: '拉伸',
    value: 'stretch',
    icon: <ColumnStretchOutlined />,
  },
];
