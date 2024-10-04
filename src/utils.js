import dayjs from 'dayjs';

const DateFormat = {
  DD_MM_YYYY: 'YYYY-MM-DD',
  MMM_DD: 'MMM DD',
  HH_MM: 'HH MM',
  HH: 'HH',
  MM: 'mm',
};

function humanizePointDate(pointDate, format = DateFormat.DD_MM_YYYY) {
  return pointDate ? dayjs(pointDate).format(format) : '';
}

function humanizePointHours(pointDate) {
  return pointDate ? `${dayjs(pointDate).format(DateFormat.HH)}:${dayjs(pointDate).format(DateFormat.MM)}` : '';
}

function humanizeTimeDifference(dateFrom, dateTo) {
  return dayjs(dateTo).diff(dayjs(dateFrom));
}

export {humanizePointDate, humanizePointHours, humanizeTimeDifference, DateFormat};
