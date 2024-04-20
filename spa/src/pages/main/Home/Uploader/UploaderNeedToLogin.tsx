import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export function UploaderNeedToLogin() {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="outline" color="pink" title="Login required" icon={icon}>
      Only authenticated users are able to upload files
    </Alert>
  );
}
