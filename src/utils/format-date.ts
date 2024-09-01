import { format } from 'date-fns';

export const adjustDateWithLocalTimezone = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);
  return date;
};

export const formatDate = (date: Date | string, pattern?: string) => {
  if (!date) return null;

  return format(
    adjustDateWithLocalTimezone(new Date(date)),
    pattern || 'dd.LL.yyyy',
  );
};
