import dayjs from "dayjs";

export const timeLeft = (end: string) => {
  const endDate = dayjs(end);

  return endDate.diff(Date.now());
};

export const formattedTimeLeft = (end: string) => {
  const endDate = dayjs(end);

  const timeLeft = endDate.diff(Date.now());

  const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));

  const hours = Math.floor(
    (timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

  if (days > 0) {
    return { J: days };
  } else if (hours > 0) {
    return { H: hours };
  } else if (minutes > 0) {
    return { M: minutes };
  } else {
    return { done: true };
  }
};
