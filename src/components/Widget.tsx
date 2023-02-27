import React, { ReactElement } from 'react';

export interface WidgetProps {
  id: string;
  title?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  pinned?: boolean;
  visible?: boolean;
  children: ReactElement;
}

export const Widget: React.FC<WidgetProps> = (props) => {
  return props.children;
};
