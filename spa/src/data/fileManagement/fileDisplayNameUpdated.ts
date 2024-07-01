import { createAction } from '@reduxjs/toolkit';

export const fileDisplayNameUpdated = createAction<{
  backendFileId: string;
  newDisplayName: string;
}>('fileManagement/displayNameUpdated');
