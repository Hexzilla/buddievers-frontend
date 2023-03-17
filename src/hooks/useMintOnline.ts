import moment from 'moment';
import { useMemo } from 'react';

export const useMintOnline = () => {
  return useMemo(() => {
    const startTime = moment.utc('2023-03-19 16:00:00').local();
    return startTime.diff(moment(), 's');
  }, []);
};
