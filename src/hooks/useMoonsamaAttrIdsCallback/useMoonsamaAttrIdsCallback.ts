import { useCallback, useMemo } from 'react';
import MoonsamaAttrMap from '../../assets/data/moonsamaAttrMap.json';

export const useMoonsamaAttrIds = (attributes?: string[]) => {
  const amap: { [key: string]: number[] } = useMemo(() => {
    return MoonsamaAttrMap;
  }, []);

  return useMemo(() => {
    const attrIds = (attributes ?? [])
      .map((x) => amap[x])
      .reduce((previousValue: number[], currentValue: number[]) => {
        if (!previousValue || previousValue.length == 0) {
          return currentValue;
        }
        return currentValue.filter((x) => previousValue.includes(x));
      }, []);
    const sorted = attrIds.sort((a, b) => a - b);
    console.log("useMoonsamaAttrIds", { attrIds, sorted, attributes });
    return sorted;
  }, [amap, JSON.stringify(attributes)]);
};

export const useMoonsamaAttrIdsCallback = () => {
  const amap: { [key: string]: number[] } = useMemo(() => {
    return MoonsamaAttrMap;
  }, []);

  const cb = useCallback(
    (attributes: string[]) => {
      const attrIds = (attributes ?? [])
        .map((x) => amap[x])
        .reduce((previousValue: number[], currentValue: number[]) => {
          if (!previousValue || previousValue.length == 0) {
            return currentValue;
          }
          return currentValue.filter((x) => previousValue.includes(x));
        }, []);
      const sorted = attrIds.sort((a, b) => a - b);
      console.log("useMoonsamaAttrIdsCallback",{ attrIds, sorted, attributes });
      return sorted;
    },
    [amap]
  );

  return cb;
};
