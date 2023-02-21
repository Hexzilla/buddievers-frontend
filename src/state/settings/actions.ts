import { createAction } from '@reduxjs/toolkit';
import { ConnectorKey } from './reducer';

export const setConnector = createAction<ConnectorKey | null>(
  'settings/setConnector'
);
