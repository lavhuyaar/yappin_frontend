export const formatTime = (utcDate: string) => {
  return new Date(utcDate).toLocaleTimeString();
};
