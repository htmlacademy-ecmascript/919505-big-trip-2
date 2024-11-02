import dayjs from 'dayjs';

const TimeThreshold = {
  ZERO: 0,
  SIXTY: 60,
  TEN: 10
};

const MillisecondQuantity = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000
};

const DateFormat = {
  YYYY_MM_DD: 'YYYY-MM-DD',
  YY_MM_DD: 'YY/MM/DD',
  MMM_DD: 'MMM DD',
  DD_MMM: 'D MMM',
  HH_MM: 'HH MM',
  MMM: 'MMM',
  D: 'D',
  HH: 'HH',
  MM: 'mm',
};

function humanizePointDate(pointDate, format = DateFormat.YYYY_MM_DD) {
  return pointDate ? dayjs(pointDate).format(format) : '';
}

function humanizePointHours(pointDate) {
  return pointDate ? `${dayjs(pointDate).format(DateFormat.HH)}:${dayjs(pointDate).format(DateFormat.MM)}` : '';
}

function humanizePointDateTime(pointDateTime) {
  const humanizedDate = dayjs(pointDateTime).format(DateFormat.YY_MM_DD);
  const humanizedHours = dayjs(pointDateTime).format(DateFormat.HH);
  const humanizedMinutes = dayjs(pointDateTime).format(DateFormat.MM);

  return `${humanizedDate}&nbsp;${humanizedHours}:${humanizedMinutes}`;
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
    difference += `${days < TimeThreshold.TEN ? '0' : ''}${days}D `;
  }

  if (differenceInMilliSeconds >= MillisecondQuantity.HOUR || days) {
    const hoursUnRounded = differenceInMilliSeconds / MillisecondQuantity.HOUR;
    hours = Math.floor(hoursUnRounded);
    differenceInMilliSeconds -= MillisecondQuantity.HOUR * hours;

    minutes = Math.ceil(differenceInMilliSeconds / MillisecondQuantity.MINUTE);

    if (minutes === TimeThreshold.SIXTY) {
      hours++;
    }

    difference += `${hours < TimeThreshold.TEN ? '0' : ''}${hours}H `;
  }

  if (!minutes) {
    minutes = Math.ceil(differenceInMilliSeconds / MillisecondQuantity.MINUTE);
  }

  if ((minutes === TimeThreshold.ZERO || minutes === TimeThreshold.SIXTY) && hours) {
    difference += '00M';
  } else {
    difference += `${minutes < TimeThreshold.TEN ? '0' : ''}${minutes}M`;
  }

  return difference;
}

function getMinMaxDates(points) {
  let dateFrom = null;
  let dateTo = null;

  points.forEach((point) => {
    if (!dateFrom) {
      dateFrom = point.dateFrom;
    }

    if (!dateTo) {
      dateTo = point.dateTo;
    }

    if (point.dateFrom < dateFrom) {
      dateFrom = point.dateFrom;
    }

    if (point.dateTo > dateTo) {
      dateTo = point.dateTo;
    }
  });

  return {dateFrom, dateTo};
}

function humanizeTripTimeInterval(points) {
  const {dateFrom, dateTo} = getMinMaxDates(points);

  const monthFrom = dayjs(dateFrom).format(DateFormat.MMM);
  const monthTo = dayjs(dateTo).format(DateFormat.MMM);

  if (monthFrom === monthTo) {
    return `${dayjs(dateFrom).format(DateFormat.D)}&nbsp;&mdash;&nbsp;${dayjs(dateTo).format(DateFormat.DD_MMM)}`;
  }

  return `${dayjs(dateFrom).format(DateFormat.DD_MMM)}&nbsp;&mdash;&nbsp;${dayjs(dateTo).format(DateFormat.DD_MMM)}`;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);
}

export {
  humanizePointDate,
  humanizePointHours,
  humanizeTimeDifference,
  humanizePointDateTime,
  humanizeTripTimeInterval,
  getMinMaxDates,
  isDatesEqual,
  DateFormat,
};
