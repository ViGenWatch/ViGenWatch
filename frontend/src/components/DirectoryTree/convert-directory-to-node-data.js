const executionHistoryRegexp = new RegExp('execution_[0-9]+');

export const convertDirectoryToNodeData = (directory) => {
  const { path, name, children } = directory;
  const executionHistory = (executionHistoryRegexp.exec(path) || []).pop();
  return children
    ? {
        id: path,
        name,
        children: children.map(convertDirectoryToNodeData),
        type: 'directory',
        explored: true,
        isOpen: false,
        checked: 0,
        executionHistory
      }
    : {
        id: path,
        name,
        type: 'file',
        isOpen: false,
        checked: 0,
        executionHistory
      };
};
