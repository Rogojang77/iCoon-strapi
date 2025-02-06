export const getConfigByComponentName = (nuxtUIConfigs: any[], componentName: any) => {
  const config = nuxtUIConfigs?.find((config: { component_name: any; }) => config.component_name === componentName);
  return config?.json_data || {};
};