import dayjs from 'dayjs';

const MillisecondQuantity = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000
};

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
  let difference = '';
  const start = dayjs(dateFrom);
  const finish = dayjs(dateTo);
  let differenceInMilliSeconds = finish.diff(start);

  let days = null;
  let hours = null;
  let minutes = null;

  if (differenceInMilliSeconds > MillisecondQuantity.DAY) {
    days = Math.floor(differenceInMilliSeconds / MillisecondQuantity.DAY);
    differenceInMilliSeconds -= MillisecondQuantity.DAY * days;
    difference += `${days}D `;
  }

  if (differenceInMilliSeconds >= MillisecondQuantity.HOUR || days) {
    const hoursUnRounded = differenceInMilliSeconds / MillisecondQuantity.HOUR;
    hours = Math.floor(hoursUnRounded);
    differenceInMilliSeconds -= MillisecondQuantity.HOUR * hours;

    minutes = Math.ceil(differenceInMilliSeconds / MillisecondQuantity.MINUTE);

    if (minutes === 60) {
      hours++;
    }

    difference += `${hours === 0 ? '00' : hours}H `;
  }

  if (!minutes) {
    minutes = Math.ceil(differenceInMilliSeconds / MillisecondQuantity.MINUTE);
  }

  if ((minutes === 0 || minutes === 60) && hours) {
    difference += '00M';
  } else {
    difference += `${minutes}M`;
  }

  return difference;
}

export {humanizePointDate, humanizePointHours, humanizeTimeDifference, DateFormat};
