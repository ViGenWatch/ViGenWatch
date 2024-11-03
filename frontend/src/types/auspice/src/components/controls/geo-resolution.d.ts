declare module '@khaitd0340/auspice/src/components/controls/geo-resolution' {
  import { FC } from 'react';
  import { AuspiceMetadata, Layout } from 'auspice';
  import { TFunction } from 'i18next';
  import { Dispatch } from 'redux';

  export interface GeoResolutionProps {
    metadata?: AuspiceMetadata;
    geoResolution?: string;
    t: TFunction;
    dispatch: Dispatch;
  }
  const Component: FC<GeoResolutionProps>;
  export default Component;
}
