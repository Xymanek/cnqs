import { render, screen, userEvent } from '@test-utils';
import { expect } from 'vitest';
import { UploaderFileName } from '@/pages/main/Home/Uploader/UploaderFileIndicator';

describe('UploaderFileName component', () => {
  it('starts with the file name readonly', () => {
    render(<UploaderFileName />);
    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
  });

  it('input become available once clicked', async () => {
    render(<UploaderFileName />);

    expect(screen.queryAllByRole('button')).toHaveLength(1);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.queryAllByRole('textbox')).toHaveLength(1);
  });
});

