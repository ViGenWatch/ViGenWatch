export const iconContainerClassName = (className) => `iconContainer ${className}`;
export const iconClassName = (className) => `icon ${className}`;

export const getDefaultIcon =
  (Icon) =>
  ({ className, onClick }) => {
    const IconComponent = (props) => <Icon {...props} className={className} onClick={onClick} />;

    IconComponent.displayName = `IconComponent(${Icon.displayName || Icon.name || 'Icon'})`;

    return IconComponent;
  };
