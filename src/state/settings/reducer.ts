import { createReducer } from '@reduxjs/toolkit';
import { SUPPORTED_WALLETS } from 'connectors';
import { setConnector } from './actions';

export type ConnectorKey = keyof typeof SUPPORTED_WALLETS;

export type SettingsState = {
  connector: ConnectorKey | null;
};

export const initialState: SettingsState = {
  connector: null,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setConnector, (settings, { payload }) => {
    settings.connector = payload;
  })
);
