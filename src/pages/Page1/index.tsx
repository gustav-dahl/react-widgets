import { Button, Stack } from '@mui/material';
import { Widget } from 'components/Widget';
import { WidgetManager } from 'components/WidgetManger';
import { useRef } from 'react';

import { Component1, Component2 } from './components';

export const Page1 = () => {
  const ref: any = useRef();

  return (
    <Stack spacing={5}>
      <Button variant='contained' onClick={() => ref?.current?.reset()}>
        Reset
      </Button>
      <WidgetManager ref={ref}>
        <Widget
          id='window-1'
          title='Window 1'
          width={2}
          height={15}
          x={5}
          y={1}
        >
          <Component1 />
        </Widget>

        <Widget id='window-2' title='Window 2' width={4} height={4}>
          <Component2 />
        </Widget>
      </WidgetManager>
    </Stack>
  );
};
