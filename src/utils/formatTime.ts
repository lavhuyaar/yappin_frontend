export const formatTime = (utcDate: string) => {
  const date = new Date(utcDate);

  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();

  const AM_PM: string = hours > 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? "0" + hours : hours;

  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${AM_PM}`;
};
