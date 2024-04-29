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

  it('cancelling input keeps old value', async () => {
    render(<UploaderFileName />);

    await userEvent.click(screen.getByRole('button'));

    await userEvent.clear(screen.getByRole('textbox'));
    await userEvent.type(screen.getByRole('textbox'), 'abc');

    await userEvent.click(screen.getByLabelText('Cancel name edit'));

    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
    expect(screen.queryAllByText('File.jpg')).toHaveLength(1);
    expect(screen.queryAllByText('abc.jpg')).toHaveLength(0);
  });

  it('confirming input keeps new value', async () => {
    render(<UploaderFileName />);

    await userEvent.click(screen.getByRole('button'));

    await userEvent.clear(screen.getByRole('textbox'));
    await userEvent.type(screen.getByRole('textbox'), 'abc.jpg');

    await userEvent.click(screen.getByLabelText('Apply new name'));

    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
    expect(screen.queryAllByText('File.jpg')).toHaveLength(0);
    expect(screen.queryAllByText('abc.jpg')).toHaveLength(1);
  });
});
