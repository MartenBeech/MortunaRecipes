export const getYearMonthDay = (stringDate: string) => {
  const date = new Date(stringDate);
  const day = date.getDate();
  const month = date.getMonth();
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthString = monthArray[month];
  const year = date.getFullYear();

  return `${monthString} ${day} ${year}`;
};
