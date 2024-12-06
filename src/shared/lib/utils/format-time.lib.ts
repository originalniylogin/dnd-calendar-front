export const formatDateTimeUnit = (timeValue: number | string, templateLength = 2): string => {
  const normilizedValue = typeof timeValue === 'string' ? timeValue : timeValue.toString();
  const templateString = Array.from({ length: templateLength }).fill('0').join('');
  return `${templateString.slice(0, Math.max(templateLength - normilizedValue.length, 0))}${normilizedValue}`;
};
