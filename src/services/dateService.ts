export const getYearMonthDay = (stringDate: string) => {
  const date = new Date(stringDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const monthString =
    month === 1
      ? "Jan"
      : 2
      ? "Feb"
      : 3
      ? "Mar"
      : 4
      ? "Apr"
      : 5
      ? "May"
      : 6
      ? "Jun"
      : 7
      ? "Jul"
      : 8
      ? "Aug"
      : 9
      ? "Sep"
      : 10
      ? "Oct"
      : 11
      ? "Nov"
      : 12
      ? "Dec"
      : "Undefined";
  const year = date.getFullYear();

  return `${monthString} ${day} ${year}`;
};
