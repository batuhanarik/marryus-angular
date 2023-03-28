import { Theme } from 'ng-zorro-antd/core/config';

export const lightTheme: Theme = {
  primaryColor: getCssVariables().primary,
  successColor: getCssVariables().success,
  infoColor: getCssVariables().info,
  warningColor: getCssVariables().warning,
  errorColor: getCssVariables().error,
  secondaryColor: getCssVariables().secondary,
};

function getCssVariables() {
  const style = getComputedStyle(document.body);
  const primary = style.getPropertyValue('--p');
  const success = style.getPropertyValue('--su');
  const info = style.getPropertyValue('--in');
  const warning = style.getPropertyValue('--wa');
  const error = style.getPropertyValue('--er');
  const secondary = style.getPropertyValue('--s');
  const bgOpacity = style.getPropertyValue('--tw-bg-opacity');

  return {
    primary: `hsl(${primary} / ${bgOpacity})`,
    success: `hsl(${success} / ${bgOpacity})`,
    info: `hsl(${info} / ${bgOpacity})`,
    warning: `hsl(${warning} / ${bgOpacity})`,
    error: `hsl(${error} / ${bgOpacity})`,
    secondary: `hsl(${secondary} / ${bgOpacity})`,
  };
}
