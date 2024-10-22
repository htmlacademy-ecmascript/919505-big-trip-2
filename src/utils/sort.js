import dayjs from 'dayjs';
import {SortType} from '../const';

const pointsSort = {
  [SortType.DAY]: (a, b) => sortByDays(a, b),
  [SortType.TIME]: (a, b) => sortByTime(a, b),
  [SortType.PRICE]: (a, b) => b.basePrice - a.basePrice
};

function sortByDays(a, b) {
  return dayjs(a.dateFrom).isAfter(dayjs(b.dateFrom)) ? 1 : -1;
}

function sortByTime(a, b) {
  const start1 = dayjs(a.dateFrom);
  const finish1 = dayjs(a.dateTo);

  const start2 = dayjs(b.dateFrom);
  const finish2 = dayjs(b.dateTo);

  const differenceInMilliSeconds1 = finish1.diff(start1);
  const differenceInMilliSeconds2 = finish2.diff(start2);

  return differenceInMilliSeconds1 < differenceInMilliSeconds2 ? 1 : -1;
}

export {pointsSort};
