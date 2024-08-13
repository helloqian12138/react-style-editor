import React from 'react';
import WrapOutlined from '../icons/wrap';
import NoWrapOutlined from '../icons/nowrap';

export default [
  {
    label: '换行',
    value: 'wrap',
    icon: <WrapOutlined width={20} height={20} />,
  },
  {
    label: '不换行',
    value: 'nowrap',
    icon: <NoWrapOutlined width={20} height={20} />,
  },
];
