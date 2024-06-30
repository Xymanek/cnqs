import { FileToUpload } from '@/data/uploader/uploaderSlice';
import { UploaderFileEntry } from './UploaderFileEntry';

interface UploaderFileListProps {
  files: FileToUpload[];
}

export function UploaderFileList({ files }: UploaderFileListProps) {
  return (
    <>
      {files.map((file) => (
        <UploaderFileEntry file={file} key={file.clientId} />
      ))}
    </>
  );
}
