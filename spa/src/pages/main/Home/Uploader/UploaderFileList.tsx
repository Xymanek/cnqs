import { UploaderFileIndicator } from './UploaderFileIndicator';
import { FileToUpload } from '@/data/uploader/uploaderSlice';

interface UploaderFileListProps {
  files: FileToUpload[];
}

export function UploaderFileList({ files }: UploaderFileListProps) {
  return (
    <>
      {files.map((file) => (
        <UploaderFileIndicator file={file} key={file.clientId} />
      ))}
    </>
  );
}
