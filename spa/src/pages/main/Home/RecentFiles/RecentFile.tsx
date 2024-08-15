import {Button, Grid, Image, Loader, LoadingOverlay, Paper, Stack, Text} from '@mantine/core';
import React from 'react';
import {useDownloadFileQuery} from "@/data/backendApi";

export interface RecentFileProps {
  displayName: string;
  backendId: string;
}

export function RecentFile({ displayName, backendId }: RecentFileProps) {
  // const viewButton = false ? (
  //     <Button color="green" component="a" href={viewUrl} target="_blank">
  //       View & edit
  //     </Button>
  // ) : (
  //     <Button color="green">View & edit</Button>
  // );
  
  const viewButton = (
      <Button color="green">View & edit</Button>
  );
  
  const {isLoading} = useDownloadFileQuery(backendId);

  return (
    <Paper shadow="xs" withBorder p="xl">
      <Grid>
        <Grid.Col span={2}>
          {
            isLoading
              ? <LoadingOverlay>
                    <Image
                        radius="sm"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
                    />
                </LoadingOverlay>
                : <Image
                    radius="sm"
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
                />
          }
            {/*<Image
            radius="sm"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
          />*/}
        </Grid.Col>

        <Grid.Col span={10}>
          <Stack>
            <Text>{displayName ?? 'File.jpg'}</Text>
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
