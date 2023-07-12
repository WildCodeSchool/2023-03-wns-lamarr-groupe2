import dayjs from "dayjs";

// Fonction pour formater le temps restant
export const calculateTimeLeft = (start: string, end: string) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const timeLeft = endDate.diff(startDate);

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
