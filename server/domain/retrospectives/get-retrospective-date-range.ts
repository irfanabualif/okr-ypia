export function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

export function getLast7DaysRange(baseDate = new Date()) {
  const endDate = endOfDay(baseDate);

  const startDate = new Date(baseDate);
  startDate.setDate(baseDate.getDate() - 6);

  return {
    startDate: startOfDay(startDate),
    endDate,
  };
}