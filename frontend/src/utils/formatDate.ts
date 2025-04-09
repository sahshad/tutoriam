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
