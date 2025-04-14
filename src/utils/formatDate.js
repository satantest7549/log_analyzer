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
