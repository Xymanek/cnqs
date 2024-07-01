import { FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import React, { useEffect, useState } from 'react';
import { IconFileFilled } from '@tabler/icons-react';
import { Image, rem } from '@mantine/core';

export function UploaderFilePreview(props: { file: FileWithPath }) {
  // @ts-ignore
  const isPreviewableImage = IMAGE_MIME_TYPE.includes(props.file.type);
  const [previewSource, setPreviewSource] = useState<FileReader['result']>();

  useEffect(() => {
    if (!FileReader) return;
    if (!isPreviewableImage) return;

    const fr = new FileReader();
    fr.onload = () => {
      setPreviewSource(fr.result);
    };
    fr.readAsDataURL(new Blob([props.file]));

    // eslint-disable-next-line consistent-return
    return () => fr.abort();
  }, [props.file]);

  if (!isPreviewableImage) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconFileFilled style={{ width: rem(60), height: rem(60) }} />
      </div>
    );
  }

  // TODO better sizing
  return <Image radius="sm" src={previewSource} style={{ maxHeight: '200px' }} />;
  // https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png
}
