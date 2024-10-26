const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const _yearMonthDayToNumeric = (year, month, day) => {
  const oneDayInMs = 86400000;
  const elapsedDaysInYear = (Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / oneDayInMs + 0.5;
  const fracPart = elapsedDaysInYear / (isLeapYear(year) ? 366 : 365);
  return year + fracPart;
};

export const calendarToNumeric = (calDate, ambiguity = false) => {
  if (typeof calDate !== 'string') return undefined;
  if (calDate[0] === '-') {
    const d = -parseFloat(calDate.substring(1).split('-')[0]);
    return isNaN(d) ? undefined : d;
  }
  const fields = calDate.split('-');
  if (fields.length !== 3) return undefined;
  const [year, month, day] = fields;
  const [numYear, numMonth, numDay] = fields.map((d) => parseInt(d, 10));

  if (calDate.includes('X')) {
    if (!ambiguity) return undefined;
    if (year.includes('X')) return undefined;
    if (month.includes('X')) {
      if (isNaN(numYear) || month !== 'XX' || day !== 'XX') return undefined;
      return numYear + 0.5;
    }
    if (isNaN(numYear) || isNaN(numMonth) || day !== 'XX') return undefined;
    const range = [
      _yearMonthDayToNumeric(numYear, numMonth, 1),
      _yearMonthDayToNumeric(numMonth === 12 ? numYear + 1 : numYear, numMonth === 12 ? 1 : numMonth + 1, 1)
    ];
    return range[0] + (range[1] - range[0]) / 2;
  }
  return _yearMonthDayToNumeric(numYear, numMonth, numDay);
};

export const dateToString = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const currentCalDate = () => dateToString(new Date());

export const currentNumDate = () => calendarToNumeric(currentCalDate);

export const numericToDateObject = (numDate) => {
  const fracPart = numDate % 1;
  const year = parseInt(numDate, 10);
  const nDaysInYear = isLeapYear(year) ? 366 : 365;
  const nDays = fracPart * nDaysInYear;
  const date = new Date(new Date(year, 0, 1).getTime() + nDays * 24 * 60 * 60 * 1000);
  return date;
};

export const numericToCalendar = (numDate) => {
  if (numDate < 0) {
    return Math.round(numDate).toString();
  }
  const date = numericToDateObject(numDate);
  return dateToString(date);
};
