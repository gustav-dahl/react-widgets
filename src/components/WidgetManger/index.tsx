import { Box, SxProps } from '@mui/material';
import { keyBy } from 'lodash/fp';
import React, {
  ReactElement,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import GridLayout, { Layout } from 'react-grid-layout';

import { WidgetProps } from '../Widget';
import { InternalWidget } from './InternalWidget';

interface WidgetManagerProps {
  sx?: SxProps;
  children: ReactElement<WidgetProps>[];
}

export const WidgetManager = React.forwardRef(
  (props: WidgetManagerProps, ref: any) => {
    const { children, sx } = props;

    const reset = () =>
      keyBy(
        'id',
        React.Children.map(children, (x) => x.props)
      );

    const [state, setState] = useState(reset());

    const layout = useMemo(
      () =>
        Object.values(state).map((c) => ({
          i: c.id,
          x: c.x ?? 0,
          y: c.y ?? 0,
          w: c.width ?? 1,
          h: c.height ?? 1,
          static: c.pinned,
        })),
      [state]
    );

    // https://stackoverflow.com/a/61337026
    useImperativeHandle(ref, () => ({
      reset: () => setState(reset()),
    }));

    const handlePin = (id: string) => () => {
      setState({
        ...state,
        [id]: { ...state[id], pinned: !state[id]?.pinned ?? false },
      });
    };

    const handleClose = (id: string) => () => {
      setState({
        ...state,
        [id]: { ...state[id], visible: false },
      });
    };
    const handleLayoutChange = (layout: Layout[]) => {
      setState(
        keyBy(
          'id',
          layout.map((c) => ({
            ...state[c.i],
            id: c.i,
            x: c.x,
            y: c.y,
            width: c.w,
            height: c.h,
          }))
        )
      );
    };

    return (
      <Box sx={sx}>
        <GridLayout
          className='layout'
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={handleLayoutChange}
        >
          {Object.values(state)
            .filter((c) => c.visible ?? true)
            .map((c) => (
              <InternalWidget
                key={c.id}
                children={c.children}
                pinned={c.pinned}
                title={c.title}
                onPin={handlePin(c.id)}
                onClose={handleClose(c.id)}
              />
            ))}
        </GridLayout>
      </Box>
    );
  }
);
