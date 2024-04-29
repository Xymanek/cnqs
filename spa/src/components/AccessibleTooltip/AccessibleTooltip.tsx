import { isElement, Tooltip, TooltipProps } from '@mantine/core';
import { cloneElement } from 'react';

export function AccessibleTooltip(props: TooltipProps) {
  if (!isElement(props.children)) {
    throw new Error(
      '[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported'
    );
  }

  const newProps = {
    ...props,
    children: cloneElement(props.children, { 'aria-label': props.label }),
  };

  return <Tooltip {...newProps} />;
}
