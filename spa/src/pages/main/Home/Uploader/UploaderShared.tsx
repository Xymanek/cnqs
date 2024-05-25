import { FileWithPath } from '@mantine/dropzone';
import { createContext } from 'react';

export type FileToUpload = {
  file: FileWithPath;
  userProvidedName: string;
  id: string;
};

export type ChangeUserSelectedNameFn = (id: string, newName: string) => void;
export const ChangeUserSelectedName = createContext<ChangeUserSelectedNameFn>(() => {
  throw new Error('ChangeUserSelectedName not provided');
});
