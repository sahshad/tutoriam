export const formatDate = (date: Date | string, format: string = "dd/MM/yyyy", includeTime: boolean = false) => {
  if (!date) return "";
  const d = new Date(date);

  const options: Record<string, any> = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.hour12 = true;
  }

  if (!includeTime) {
    return new Intl.DateTimeFormat("en-GB", options).format(d);
  }

  return new Intl.DateTimeFormat("en-US", options).format(d);
};


export const formatTimeFromSeconds = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const padded = (num: number): string => String(num).padStart(2, '0');

  if (hours > 0) {
    return `${padded(hours)}h ${padded(minutes)}m ${padded(seconds)}s`;
  } else if (minutes > 0) {
    return `${padded(minutes)}m ${padded(seconds)}s`;
  } else {
    return `${padded(seconds)}s`;
  }
};
