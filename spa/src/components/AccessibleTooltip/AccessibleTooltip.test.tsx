import { render, screen } from '@test-utils';
import { expect } from 'vitest';
import { Button } from '@mantine/core';
import { AccessibleTooltip } from './AccessibleTooltip';

describe('AccessibleTooltip component', () => {
  it('adds the attribute to a button', () => {
    render(
      <AccessibleTooltip label="abc123">
        <Button>Do things</Button>
      </AccessibleTooltip>
    );

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'abc123');
  });
});
