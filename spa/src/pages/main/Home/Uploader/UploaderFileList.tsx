import { UploaderFileIndicator } from './UploaderFileIndicator';
import { FileToUpload } from './UploaderShared';

interface UploaderFileListProps {
  files: FileToUpload[];
}

export function UploaderFileList({ files }: UploaderFileListProps) {
  return (
    <>
      {files.map((file) => (
        <UploaderFileIndicator file={file} key={file.id} />
      ))}
    </>
  );
}
