import { intersection } from 'lodash';

const gridPanels = ['tree', 'measurements', 'map'];
export const numberOfGridPanels = (panels) => intersection(panels, gridPanels).length;
export const hasMultipleGridPanels = (panels) => numberOfGridPanels(panels) > 1;
