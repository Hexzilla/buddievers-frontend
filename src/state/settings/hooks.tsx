import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from '../index';
import { ConnectorKey } from './reducer';

// persist which connector has been selected by user, in order to provide auto-connect on next visit or page refresh
export const useSettingsConnectorKey = () => {
  const dispatch = useDispatch<AppDispatch>();

  const setConnectorKey = useCallback(
    (connector: ConnectorKey | null) => {
      dispatch({ type: 'settings/setConnector', payload: connector });
    },
    [dispatch]
  );

  const connectorKey = useSelector<AppState, ConnectorKey | null>(
    (state) => state.settings.connector
  );

  return { connectorKey, setConnectorKey };
};
