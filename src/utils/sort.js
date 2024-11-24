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
  const startA = dayjs(pointA.dateFrom);
  const finishA = dayjs(pointA.dateTo);

  const startB = dayjs(pointB.dateFrom);
  const finishB = dayjs(pointB.dateTo);

  const differenceInMilliSecondsA = finishA.diff(startA);
  const differenceInMilliSecondsB = finishB.diff(startB);

  return differenceInMilliSecondsA < differenceInMilliSecondsB ? 1 : -1;
}

export {pointsSort};
