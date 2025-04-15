/**
 * Format ISO string to "MM/DD/YYYY hh:mm AM/PM"
 */
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // convert 0 to 12
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${paddedMinutes} ${ampm}`;
};

/**
 * Format Date object to "YYYY-MM-DDTHH:mm" (for datetime-local inputs)
 */
export const getFormattedDateTime = (date) => {
  return date.toISOString().slice(0, 16);
};

/**
 * Get current date-time formatted for datetime-local input
 */
export const getCurrentFormattedDateTime = () => {
  return getFormattedDateTime(new Date());
};

/**
 * Get today's max time (23:59) formatted for datetime-local input
 */
export const getTodayMaxDateTime = () => {
  const today = new Date();
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59
  );
  return getFormattedDateTime(endOfToday);
};

/**
 * Get N days ago formatted for datetime-local input
 * @param {number} days - Number of days ago
 */
export const getFormattedDateTimeNDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return getFormattedDateTime(date);
};

/**
 * Optional: Parse formatted string like "MM/DD/YYYY hh:mm AM/PM" to Date
 * Only works if the input is consistently formatted
 */
export const parseFormattedDate = (formattedString) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2}) (AM|PM)$/;
  const match = formattedString.match(regex);

  if (!match) return null;

  let [, month, day, year, hours, minutes, ampm] = match;
  hours = parseInt(hours, 10);
  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  return new Date(
    `${year}-${month}-${day}T${hours.toString().padStart(2, "0")}:${minutes}`
  );
};
