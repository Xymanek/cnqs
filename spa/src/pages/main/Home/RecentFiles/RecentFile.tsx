import { Button, Grid, Image, Paper, Stack, Text } from '@mantine/core';
import React from 'react';

export function RecentFile() {
  return (
    <Paper shadow="xs" withBorder p="xl">
      <Grid>
        <Grid.Col span={2}>
          <Image
            radius="sm"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
          />
        </Grid.Col>

        <Grid.Col2 span={10}>
          <Stack>
            <Text>File.jpg</Text>
            <Button.Group>
              <Button color="green">View & edit</Button>
              <Button>Share</Button>
              <Button color="red">Delete</Button>
            </Button.Group>
          </Stack>
        </Grid.Col2>
      </Grid>
    </Paper>
  );
}
