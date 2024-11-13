declare module '@khaitd0340/auspice/src/reducers/browserDimensions' {
  export declare type BrowserDimensionsState = {
    browserDimensions?: { width?: number; height?: number; docHeight?: number };
  };
  declare function browserDimensions(State?: BrowserDimensionsState): BrowserDimensionsState | undefined;
  export default browserDimensions;
}
