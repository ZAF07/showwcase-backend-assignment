export const formatDate = (date: Date): string => {
  const dateFormatter = new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  return dateFormatter.format(date);
};
