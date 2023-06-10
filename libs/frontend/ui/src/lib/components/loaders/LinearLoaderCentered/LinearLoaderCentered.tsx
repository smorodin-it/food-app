import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import {
  FullBlockCenterLayout,
  FullScreenCenterLayout,
} from '../../../layouts';

interface LinearLoaderCenteredProps {
  layout: 'centered' | 'fullScreen';
}

export const LinearLoaderCentered = (
  props: LinearLoaderCenteredProps
): JSX.Element => {
  const Component =
    props.layout === 'centered'
      ? FullBlockCenterLayout
      : FullScreenCenterLayout;

  return (
    <Component>
      <div>Загрузка...</div>
      <Box sx={{ width: '65%' }}>
        <LinearProgress />
      </Box>
    </Component>
  );
};

LinearLoaderCentered.defaultProps = {
  layout: 'centered',
};
