const invalidStrings = ['unknown', '?', 'nan', 'na', 'n/a', '', 'unassigned'];
export const strainSymbol = Symbol('strain');
export const isValueValid = (value) => {
  if (!['number', 'boolean', 'string'].includes(typeof value)) {
    return false;
  }
  if (typeof value === 'string' && invalidStrings.includes(value.toLowerCase())) {
    return false;
  }
  return true;
};
