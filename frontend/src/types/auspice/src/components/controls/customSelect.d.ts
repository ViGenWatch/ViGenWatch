declare module '@khaitd0340/auspice/src/components/controls/customSelect';
{
  import { FC } from 'React';

  export interface CustomSelectProps {
    options: any;
    value: any;
    isClearable: boolean;
    isSearchable: boolean;
    isMulti: boolean;
    onChange: (opt: any) => Promise<void>;
  }

  const Component: FC<CustomSelectProps>;
  export default Component;
}
