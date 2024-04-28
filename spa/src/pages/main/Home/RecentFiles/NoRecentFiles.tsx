import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export function NoRecentFiles() {
  const icon = <IconInfoCircle />;

  return (
    <Alert variant="transparent" color="gray" title="No uploaded files" icon={icon}>
      Files will appear as you upload them
    </Alert>
  );
}
