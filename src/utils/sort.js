import dayjs from 'dayjs';
import {SortType} from '../const';

const pointsSort = {
  [SortType.DAY]: (pointA, pointB) => sortByDays(pointA, pointB),
  [SortType.TIME]: (pointA, pointB) => sortByTime(pointA, pointB),
  [SortType.PRICE]: (pointA, pointB) => pointB.basePrice - pointA.basePrice
};

function sortByDays(pointA, pointB) {
  return dayjs(pointA.dateFrom).isAfter(dayjs(pointB.dateFrom)) ? 1 : -1;
}

function sortByTime(pointA, pointB) {
  const start1 = dayjs(pointA.dateFrom);
  const finish1 = dayjs(pointA.dateTo);

  const start2 = dayjs(pointB.dateFrom);
  const finish2 = dayjs(pointB.dateTo);

  const differenceInMilliSeconds1 = finish1.diff(start1);
  const differenceInMilliSeconds2 = finish2.diff(start2);

  return differenceInMilliSeconds1 < differenceInMilliSeconds2 ? 1 : -1;
}

export {pointsSort};
