import { Button, Grid, Image, Paper, Stack, Text } from '@mantine/core';
import React from 'react';

export interface RecentFileProps {
  fileName?: string;
  viewUrl?: string;
}

export function RecentFile({ fileName, viewUrl }: RecentFileProps) {
  const viewButton = viewUrl ? (
    <Button color="green" component="a" href={viewUrl} target='_blank'>
      View & edit
    </Button>
  ) : (
    <Button color="green">View & edit</Button>
  );

  return (
    <Paper shadow="xs" withBorder p="xl">
      <Grid>
        <Grid.Col span={2}>
          <Image
            radius="sm"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
          />
        </Grid.Col>

        <Grid.Col span={10}>
          <Stack>
            <Text>{fileName ?? 'File.jpg'}</Text>
            <Button.Group>
              {viewButton}
              <Button>Share</Button>
              <Button color="red">Delete</Button>
            </Button.Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
